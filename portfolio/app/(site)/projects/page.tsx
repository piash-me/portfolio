'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Search } from 'lucide-react';
import { getProjects, projectLinkTarget, projects as fallbackProjects, type Project } from '@/lib/projects';

const PAGE_SIZE = 6;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .slice()
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="min-h-screen pt-24 px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">ALL PROJECTS</p>
        <h1 className="display-font text-3xl sm:text-4xl text-white mb-10">Every project, one place.</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2.5 flex-1">
            <Search size={15} className="text-neutral-400" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
              placeholder="Search projects" className="bg-transparent outline-none text-sm text-neutral-200 placeholder-neutral-500 w-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => { setActiveCategory(c); setVisibleCount(PAGE_SIZE); }}
                className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
                  activeCategory === c ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-300 hover:border-white/30'
                }`}>{c}</button>
            ))}
          </div>
        </div>

        <p className="text-neutral-500 text-xs mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {visible.map((p) => {
            const target = projectLinkTarget(p);
            const linkProps = target.skipsWriteup ? { href: target.href, target: '_blank', rel: target.external ? 'noopener noreferrer' : undefined } : { href: target.href };
            return (
              <Link key={p.slug} {...linkProps} className="rounded-2xl glass p-6 group block">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="mono-font text-[10px] px-2 py-1 rounded-full border border-white/10 text-neutral-300">{p.tag}</span>
                    {p.featured && <span className="text-[10px] mono-font text-bronze">★ Featured</span>}
                  </div>
                  <span className={`text-[10px] mono-font ${p.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'}`}>{p.status}</span>
                </div>
                <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                  {p.title}
                  <ExternalLink size={14} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{p.summary}</p>
                {target.skipsWriteup && <p className="mono-font text-[10px] text-violet mt-3">Opens the live tool →</p>}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && <p className="text-neutral-400 text-sm text-center py-16">No projects match that search yet.</p>}

        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-6 py-2.5 rounded-full border border-white/15 text-sm text-neutral-300 hover:border-violet/50 hover:text-violet transition-colors">
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
