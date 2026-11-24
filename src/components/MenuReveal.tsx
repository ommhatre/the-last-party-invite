import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { frameVars } from '../lib/frames';
import { decor, frames, type FrameKey } from '../data/assets';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { OrnamentRule } from './Ornament';
import { SafeImage } from './SafeImage';

export interface RevealItem {
  kicker: string;
  title: string;
  /** Optional royal epithet shown beneath the title. */
  subtitle?: string;
  text: string;
  list?: string[];
  image?: string;
  /** 'cover' fills the ornate frame window edge-to-edge (used for studio dish photos). */
  imageFit?: 'contain' | 'cover';
  /** Optional closed cloche cover that lifts away to unveil the dish. */
  coverImage?: string;
  imageFallback?: ReactNode;
  /** Ornate frame the image is presented in. */
  frame?: FrameKey;
}

interface MenuRevealProps {
  item: RevealItem | null;
  onClose: () => void;
}

/** Parchment details dialog shared by drinks and dishes. */
export function MenuReveal({ item, onClose }: MenuRevealProps) {
  if (!item) return null;
  return createPortal(<RevealDialog item={item} onClose={onClose} />, document.body);
}

function RevealDialog({ item, onClose }: { item: RevealItem; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previous?.focus({ preventScroll: true });
    };
  }, [onClose]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.38, ease: 'power1.out' });
      gsap.fromTo(
        '.reveal__media',
        { opacity: 0, y: 28, scale: 0.86 },
        { opacity: 1, y: 0, scale: 1, duration: 0.68, ease: 'back.out(1.35)' },
      );
      if (item.coverImage) {
        gsap.fromTo(
          '.reveal__cloche',
          { opacity: 1, y: 8, rotate: 0, scale: 1 },
          {
            opacity: 0,
            y: -76,
            rotate: -7,
            scale: 1.08,
             duration: 0.85,
            delay: 0.18,
            ease: 'power3.inOut',
          },
        );
      }
      gsap.fromTo(
        '.parchment-panel',
        { opacity: 0, y: 28, scaleY: 0.86 },
        { opacity: 1, y: 0, scaleY: 1, transformOrigin: '50% 0%', duration: 0.68, delay: 0.1, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.parchment-panel [data-panel-item]',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.065, delay: 0.28, ease: 'power2.out' },
      );
    },
    { scope: root, dependencies: [item], revertOnUpdate: true },
  );

  const isCover = item.imageFit === 'cover';

  return (
    <div
      ref={root}
      className="reveal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="reveal" role="dialog" aria-modal="true" aria-labelledby="reveal-title">
        {item.image && (
          <div
            className={`reveal__media ${isCover ? 'reveal__media--dish' : ''}`}
            style={item.frame ? frameVars(item.frame) : undefined}
          >
            {item.frame ? (
              <>
                <SafeImage src={frames[item.frame]} alt="" className="reveal__frame" loading="eager" />
                <span className={`reveal__opening ${isCover ? 'reveal__opening--cover' : ''}`}>
                  <SafeImage src={item.image} alt="" loading="eager" fallback={item.imageFallback} />
                </span>
              </>
            ) : (
              <SafeImage src={item.image} alt="" loading="eager" fallback={item.imageFallback} />
            )}

            {item.coverImage && (
              <span className="reveal__cloche" aria-hidden="true">
                <SafeImage src={item.coverImage} alt="" loading="eager" />
              </span>
            )}
          </div>
        )}

        <div className="parchment-panel">
          <button ref={closeBtn} type="button" className="parchment-panel__close" onClick={onClose} aria-label="Close">
            <X aria-hidden="true" size={18} />
          </button>
          <p className="parchment-panel__kicker" data-panel-item>
            {item.kicker}
          </p>
          <h3 id="reveal-title" className="parchment-panel__title" data-panel-item>
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="parchment-panel__subtitle" data-panel-item>
              {item.subtitle}
            </p>
          )}
          <div data-panel-item>
            <SafeImage src={decor.dividerMid} className="parchment-panel__divider" loading="eager" fallback={<OrnamentRule />} />
          </div>
          <p className="parchment-panel__text" data-panel-item>
            {item.text}
          </p>
          {item.list && item.list.length > 0 && (
            <ul className="parchment-panel__list" data-panel-item aria-label="Ingredients">
              {item.list.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
