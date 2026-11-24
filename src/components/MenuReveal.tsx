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
  text: string;
  list?: string[];
  image?: string;
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
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' });
      gsap.fromTo(
        '.reveal__media',
        { opacity: 0, y: 30, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
      );
      gsap.fromTo(
        '.parchment-panel',
        { opacity: 0, y: 30, scaleY: 0.85 },
        { opacity: 1, y: 0, scaleY: 1, transformOrigin: '50% 0%', duration: 0.7, delay: 0.1, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.parchment-panel [data-panel-item]',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, delay: 0.3, ease: 'power2.out' },
      );
    },
    { scope: root, dependencies: [item], revertOnUpdate: true },
  );

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
          <div className="reveal__media" style={item.frame ? frameVars(item.frame) : undefined}>
            {item.frame ? (
              <>
                <SafeImage src={frames[item.frame]} alt="" className="reveal__frame" loading="eager" />
                <span className="reveal__opening">
                  <SafeImage src={item.image} alt="" loading="eager" fallback={item.imageFallback} />
                </span>
              </>
            ) : (
              <SafeImage src={item.image} alt="" loading="eager" fallback={item.imageFallback} />
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
