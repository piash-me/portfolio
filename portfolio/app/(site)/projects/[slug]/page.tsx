import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { getProjects } from '@/lib/projects';
import type { Metadata } from 'next';

export const revalidate = 60; // re-checks Sanity for updates at most once a minute — new projects show up without a redeploy

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 2);

  return (
    <main className="min-h-screen pt-24">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="mono-font text-[10px] px-2 py-1 rounded-full border border-white/10 text-neutral-300">{project.tag}</span>
          <span className={`text-[10px] mono-font ${project.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'}`}>{project.status}</span>
          <span className="text-[11px] text-neutral-400 flex items-center gap-1 ml-auto"><Calendar size={12} /> {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>

        <h1 className="display-font text-3xl sm:text-4xl text-white mb-4">{project.title}</h1>
        <p className="text-neutral-300 text-lg leading-relaxed mb-10">{project.summary}</p>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.tools.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full glass text-neutral-300">{t}</span>
          ))}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full glass text-neutral-300 flex items-center gap-1.5 hover:text-white transition-colors">
              <Github size={13} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full glass text-neutral-300 flex items-center gap-1.5 hover:text-white transition-colors">
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>

        <div className="space-y-10">
          <section>
            <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">THE PROBLEM</p>
            <p className="text-neutral-300 leading-relaxed">{project.problem}</p>
          </section>
          <section>
            <p className="mono-font text-xs tracking-[0.3em] text-violet mb-3">THE SOLUTION</p>
            <p className="text-neutral-300 leading-relaxed">{project.solution}</p>
          </section>
          <section>
            <p className="mono-font text-xs tracking-[0.3em] text-cyan mb-3">THE IMPACT</p>
            <p className="text-neutral-300 leading-relaxed">{project.impact}</p>
          </section>

          {project.toolType === 'Embedded App' && (project.toolFileUrl || project.embedUrl) && (
            <section>
              <p className="mono-font text-xs tracking-[0.3em] text-neutral-400 mb-3">TRY IT LIVE</p>
              <div className="rounded-2xl overflow-hidden border border-white/10 glass">
                <iframe src={project.toolFileUrl || project.embedUrl} className="w-full h-[560px]" title={`${project.title} live view`} allowFullScreen />
              </div>
            </section>
          )}

          {project.toolType === 'External Link' && project.embedUrl && (
            <section className="glass rounded-2xl p-6 text-center">
              <p className="text-neutral-300 text-sm mb-4">This runs as a notebook and can&apos;t be embedded directly — open it to try it yourself.</p>
              <a href={project.embedUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors">
                <ExternalLink size={15} /> Open Notebook
              </a>
            </section>
          )}

          {project.toolType === 'API-backed Tool' && project.liveToolPath && (
            <section className="glass rounded-2xl p-6 text-center">
              <p className="text-neutral-300 text-sm mb-4">This tool runs directly on this site.</p>
              <Link href={project.liveToolPath} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors">
                <ExternalLink size={15} /> Try the Tool
              </Link>
            </section>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <p className="mono-font text-xs tracking-[0.3em] text-neutral-400 mb-6">RELATED PROJECTS</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="glass rounded-xl p-5 hover:border-white/20 transition-colors">
                  <h3 className="text-white font-medium text-sm mb-1.5">{p.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
