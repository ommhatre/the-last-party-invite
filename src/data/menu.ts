/**
 * LIQUID & FEAST
 * Edit the drinks and the dishes here.
 *
 * All 4 closed cloches and 4 decanters are baked directly into `scenes.diningTable`
 * with unified perspective, shadows, and candlelight. Each item's `region` (`x1, y1, x2, y2`
 * in % of `scenes.diningTable`) and `patch` (feathered RGBA cutout extracted from those
 * exact coordinates) turn the painted vessels and domes into seamless interactive elements.
 */
import { banquetPatches, drinks as drinkImg, food } from './assets';

/** Exact bounding box in % (0-100) of scenes.diningTable. */
export interface TableRegion {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Drink {
  id: string;
  name: string;
  description: string;
  ingredients?: string[];
  /** Seamless patch extracted from scenes.diningTable for in-place table interaction. */
  patch: string;
  /** Crisp studio decanter asset shown inside the ornate gold frame on reveal. */
  image: string;
  /** Subtle accent colour for glass shimmer. */
  tint: string;
  region: TableRegion;
}

export interface Dish {
  id: string;
  name: string;
  /** Royal epithet displayed beneath the dish title. */
  epithet?: string;
  description: string;
  /** Seamless cloche patch extracted from scenes.diningTable. */
  patch: string;
  /** Closed cloche asset that lifts upward inside MenuReveal when tapped. */
  cover: string;
  /** Studio dish photo revealed inside the ornate frame when tapped. */
  image: string;
  region: TableRegion;
}

export const drinks: Drink[] = [
  {
    id: 'drink-01',
    name: 'Jameson',
    description: 'Smooth Irish gold. Best enjoyed neat, on the rocks, or while making promises you won\u2019t keep tomorrow.',
    patch: banquetPatches.bottleJameson,
    image: drinkImg.amber,
    tint: '#b4893c',
    region: { x1: 24.0, y1: 37.6, x2: 33.2, y2: 49.4 },
  },
  {
    id: 'drink-02',
    name: 'Bombay Sapphire',
    description: 'Distilled botanical magic in royal blue. Crisp, deceptive, and dangerously easy to refill.',
    patch: banquetPatches.bottleBombay,
    image: drinkImg.sapphireBlue,
    tint: '#2a6f88',
    region: { x1: 34.8, y1: 36.6, x2: 43.4, y2: 49.0 },
  },
  {
    id: 'drink-03',
    name: 'Absolut',
    description: 'Crystal-clear liquid courage. Pairs with any juice and every questionable dance move.',
    patch: banquetPatches.bottleAbsolut,
    image: drinkImg.crystal,
    tint: '#dfd4ba',
    region: { x1: 57.2, y1: 34.0, x2: 66.2, y2: 47.0 },
  },
  {
    id: 'drink-04',
    name: 'Fratelli Red',
    description: 'Deep crimson velvet for those pretending to be civilized before midnight.',
    patch: banquetPatches.bottleFratelli,
    image: drinkImg.ruby,
    tint: '#8e1b2e',
    region: { x1: 67.2, y1: 38.6, x2: 77.6, y2: 49.2 },
  },
];

export const dishes: Dish[] = [
  {
    id: 'dish-01',
    name: 'Crispy Lotus Stem',
    epithet: 'Gilded Lotus Crisps',
    description: 'Tossed in sweet heat and royal spice. Crunchy enough to silence the court.',
    patch: banquetPatches.clocheLotus,
    cover: food.clocheGoldDome,
    image: food.crispyLotusStem,
    region: { x1: 5.8, y1: 44.3, x2: 23.8, y2: 53.8 },
  },
  {
    id: 'dish-02',
    name: 'Wok Toss Chilli Jumbo Prawn',
    epithet: 'Imperial Fire Prawns',
    description: 'Wok-seared in blistering chilli glaze. Handle with dignity - or your bare hands.',
    patch: banquetPatches.clochePrawn,
    cover: food.clocheGrandCenterpiece,
    image: food.wokTossChilliJumboPrawn,
    region: { x1: 25.2, y1: 49.4, x2: 47.8, y2: 59.6 },
  },
  {
    id: 'dish-03',
    name: 'Thai Green Curry',
    epithet: 'The Emerald Elixir',
    description: 'Fragrant coconut, sweet basil, and quiet heat. Fit for surviving tomorrow.',
    patch: banquetPatches.clocheCurry,
    cover: food.clocheServingDome,
    image: food.thaiGreenCurry,
    region: { x1: 56.0, y1: 47.2, x2: 78.2, y2: 57.4 },
  },
  {
    id: 'dish-04',
    name: 'Som Tam Salad',
    epithet: 'The Sovereign\u2019s Crunch',
    description: 'Green papaya, crushed peanuts, and sharp lime to balance your questionable liquid choices.',
    patch: banquetPatches.clocheSomtam,
    cover: food.clocheGoldDome,
    image: food.somTamSalad,
    region: { x1: 76.8, y1: 41.6, x2: 93.4, y2: 50.2 },
  },
];
