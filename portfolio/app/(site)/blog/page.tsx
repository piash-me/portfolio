'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Clock, ArrowUpRight } from 'lucide-react';
import { posts } from '@/lib/posts';

const categories = ['All', 'Operations', 'BI', 'Automation'];

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => posts.filter((p) => {
    const matchesCategory = active === 'All' || p.category === active;
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [query, active]);

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">WRITING</p>
        <h1 className="display-font text-3xl sm:text-4xl text-white mb-3">Notes from the intersection of ops and data.</h1>
        <p className="text-neutral-400 max-w-xl mb-10">Short, practical write-ups on operations, automation, and the BI tools I use day to day.</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2.5 flex-1">
            <Search size={15} className="text-neutral-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles"
              className="bg-transparent outline-none text-sm text-neutral-200 placeholder-neutral-500 w-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
                  active === c ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-400 hover:border-white/30'
                }`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block glass rounded-2xl p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <span className="mono-font text-[10px] px-2 py-1 rounded-full border border-white/10 text-neutral-400">{p.category}</span>
                <span className="text-[11px] text-neutral-400 flex items-center gap-1"><Clock size={11} /> {p.readTime}</span>
                <span className="text-[11px] text-neutral-400">{p.date}</span>
              </div>
              <h2 className="text-white font-medium text-lg mb-2 flex items-center gap-2 group-hover:text-violet-200 transition-colors">
                {p.title}
                <ArrowUpRight size={15} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">{p.excerpt}</p>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-neutral-400 text-sm text-center py-16">No articles match that search yet.</p>}
        </div>
      </div>
    </main>
  );
}
