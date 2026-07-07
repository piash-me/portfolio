'use client';

// Ambient background animation: a rising/falling bar chart, a self-drawing
// line graph, a scatter of pulsing dots, and a rotating 3D wireframe cube.
// Sits fixed in the side gutters on wide screens for the entire scroll —
// decorative, low-opacity, and disabled under reduced-motion.

const BARS = [40, 65, 30, 80, 50, 70, 35];

function DataCube3D() {
  return (
    <div className="mt-6 mx-auto" style={{ perspective: 500, width: 60, height: 60 }}>
      <div className="chart3d-spin" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
        {[0, 90, 180, 270].map((deg) => (
          <div key={deg} className="absolute inset-0 border border-violet" style={{ background: 'rgba(139,124,246,0.05)', transform: `rotateY(${deg}deg) translateZ(30px)` }} />
        ))}
        <div className="absolute inset-0 border border-bronze" style={{ background: 'rgba(199,125,61,0.05)', transform: 'rotateX(90deg) translateZ(30px)' }} />
        <div className="absolute inset-0 border border-bronze" style={{ background: 'rgba(199,125,61,0.05)', transform: 'rotateX(-90deg) translateZ(30px)' }} />
      </div>
    </div>
  );
}

export default function DataPulse({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <div
      className={`data-pulse-wrap hidden xl:flex fixed top-0 ${side === 'left' ? 'left-4' : 'right-4'} h-screen w-[150px] flex-col items-center justify-center pointer-events-none z-[1] opacity-[0.16]`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 800" style={{ width: '80%', height: '85%', overflow: 'visible' }}>
        <defs>
          <linearGradient id={`dp-grad-${side}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C77D3D" />
            <stop offset="100%" stopColor="#8B7CF6" />
          </linearGradient>
        </defs>
        <g transform="translate(10, 120)">
          {BARS.map((h, i) => (
            <rect key={i} x={i * 14} y={90 - h} width="8" height={h} rx="2" fill={`url(#dp-grad-${side})`}
              className="dp-bar" style={{ animationDelay: `${i * 0.25}s` }} />
          ))}
        </g>
        <g transform="translate(10, 320)">
          <polyline points="0,60 15,40 30,55 45,20 60,35 75,10 90,25" fill="none" stroke={`url(#dp-grad-${side})`}
            strokeWidth="2" strokeLinecap="round" className="dp-line" />
          {[0, 15, 30, 45, 60, 75, 90].map((x, i) => {
            const ys = [60, 40, 55, 20, 35, 10, 25];
            return <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="#8B7CF6" className="dp-dot" style={{ animationDelay: `${i * 0.3}s` }} />;
          })}
        </g>
        <g transform="translate(20, 520)">
          {Array.from({ length: 10 }).map((_, i) => (
            <circle key={i} cx={(i % 3) * 30} cy={Math.floor(i / 3) * 30} r="2" fill="#C77D3D"
              className="dp-float" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </g>
      </svg>
      <DataCube3D />
    </div>
  );
}
