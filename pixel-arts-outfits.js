// pixel-arts-outfits.js
// Real art for the unlockable "おめかし" (outfit/accessory) and "えさ" (food)
// rewards, kept in its own file (separate from pixel-arts.js and
// pixel-arts-legendary.js) so it can keep evolving without touching the
// default-cat registry or the app logic in app.js.
//
// Each item is a single static 16x16 icon (unlike the cats in pixel-arts.js,
// which have multiple named poses) -- OUTFIT_ART[key] / FOOD_ART[key] each
// have a `name`, a `colors` palette map, and a 16x16 `grid`.
//
// おめかし items also carry an `overlay` hint used by app.js's
// compositeOutfitOverlay() (called from both renderCatWithOutfit() for the
// walking/sitting cat, and renderStretchProgressBar() for the のびるねこ
// head piece) to composite the equipped item directly onto the base sprite
// (see that function for exactly how scale/anchor/offset are applied):
//   - { scale: 1, anchor: 'full' } -- drawn at the base sprite's own scale,
//     in the exact same position as its 16x16 grid (used for 首輪, which was
//     drawn to already line up with the cat's neck at 1:1).
//   - { scale: 0.7, anchor: 'top-right' } -- drawn at 70% of the base
//     sprite's size, anchored to the top-right corner of its bounding box,
//     which lands it roughly on top of the head (used for リボン／王冠).
//   - optional `offsetX`/`offsetY` (px) -- a fixed nudge on top of the
//     anchor position for fine-tuning (positive X = right, positive Y =
//     down), set from direct visual feedback rather than derived from the
//     art. Currently: リボン `offsetY:-3` (3px up), 王冠 `offsetX:3,
//     offsetY:-10` (3px right, 10px up).
//
// Loaded via <script> before app.js (and after pixel-arts.js), so these
// become globals: OUTFIT_ART, FOOD_ART.

// おめかし (worn accessories). Each category unlocks independently, in this
// object's key order (app.js reads Object.keys(OUTFIT_ART) as "the order to
// unlock おめかし in") -- see app.js's unlockFromCategory(). Which category
// advances on any given successful week is the user's own choice (a
// 2-choice "おめかし or えさ" prompt shown in Settings), not automatic.
// Unlock order: 首輪 → リボン → 王冠.
const OUTFIT_ART = {
  collar: {
    name: { ja: '首輪', en: 'Collar' },
    colors: { 5: '#ff3b30', 7: '#ffcc00' },
    overlay: { scale: 1, anchor: 'full' },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 5, 5, 7, 7, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  ribbon: {
    name: { ja: 'リボン', en: 'Ribbon' },
    colors: { 1: '#000000', 13: '#ff9a9a', 5: '#ff3b30', 29: '#c00000' },
    overlay: { scale: 0.7, anchor: 'top-right', offsetY: -3 },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 1, 13, 13, 1, 0, 0, 0, 0, 0, 0, 1, 13, 5, 1, 0],
      [0, 1, 5, 5, 5, 1, 0, 1, 1, 0, 1, 13, 5, 5, 1, 0],
      [0, 1, 5, 5, 5, 5, 1, 13, 5, 1, 13, 5, 5, 1, 0, 0],
      [0, 0, 1, 5, 5, 5, 1, 5, 5, 1, 5, 5, 5, 1, 0, 0],
      [0, 0, 1, 5, 29, 29, 1, 29, 29, 1, 29, 29, 29, 5, 1, 0],
      [0, 1, 29, 29, 29, 1, 0, 1, 1, 0, 1, 29, 29, 29, 1, 0],
      [0, 1, 5, 29, 1, 0, 0, 0, 0, 0, 0, 1, 29, 5, 1, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  crown: {
    name: { ja: '王冠', en: 'Crown' },
    colors: { 1: '#000000', 15: '#fff3a0', 7: '#ffcc00', 6: '#ff9500' },
    overlay: { scale: 0.7, anchor: 'top-right', offsetX: 3, offsetY: -10 },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 15, 7, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 7, 6, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [1, 15, 7, 1, 0, 0, 1, 15, 15, 1, 0, 0, 1, 15, 7, 1],
      [1, 7, 6, 1, 1, 0, 1, 15, 7, 1, 0, 1, 1, 7, 6, 1],
      [0, 1, 1, 6, 1, 1, 15, 7, 7, 6, 1, 1, 6, 1, 1, 0],
      [0, 0, 1, 6, 15, 1, 15, 7, 7, 6, 1, 15, 6, 1, 0, 0],
      [0, 0, 1, 6, 7, 15, 7, 7, 7, 7, 15, 7, 6, 1, 0, 0],
      [0, 0, 1, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1, 0, 0],
      [0, 0, 0, 1, 7, 7, 7, 7, 7, 7, 7, 7, 1, 0, 0, 0],
      [0, 0, 0, 1, 6, 6, 6, 6, 6, 6, 6, 6, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
};

// えさ (food). Same independent per-category unlock order as OUTFIT_ART.
// When one is equipped in Settings, it also replaces the "goal fish" icon at
// the end of the progress bar (see app.js's renderStretchProgressBar /
// walkGoal), i.e. the fish the cat is stretching/walking toward changes to
// whatever food is currently equipped.
// Unlock order: カリカリ → あのおやつ → ささみ → 猫草.
const FOOD_ART = {
  karikari: {
    name: { ja: 'カリカリ', en: 'Kibble' },
    colors: { 1: '#000000', 24: '#8b5e3c', 14: '#ffcb8e', 23: '#c47a5a', 4: '#ffffff', 3: '#aaaaaa', 22: '#e8a87c' },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 24, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 14, 1, 24, 23, 1, 23, 23, 1, 0, 0, 0],
      [0, 0, 1, 4, 1, 24, 14, 1, 1, 23, 1, 1, 3, 1, 0, 0],
      [0, 1, 4, 1, 1, 14, 14, 1, 1, 1, 23, 24, 1, 4, 1, 0],
      [1, 4, 1, 14, 23, 1, 1, 1, 23, 14, 1, 1, 23, 1, 4, 1],
      [1, 3, 1, 14, 24, 1, 24, 23, 1, 1, 1, 22, 23, 1, 4, 1],
      [0, 1, 3, 1, 1, 1, 23, 23, 1, 14, 14, 1, 1, 4, 1, 0],
      [0, 0, 1, 3, 4, 4, 1, 1, 1, 1, 1, 4, 4, 1, 0, 0],
      [0, 0, 0, 1, 1, 3, 3, 3, 4, 4, 4, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 22, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 23, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  churu: {
    name: { ja: 'あのおやつ', en: 'Squeeze Treat' },
    colors: { 21: '#fddcb5', 14: '#ffcb8e', 22: '#e8a87c', 1: '#000000', 13: '#ff9a9a', 5: '#ff3b30', 25: '#fee7ff', 29: '#c00000' },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 21, 21, 0, 0, 14, 14, 21, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 14, 14, 14, 14, 22, 0, 22, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 22, 22, 0, 0, 1, 1, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 13, 5, 5, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 13, 5, 25, 5, 5, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 13, 5, 25, 25, 5, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 13, 5, 25, 5, 5, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 13, 5, 25, 25, 5, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 13, 25, 5, 25, 5, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 13, 5, 25, 25, 29, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 13, 5, 5, 5, 29, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 29, 29, 29, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 29, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  sasami: {
    name: { ja: 'ささみ', en: 'Chicken' },
    colors: { 1: '#000000', 21: '#fddcb5', 14: '#ffcb8e', 4: '#ffffff', 22: '#e8a87c' },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 21, 21, 14, 14, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 21, 4, 4, 21, 21, 14, 14, 1, 0],
      [0, 0, 0, 0, 1, 21, 21, 4, 21, 21, 21, 21, 21, 1, 0, 0],
      [0, 0, 0, 0, 1, 21, 4, 21, 21, 14, 14, 21, 22, 1, 0, 0],
      [0, 0, 0, 1, 1, 21, 21, 14, 14, 14, 21, 22, 1, 0, 0, 0],
      [0, 0, 0, 1, 21, 14, 14, 14, 21, 22, 22, 1, 0, 0, 0, 0],
      [0, 0, 1, 14, 21, 21, 22, 22, 22, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 22, 22, 22, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  nekokusa: {
    name: { ja: '猫草', en: 'Cat Grass' },
    colors: { 1: '#000000', 16: '#a8f0a4', 8: '#34c759', 30: '#4ea72e', 3: '#aaaaaa', 4: '#ffffff' },
    grid: [
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 16, 1, 8, 1, 16, 8, 1, 0, 1, 1, 0],
      [0, 1, 16, 8, 1, 16, 8, 1, 16, 8, 1, 16, 1, 16, 1, 0],
      [0, 1, 30, 16, 8, 16, 1, 16, 8, 1, 16, 30, 16, 30, 1, 0],
      [0, 0, 1, 30, 16, 8, 1, 16, 8, 16, 30, 8, 30, 16, 1, 0],
      [0, 0, 1, 30, 16, 8, 30, 16, 8, 30, 16, 8, 30, 1, 0, 0],
      [0, 0, 0, 1, 30, 8, 30, 16, 8, 30, 16, 30, 16, 1, 0, 0],
      [0, 0, 0, 1, 30, 8, 30, 16, 8, 30, 8, 30, 1, 0, 0, 0],
      [0, 0, 1, 1, 30, 8, 30, 16, 8, 30, 8, 30, 1, 1, 0, 0],
      [0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 0],
      [0, 0, 1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0],
      [0, 0, 1, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0],
      [0, 0, 0, 1, 3, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0],
      [0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 4, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
};
