/**
 * THE COURT OF SPIRIT & FATE - the tarot spread
 * Edit each person's title and roast here.
 * `name` is written on the card's top ribbon, `role` on the bottom plaque.
 * `card` is the face image from src/data/assets.ts (cards.*).
 * `roastLang` is set when the roast is not English (picks the right font).
 * Cards are dealt onto the table in this order.
 */
import { cards } from './assets';

export interface Guest {
  id: string;
  name: string;
  role: string;
  roast: string;
  roastLang?: string;
  card: string;
}

export const guests: Guest[] = [
  { id: 'askar', name: 'Askar', role: 'OATS EATER', roast: 'Can have 4 wives, but not a single glass of wine.', card: cards.askar },
  { id: 'farhan', name: 'Farhan', role: 'GENERIC MALLU GUY', roast: 'Om\u2019s +1 for today and someone else\u2019s -1.', card: cards.farhan },
  { id: 'karan', name: 'Karan', role: 'HECTIC', roast: 'Oh, I work so hard from my 4BHK with a chotu in Indiranagar.', card: cards.karan },
  { id: 'lohith', name: 'Lohith', role: 'NPC', roast: 'Need a Pretty Coorgy.', card: cards.lohith },
  { id: 'nikita', name: 'Nikita', role: 'AQUAGUARD WOMAN', roast: 'Don\u2019t worry, premium water will be served tonight.', card: cards.nikita },
  { id: 'om', name: 'Om', role: 'FART EARTHER', roast: 'Smoking at this party is allowed; farting isn\u2019t.', card: cards.om },
  { id: 'prasidh', name: 'Prasiddh', role: 'THE HOGGER', roast: 'Pray for the food-serving Gods. Amen.', card: cards.prasidh },
  {
    id: 'preethi',
    name: 'Preethi',
    role: 'HINDI HATER',
    roast: '\u0907\u0938 \u092a\u093e\u0930\u094d\u091f\u0940 \u092e\u0947\u0902 \u0915\u094b\u0908 \u092d\u0940 \u0924\u092e\u093f\u0932 \u0928\u0939\u0940\u0902 \u0938\u092e\u091d\u0924\u093e \u0939\u0948\u0964',
    roastLang: 'hi',
    card: cards.preethi,
  },
  { id: 'prerna', name: 'Prerna', role: 'FASHION KI 14', roast: 'Everyone is getting judged today; no one\u2019s spared.', card: cards.prerna },
  { id: 'ranjhita', name: 'Ranjitha', role: 'OOO', roast: 'Leave balance: unlimited.', card: cards.ranjhita },
  { id: 'subit', name: 'Subit', role: 'UNHAIRY POTTER', roast: '"EXPECTOOO ONLY ALCOHOLIUM" is the spell', card: cards.subit },
];
