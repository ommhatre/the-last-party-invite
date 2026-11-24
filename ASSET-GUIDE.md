# Asset Guide - The Imperial Court

All images live under `public/assets/` and are registered in **one file**:
`src/data/assets.ts`. To swap an image, either overwrite the file with the same name or
point the entry in `assets.ts` at a new file. Every image has a CSS / SVG fallback, so a
missing file never breaks the page.

The originals you supplied stay in the top-level `assets/` folder; `public/assets/` holds
the web-ready copies.

## Folders

| Folder | What | Used in |
| --- | --- | --- |
| `cards/` | Tarot cards: `back.jpg` plus one face per person (`askar.jpg`, `om.jpg`, ...) | The Court |
| `scenes/` | Full-screen backgrounds (palace doors, throne, throne room, feast hall...) | Every section |
| `frames/` | Ornate gold frames for the details panels | Drink / dish details |
| `seals/` | Wax seals | Invitation, proclamation |
| `decor/` | Dividers, laurel, fleur-de-lis, corners | Headings, panels |
| `props/` | Candelabra, crown on cushion, rolled scroll, quill, key | Banquet table, proclamation, finale |
| `drinks/` | Decanters and glasses (transparent PNG) | Banquet table |
| `food/` | Cloches, dishes, bowls, desserts (transparent PNG) | Banquet table + details |
| `audio/` | `ambient.mp3` (optional) | Music toggle |

## Tarot cards - `public/assets/cards/`

- 2:3 portrait, exported at **640 x 960 JPG (quality 82)**, about 150 KB each.
  The originals (1684 x 2528, ~9 MB each) are far too heavy for phones.
- The blank ribbon at the top of each face shows the person's **name**, and the plaque at
  the bottom shows their **title**. Both are text overlays, edited in `src/data/guests.ts`.
- To add or replace a person: export their card at 640 x 960, drop it in `cards/`, add it to
  `cards` in `assets.ts`, then add an entry in `guests.ts`. With 11 cards the table uses a
  hand-placed spread; any other count falls back to an automatic scattered grid.

## Drinks and food on the banquet table

- Transparent PNG cutouts, trimmed tight to the object (the shadow is drawn by CSS).
- The table is `scenes/scene_dining_table.jpg` (1080 x 1920, compressed from
  `assets/dining_table.png`). It is shown zoomed to 150%, so about 17% is cropped off each side.
- Each item's spot is set in `src/data/menu.ts` (`table: { x, y, w }`) in % of that photo:
  `x` is the centre of the item's base, `y` is where it stands and `w` is its width. The usable
  velvet is a tilted diamond (back ~(55, 46), left ~(8, 54), right ~(93, 52.5), front
  ~(50, 63.5)); keep items between x 20 and 80, and make items further back smaller.
- The candlesticks are decor, placed in `CANDLES` in `src/sections/BanquetSection.tsx`.
- On the table, dishes show their **cover** (cloche or stand); the details panel shows the
  **image** (the actual dish).

## Audio (optional)

`public/assets/audio/ambient.mp3` (MP3, 96-128 kbps, loopable). Only used when
`musicEnabled: true` in `src/data/siteConfig.ts`. It never autoplays.
