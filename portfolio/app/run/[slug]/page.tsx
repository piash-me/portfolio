import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjects } from '@/lib/projects';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects
    .filter((p) => p.toolType === 'Embedded App' && (p.toolFileUrl || p.embedUrl))
    .map((p) => ({ slug: p.slug }));
}

export default async function RunToolPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const src = project.toolFileUrl || project.embedUrl;
  if (!src) notFound();

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Link
        href={`/projects/${project.slug}`}
        style={{
          position: 'fixed', top: 12, left: 12, zIndex: 50,
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 999, fontSize: 13, fontFamily: 'Inter, sans-serif',
          background: 'rgba(8,9,11,0.85)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)', color: '#F5F5F7', textDecoration: 'none',
        }}
      >
        <ArrowLeft size={14} /> Back to {project.title}
      </Link>
      <iframe
        src={src}
        title={`${project.title} — live tool`}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        allowFullScreen
      />
    </div>
  );
}
