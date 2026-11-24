import { useCallback, useRef, useState, type MouseEvent } from 'react';
import { Check, Crown } from 'lucide-react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { drinks } from '../data/assets';
import { GoldButton } from './GoldButton';
import { SafeImage } from './SafeImage';

interface RsvpButtonProps {
  label: string;
  confirmedLabel: string;
  confirmedNote: string;
  /** WhatsApp link; opened alongside the celebration when a number is configured. */
  link: string | null;
}

const PIECES = ['diamond', 'dot', 'star', 'leaf'] as const;
const PIECE_COUNT = 44;

/** "I Shall Attend": a toast of goblets and a burst of gold, then the button turns to gold. */
export function RsvpButton({ label, confirmedLabel, confirmedNote, link }: RsvpButtonProps) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useGSAP(() => () => timeline.current?.kill(), { scope: root });

  const celebrate = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (link) window.open(link, '_blank', 'noopener,noreferrer');
      setConfirmed(true);
      const scope = e.currentTarget.closest<HTMLElement>('.rsvp');
      if (prefersReducedMotion() || !scope) return;

      const q = (sel: string) => scope.querySelectorAll<HTMLElement>(sel);
      const burst = q('.rsvp__burst')[0];
      const pieces = Array.from({ length: PIECE_COUNT }, (_, i) => {
        const el = document.createElement('span');
        el.className = `rsvp__piece rsvp__piece--${PIECES[i % PIECES.length]}`;
        burst.appendChild(el);
        return el;
      });

      timeline.current?.progress(1);
      const tl = gsap.timeline({ onComplete: () => pieces.forEach((p) => p.remove()) });
      timeline.current = tl;
      tl.fromTo(e.currentTarget, { scale: 0.9 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.45)' }, 0)
        .fromTo(q('.rsvp__flash'), { scale: 0.2, opacity: 1 }, { scale: 2.8, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0)
        .fromTo(q('.rsvp__ring'), { scale: 0.3, opacity: 0.9 }, { scale: 3.4, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out' }, 0)
        .fromTo(q('.rsvp__crown'), { y: 0, scale: 0.4, opacity: 0 }, { y: -78, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, 0.1)
        .to(q('.rsvp__crown'), { y: -104, opacity: 0, duration: 0.6, ease: 'power1.in' }, 1.2)
        .to(q('.rsvp__goblet--l'), { x: 24, y: -30, rotation: 30, duration: 0.45, ease: 'power2.out' }, 0)
        .to(q('.rsvp__goblet--r'), { x: -24, y: -30, rotation: -30, duration: 0.45, ease: 'power2.out' }, 0)
        .to(q('.rsvp__goblet'), { y: -48, opacity: 0, duration: 0.45, ease: 'power1.in' }, 0.75);

      pieces.forEach((p) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 70 + Math.random() * 120;
        tl.fromTo(
          p,
          { x: 0, y: 0, scale: 0, rotation: 0, opacity: 1 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist * 0.75 - 24,
            scale: 0.6 + Math.random() * 0.9,
            rotation: Math.random() * 360 - 180,
            duration: 0.8 + Math.random() * 0.5,
            ease: 'power3.out',
          },
          Math.random() * 0.12,
        ).to(p, { y: `+=${40 + Math.random() * 60}`, opacity: 0, duration: 0.9 + Math.random() * 0.5, ease: 'power1.in' }, '>-0.3');
      });
    },
    [link],
  );

  return (
    <div ref={root} className="rsvp">
      <div className="rsvp__toast">
        <SafeImage src={drinks.glassGoblet} className="rsvp__goblet rsvp__goblet--l" alt="" />
        <GoldButton size="lg" className={`rsvp__btn ${confirmed ? 'is-confirmed' : ''}`} onClick={celebrate}>
          {confirmed ? <Check aria-hidden="true" /> : <Crown aria-hidden="true" />}
          {confirmed ? confirmedLabel : label}
        </GoldButton>
        <SafeImage src={drinks.glassGoblet} className="rsvp__goblet rsvp__goblet--r" alt="" />

        <span className="rsvp__fx" aria-hidden="true">
          <span className="rsvp__flash" />
          <span className="rsvp__ring" />
          <span className="rsvp__ring" />
          <Crown className="rsvp__crown" />
          <span className="rsvp__burst" />
        </span>
      </div>
      <p className="rsvp__note" role="status">
        {confirmed ? confirmedNote : ''}
      </p>
    </div>
  );
}
