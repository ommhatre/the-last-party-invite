import { useId } from 'react';

const useSvgId = () => 'g' + useId().replace(/[^a-zA-Z0-9_-]/g, '');

interface ClassProps {
  className?: string;
}

/** Small laurel/diamond flourish used in separators. */
export function Flourish({ className }: ClassProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 L15 12 L12 22 L9 12 Z" fill="currentColor" opacity="0.9" />
      <path d="M2 12 L12 9.5 L22 12 L12 14.5 Z" fill="currentColor" opacity="0.55" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function OrnamentRule({ className = '' }: ClassProps) {
  return (
    <div className={`ornament-rule ${className}`} aria-hidden="true">
      <Flourish />
    </div>
  );
}

type CornerPos = 'tl' | 'tr' | 'bl' | 'br';

/** Baroque filigree corner. Rendered top-left; mirrored via CSS for other corners. */
export function Corner({ pos }: { pos: CornerPos }) {
  return (
    <svg className={`corner corner--${pos}`} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M2 46 V8 Q2 2 8 2 H46" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 46 V12 Q7 7 12 7 H46" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
      <path
        d="M12 12 C18 12 22 16 22 22 C16 22 12 18 12 12 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="26" cy="26" r="1.6" fill="currentColor" />
      <path d="M22 12 Q30 13 34 7" stroke="currentColor" strokeWidth="0.8" />
      <path d="M12 22 Q13 30 7 34" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function Corners() {
  return (
    <>
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
    </>
  );
}

/** CSS-style wax seal fallback (SVG). */
export function WaxSealFallback({ className = '' }: ClassProps) {
  const id = useSvgId();
  return (
    <svg className={`wax-seal-fallback ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#8e2234" />
          <stop offset="0.6" stopColor="#5a1024" />
          <stop offset="1" stopColor="#300810" />
        </radialGradient>
      </defs>
      <path
        d="M50 4 C60 6 64 2 72 8 C80 14 88 14 92 24 C96 34 98 40 96 50 C94 60 98 66 92 76 C86 86 80 86 72 92 C62 98 58 94 50 96 C40 98 36 98 28 92 C20 86 12 86 8 76 C4 66 4 60 4 50 C4 40 2 34 8 24 C14 14 20 12 28 8 C36 4 40 2 50 4 Z"
        fill={`url(#${id})`}
      />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#21070e" strokeWidth="2.5" opacity="0.6" />
      <circle cx="50" cy="50" r="27" fill="none" stroke="#a83a4c" strokeWidth="1" opacity="0.6" />
      <path d="M33 60 L31 40 L41 49 L50 34 L59 49 L69 40 L67 60 Z" fill="#c4a15a" opacity="0.9" />
      <rect x="33" y="62" width="34" height="4" fill="#c4a15a" opacity="0.9" />
    </svg>
  );
}
