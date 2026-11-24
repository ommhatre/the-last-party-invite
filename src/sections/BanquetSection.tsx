import { useCallback, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { MOTION_OK, revealSection } from '../lib/reveal';
import { useIntro } from '../lib/intro';
import { props, scenes } from '../data/assets';
import { dishes, drinks, type Dish, type Drink, type TableSpot } from '../data/menu';
import { siteConfig } from '../data/siteConfig';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { FlaskFallback } from '../components/FlaskFallback';
import { MenuReveal, type RevealItem } from '../components/MenuReveal';
import '../styles/banquet.css';

type Selection = { kind: 'drink' | 'dish'; id: string } | null;

/**
 * Candlesticks on the table, same coordinate system as `table` in menu.ts.
 * The layout keeps every item's standing rectangle (width x image height) clear of the others,
 * so nothing overlaps: items in a row behind are offset sideways from the row in front.
 */
const CANDLES: TableSpot[] = [
  { x: 20, y: 53.0, w: 3.2 },
  { x: 40.5, y: 52.6, w: 3.2 },
  { x: 68.5, y: 56.0, w: 3.2 },
];

type TableEntry = { kind: 'drink'; drink: Drink; index: number } | { kind: 'dish'; dish: Dish };

/** Drinks and dishes mixed together, back of the table first (DOM order = depth = tab order). */
const depth = (e: TableEntry) => (e.kind === 'drink' ? e.drink.table.y : e.dish.table.y);
const tableItems: TableEntry[] = [
  ...drinks.map((drink, index): TableEntry => ({ kind: 'drink', drink, index })),
  ...dishes.map((dish): TableEntry => ({ kind: 'dish', dish })),
].sort((a, b) => depth(a) - depth(b));

function ClocheFallback() {
  return <span className="dish__cloche-fallback" aria-hidden="true" />;
}

/** Places an item on the table: anchored at its base, layered by depth. */
function spotStyle({ x, y, w }: TableSpot, extra?: Record<string, string>): CSSProperties {
  return {
    left: `${x - w / 2}%`,
    bottom: `${100 - y}%`,
    width: `${w}%`,
    zIndex: Math.round(y * 10),
    ...extra,
  } as CSSProperties;
}

interface TableItemProps {
  spot: TableSpot;
  label: string;
  kind: 'drink' | 'dish';
  active: boolean;
  tint?: string;
  onSelect: () => void;
  children: ReactNode;
}

function TableItem({ spot, label, kind, active, tint, onSelect, children }: TableItemProps) {
  return (
    <button
      type="button"
      className={`feast-item feast-item--${kind} ${active ? 'is-active' : ''}`}
      style={spotStyle(spot, tint ? { '--tint': tint } : undefined)}
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-label={label}
      data-feast-item
    >
      <span className="feast-item__shadow" aria-hidden="true" />
      {children}
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
          scrollTrigger: { trigger: '.feast-scene', start: 'top 70%' },
        });
        tl.fromTo('.feast-scene__img', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' })
          .fromTo(
            '.feast-candle',
            { opacity: 0, y: -16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
            0.5,
          )
          .fromTo(
            '[data-feast-item]',
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: { each: 0.1, from: 'random' }, ease: 'bounce.out' },
            0.7,
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
      text: d.description,
      image: d.image,
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

            {CANDLES.map((spot, i) => (
              <span key={i} className="feast-candle" style={spotStyle(spot)} aria-hidden="true">
                <SafeImage src={props.candelabra} alt="" className={i % 2 ? 'is-mirrored' : ''} />
              </span>
            ))}

            {tableItems.map((item) =>
              item.kind === 'drink' ? (
                <TableItem
                  key={item.drink.id}
                  spot={item.drink.table}
                  kind="drink"
                  label={`Discover ${item.drink.name}`}
                  tint={item.drink.tint}
                  active={isActive('drink', item.drink.id)}
                  onSelect={() => setSelection({ kind: 'drink', id: item.drink.id })}
                >
                  <SafeImage
                    src={item.drink.image}
                    alt=""
                    className="feast-item__img"
                    fallback={<FlaskFallback tint={item.drink.tint} variant={item.index} />}
                  />
                </TableItem>
              ) : (
                <TableItem
                  key={item.dish.id}
                  spot={item.dish.table}
                  kind="dish"
                  label={`Discover ${item.dish.name}`}
                  active={isActive('dish', item.dish.id)}
                  onSelect={() => setSelection({ kind: 'dish', id: item.dish.id })}
                >
                  <SafeImage src={item.dish.cover} alt="" className="feast-item__img" fallback={<ClocheFallback />} />
                </TableItem>
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
