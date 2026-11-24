import { useRef, useState, type CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { decor, props, scenes } from '../data/assets';
import { siteConfig } from '../data/siteConfig';
import { SafeImage } from './SafeImage';
import { DustParticles } from './DustParticles';
import { InvitationCard } from './InvitationCard';
import '../styles/entrance.css';

type Phase = 'idle' | 'opening' | 'card';

interface DoorEntranceProps {
  /** Fires once the doors are fully open (scrolling can be unlocked). */
  onOpened: () => void;
  /** "Enter the Court" pressed on the invitation card. */
  onEnter: () => void;
}

export function DoorEntrance({ onOpened, onEnter }: DoorEntranceProps) {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const { contextSafe } = useGSAP({ scope: root });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo('.entrance__stage', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' });
      gsap.fromTo(
        '.entrance__text > *',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.18, delay: 0.8, ease: 'power2.out' },
      );
    },
    { scope: root },
  );

  const openDoors = contextSafe(() => {
    if (phase !== 'idle') return;
    setPhase('opening');

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        setPhase('card');
        onOpened();
      },
    });

    tl.to('.entrance__text', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' })
      .to('.entrance__glint', { opacity: 1, scale: 1.4, duration: 0.3, ease: 'power2.out' }, '-=0.3')
      .to('[data-door="left"]', { rotateY: 4, duration: 0.14, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '<')
      .to('[data-door="right"]', { rotateY: -4, duration: 0.14, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '<')
      .to('.entrance__glint', { opacity: 0, scale: 1, duration: 0.4 })
      .to('.entrance__gap', { opacity: 1, scaleY: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
      .addLabel('open')
      .to('[data-door="left"]', { rotateY: 104, duration: 2.6 }, 'open')
      .to('[data-door="right"]', { rotateY: -104, duration: 2.6 }, 'open')
      .to('.entrance__gap', { opacity: 0, duration: 0.8 }, 'open+=0.4')
      .to('.entrance__light', { opacity: 1, scale: 1.3, duration: 1.4, ease: 'power1.out' }, 'open+=0.2')
      .to('.entrance__light', { opacity: 0.45, duration: 1.4, ease: 'power1.inOut' }, 'open+=1.6')
      .to('.entrance__stage', { scale: 1.12, duration: 3, ease: 'power1.inOut' }, 'open')
      .to('.entrance__flood', { opacity: 1, duration: 1.4, ease: 'power1.in' }, 'open+=1.6');

    if (prefersReducedMotion()) tl.timeScale(8);
  });

  return (
    <section id="entrance" ref={root} className={`entrance entrance--${phase}`} aria-label="The Imperial Court entrance">
      <div className="entrance__backdrop" aria-hidden="true">
        <SafeImage src={scenes.palaceDoors} loading="eager" />
      </div>

      <button
        type="button"
        className="entrance__trigger"
        onClick={openDoors}
        disabled={phase !== 'idle'}
        aria-label={`${siteConfig.entrance.eyebrow} ${siteConfig.entrance.title}. ${siteConfig.entrance.prompt}`}
      >
        <span
          className="entrance__stage"
          aria-hidden="true"
          style={{ '--door-img': `url("${scenes.palaceDoors}")` } as CSSProperties}
        >
          <SafeImage src={scenes.palaceDoors} className="entrance__scene" loading="eager" fetchPriority="high" />
          <span className="entrance__doorway">
            <span className="entrance__beyond">
              <SafeImage src={scenes.imperialThrone} loading="eager" />
            </span>
            <span className="entrance__light" />
            <span className="entrance__gap" />
            <span className="door door--left" data-door="left" />
            <span className="door door--right" data-door="right" />
          </span>
          <span className="entrance__glint entrance__glint--l" />
          <span className="entrance__glint entrance__glint--r" />
        </span>

        <span className="entrance__text">
          <span className="entrance__eyebrow">{siteConfig.entrance.eyebrow}</span>
          <span className="entrance__title">{siteConfig.entrance.title}</span>
          <SafeImage src={decor.dividerMid} className="entrance__divider" loading="eager" />
          <span className="entrance__prompt">
            <SafeImage src={props.ornateKey} className="entrance__key" loading="eager" />
            {siteConfig.entrance.prompt}
          </span>
        </span>
      </button>

      <DustParticles count={26} />
      <span className="entrance__flood" aria-hidden="true" />

      {phase === 'card' && (
        <>
          <InvitationCard onEnter={onEnter} />
          <span className="entrance__scroll-cue" aria-hidden="true">
            <ChevronDown />
          </span>
        </>
      )}
    </section>
  );
}
