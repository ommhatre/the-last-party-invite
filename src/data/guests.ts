/**
 * THE COURT OF ROAST & TOAST - the tarot spread
 * Edit each person's title and roast here.
 * `name` is written on the card's top ribbon, `role` on the bottom plaque.
 * `card` is the face image from src/data/assets.ts (cards.*).
 * Cards are dealt onto the table in this order.
 */
import { cards } from './assets';

export interface Guest {
  id: string;
  name: string;
  role: string;
  roast: string;
  card: string;
}

export const guests: Guest[] = [
  { id: 'askar', name: 'Askar', role: '[TITLE]', roast: '[Add a one-line roast for Askar]', card: cards.askar },
  { id: 'farhan', name: 'Farhan', role: '[TITLE]', roast: '[Add a one-line roast for Farhan]', card: cards.farhan },
  { id: 'karan', name: 'Karan', role: '[TITLE]', roast: '[Add a one-line roast for Karan]', card: cards.karan },
  { id: 'lohith', name: 'Lohith', role: '[TITLE]', roast: '[Add a one-line roast for Lohith]', card: cards.lohith },
  { id: 'nikita', name: 'Nikita', role: '[TITLE]', roast: '[Add a one-line roast for Nikita]', card: cards.nikita },
  { id: 'om', name: 'Om', role: '[TITLE]', roast: '[Add a one-line roast for Om]', card: cards.om },
  { id: 'prasidh', name: 'Prasidh', role: '[TITLE]', roast: '[Add a one-line roast for Prasidh]', card: cards.prasidh },
  { id: 'preethi', name: 'Preethi', role: '[TITLE]', roast: '[Add a one-line roast for Preethi]', card: cards.preethi },
  { id: 'prerna', name: 'Prerna', role: '[TITLE]', roast: '[Add a one-line roast for Prerna]', card: cards.prerna },
  { id: 'ranjhita', name: 'Ranjitha', role: '[TITLE]', roast: '[Add a one-line roast for Ranjitha]', card: cards.ranjhita },
  { id: 'subit', name: 'Subit', role: '[TITLE]', roast: '[Add a one-line roast for Subit]', card: cards.subit },
];
