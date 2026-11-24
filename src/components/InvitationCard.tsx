import { useRef, type CSSProperties } from 'react';
import { ChevronRight } from 'lucide-react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { decor, seals } from '../data/assets';
import { honoreeLine, invitationDetails, siteConfig } from '../data/siteConfig';
import { SafeImage } from './SafeImage';
import { OrnamentRule, WaxSealFallback } from './Ornament';
interface InvitationCardProps {
  onEnter: () => void;
}

export function InvitationCard({ onEnter }: InvitationCardProps) {
  const root = useRef<HTMLDivElement>(null);
  const enterBtn = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const focusEnter = () => enterBtn.current?.querySelector<HTMLElement>('.invite__enter')?.focus({ preventScroll: true });

      if (prefersReducedMotion()) {
        gsap.set('.invite__cover', { display: 'none' });
        focusEnter();
        return;
      }

      gsap
        .timeline({ onComplete: focusEnter })
        .fromTo(
          '.invite',
          { yPercent: 120, rotateX: 18, rotateZ: -2 },
          { yPercent: 0, rotateX: 0, rotateZ: 0, duration: 1.5, ease: 'back.out(0.9)' },
        )
        .to('.invite__cover-seal', { scale: 0.92, duration: 0.25, ease: 'power2.in' }, '+=0.15')
        .to('.invite__cover', { rotateX: 180, duration: 1.3, ease: 'power3.inOut' })
        .set('.invite__cover', { display: 'none' })
        .fromTo(
          '[data-invite-item]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power2.out' },
          '-=0.75',
        );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="invite-stage">
      <article className="invite" aria-labelledby="invite-title">
        <div className="invite__paper parchment-art" style={{ '--parchment': `url("${decor.parchmentVertical}")` } as CSSProperties}>
          <p className="invite__eyebrow" data-invite-item>
            {siteConfig.invitation.eyebrow}
          </p>
          <h1 id="invite-title" className="invite__summons" data-invite-item>
            <span className="invite__summons-text">{siteConfig.invitation.summons}</span>
            <span className="invite__party">{siteConfig.partyName}</span>
            <span className="invite__summons-text">{siteConfig.invitation.occasion}</span>
            <span className="invite__honoree">{honoreeLine()}</span>
          </h1>

          <div data-invite-item>
            <SafeImage src={decor.dividerTop} className="invite__divider" loading="eager" fallback={<OrnamentRule />} />
          </div>

          <dl className="invite__details">
            {invitationDetails().map((d) => (
              <div
                className={`invite__detail ${d.half ? 'invite__detail--half' : ''} ${d.prose ? 'invite__detail--prose' : ''}`}
                key={d.label}
                data-invite-item
              >
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="invite__actions" ref={enterBtn} data-invite-item>
            <button type="button" className="invite__enter" onClick={onEnter}>
              <span className="invite__enter-shine" aria-hidden="true" />
              <span className="invite__enter-label">{siteConfig.invitation.enterLabel}</span>
              <ChevronRight aria-hidden="true" className="invite__enter-icon invite__enter-arrow" />
            </button>
          </div>
        </div>

        <div className="invite__cover" aria-hidden="true">
          <SafeImage src={decor.crown} className="invite__cover-crown" loading="eager" />
          <span className="invite__cover-seal">
            <SafeImage src={seals.waxEmblem} alt="" loading="eager" fallback={<WaxSealFallback />} />
          </span>
          <span className="invite__cover-label">{siteConfig.invitation.eyebrow}</span>
          <SafeImage src={decor.dividerMid} className="invite__divider" loading="eager" />
        </div>
      </article>
    </div>
  );
}
