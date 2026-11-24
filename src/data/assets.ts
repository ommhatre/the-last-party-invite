/**
 * CENTRAL ASSET MAP
 * Every image / audio path used by the site lives here, grouped by folder under /public/assets.
 * To swap an image, change the filename here. Anything missing falls back to CSS/SVG.
 */

const base = `${import.meta.env.BASE_URL}assets/`;
const p = (file: string) => `${base}${file}`;

export const scenes = {
  palaceDoors: p('scenes/scene_palace_doors.png'),
  imperialThrone: p('scenes/scene_imperial_throne.png'),
  throneRoom: p('scenes/scene_throne_room.png'),
  candlelitFeast: p('scenes/scene_candlelit_feast.png'),
  /** 1080 x 1920, unified banquet table scene with 4 closed cloches, 4 decanters, roses & candles. */
  diningTable: p('scenes/scene_dining_table_feast.jpg'),
  banquetHall: p('scenes/scene_banquet_hall.png'),
  grandEntrance: p('scenes/scene_grand_entrance.png'),
} as const;

export const frames = {
  oval1: p('frames/frame_oval_1.png'),
  oval2: p('frames/frame_oval_2.png'),
  ovalLarge: p('frames/frame_oval_large.png'),
  arch: p('frames/frame_arch.png'),
  rect1: p('frames/frame_rect_1.png'),
  rect2: p('frames/frame_rect_2.png'),
  rectSmall: p('frames/frame_rect_small.png'),
  squareOrnate: p('frames/frame_square_ornate.png'),
} as const;

export type FrameKey = keyof typeof frames;

export const seals = {
  royalWax: p('seals/seal_royal_wax.png'),
  waxEmblem: p('seals/seal_wax_emblem.png'),
  crownLarge: p('seals/seal_crown_large.png'),
} as const;

export const decor = {
  dividerOrnate: p('decor/divider_ornate_gold.png'),
  dividerTop: p('decor/divider_top.png'),
  dividerMid: p('decor/divider_mid.png'),
  dividerBottom: p('decor/divider_bottom.png'),
  crown: p('decor/icon_royal_crown.png'),
  laurel: p('decor/icon_laurel_wreath.png'),
  fleurDeLis: p('decor/icon_fleur_de_lis.png'),
  parchmentVertical: p('decor/ui_parchment_scroll_vertical.png'),
  parchmentHorizontal: p('decor/ui_parchment_horizontal.png'),
} as const;

export const props = {
  candelabra: p('props/prop_candelabra_single.png'),
  crownCushion: p('props/prop_crown_cushion.png'),
  ornateKey: p('props/prop_ornate_key.png'),
  quillInkwell: p('props/prop_quill_inkwell.png'),
  rolledScroll: p('props/prop_rolled_scroll.png'),
} as const;

export const drinks = {
  amber: p('drinks/decanter_amber.png'),
  crestedRed: p('drinks/decanter_crested_red.png'),
  crownBrandy: p('drinks/decanter_crown_brandy.png'),
  crystal: p('drinks/decanter_crystal.png'),
  ribbedAmber: p('drinks/decanter_ribbed_amber.png'),
  roundGold: p('drinks/decanter_round_gold.png'),
  roundRuby: p('drinks/decanter_round_ruby.png'),
  ruby: p('drinks/decanter_ruby.png'),
  sapphireBlue: p('drinks/decanter_sapphire_blue.png'),
  glassCoupe: p('drinks/glass_crystal_coupe.png'),
  glassFlute: p('drinks/glass_crystal_flute.png'),
  glassGoblet: p('drinks/glass_gold_goblet.png'),
  glassMartini: p('drinks/glass_martini.png'),
  glassOldFashioned: p('drinks/glass_old_fashioned.png'),
  glassRedWine: p('drinks/glass_red_wine.png'),
} as const;

/** Seamless silhouette-feathered patches extracted directly from scenes.diningTable. */
export const banquetPatches = {
  clocheLotus: p('banquet/cloche_lotus.png'),
  clochePrawn: p('banquet/cloche_prawn.png'),
  clocheCurry: p('banquet/cloche_curry.png'),
  clocheSomtam: p('banquet/cloche_somtam.png'),
  bottleJameson: p('banquet/bottle_jameson.png'),
  bottleBombay: p('banquet/bottle_bombay.png'),
  bottleAbsolut: p('banquet/bottle_absolut.png'),
  bottleFratelli: p('banquet/bottle_fratelli.png'),
} as const;

export const food = {
  /** Studio dish photos for The Last Party (760 x 570 JPG, compressed from /assets/food). */
  crispyLotusStem: p('food/dish_crispy_lotus_stem.jpg'),
  somTamSalad: p('food/dish_som_tam_salad.jpg'),
  thaiGreenCurry: p('food/dish_thai_green_curry.jpg'),
  wokTossChilliJumboPrawn: p('food/dish_wok_toss_chilli_jumbo_prawn.jpg'),
  /** Ornate cloches & older cutouts. */
  clocheGoldDome: p('food/cloche_gold_dome.png'),
  clocheGrandCenterpiece: p('food/cloche_grand_centerpiece.png'),
  clocheServingDome: p('food/cloche_serving_dome.png'),
  pastryStand: p('food/stand_pastries_duo.png'),
  biryaniBowl: p('food/dish_biryani_bowl.png'),
  butterPrawns: p('food/dish_butter_prawns.png'),
  chilliChicken: p('food/dish_chilli_chicken.png'),
  crispyLotus: p('food/dish_crispy_lotus.png'),
  curryBowl: p('food/dish_curry_bowl_1.png'),
  garlicPrawns: p('food/dish_garlic_prawns.png'),
  glazedWings: p('food/dish_glazed_wings.png'),
  glazeChicken: p('food/dish_glaze_chicken.png'),
  grilledPaneer: p('food/dish_grilled_paneer.png'),
  lotusChips: p('food/dish_lotus_chips.png'),
  lotusPlatter: p('food/dish_lotus_platter.png'),
  paneerTikka: p('food/dish_paneer_tikka.png'),
  spicyStirfry: p('food/dish_spicy_stirfry.png'),
  stirFryGreens: p('food/dish_stir_fry_greens.png'),
  tandooriPrawns: p('food/dish_tandoori_prawns.png'),
  greenCurry: p('food/bowl_green_curry.png'),
  pulaoRice: p('food/bowl_pulao_rice.png'),
  berryParfait: p('food/dessert_berry_parfait.png'),
  chocolateMousse: p('food/dessert_chocolate_mousse.png'),
} as const;

/** Tarot cards (640 x 960 JPG, compressed from the originals in /assets/cards). */
export const cards = {
  back: p('cards/back.jpg'),
  askar: p('cards/askar.jpg'),
  farhan: p('cards/farhan.jpg'),
  karan: p('cards/karan.jpg'),
  lohith: p('cards/lohith.jpg'),
  nikita: p('cards/nikita.jpg'),
  om: p('cards/om.jpg'),
  prasidh: p('cards/prasidh.jpg'),
  preethi: p('cards/preethi.jpg'),
  prerna: p('cards/prerna.jpg'),
  ranjhita: p('cards/ranjhita.jpg'),
  subit: p('cards/subit.jpg'),
} as const;

export const audio = {
  ambient: p('audio/ambient.mp3'),
} as const;
