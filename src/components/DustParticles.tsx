import { useMemo, type CSSProperties } from 'react';

interface DustParticlesProps {
  count?: number;
  className?: string;
}

/** Lightweight CSS-only floating dust motes. Deterministic so renders are stable. */
export function DustParticles({ count = 28, className = '' }: DustParticlesProps) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin((i + 1) * n) * 10000;
          return x - Math.floor(x);
        };
        return {
          left: `${r(12.9898) * 100}%`,
          top: `${60 + r(78.233) * 50}%`,
          size: 1 + r(39.425) * 2.6,
          duration: 14 + r(93.989) * 18,
          delay: -r(17.17) * 30,
          dx: `${(r(5.5) - 0.5) * 120}px`,
          opacity: 0.25 + r(2.71) * 0.55,
        };
      }),
    [count],
  );

  return (
    <div className={`dust ${className}`} aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="dust__mote"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              '--dust-dx': m.dx,
              '--dust-o': m.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
