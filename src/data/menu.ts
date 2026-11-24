/**
 * LIQUID & FEAST
 * Edit the drinks (potions) and the dishes here.
 * Images come from src/data/assets.ts. Every decanter, glass, dish, bowl and dessert
 * you supplied is listed there, so swapping is a one-word change, e.g. drinks.amber.
 * Only a teaser of the menu is shown on the site.
 *
 * `table` places the item on the velvet table in scenes.diningTable, in % of that image:
 *   x - centre of the item's base, % of image width
 *   y - where the item stands, % of image height
 *   w - width of the item, % of image width (items further back should be smaller)
 * The tabletop inside the gold border is a tilted diamond: back corner ~(55, 46),
 * left ~(8, 54), right ~(93, 52.5), front ~(50, 63.5). The photo is shown zoomed, cropping
 * ~17% off each side, so keep items between x 20 and 80.
 * Items should not overlap: an item covers x ± w/2 and stands w * (image h/w) / 1.78 tall above y.
 */
import { drinks as drinkImg, food } from './assets';

export interface TableSpot {
  x: number;
  y: number;
  w: number;
}

export interface Drink {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  /** Glow colour behind the bottle. */
  tint: string;
  table: TableSpot;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  /** What sits on the table before it is tapped (a cloche, a stand...). */
  cover: string;
  /** What is revealed in the details panel. */
  image: string;
  table: TableSpot;
}

export const drinks: Drink[] = [
  {
    id: 'potion-01',
    name: 'The Midnight Elixir',
    description: 'A dangerously charming concoction, best consumed before questionable decisions.',
    ingredients: ['Dark berries', 'Smoked honey', 'A whisper of mischief'],
    image: drinkImg.crestedRed,
    tint: '#7a1424',
    table: { x: 44.5, y: 57.4, w: 5.4 },
  },
  {
    id: 'potion-02',
    name: "The Empress's Blush",
    description: 'Rosy, regal and far stronger than it looks. Much like Their Majesties.',
    ingredients: ['Rose', 'Pomegranate', 'Sparkling gold'],
    image: drinkImg.roundRuby,
    tint: '#a2283c',
    table: { x: 55, y: 52.8, w: 5.2 },
  },
  {
    id: 'potion-03',
    name: 'Liquid Gold',
    description: 'Poured only for the worthy. Fortunately, tonight everyone is worthy.',
    ingredients: ['Citrus', 'Saffron syrup', 'Edible gold leaf'],
    image: drinkImg.roundGold,
    tint: '#b4893c',
    table: { x: 45, y: 49, w: 5.4 },
  },
  {
    id: 'potion-04',
    name: "The Senator's Alibi",
    description: 'Erases all memory of what you said at the table. Allegedly.',
    ingredients: ['Blue curacao', 'Lime', 'Plausible deniability'],
    image: drinkImg.sapphireBlue,
    tint: '#1f5a66',
    table: { x: 65, y: 49, w: 5.4 },
  },
];

export const dishes: Dish[] = [
  {
    id: 'dish-01',
    name: 'Wok Toss Chilli Jumbo Prawn',
    description: 'Jumbo prawns wok-tossed in chilli and garlic. Arrive hungry. Leave silent.',
    cover: food.wokTossChilliJumboPrawn,
    image: food.wokTossChilliJumboPrawn,
    table: { x: 49.5, y: 62.0, w: 12.0 },
  },
  {
    id: 'dish-02',
    name: 'Crispy Lotus Stem',
    description: 'Glazed lotus coins with sesame and chilli: crisp, sweet, and quietly addictive.',
    cover: food.crispyLotusStem,
    image: food.crispyLotusStem,
    table: { x: 31.5, y: 54.2, w: 10.5 },
  },
  {
    id: 'dish-03',
    name: 'Thai Green Curry',
    description: 'Coconut, basil and green fire in a bowl fit for a throne.',
    cover: food.thaiGreenCurry,
    image: food.thaiGreenCurry,
    table: { x: 74.5, y: 53.6, w: 10.0 },
  },
  {
    id: 'dish-04',
    name: 'Som Tam Salad',
    description: 'Green papaya, lime and heat: a sharp green wake-up call for royal palates.',
    cover: food.somTamSalad,
    image: food.somTamSalad,
    table: { x: 61.5, y: 58.4, w: 11.0 },
  },
];
