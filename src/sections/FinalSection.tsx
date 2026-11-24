import { useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import { MOTION_OK, revealSection } from '../lib/reveal';
import { useIntro } from '../lib/intro';
import { decor, props, scenes, seals } from '../data/assets';
import { rsvpLink, siteConfig } from '../data/siteConfig';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { Countdown } from '../components/Countdown';
import { RsvpButton } from '../components/RsvpButton';
import { DustParticles } from '../components/DustParticles';
import { Corners, OrnamentRule, WaxSealFallback } from '../components/Ornament';

export function FinalSection() {
  const root = useRef<HTMLElement>(null);
  const { entered, replayIntro } = useIntro();
  const f = siteConfig.final;

  useGSAP(
    () => {
      if (!entered || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealSection(root.current!);
        gsap.fromTo(
          '.final__crown',
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.final__crown', start: 'top 88%' },
          },
        );
        gsap.fromTo(
          '.final__line',
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.35,
            ease: 'power3.out',
            clearProps: 'filter',
            scrollTrigger: { trigger: '.final__message', start: 'top 82%' },
          },
        );
        gsap.fromTo(
          '.final__rsvp',
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.final__rsvp', start: 'top 92%' },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [entered] },
  );

  return (
    <section id="final" ref={root} className="section final" aria-labelledby="final-title">
      <div className="bg-layer final__bg" aria-hidden="true">
        <SafeImage src={scenes.grandEntrance} />
      </div>
      <div className="bg-veil final__veil" aria-hidden="true" />
      <DustParticles count={16} className="final__dust" />

      <div className="section__inner">
        <SectionHeading id="final-title" eyebrow={f.eyebrow} title={f.title} />

        <div data-reveal="fade">
          <Countdown target={siteConfig.countdownTarget} placeholder={f.countdownPlaceholder} elapsedText={f.countdownElapsed} />
        </div>

        <div className="final__card">
          <Corners />
          <SafeImage src={props.crownCushion} className="final__crown" alt="" />

          <div className="final__message">
            {f.messageLines.map((line, i) => (
              <p key={i} className={`final__line ${i === f.messageLines.length - 1 ? 'final__line--last' : ''}`}>
                {line}
              </p>
            ))}
          </div>

          <SafeImage src={decor.dividerMid} className="final__card-divider" alt="" fallback={<OrnamentRule />} />

          <div className="final__rsvp">
            <RsvpButton
              label={f.rsvpLabel}
              confirmedLabel={f.rsvpConfirmedLabel}
              confirmedNote={f.rsvpConfirmedNote}
              link={rsvpLink()}
            />
          </div>
        </div>
      </div>

      <footer className="final__footer">
        <SafeImage src={decor.dividerBottom} className="final__divider" fallback={<OrnamentRule />} />
        <span className="final__seal">
          <SafeImage src={seals.crownLarge} alt="" fallback={<WaxSealFallback />} />
        </span>
        <p className="final__footer-text">{f.footer}</p>
        <button type="button" className="final__replay" onClick={replayIntro}>
          <RotateCcw aria-hidden="true" />
          Replay the opening ceremony
        </button>
      </footer>
    </section>
  );
}
