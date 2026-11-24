/**
 * SITE CONFIGURATION
 * Edit every party detail and every line of copy here.
 * Values wrapped in [BRACKETS] are placeholders waiting for real details.
 */

export interface InvitationDetail {
  label: string;
  value: string;
  /** Short details (time, venue) sit side by side; the rest span the full width. */
  half?: boolean;
  /** Long free text, set in italic instead of capitals. */
  prose?: boolean;
}

export interface SiteConfig {
  partyName: string;
  /** The birthday royals, written in calligraphy on the invitation. */
  honorees: string[];
  eventDate: string;
  eventTime: string;
  venue: string;
  dressCode: string;
  /** Digits only, with country code, no "+" or spaces, e.g. "919876543210". Leave empty to show a placeholder. */
  rsvpPhone: string;
  rsvpMessage: string;
  /** ISO date-time with timezone, e.g. "2026-12-20T20:00:00+05:30". Use null to show a placeholder instead of a timer. */
  countdownTarget: string | null;
  /** Set to true and add /public/assets/audio/ambient.mp3 to show the music toggle. */
  musicEnabled: boolean;

  entrance: {
    eyebrow: string;
    title: string;
    prompt: string;
  };

  invitation: {
    eyebrow: string;
    /** Printed above the party name. */
    summons: string;
    /** Printed beneath the party name. */
    tagline: string;
    enterLabel: string;
  };

  court: {
    eyebrow: string;
    title: string;
    subtitle: string;
    counterSuffix: string;
    hint: string;
  };

  banquet: {
    eyebrow: string;
    title: string;
    subtitle: string;
    drinksLabel: string;
    foodLabel: string;
    tableHint: string;
    foodNote: string;
  };

  proclamation: {
    eyebrow: string;
    title: string;
    etiquette: string[];
    signOff: string;
  };

  final: {
    eyebrow: string;
    title: string;
    countdownPlaceholder: string;
    countdownElapsed: string;
    messageLines: string[];
    rsvpLabel: string;
    rsvpConfirmedLabel: string;
    rsvpConfirmedNote: string;
    footer: string;
  };
}

export const siteConfig: SiteConfig = {
  partyName: 'The Last Party',
  honorees: ['Prerna', 'Karan', 'Ranjitha'],
  eventDate: '25th November, 2026',
  eventTime: '7 PM',
  venue: 'The Mirage',
  dressCode: 'Dress like it\u2019s the last party of ur life.',
  rsvpPhone: '',
  rsvpMessage: 'By royal decree, I shall attend the Imperial Court.',
  countdownTarget: '2026-11-25T19:00:00+05:30',
  musicEnabled: false,

  entrance: {
    eyebrow: 'An Invitation For',
    title: 'The Last Party',
    prompt: 'Tap the doors to enter',
  },

  invitation: {
    eyebrow: 'By Royal Decree',
    // rendered as "— BY ROYAL DECREE —" by the card's styling
    summons: 'You are cordially summoned to',
    tagline: 'One night. No excuses.',
    enterLabel: 'Enter the Court',
  },

  court: {
    eyebrow: 'Chapter II',
    title: 'The Court of Spirit & Fate',
    subtitle: 'Unfold the tarot cards to reveal your spirit animal.',
    counterSuffix: 'Royal Subjects. 0 Secrets.',
    hint: 'Tap as many as u want',
  },

  banquet: {
    eyebrow: 'Chapter III',
    title: 'Liquid & Feast',
    subtitle: 'A little indulgence has never harmed a royal.',
    drinksLabel: "The Alchemist's Elixirs",
    foodLabel: 'From the Royal Kitchens',
    tableHint: 'Tap any glowing vessel or cloche',
    foodNote: 'Only a glimpse. The full feast shall be revealed in person.',
  },

  proclamation: {
    eyebrow: 'Chapter IV',
    title: 'Rules of the Court',
    etiquette: [
      'Arrive on time. The Crown makes entrances, not waits.',
      'Flattering angles only. Bad photos are treason.',
      'What happens at court, stays at court.',
    ],
    signOff: '\u2014 Sealed by the Royal Chancellery',
  },

  final: {
    eyebrow: 'Chapter V',
    title: 'The Final Decree',
    countdownPlaceholder: 'The hour shall be revealed by royal messenger',
    countdownElapsed: 'The court is now in session',
    messageLines: [
      'The court has been assembled.',
      'The feast has been prepared.',
      'The only thing missing is you.',
    ],
    rsvpLabel: 'I Shall Attend',
    rsvpConfirmedLabel: 'Attendance Confirmed',
    rsvpConfirmedNote: 'Your name is entered in the royal register.',
    footer: 'Issued under the authority of the Imperial Court.',
  },
};

export const invitationDetails = (c: SiteConfig = siteConfig): InvitationDetail[] => [
  { label: 'Date', value: c.eventDate },
  { label: 'Time', value: c.eventTime, half: true },
  { label: 'Venue', value: c.venue, half: true },
  { label: 'Dress Code', value: c.dressCode, prose: true },
];

/** "Prerna, Karan & Ranjitha" - the last name is glued to the "&" so a wrap never strands it. */
export const honoreeLine = (c: SiteConfig = siteConfig): string => {
  const names = c.honorees;
  if (names.length < 2) return names.join('');
  return `${names.slice(0, -1).join(', ')} &\u00a0${names[names.length - 1]}`;
};

export const rsvpLink = (c: SiteConfig = siteConfig): string | null => {
  const digits = c.rsvpPhone.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(c.rsvpMessage)}`;
};
