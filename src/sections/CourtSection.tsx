import { useCallback, useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { MOTION_OK, revealSection } from '../lib/reveal';
import { useIntro } from '../lib/intro';
import { decor, scenes } from '../data/assets';
import { guests } from '../data/guests';
import { siteConfig } from '../data/siteConfig';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { TarotCard, type CardSpot } from '../components/TarotCard';
import { TarotReveal, type CardOrigin } from '../components/TarotReveal';
import '../styles/court.css';

/** Hand-placed spread for 11 cards (rows of 3, 3, 2, 3) on a 10:17 table. */
const SPREAD_11: CardSpot[] = [
  { x: 18, y: 14, r: -9 },
  { x: 50, y: 12, r: 3 },
  { x: 82, y: 15, r: 10 },
  { x: 21, y: 38, r: 7 },
  { x: 53, y: 36, r: -4 },
  { x: 83, y: 41, r: -11 },
  { x: 33, y: 61, r: -6 },
  { x: 68, y: 60, r: 8 },
  { x: 17, y: 85, r: 5 },
  { x: 50, y: 86, r: -3 },
  { x: 83, y: 84, r: -8 },
];

/** Fallback for any other number of guests: a loose 3-column grid with a deterministic wobble. */
function spotFor(i: number, n: number): CardSpot {
  if (n === SPREAD_11.length) return SPREAD_11[i];
  const rows = Math.ceil(n / 3);
  const wobble = (k: number) => Math.sin((i + 1) * k) * 0.5;
  return {
    x: 18 + (i % 3) * 32 + wobble(7.1) * 4,
    y: ((Math.floor(i / 3) + 0.5) / rows) * 100 + wobble(3.7) * 3,
    r: wobble(5.3) * 20,
  };
}

export function CourtSection() {
  const root = useRef<HTMLElement>(null);
  const cardEls = useRef(new Map<string, HTMLButtonElement>());
  const { entered } = useIntro();
  const [activeId, setActiveId] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!entered || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealSection(root.current!);
        gsap.fromTo(
          '.court-table',
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.court-table', start: 'top 85%' },
          },
        );
        gsap.fromTo(
          '.tarot',
          { opacity: 0, y: -90, scale: 1.15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.court-table', start: 'top 70%' },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [entered] },
  );

  const select = useCallback(
    (id: string) => {
      if (!activeId) setActiveId(id);
    },
    [activeId],
  );

  const getOrigin = useCallback((): CardOrigin | null => {
    if (!activeId) return null;
    const el = cardEls.current.get(activeId);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const spot = spotFor(guests.findIndex((g) => g.id === activeId), guests.length);
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      width: el.offsetWidth,
      rotation: spot.r,
    };
  }, [activeId]);

  const closed = useCallback(() => setActiveId(null), []);

  const c = siteConfig.court;
  const activeGuest = guests.find((g) => g.id === activeId) ?? null;

  return (
    <section id="court" ref={root} className="section court" aria-labelledby="court-title">
      <div className="bg-layer court__bg" aria-hidden="true">
        <SafeImage src={scenes.throneRoom} />
      </div>
      <div className="bg-veil court__veil" aria-hidden="true" />

      <div className="section__inner">
        <SectionHeading id="court-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <p className="court__hint" data-reveal="fade">
          {c.hint}
        </p>

        <div className="court-table">
          <div className="court-table__cloth">
            {guests.map((g, i) => (
              <TarotCard
                key={g.id}
                ref={(el) => {
                  if (el) cardEls.current.set(g.id, el);
                  else cardEls.current.delete(g.id);
                }}
                guest={g}
                index={i}
                spot={spotFor(i, guests.length)}
                lifted={activeId === g.id}
                onSelect={select}
              />
            ))}
          </div>
        </div>

        <p className="court__counter" data-reveal="fade">
          <span className="court__counter-badge">
            <SafeImage src={decor.laurel} className="court__laurel" alt="" />
            <span className="court__counter-num">{guests.length}</span>
          </span>
          <span>{c.counterSuffix}</span>
        </p>
      </div>

      {activeGuest && <TarotReveal guest={activeGuest} getOrigin={getOrigin} onClosed={closed} />}
    </section>
  );
}
