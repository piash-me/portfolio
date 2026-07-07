'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(Math.max(p, 0), 1) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-bronze to-violet z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-obsidian/80 border-b border-white/8">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="mono-font text-sm tracking-widest text-neutral-200">
            YOUR&nbsp;NAME<span className="text-violet">.</span>
          </Link>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-7 text-sm text-neutral-300">
              <Link href="/#about" className="hover:text-white transition-colors">About</Link>
              <Link href="/#skills" className="hover:text-white transition-colors">Skills</Link>
              <Link href="/#projects" className="hover:text-white transition-colors">Projects</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <Link
              href="/resume"
              className="text-sm px-4 py-2 rounded-full border border-white/15 text-neutral-200 hover:border-violet/60 hover:text-violet transition-colors"
            >
              Resume
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
