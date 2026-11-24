import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { Guest } from '../data/guests';
import { decor } from '../data/assets';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { CardBack, CardFace } from './TarotCard';
import { OrnamentRule } from './Ornament';
import { SafeImage } from './SafeImage';

export interface CardOrigin {
  /** Centre of the card on the table, in viewport pixels. */
  cx: number;
  cy: number;
  /** Untransformed width of the card on the table. */
  width: number;
  /** Tilt on the table in degrees. */
  rotation: number;
}

interface TarotRevealProps {
  guest: Guest;
  /** Reads the card's current position on the table (it may have scrolled). */
  getOrigin: () => CardOrigin | null;
  onClosed: () => void;
}

export function TarotReveal(props: TarotRevealProps) {
  return createPortal(<RevealOverlay {...props} />, document.body);
}

function RevealOverlay({ guest, getOrigin, onClosed }: TarotRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  useBodyScrollLock(true);

  const offsetsFrom = (o: CardOrigin) => {
    const el = card.current!;
    const r = el.getBoundingClientRect();
    return {
      x: o.cx - (r.left + r.width / 2),
      y: o.cy - (r.top + r.height / 2),
      scale: o.width / el.offsetWidth,
      rotation: o.rotation,
    };
  };

  useGSAP(
    () => {
      const origin = getOrigin();
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({
        onComplete: () => closeBtn.current?.focus({ preventScroll: true }),
      });

      tl.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: reduced ? 0.01 : 0.4 }, 0);

      if (origin && !reduced) {
        const from = offsetsFrom(origin);
        tl.fromTo(
          card.current,
          { ...from, rotateY: 0 },
          { x: 0, y: 0, scale: 1, rotation: 0, rotateY: 180, duration: 1.1, ease: 'power3.inOut' },
          0,
        ).fromTo(
          card.current,
          { z: 0 },
          { z: 120, duration: 0.55, yoyo: true, repeat: 1, ease: 'sine.inOut' },
          0,
        );
      } else {
        tl.set(card.current, { rotateY: 180 }, 0);
      }

      tl.fromTo(
        '.tarot-scroll',
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0.01 : 0.8, ease: 'power2.inOut' },
        reduced ? 0 : 0.85,
      ).fromTo(
        '.tarot-scroll [data-scroll-item]',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.5, stagger: 0.08, ease: 'power2.out' },
        reduced ? 0 : 1.15,
      );
    },
    { scope: root },
  );

  const close = useCallback(() => {
    if (closing.current || !root.current || !card.current) return;
    closing.current = true;
    const origin = getOrigin();
    const reduced = prefersReducedMotion();
    const tl = gsap.timeline({ onComplete: onClosed });
    tl.to(root.current.querySelector('.tarot-scroll'), {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: reduced ? 0.01 : 0.4,
      ease: 'power2.in',
    }, 0);
    if (origin && !reduced) {
      tl.to(card.current, { ...offsetsFrom(origin), rotateY: 360, duration: 0.9, ease: 'power3.inOut' }, 0.2);
    }
    tl.to(root.current, { opacity: 0, duration: reduced ? 0.01 : 0.3 }, reduced ? 0 : 0.85);
  }, [getOrigin, onClosed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <div
      ref={root}
      className="tarot-lift"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tarot-lift-name"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button ref={closeBtn} type="button" className="tarot-lift__close" onClick={close} aria-label="Return the card to the table">
        <X aria-hidden="true" />
      </button>

      <div className="tarot-lift__stage" onClick={(e) => e.target === e.currentTarget && close()}>
        <div ref={card} className="tarot-lift__card">
          <span className="tarot__side tarot__side--back">
            <CardBack eager />
          </span>
          <span className="tarot__side tarot__side--front">
            <CardFace guest={guest} eager />
          </span>
        </div>

        <div className="tarot-scroll">
          <p className="tarot-scroll__name" id="tarot-lift-name" data-scroll-item>
            {guest.name}
          </p>
          <h3 className="tarot-scroll__role" data-scroll-item>
            {guest.role}
          </h3>
          <div data-scroll-item>
            <SafeImage src={decor.dividerMid} className="tarot-scroll__divider" loading="eager" fallback={<OrnamentRule />} />
          </div>
          <p className="tarot-scroll__roast" lang={guest.roastLang} data-scroll-item>
            {guest.roast}
          </p>
        </div>
      </div>
    </div>
  );
}
