'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message should be a bit longer';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full px-3.5 py-2.5 rounded-lg text-sm text-fg bg-glass border outline-none font-body ${
      hasError ? 'border-red-400' : 'border-hairline focus:border-violet/50'
    }`;

  return (
    <form onSubmit={handleSubmit} className="text-left max-w-md mx-auto mb-10 glass rounded-2xl p-7">
      <div className="mb-3.5">
        <label className="block text-xs text-fg-muted mb-1.5">Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name" className={inputClass(errors.name)} />
        {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
      </div>
      <div className="mb-3.5">
        <label className="block text-xs text-fg-muted mb-1.5">Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com" className={inputClass(errors.email)} />
        {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4.5">
        <label className="block text-xs text-fg-muted mb-1.5">Message</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What would you like to talk about?" rows={4} className={`${inputClass(errors.message)} resize-y`} />
        {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
      </div>
      <button type="submit" disabled={status === 'sending'}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium text-sm transition-colors ${
          status === 'sent' ? 'bg-emerald-400 text-btn-primary-fg' : 'bg-btn-primary text-btn-primary-fg hover:opacity-90'
        } disabled:opacity-70`}>
        {status === 'sent' ? <><Check size={15} /> Message Sent</> : status === 'sending' ? 'Sending…' : <><Send size={15} /> Send Message</>}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs mt-3 text-center">Something went wrong — please email me directly instead.</p>}
    </form>
  );
}
