import { useRef, type CSSProperties } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { MOTION_OK, revealSection } from '../lib/reveal';
import { useIntro } from '../lib/intro';
import { decor, props, scenes } from '../data/assets';
import { siteConfig } from '../data/siteConfig';
import { SafeImage } from '../components/SafeImage';
import { OrnamentRule } from '../components/Ornament';
import '../styles/finale.css';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export function ProclamationSection() {
  const root = useRef<HTMLElement>(null);
  const { entered } = useIntro();
  const p = siteConfig.proclamation;

  useGSAP(
    () => {
      if (!entered || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealSection(root.current!);
        gsap
          .timeline({
            scrollTrigger: { trigger: '.decree', start: 'top 75%' },
            defaults: { ease: 'power3.inOut' },
          })
          .fromTo('.decree__rolled', { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: -40, scale: 0.9, duration: 0.8 }, 0.2)
          .fromTo(
            '.decree__paper',
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'power2.inOut' },
            0.5,
          )
          .fromTo(
            '[data-decree-line]',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power2.out' },
            0.9,
          );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [entered] },
  );

  return (
    <section id="proclamation" ref={root} className="section proclamation" aria-labelledby="proclamation-title">
      <div className="bg-layer proclamation__bg" aria-hidden="true">
        <SafeImage src={scenes.banquetHall} />
      </div>
      <div className="bg-veil proclamation__veil" aria-hidden="true" />

      <div className="section__inner">
        <div className="decree">
          <SafeImage src={props.rolledScroll} className="decree__rolled" alt="" />
          <article
            className="decree__paper parchment-art"
            style={{ '--parchment': `url("${decor.parchmentVertical}")` } as CSSProperties}
          >
            <p className="decree__eyebrow" data-decree-line>
              {p.eyebrow}
            </p>
            <h2 id="proclamation-title" className="decree__title" data-decree-line>
              {p.title}
            </h2>
            <div data-decree-line>
              <SafeImage src={decor.dividerTop} className="decree__divider" fallback={<OrnamentRule />} />
            </div>
            <ol className="decree__rules">
              {p.etiquette.map((rule, i) => (
                <li key={i} data-decree-line>
                  <SafeImage
                    src={decor.fleurDeLis}
                    className="decree__bullet"
                    alt=""
                    fallback={<span className="decree__rule-num">{NUMERALS[i] ?? i + 1}</span>}
                  />
                  <span>{rule}</span>
                </li>
              ))}
            </ol>

            <footer className="decree__footer" data-decree-line>
              <SafeImage src={props.quillInkwell} className="decree__quill" alt="" />
              <span className="decree__signoff">{p.signOff}</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
