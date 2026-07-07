'use client';

import { useState } from 'react';
import { Play, Zap, Code2 } from 'lucide-react';

function EmbeddedAppDemo() {
  const embedUrl = ''; // paste your Streamlit / Power BI / Hugging Face Space URL here

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={16} className="text-violet" />
        <h3 className="text-white font-medium">Embedded App</h3>
        <span className="mono-font text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-neutral-400 ml-auto">iframe</span>
      </div>
      <p className="text-neutral-400 text-sm mb-4">
        For tools with their own runtime — a Streamlit dashboard, a Power BI report, or a Hugging Face Space.
        Host it externally, then paste the URL into the project&apos;s <code className="mono-font text-xs">embedUrl</code> field in Sanity.
      </p>
      {embedUrl ? (
        <iframe src={embedUrl} className="w-full h-96 rounded-xl border border-white/10" title="Embedded tool" />
      ) : (
        <div className="w-full h-56 rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center text-center px-6">
          <p className="text-neutral-400 text-sm mb-3">No embed URL set yet — this is where your tool will render.</p>
          <span className="mono-font text-[11px] text-neutral-400">e.g. https://your-tool.streamlit.app</span>
        </div>
      )}
    </div>
  );
}

function ApiBackedToolDemo() {
  const [rows, setRows] = useState(500);
  const [lateRate, setLateRate] = useState(6);
  const [result, setResult] = useState<{ projectedBreaches: number; riskLevel: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const runTool = async () => {
    setLoading(true);
    // Real version: await fetch('/api/tools/sla-risk', { method: 'POST', body: JSON.stringify({ rows, lateRate }) })
    await new Promise((r) => setTimeout(r, 500));
    const projectedBreaches = Math.round((rows * lateRate) / 100);
    const riskLevel = lateRate > 8 ? 'High' : lateRate > 4 ? 'Moderate' : 'Low';
    setResult({ projectedBreaches, riskLevel });
    setLoading(false);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Code2 size={16} className="text-bronze" />
        <h3 className="text-white font-medium">API-backed Tool</h3>
        <span className="mono-font text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-neutral-400 ml-auto">/api/tools</span>
      </div>
      <p className="text-neutral-400 text-sm mb-5">
        Example: an SLA Risk Predictor. Swap the mock logic for your real calculation in <code className="mono-font text-xs">app/api/tools/sla-risk/route.ts</code>.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-xs text-neutral-400 block mb-1.5">Daily deliveries</label>
          <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet/50" />
        </div>
        <div>
          <label className="text-xs text-neutral-400 block mb-1.5">Current late rate (%)</label>
          <input type="number" value={lateRate} onChange={(e) => setLateRate(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-violet/50" />
        </div>
      </div>
      <button onClick={runTool} disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50">
        <Play size={14} /> {loading ? 'Calculating…' : 'Run prediction'}
      </button>
      {result && (
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="mono-font text-2xl text-white">{result.projectedBreaches}</p>
            <p className="text-xs text-neutral-400 mt-1">Projected breaches / day</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <p className={`mono-font text-2xl ${result.riskLevel === 'High' ? 'text-red-400' : result.riskLevel === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {result.riskLevel}
            </p>
            <p className="text-xs text-neutral-400 mt-1">Risk level</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <p className="mono-font text-xs tracking-[0.3em] text-bronze mb-3">TOOLS</p>
        <h1 className="display-font text-3xl sm:text-4xl text-white mb-3">Two patterns, one project schema.</h1>
        <p className="text-neutral-400 mb-10 max-w-xl">
          This page is the template every future data/automation tool follows. Publish a new project in Sanity,
          set its tool type, and it slots in without touching code.
        </p>
        <div className="space-y-6">
          <EmbeddedAppDemo />
          <ApiBackedToolDemo />
        </div>
      </div>
    </main>
  );
}
