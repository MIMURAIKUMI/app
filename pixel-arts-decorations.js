// pixel-arts-decorations.js
// Real art for the unlockable "かざりつけ" (decoration/effect) reward -- a
// 3rd reward category alongside おめかし (OUTFIT_ART) and ごはん (FOOD_ART),
// kept in its own file (loaded after pixel-arts-outfits.js, before
// pixel-arts-legendary.js -- see index.html) so it can keep evolving without
// touching those registries or the app logic in app.js.
//
// Each item is a single static 16x16 icon (same shape as OUTFIT_ART/FOOD_ART
// entries: `name`, a `colors` palette map, and a 16x16 `grid`) -- composited
// via app.js's compositeDecorationOverlay(), called from both
// renderCatWithOutfit() (walking/sitting cat) and renderStretchProgressBar()
// (のびるねこ head piece). Unlike おめかし, a decoration always renders at
// the same full cat-cell size and sits BEHIND the cat sprite (z-index below
// the base sprite) rather than composited on top of it, and gets a small
// idle bob/twinkle animation (.deco-float, see index.html) instead of a
// fixed anchor/offset -- so no `overlay` hint is needed here.
//
// Loaded via <script> before app.js, so this becomes a global: DECORATION_ART.
// Unlock order: きらきら → くも → おんぷ.
const DECORATION_ART = {
  sparkle: {
    name: { ja: 'きらきら', en: 'Sparkle' },
    colors: { 15: '#fff3a0', 7: '#ffcc00', 6: '#ff9500' },
    grid: [
      [0, 15, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 7, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [7, 6, 7, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0]
    ]
  },
  cloud: {
    name: { ja: 'くも', en: 'Cloud' },
    colors: { 1: '#000000', 4: '#ffffff', 31: '#dae9f8' },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 4, 4, 4, 4, 31, 1, 31, 31, 1, 0, 0],
      [1, 0, 0, 1, 1, 4, 4, 4, 4, 31, 31, 1, 4, 31, 1, 0],
      [1, 1, 1, 31, 4, 4, 4, 4, 4, 4, 4, 31, 4, 4, 1, 0],
      [1, 31, 31, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
      [0, 1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 31, 1],
      [0, 1, 4, 31, 31, 31, 1, 4, 4, 4, 1, 4, 4, 4, 31, 1],
      [0, 0, 1, 1, 31, 31, 1, 4, 4, 1, 31, 1, 4, 31, 31, 1],
      [0, 0, 0, 0, 1, 1, 1, 4, 31, 31, 31, 1, 31, 31, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0]
    ]
  },
  note: {
    name: { ja: 'おんぷ', en: 'Music Note' },
    colors: { 13: '#ff9a9a', 7: '#ffcc00' },
    grid: [
      [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [13, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [13, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 7, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 7],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
};
