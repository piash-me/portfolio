'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools', label: 'Tools' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar({ name = 'Mohammad Piash' }: { name?: string }) {
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
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-hairline" style={{ background: 'var(--nav-bg)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="mono-font text-sm tracking-widest text-fg" onClick={closeMobile}>
            {name.toUpperCase()}<span className="text-violet">.</span>
          </Link>

          {/* Desktop nav — unchanged */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-7 text-sm text-fg-muted">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-fg transition-colors">{l.label}</Link>
              ))}
            </div>
            <Link
              href="/resume"
              className="text-sm px-4 py-2 rounded-full border border-hairline text-fg hover:border-violet/60 hover:text-violet transition-colors"
            >
              Resume
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile hamburger toggle — hidden on desktop */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="text-fg"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — hidden by default, appears on click */}
        {mobileOpen && (
          <div className="md:hidden border-t border-hairline backdrop-blur-md" style={{ background: 'var(--nav-bg)' }}>
            <div className="flex flex-col px-6 py-4 gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="py-2.5 text-sm text-fg-muted hover:text-fg transition-colors border-b border-hairline last:border-none"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/resume"
                onClick={closeMobile}
                className="mt-3 text-center text-sm px-4 py-2.5 rounded-full border border-hairline text-fg hover:border-violet/60 hover:text-violet transition-colors"
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
