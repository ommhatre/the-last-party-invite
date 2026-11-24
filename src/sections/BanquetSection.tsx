import { useCallback, useMemo, useRef, useState, type CSSProperties } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { MOTION_OK, revealSection } from '../lib/reveal';
import { useIntro } from '../lib/intro';
import { scenes } from '../data/assets';
import { dishes, drinks, type Dish, type Drink, type TableRegion } from '../data/menu';
import { siteConfig } from '../data/siteConfig';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { FlaskFallback } from '../components/FlaskFallback';
import { MenuReveal, type RevealItem } from '../components/MenuReveal';
import '../styles/banquet.css';

type Selection = { kind: 'drink' | 'dish'; id: string } | null;

/**
 * Gentle candlelight pools aligned to the real pillar & votive flames
 * in scenes.diningTable.
 */
const CANDLE_FLICKERS: Array<{ x: number; y: number; size: number; delay: number }> = [
  { x: 30.0, y: 40.0, size: 12, delay: 0 },
  { x: 61.0, y: 36.2, size: 12, delay: -1.3 },
  { x: 73.0, y: 39.2, size: 12, delay: -2.4 },
  { x: 48.0, y: 48.2, size: 14, delay: -0.8 },
];

type TableEntry = { kind: 'drink'; drink: Drink; index: number } | { kind: 'dish'; dish: Dish };

/** Sorted back-to-front by bottom edge (y2) so foreground cloches layer naturally in front. */
const depth = (e: TableEntry) => (e.kind === 'drink' ? e.drink.region.y2 : e.dish.region.y2);
const tableItems: TableEntry[] = [
  ...drinks.map((drink, index): TableEntry => ({ kind: 'drink', drink, index })),
  ...dishes.map((dish): TableEntry => ({ kind: 'dish', dish })),
].sort((a, b) => depth(a) - depth(b));

function ClocheFallback() {
  return <span className="dish__cloche-fallback" aria-hidden="true" />;
}

/** Anchors an extracted item patch directly over its exact percentage rectangle in scenes.diningTable. */
function regionStyle({ x1, y1, x2, y2 }: TableRegion, extra?: Record<string, string>): CSSProperties {
  return {
    left: `${x1}%`,
    top: `${y1}%`,
    width: `${x2 - x1}%`,
    height: `${y2 - y1}%`,
    zIndex: Math.round(y2 * 10),
    ...extra,
  } as CSSProperties;
}

interface TableItemProps {
  region: TableRegion;
  patch: string;
  label: string;
  kind: 'drink' | 'dish';
  active: boolean;
  tint?: string;
  staggerIndex: number;
  onSelect: () => void;
}

function TableItem({
  region,
  patch,
  label,
  kind,
  active,
  tint,
  staggerIndex,
  onSelect,
}: TableItemProps) {
  const vars: Record<string, string> = {
    '--stagger': `${(staggerIndex * -0.85).toFixed(2)}s`,
  };
  if (tint) vars['--tint'] = tint;

  return (
    <button
      type="button"
      className={`feast-item feast-item--${kind} ${active ? 'is-active' : ''}`}
      style={regionStyle(region, vars)}
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-label={label}
      data-feast-item
    >
      <span className="feast-item__aura" aria-hidden="true" />
      <SafeImage src={patch} alt="" className="feast-item__patch" />
      <span className="feast-item__sparks" aria-hidden="true">
        <i />
        <i />
      </span>
    </button>
  );
}

export function BanquetSection() {
  const root = useRef<HTMLElement>(null);
  const { entered } = useIntro();
  const [selection, setSelection] = useState<Selection>(null);

  useGSAP(
    () => {
      if (!entered || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealSection(root.current!);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.feast-scene', start: 'top 72%' },
        });
        tl.fromTo(
          '.feast-scene__canvas',
          { opacity: 0, scale: 1.035 },
          { opacity: 1, scale: 1, duration: 1.15, ease: 'power2.out' },
        ).fromTo(
          '[data-feast-item]',
          { opacity: 0 },
          { opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power1.out' },
          0.45,
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [entered] },
  );

  const close = useCallback(() => setSelection(null), []);
  const b = siteConfig.banquet;

  const revealItem = useMemo<RevealItem | null>(() => {
    if (!selection) return null;
    if (selection.kind === 'drink') {
      const i = drinks.findIndex((d) => d.id === selection.id);
      const d = drinks[i];
      if (!d) return null;
      return {
        kicker: b.drinksLabel,
        title: d.name,
        text: d.description,
        list: d.ingredients,
        image: d.image,
        imageFallback: <FlaskFallback tint={d.tint} variant={i} />,
        frame: 'arch',
      };
    }
    const d = dishes.find((x) => x.id === selection.id);
    if (!d) return null;
    return {
      kicker: b.foodLabel,
      title: d.name,
      subtitle: d.epithet,
      text: d.description,
      image: d.image,
      imageFit: 'cover',
      coverImage: d.cover,
      imageFallback: <ClocheFallback />,
      frame: 'squareOrnate',
    };
  }, [selection, b.drinksLabel, b.foodLabel]);

  const isActive = (kind: 'drink' | 'dish', id: string) => selection?.kind === kind && selection.id === id;

  return (
    <section id="banquet" ref={root} className="section banquet" aria-labelledby="banquet-title">
      <div className="bg-layer banquet__bg" aria-hidden="true">
        <SafeImage src={scenes.candlelitFeast} />
      </div>
      <div className="bg-veil banquet__veil" aria-hidden="true" />

      <div className="section__inner">
        <SectionHeading id="banquet-title" eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />

        <p className="banquet__hint" data-reveal="fade">
          {b.tableHint}
        </p>

        <div className="feast-scene">
          <div className="feast-scene__canvas">
            <SafeImage src={scenes.diningTable} alt="" className="feast-scene__img" />
            <span className="feast-scene__glow" aria-hidden="true" />

            {CANDLE_FLICKERS.map((f, i) => (
              <span
                key={i}
                className="feast-flicker"
                style={
                  {
                    left: `${f.x}%`,
                    top: `${f.y}%`,
                    width: `${f.size}%`,
                    '--flicker-delay': `${f.delay}s`,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
            ))}

            {tableItems.map((item, orderIndex) =>
              item.kind === 'drink' ? (
                <TableItem
                  key={item.drink.id}
                  region={item.drink.region}
                  patch={item.drink.patch}
                  kind="drink"
                  label={`Discover ${item.drink.name}`}
                  tint={item.drink.tint}
                  staggerIndex={orderIndex}
                  active={isActive('drink', item.drink.id)}
                  onSelect={() => setSelection({ kind: 'drink', id: item.drink.id })}
                />
              ) : (
                <TableItem
                  key={item.dish.id}
                  region={item.dish.region}
                  patch={item.dish.patch}
                  kind="dish"
                  label={`Uncover ${item.dish.name}`}
                  tint="#d4a24c"
                  staggerIndex={orderIndex}
                  active={isActive('dish', item.dish.id)}
                  onSelect={() => setSelection({ kind: 'dish', id: item.dish.id })}
                />
              ),
            )}
          </div>
        </div>

        <p className="banquet__note" data-reveal="fade">
          {b.foodNote}
        </p>
      </div>

      <MenuReveal item={revealItem} onClose={close} />
    </section>
  );
}
