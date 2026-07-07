'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight, Download, Mail, Truck, BarChart3, Bot, Users, Database,
  Github, Linkedin, ExternalLink, Copy, Check, MapPin,
} from 'lucide-react';

const ROLES = [
  'Operations Data Analyst',
  'Process Improvement through Data',
  'SLA & Fleet Performance Analytics',
  'Data-Driven Operations Leader',
];

function useTypingEffect(words: string[], typingSpeed = 55, pauseTime = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), typingSpeed / 1.6);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pauseTime]);

  return text;
}

function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return [ref, value] as const;
}

const NODE_COUNT = 7;

function SignalPath() {
  return (
    <div className="relative w-full max-w-2xl h-20 mx-auto mt-10 select-none">
      <svg viewBox="0 0 700 60" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C77D3D" />
            <stop offset="55%" stopColor="#C77D3D" />
            <stop offset="100%" stopColor="#8B7CF6" />
          </linearGradient>
        </defs>
        {Array.from({ length: NODE_COUNT - 1 }).map((_, i) => {
          const x1 = 30 + i * (640 / (NODE_COUNT - 1));
          const x2 = 30 + (i + 1) * (640 / (NODE_COUNT - 1));
          const isDataSegment = i >= NODE_COUNT - 3;
          return (
            <line key={i} x1={x1} y1="30" x2={x2} y2="30" stroke="url(#pathGrad)" strokeWidth={1.5}
              strokeDasharray={isDataSegment ? '4 5' : '0'} opacity={0.6} className="signal-line"
              style={{ animationDelay: `${i * 0.18}s` }} />
          );
        })}
        {Array.from({ length: NODE_COUNT }).map((_, i) => {
          const x = 30 + i * (640 / (NODE_COUNT - 1));
          const isData = i >= NODE_COUNT - 3;
          return (
            <circle key={i} cx={x} cy="30" r={isData ? 4 : 5} fill={isData ? '#8B7CF6' : '#C77D3D'}
              className="signal-node" style={{ animationDelay: `${i * 0.18}s` }} />
          );
        })}
      </svg>
      <div className="flex justify-between text-[10px] font-mono tracking-wider text-neutral-400 mt-1 px-1 select-none">
        <span>ROUTES · SLA · FLEET</span>
        <span className="text-violet-300/70">SIGNAL · INSIGHT · SCALE</span>
      </div>
    </div>
  );
}

const professions = [
  { title: 'Operations Leader', icon: Truck, color: '#C77D3D', desc: 'Runs last-mile delivery operations end to end — fleets, SLAs, rider performance, and daily execution.' },
  { title: 'Data Analyst', icon: BarChart3, color: '#8B7CF6', desc: 'Turns operational numbers — OTD, CPD/CPO, rider utilization — into dashboards and decisions.' },
  { title: 'Process Improver', icon: Bot, color: '#5EC8D8', desc: 'Finds root causes and builds repeatable fixes, automating what used to be manual reporting.' },
];

function RoleOrbit3D() {
  const icons = [
    { Icon: Truck, color: '#C77D3D', offset: 0 },
    { Icon: BarChart3, color: '#8B7CF6', offset: 120 },
    { Icon: Bot, color: '#5EC8D8', offset: 240 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10" style={{ perspective: 600 }}>
      <div className="role-orbit-spin relative w-44 h-44" style={{ transformStyle: 'preserve-3d' }}>
        {icons.map(({ Icon, color, offset }, i) => (
          <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotateY(${offset}deg) translateZ(90px)` }}>
            <Icon size={26} color={color} className="opacity-40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfessionFlip() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % professions.length);
        setFlipped(false);
      }, 500);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const p = professions[index];
  const Icon = p.icon;

  return (
    <div className="relative flex flex-col items-center">
      <RoleOrbit3D />
      <div className="w-full max-w-[320px]" style={{ perspective: 1000 }}>
        <div
          className="glass rounded-2xl px-7 py-5 text-center"
          style={{
            transform: flipped ? 'rotateX(-100deg)' : 'rotateX(0deg)',
            opacity: flipped ? 0 : 1,
            transformOrigin: 'top center',
            transition: 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex items-center justify-center gap-2.5">
            <Icon size={18} color={p.color} />
            <h3 className="text-white font-semibold text-sm m-0">{p.title}</h3>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed mt-2 m-0">{p.desc}</p>
        </div>
      </div>
      <div className="flex gap-1.5 mt-3.5">
        {professions.map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: i === index ? '#8B7CF6' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>
    </div>
  );
}

const skillGroups = [
  { label: 'Operations', icon: Truck, color: '#C77D3D', skills: [
    { name: 'Last-Mile Delivery Ops', level: 95 }, { name: 'OTD & SLA Management', level: 92 },
    { name: 'Rider/3PL Coordination', level: 90 }, { name: 'Root Cause Analysis', level: 85 } ] },
  { label: 'Data Analysis Applied to Ops', icon: BarChart3, color: '#8B7CF6', skills: [
    { name: 'Data Visualization & Dashboarding', level: 85 }, { name: 'Excel (Pivot Tables)', level: 92 },
    { name: 'Power BI', level: 70 }, { name: 'SQL', level: 45 } ] },
  { label: 'Automation & AI', icon: Bot, color: '#5EC8D8', skills: [
    { name: 'ChatGPT / AI Tools', level: 80 }, { name: 'Google Bard', level: 70 },
    { name: 'Cyber Security Awareness', level: 75 }, { name: 'Python', level: 35 } ] },
  { label: 'Leadership', icon: Users, color: '#D89EC7', skills: [
    { name: 'Team Leadership', level: 92 }, { name: 'Driver Performance Coaching', level: 88 },
    { name: 'Cross-Functional Coordination', level: 85 } ] },
];

const timeline = [
  { year: '2019', title: 'Delivery Driver — Mrsool & HungerStation', desc: 'Frontline last-mile delivery in Buraydah, Al Qasim — where the operational instincts started.' },
  { year: '2022', title: 'Delivery Driver, Al-Dawaa (Jazan)', desc: 'Moved into e-commerce delivery operations at Al-Dawaa Medical Services.' },
  { year: '2022', title: 'Promoted to Operations Team Leader', desc: 'Took ownership of OTD, cost-per-delivery, rider utilization, and team performance in Al Khobar.' },
  { year: 'Now', title: 'Data-Driven Operations Leader', desc: 'Using Excel, Power BI, and growing SQL/Python skills to analyze delivery performance and drive continuous improvement.' },
];

const stats = [
  { label: 'Years in E-commerce Ops', value: 4, suffix: '+' },
  { label: 'Years in Last-Mile Delivery', value: 7, suffix: '+' },
  { label: 'Core KPIs Owned', value: 5, suffix: '' },
  { label: 'Certifications', value: 5, suffix: '' },
];

const projects = [
  { title: 'OTD Performance Dashboard', category: 'BI', tag: 'Power BI + Excel', status: 'Live', desc: 'Tracks On-Time Delivery, delivery success rate, and cost-per-delivery (CPD/CPO) across the fleet in real time.' },
  { title: 'Rider Utilization Analysis', category: 'BI', tag: 'Excel Pivot Tables', status: 'Live', desc: 'Breaks down rider utilization by zone and shift to guide fleet allocation decisions.' },
  { title: 'Root Cause Tracker', category: 'Operations', tag: 'Process Improvement', status: 'Live', desc: 'A structured framework for logging and resolving recurring delivery exceptions with delivery partners.' },
  { title: 'SQL Learning Log', category: 'Automation', tag: 'SQL', status: 'In Progress', desc: 'Documenting the transition from Excel-based reporting to SQL queries for operational data.' },
];
const categories = ['All', 'BI', 'Automation', 'Operations'];

export default function HomePage() {
  const typedRole = useTypingEffect(ROLES);
  const [activeCategory, setActiveCategory] = useState('All');
  const [copied, setCopied] = useState(false);

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  const copyEmail = () => {
    navigator.clipboard?.writeText('piashm03@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-bronze/25 rounded-full blur-[110px] float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet/25 rounded-full blur-[110px] float-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 grid md:grid-cols-[1.3fr_0.7fr] items-center gap-10 max-w-5xl fade-up text-center md:text-left">
          <div>
            <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-4 select-none">OPERATIONS, IMPROVED THROUGH DATA</p>
            <h1 className="display-font text-4xl sm:text-6xl font-semibold leading-tight text-white">
              I improve operations<br />by <span className="grad-text">analyzing the data.</span>
            </h1>
            <p className="mt-5 text-lg text-neutral-300 h-7">
              {typedRole}<span className="inline-block w-[2px] h-5 bg-violet-300 ml-1 align-middle animate-pulse" />
            </p>
            <p className="mt-4 text-neutral-300 max-w-xl leading-relaxed mx-auto md:mx-0">
              I lead last-mile delivery operations at Al-Dawaa Medical Services — fleets, SLAs, driver
              performance — and I use data analysis as the tool to find what&apos;s broken and fix it. I track
              On-Time Delivery, cost per delivery, and rider utilization, and use SQL, Power BI, and Python
              to turn those numbers into decisions that actually move the metrics.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <a href="/cv.pdf" download className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors">
                <Download size={16} /> Download CV
              </a>
              <a href="#projects" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm hover:border-violet/50 hover:text-violet transition-colors">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm hover:border-bronze/50 hover:text-[#E0985A] transition-colors">
                <Mail size={16} /> Contact Me
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <div className="absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl" style={{ background: 'linear-gradient(135deg, #C77D3D, #8B7CF6)' }} />
              <div className="relative w-full h-full rounded-[2rem] glass overflow-hidden flex items-center justify-center">
                <Image src="/photo.jpg" alt="Mohammad Piash" fill className="object-cover" priority />
              </div>
              <div className="absolute -bottom-3 -right-3 px-3.5 py-1.5 rounded-full bg-white text-black mono-font text-[10px] font-semibold shadow-lg">
                OPEN TO DATA-DRIVEN OPS ROLES
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center relative z-10">
          <SignalPath />
        </div>
        <div className="mt-8 relative z-10 text-center">
          <p className="mono-font text-[10px] tracking-[0.25em] text-neutral-500 mb-3 select-none">WHAT THIS LOOKS LIKE DAY TO DAY</p>
          <ProfessionFlip />
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => {
          const [ref, value] = useCountUp(s.value);
          return (
            <div key={s.label} ref={ref} className="text-center glass rounded-2xl py-8">
              <p className="mono-font text-3xl sm:text-4xl font-semibold text-white">{value}{s.suffix}</p>
              <p className="text-xs text-neutral-400 mt-2 tracking-wide">{s.label}</p>
            </div>
          );
        })}
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-24">
        <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">ABOUT</p>
        <h2 className="display-font text-3xl sm:text-4xl text-white mb-12">Same job, sharper method: operations run on data now.</h2>
        <div className="relative pl-8 border-l border-white/10 space-y-10">
          {timeline.map((t, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] top-1 w-3.5 h-3.5 rounded-full bg-obsidian border-2 border-violet-300" />
              <p className="mono-font text-xs text-violet-300 mb-1">{t.year}</p>
              <h3 className="text-white font-medium text-lg">{t.title}</h3>
              <p className="text-neutral-300 text-sm mt-1 max-w-lg">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
        <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">CAPABILITIES</p>
        <h2 className="display-font text-3xl sm:text-4xl text-white mb-12">Operational depth, analytical range.</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.label} className="rounded-2xl glass p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${group.color}22` }}>
                    <Icon size={18} color={group.color} />
                  </div>
                  <h3 className="text-white font-medium">{group.label}</h3>
                </div>
                <div className="space-y-3">
                  {group.skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs text-neutral-300 mb-1">
                        <span>{s.name}</span><span className="mono-font">{s.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full skill-bar-fill" style={{ width: `${s.level}%`, backgroundColor: group.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
        <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">PROJECTS</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="display-font text-3xl sm:text-4xl text-white">Work that moved real numbers.</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
                  activeCategory === c ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-300 hover:border-white/30'
                }`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div key={p.title} className="rounded-2xl glass p-6 group">
              <div className="flex items-center justify-between mb-3">
                <span className="mono-font text-[10px] px-2 py-1 rounded-full border border-white/10 text-neutral-300">{p.tag}</span>
                <span className={`text-[10px] mono-font ${p.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'}`}>{p.status}</span>
              </div>
              <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                {p.title}
                <ExternalLink size={14} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contact" className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-white/5">
        <Database className="mx-auto mb-4 text-violet-300" size={28} />
        <h2 className="display-font text-2xl sm:text-3xl text-white mb-3">Let&apos;s talk about improving operations with data.</h2>
        <p className="text-neutral-400 text-sm max-w-md mx-auto mb-8">Open to Operations, Data Analyst, and Business Intelligence opportunities.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button onClick={copyEmail} className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-neutral-300 hover:text-white transition-colors">
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />} {copied ? 'Copied' : 'piashm03@gmail.com'}
          </button>
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-neutral-300"><MapPin size={15} /> Al Khobar, Eastern, Saudi Arabia</span>
        </div>
        <div className="flex justify-center gap-5 text-neutral-400">
          <a href="https://www.linkedin.com/in/mohammadpiash" target="_blank" rel="noopener noreferrer"><Linkedin size={18} className="hover:text-white transition-colors" /></a>
          <Github size={18} className="hover:text-white transition-colors" />
        </div>
      </footer>
    </main>
  );
}
