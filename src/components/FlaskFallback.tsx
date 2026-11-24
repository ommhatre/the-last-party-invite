import { useId } from 'react';

/** Elegant SVG flask used when a drink image is missing. */
export function FlaskFallback({ tint, variant = 0 }: { tint: string; variant?: number }) {
  const id = 'f' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const bodies = [
    'M40 8 H60 V34 C80 42 88 60 88 80 C88 104 70 120 50 120 C30 120 12 104 12 80 C12 60 20 42 40 34 Z',
    'M42 8 H58 V40 L80 70 V112 Q80 120 72 120 H28 Q20 120 20 112 V70 L42 40 Z',
    'M43 8 H57 V30 C72 34 78 48 78 64 V108 Q78 120 66 120 H34 Q22 120 22 108 V64 C22 48 28 34 43 30 Z',
    'M41 8 H59 V36 L86 104 Q90 120 74 120 H26 Q10 120 14 104 L41 36 Z',
  ];
  const d = bodies[variant % bodies.length];
  return (
    <svg className="potion__fallback" viewBox="0 0 100 130" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint} stopOpacity="0.75" />
          <stop offset="1" stopColor={tint} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={d} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="62" width="100" height="70" fill={`url(#${id}-liq)`} />
        <ellipse cx="50" cy="62" rx="50" ry="3" fill="#fff" opacity="0.18" />
        <circle cx="38" cy="90" r="2.2" fill="#fff" opacity="0.35" />
        <circle cx="58" cy="100" r="1.5" fill="#fff" opacity="0.3" />
        <circle cx="48" cy="78" r="1.2" fill="#fff" opacity="0.3" />
      </g>
      <path d={d} fill={`url(#${id}-glass)`} stroke="#c4a15a" strokeWidth="1.6" />
      <rect x="37" y="2" width="26" height="9" rx="2" fill="#7d5e27" stroke="#d6bd85" strokeWidth="1" />
      <rect x="40" y="14" width="20" height="2" fill="#c4a15a" opacity="0.8" />
      <path d="M30 70 Q28 90 34 104" stroke="#fff" strokeWidth="2" opacity="0.25" fill="none" strokeLinecap="round" />
    </svg>
  );
}
