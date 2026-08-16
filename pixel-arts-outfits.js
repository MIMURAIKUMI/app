// pixel-arts-outfits.js
// Placeholder art for the unlockable "おめかし" (outfit/accessory) and "えさ"
// (food) rewards, kept in its own file (separate from pixel-arts.js and
// pixel-arts-legendary.js) so real art can be dropped in later without
// touching the default-cat registry or the app logic in app.js.
//
// Every item below is a plain dummy 16x16 red circle -- only the name and
// (loosely) the tint differ -- on purpose: the real sprites will be supplied
// later and swapped in item-by-item. Nothing in app.js cares what the grid
// actually looks like, only that OUTFIT_ART[key] / FOOD_ART[key] exist with
// a `name` and a single 16x16 `grid` + `colors` map (unlike the cats in
// pixel-arts.js, these are single static icons, not walking/sitting poses).
//
// Loaded via <script> before app.js (and after pixel-arts.js), so these
// become globals: OUTFIT_ART, FOOD_ART, REWARD_SEQUENCE.

// A simple filled circle in a 16x16 grid, palette index 1. Generated once at
// load time instead of hand-authored so every placeholder item can share the
// exact same "dummy" shape.
function _dummyCircleGrid16(){
  const grid = [];
  const cx = 7.5, cy = 7.5, r = 6.5;
  for(let y = 0; y < 16; y++){
    const row = [];
    for(let x = 0; x < 16; x++){
      row.push((Math.hypot(x - cx, y - cy) <= r) ? 1 : 0);
    }
    grid.push(row);
  }
  return grid;
}
const DUMMY_CIRCLE_GRID = _dummyCircleGrid16();

// おめかし (worn accessories) -- unlocked in this order.
const OUTFIT_ART = {
  ribbon: { name: { ja: 'リボン', en: 'Ribbon' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
  collar: { name: { ja: '首輪', en: 'Collar' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
  crown:  { name: { ja: '王冠', en: 'Crown' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
};

// えさ (food) -- unlocked after all outfits. When one is equipped in
// Settings, it also replaces the "goal fish" icon at the end of the
// progress bar (see app.js's renderStretchProgressBar / walkGoal), i.e. the
// fish the cat is stretching/walking toward changes to whatever food is
// currently equipped.
const FOOD_ART = {
  karikari: { name: { ja: 'カリカリ', en: 'Kibble' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
  churu:    { name: { ja: 'ちゅーる', en: 'Churu' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
  catgrass: { name: { ja: '猫草', en: 'Cat Grass' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
  sasami:   { name: { ja: 'とりささみ', en: 'Chicken Breast' }, colors: { 1: '#FF4D4D' }, grid: DUMMY_CIRCLE_GRID },
};

// Order in which weekly-success rewards are unlocked -- one item per
// successful week (see app.js's evaluateRewards()/unlockNextReward()).
// index into this array == rewards.totalSuccessWeeks *before* that week's
// unlock is applied.
const REWARD_SEQUENCE = [
  { type: 'outfit', key: 'ribbon' },
  { type: 'outfit', key: 'collar' },
  { type: 'outfit', key: 'crown' },
  { type: 'food', key: 'karikari' },
  { type: 'food', key: 'churu' },
  { type: 'food', key: 'catgrass' },
  { type: 'food', key: 'sasami' },
];
