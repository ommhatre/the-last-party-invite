import { forwardRef, useId, type CSSProperties } from 'react';
import type { Guest } from '../data/guests';
import { cards } from '../data/assets';
import { SafeImage } from './SafeImage';

/** The printed face: portrait card art with the name on the top ribbon and the title on the bottom plaque. */
export function CardFace({ guest, eager = false }: { guest: Guest; eager?: boolean }) {
  const arcId = 'arc' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <span className="card-face">
      <SafeImage
        src={guest.card}
        alt={`${guest.name}'s tarot card`}
        className="card-face__art"
        loading={eager ? 'eager' : 'lazy'}
        fallback={<span className="card-face__fallback" />}
      />
      <svg className="card-face__ribbon" viewBox="0 0 640 960" aria-hidden="true">
        <defs>
          {/* follows the arch of the ribbon printed on the card art (640 x 960) */}
          <path id={arcId} d="M 160 162 Q 320 112 480 162" />
        </defs>
        <text className="card-face__name">
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {guest.name.toUpperCase()}
          </textPath>
        </text>
        <PlaqueTitle text={guest.role} />
      </svg>
    </span>
  );
}

/** Plaque on the card art: centred on y = 840, about 230 units of usable width. */
const PLAQUE = { cx: 320, cy: 840, width: 230, maxSize: 26, minSize: 15 };
/** Approximate advance of a Cinzel bold capital (incl. letter-spacing), in em. */
const CAP_ADVANCE = 0.8;

/** Title on the bottom plaque: shrinks to fit, wraps onto two lines if it is long. */
function PlaqueTitle({ text }: { text: string }) {
  const upper = text.toUpperCase();
  const fit = (s: string) => PLAQUE.width / (Math.max(s.length, 1) * CAP_ADVANCE);

  let lines = [upper];
  if (fit(upper) < PLAQUE.minSize && upper.includes(' ')) {
    const words = upper.split(' ');
    let best = 1;
    let bestLongest = Infinity;
    for (let i = 1; i < words.length; i++) {
      const longest = Math.max(words.slice(0, i).join(' ').length, words.slice(i).join(' ').length);
      if (longest < bestLongest) {
        bestLongest = longest;
        best = i;
      }
    }
    lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')];
  }

  const size = Math.max(
    PLAQUE.minSize,
    Math.min(PLAQUE.maxSize, ...lines.map(fit), lines.length > 1 ? 21 : PLAQUE.maxSize),
  );
  const lineGap = size * 1.15;
  // Cinzel capitals are ~0.7em tall: shift each baseline down by half of that to centre the ink.
  const firstBaseline = PLAQUE.cy - ((lines.length - 1) * lineGap) / 2 + size * 0.35;

  return (
    <text className="card-face__role" fontSize={size} textAnchor="middle">
      {lines.map((line, i) => (
        <tspan key={i} x={PLAQUE.cx} y={firstBaseline + i * lineGap}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function CardBack({ eager = false }: { eager?: boolean }) {
  return (
    <span className="card-back">
      <SafeImage
        src={cards.back}
        alt=""
        className="card-back__art"
        loading={eager ? 'eager' : 'lazy'}
        fallback={<span className="card-back__fallback" />}
      />
    </span>
  );
}

export interface CardSpot {
  /** Centre of the card, % of table width. */
  x: number;
  /** Centre of the card, % of table height. */
  y: number;
  /** Tilt in degrees. */
  r: number;
}

interface TarotCardProps {
  guest: Guest;
  index: number;
  spot: CardSpot;
  lifted: boolean;
  onSelect: (id: string) => void;
}

/** A face-down card lying on the table. Rotation lives on the inner tilt so GSAP can own the outer transform. */
export const TarotCard = forwardRef<HTMLButtonElement, TarotCardProps>(function TarotCard(
  { guest, index, spot, lifted, onSelect },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`tarot ${lifted ? 'is-lifted' : ''}`}
      style={{ '--x': `${spot.x}%`, '--y': `${spot.y}%`, '--r': `${spot.r}deg`, '--i': index } as CSSProperties}
      onClick={() => onSelect(guest.id)}
      aria-haspopup="dialog"
      aria-label={`Turn over card ${index + 1}`}
      data-card-id={guest.id}
    >
      <span className="tarot__tilt">
        <span className="tarot__side tarot__side--back">
          <CardBack />
        </span>
      </span>
    </button>
  );
});
