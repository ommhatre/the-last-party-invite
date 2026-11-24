# The Imperial Court

An immersive gothic-Roman birthday invitation: palace doors that swing open, a royal
invitation card, a court of roastable guests, a banquet of potions and a final decree
with a live countdown and WhatsApp RSVP.

Built with React, Vite, TypeScript, GSAP + ScrollTrigger and plain CSS. No WebGL, no
smooth-scroll library.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

To test on your phone on the same Wi-Fi: `npm run dev -- --host` and open the
"Network" URL it prints.

## Edit the party details (no component code needed)

| What | File |
| --- | --- |
| Name, date, time, venue, dress code, RSVP number, countdown target, every heading and line of copy, etiquette rules, music on/off | `src/data/siteConfig.ts` |
| The 11 tarot-card guests: names, titles, roasts, card images | `src/data/guests.ts` |
| Drinks and dishes: names, descriptions, ingredients, images, positions on the banquet table | `src/data/menu.ts` |
| Image filenames | `src/data/assets.ts` |

Key settings in `siteConfig.ts`:

- `rsvpPhone`: digits only, with country code, e.g. `'919876543210'`. Tapping "I Shall
  Attend" always plays the golden celebration and turns the button to "Attendance Confirmed";
  when a number is set it also opens WhatsApp with `rsvpMessage` pre-filled.
- `countdownTarget`: ISO date with timezone, e.g. `'2026-12-20T20:00:00+05:30'`. While
  `null`, an elegant placeholder is shown instead of a timer.
- `musicEnabled`: set to `true` after adding `public/assets/audio/ambient.mp3`.

The site is designed for phones (390 x 844 and similar). Desktop works but is not tuned.

## Images

See [ASSET-GUIDE.md](ASSET-GUIDE.md) for every filename, folder, size and transparency
requirement. The site works with zero images thanks to CSS fallbacks.

## Structure

```
src/
  components/   DoorEntrance, InvitationCard, TarotCard, TarotReveal, FlaskFallback, MenuReveal,
                Countdown, ScrollProgress, AudioToggle, SectionHeading, GoldButton,
                SafeImage, DustParticles, Ornament
  sections/     CourtSection, BanquetSection, ProclamationSection, FinalSection
  data/         siteConfig.ts, guests.ts, menu.ts, assets.ts
  hooks/        useCountdown, useBodyScrollLock, useDismiss, useMediaQuery
  lib/          gsap.ts (plugin registration), reveal.ts (shared scroll choreography), intro.ts
  styles/       theme.css, global.css, animations.css, entrance.css, court.css,
                banquet.css, finale.css
```

## Behaviour notes

- The whole invitation is one continuous page. Scrolling is locked until the palace doors
  are tapped open. The replay button (bottom-left) and the footer link replay the opening.
- Court: tapping a face-down tarot card lifts it off the table, flips it and unrolls a
  scroll with the name, title and roast. Closing turns it back face-down.
- Banquet: every decanter and cloche on the table is tappable. Names stay hidden until
  tapped.
- All GSAP work runs inside `useGSAP`, so timelines and ScrollTriggers are cleaned up on
  unmount. Section animations only start after the visitor has entered.
- `prefers-reduced-motion` is respected: scroll animations are skipped and the door
  sequence plays almost instantly.
- Every interactive element is a real button or link with visible focus states. Escape or
  tapping outside closes the lifted tarot card and the menu panels.

## Deploying

`npm run build` and upload `dist/` to Netlify, Vercel, Cloudflare Pages or GitHub Pages.
Asset paths respect Vite's `base` option, so sub-path hosting works if you set `base` in
`vite.config.ts`.
