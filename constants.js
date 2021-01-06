const Color = Java.type("java.awt.Color");

export const data = {
  WHEAT: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  CARROT_ITEM: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  POTATO_ITEM: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  PUMPKIN: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  MELON: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  MUSHROOM_COLLECTION: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  CACTUS: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  SUGAR_CANE: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  NETHER_STALK: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },
  INK_SACK: {
    count: 0,
    bestPos: 9999,
    bestCount: 0
  },

  total: 0,

  maxFarmingLvl: 50,
  farmingLvl: 0,
  anitaBonus: 0,

  recentDate: {},
  recentCrop: "",
  recentCropData: {},

  totalMedals: {
    gold: 0,
    silver: 0,
    bronze: 0,
    none: 0
  }
};

export const toNormal = {
  WHEAT: "§eWheat",
  CARROT_ITEM: "§6Carrot",
  POTATO_ITEM: "§ePotato",
  PUMPKIN: "§6Pumpkin",
  MELON: "§2Melon",
  MUSHROOM_COLLECTION: "§cMushroom",
  CACTUS: "§aCactus",
  SUGAR_CANE: "§aSugar Cane",
  NETHER_STALK: "§4Nether Wart",
  INK_SACK: "§cCocoa Beans"
};

export const loadMsgs = [
  "Loading",
  "Loading.",
  "Loading..",
  "Loading...",
  "Loading..",
  "Loading."
];

export const sbCal = {
  1: "Early Spring",
  2: "Spring",
  3: "Late Spring",
  4: "Early Summer",
  5: "Summer",
  6: "Late Summer",
  7: "Early Autumn",
  8: "Autumn",
  9: "Late Autumn",
  10: "Early Winter",
  11: "Winter",
  12: "Late Winter"
};

export const theColor = new Color(.5, .5, .5, .7);

export const cropRegex = /(\d+):(?:(\d{1,2})_(\d{1,2})):(\w+)/; // year=g1+1 month=g2 day=g3 g4=crop

export const skillCurves = [
  50,
  175,
  375,
  675,
  1175,
  1925,
  2925,
  4425,
  6425,
  9925,
  14925,
  22425,
  32425,
  47425,
  67425,
  97425,
  147425,
  222425,
  322425,
  522425,
  822425,
  1222425,
  1722425,
  2322425,
  3022425,
  3822425,
  4722425,
  5722425,
  6822425,
  8022425,
  9322425,
  10722425,
  12222425,
  13822425,
  15522425,
  17322425,
  19222425,
  21222425,
  23322425,
  25522425,
  27822425,
  30222425,
  32722425,
  35322425,
  38072425,
  40972425,
  44072425,
  47472425,
  51172425,
  55172425,
  59472425,
  64072425,
  68972452,
  74172425,
  79672425,
  85472425,
  91572425,
  97972425,
  104672425,
  111672425
];