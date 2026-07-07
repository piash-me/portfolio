'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools', label: 'Tools' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(Math.max(p, 0), 1) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu automatically whenever a link is tapped.
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-bronze to-violet z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-obsidian/80 border-b border-white/8">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="mono-font text-sm tracking-widest text-neutral-200" onClick={closeMobile}>
            MOHAMMAD&nbsp;PIASH<span className="text-violet">.</span>
          </Link>

          {/* Desktop nav — unchanged */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-7 text-sm text-neutral-300">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
            <Link
              href="/resume"
              className="text-sm px-4 py-2 rounded-full border border-white/15 text-neutral-200 hover:border-violet/60 hover:text-violet transition-colors"
            >
              Resume
            </Link>
          </div>

          {/* Mobile hamburger toggle — hidden on desktop */}
          <button
            className="md:hidden text-neutral-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown — hidden by default, appears on click */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/8 bg-obsidian/95 backdrop-blur-md">
            <div className="flex flex-col px-6 py-4 gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="py-2.5 text-sm text-neutral-300 hover:text-white transition-colors border-b border-white/5 last:border-none"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/resume"
                onClick={closeMobile}
                className="mt-3 text-center text-sm px-4 py-2.5 rounded-full border border-white/15 text-neutral-200 hover:border-violet/60 hover:text-violet transition-colors"
              >
                Resume
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
