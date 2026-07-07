'use client';

import { useState } from 'react';
import { Download, Eye, Briefcase, GraduationCap, Award, Truck, BarChart3, Bot, Users, X } from 'lucide-react';

const experience = [
  { role: 'E-commerce Operations Team Leader', org: 'Al-Dawaa Medical Services Co. — All Regions', period: 'Present', points: [
    'Promoted from Regional E-commerce Operations Team Leader (East Region) to oversee last-mile operations monitoring and performance across all regions nationwide.',
    'Own On-Time Delivery (OTD), cost-per-delivery (CPD/CPO), and rider utilization across the last-mile fleet at national scale.',
    'Manage delivery workflows through last-mile technology platforms and coordinate with support teams on issue resolution.',
    'Use a data-driven approach — Excel, Power BI — to identify improvement opportunities and drive continuous improvement.',
  ]},
  { role: 'Regional E-commerce Operations Team Leader', org: 'Al-Dawaa Medical Services Co. — East Region', period: 'Sep 2022 — Present', points: [
    'Promoted from Delivery Driver to Regional E-commerce Operations Team Leader, taking ownership of OTD, cost-per-delivery, and team performance across the East Region.',
  ]},
  { role: 'Delivery Driver', org: 'Al-Dawaa Medical Services Co. — Jazan Region', period: 'Mar 2022 — Sep 2022', points: [
    'Frontline last-mile delivery execution ahead of promotion to Regional E-commerce Operations Team Leader.',
  ]},
  { role: 'Delivery Driver', org: 'HungerStation & Mrsool — Buraydah, Al Qasim', period: 'Jan 2019 — Feb 2022', points: [
    'Three years of frontline last-mile delivery across two major Saudi delivery platforms.',
  ]},
  { role: 'WordPress Developer & Frontend Web Developer', org: 'Fiverr (Freelance) — Riyadh', period: 'Jan 2019 — Mar 2021', points: [
    'Built and customized WordPress sites and frontend web projects for freelance clients.',
  ]},
];

const education = [
  { title: 'Higher Secondary Certificate, Entrepreneurship Development', org: 'Islamia Technical And Business Management College', period: 'Jan 2013 — Dec 2014' },
];

const certifications = [
  'Microsoft Excel — Data Analysis with Excel Pivot Tables',
  'Microsoft PowerPoint: School to Corporate — Basic to Advance',
  'ChatGPT Artificial Intelligence',
  'Google Bard',
  'Cyber Security (Honors: Cyber Security Expert)',
];

const skillPreview = [
  { label: 'Operations', icon: Truck, color: '#C77D3D' },
  { label: 'Analytics & BI', icon: BarChart3, color: '#8B7CF6' },
  { label: 'Automation & AI', icon: Bot, color: '#5EC8D8' },
  { label: 'Leadership', icon: Users, color: '#D89EC7' },
];

export default function ResumePage() {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">RESUME</p>
            <h1 className="display-font text-3xl sm:text-4xl text-white mb-2">Mohammad Piash</h1>
            <p className="text-neutral-300 text-sm max-w-md leading-relaxed">E-commerce Operations Team Leader | Last-Mile Delivery Operations | Operations Analytics | Process Optimization | Performance Improvement</p>
            <p className="text-bronze text-xs font-medium mt-2">Al-Dawaa Medical Services Co.</p>
            <p className="mono-font text-xs text-neutral-400 mt-3">Version 3 · Updated July 2026</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setPreviewOpen(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-neutral-300 hover:text-white transition-colors">
              <Eye size={15} /> Preview
            </button>
            <a href="/cv.pdf" download className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors">
              <Download size={15} /> Download CV
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {skillPreview.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <Icon size={18} color={s.color} className="mx-auto mb-2" />
                <p className="text-xs text-neutral-400">{s.label}</p>
              </div>
            );
          })}
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase size={16} className="text-bronze" />
            <h2 className="display-font text-xl text-white">Experience</h2>
          </div>
          <div className="space-y-8 border-l border-white/10 pl-6">
            {experience.map((e) => (
              <div key={e.role} className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-obsidian border-2 border-bronze" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-white font-medium">{e.role}</h3>
                  <span className="mono-font text-xs text-neutral-400">{e.period}</span>
                </div>
                <p className="text-sm text-neutral-400 mb-2">{e.org}</p>
                <ul className="space-y-1.5">
                  {e.points.map((p, i) => (
                    <li key={i} className="text-sm text-neutral-400 leading-relaxed flex gap-2">
                      <span className="text-bronze mt-1.5">›</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap size={16} className="text-violet-300" />
            <h2 className="display-font text-xl text-white">Learning &amp; Education</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.map((ed) => (
              <div key={ed.title} className="glass rounded-xl p-5">
                <p className="text-white text-sm font-medium">{ed.title}</p>
                <p className="text-neutral-400 text-xs mt-1">{ed.org}</p>
                <p className="mono-font text-[10px] text-violet-300 mt-2">{ed.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <Award size={16} className="text-cyan-300" />
            <h2 className="display-font text-xl text-white">Certifications</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full glass text-xs text-neutral-300">{c}</span>
            ))}
          </div>
        </section>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setPreviewOpen(false)}>
          <div className="bg-[#0F1013] rounded-2xl max-w-lg w-full p-8 relative border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X size={18} />
            </button>
            <p className="mono-font text-xs text-neutral-400 mb-4">CV PREVIEW</p>
            <iframe src="/cv.pdf" className="w-full h-96 rounded-lg border border-white/10" title="CV preview" />
          </div>
        </div>
      )}
    </main>
  );
}
