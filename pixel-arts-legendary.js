// pixel-arts-legendary.js
// The Legendary Cat (伝説のねこ) -- a rainbow-colored cat unlocked once the
// user reaches a full month of consistent achievement (see app.js's
// evaluateRewards(): LEGENDARY_STREAK_DAYS consecutive successful days).
//
// Kept in its own registry (LEGENDARY_ART_GRIDS) separate from
// PIXEL_ART_GRIDS in pixel-arts.js, so it can be swapped for real hand-drawn
// art later without touching the default-cat file. It uses the exact same
// {name, colors, poses:{walking,sitting}} shape as entries in
// PIXEL_ART_GRIDS, so it can be rendered with the same renderPixelArt() /
// renderStretchProgressBar() as any other cat once app.js's getCatArt()
// looks it up (see app.js).
//
// Placeholder approach: rather than hand-authoring a full 16x16 sprite for a
// sprite that's going to be replaced anyway, this derives a "rainbow" recolor
// from the existing white cat's silhouette in pixel-arts.js (loaded before
// this file) -- every non-outline pixel of the white cat's walking/sitting
// pose gets banded into a 7-color rainbow by row. Swap this whole file out
// for real art later; nothing else depends on *how* the grid was produced,
// only that LEGENDARY_ART_GRIDS.rainbow exists in the right shape.
const LEGENDARY_ART_GRIDS = (function(){
  const RAINBOW = ['#FF6B6B', '#FFA94D', '#FFE066', '#8CE99A', '#66D9E8', '#91A7FF', '#D0A6FF'];
  const RAINBOW_BASE_INDEX = 100; // arbitrary palette indices unused by the base cat, so we don't clash with its outline (1) etc.

  function recolorRainbow(grid){
    return grid.map((row, y) => row.map(v => (v === 4) ? (RAINBOW_BASE_INDEX + (y % RAINBOW.length)) : v));
  }
  function rainbowColors(outlineHex){
    const colors = { 1: outlineHex || '#2B2A3A' };
    RAINBOW.forEach((hex, i) => { colors[RAINBOW_BASE_INDEX + i] = hex; });
    return colors;
  }

  const base = (typeof PIXEL_ART_GRIDS !== 'undefined' && PIXEL_ART_GRIDS.white) ? PIXEL_ART_GRIDS.white : null;
  const walking = base ? recolorRainbow(base.poses.walking) : [];
  const sitting = base ? recolorRainbow(base.poses.sitting) : [];
  const outline = base ? (base.colors && base.colors[1]) : '#2B2A3A';

  return {
    rainbow: {
      name: { ja: '伝説のねこ', en: 'Legendary Cat' },
      legendary: true,
      colors: rainbowColors(outline),
      poses: { walking, sitting }
    }
  };
})();
