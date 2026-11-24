import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export function ScrollProgress({ visible }: { visible: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.scroll-progress__fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="scroll-progress" style={{ opacity: visible ? 1 : 0 }} aria-hidden="true">
      <span className="scroll-progress__track" />
      <span className="scroll-progress__fill" />
      <span className="scroll-progress__cap scroll-progress__cap--top" />
      <span className="scroll-progress__cap scroll-progress__cap--bottom" />
    </div>
  );
}
