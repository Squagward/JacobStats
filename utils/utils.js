import { crops } from "../constants";

export const charToString = char => char + "";

export const uuidCleaner = uuid => uuid.replace(/-/g, "");

export const resetCrops = () => {
  for (let crop in crops) {
    crops[crop].count = 0;
    crops[crop].bestPos = 9999;
    crops[crop].bestCount = 0;
  }

  crops.total = 0;

  crops.maxFarmingLvl = 50;
  crops.farmingLvl = 0;
  crops.anitaBonus = 0;

  crops.recentCrop = "";
  crops.recentDate = {};
  crops.recentCropData = {};

  crops.totalMedals = {
    gold: 0,
    silver: 0,
    bronze: 0,
    none: 0
  };
};

// stolen from SlayerUtilities by Antonio32A & Marti157
export const fancyNumber = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/* 
  really have no idea how this works. just copy pasted it in from here
  https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/td-p/72156
 */
export const toPosition = num => {
  const suffix = ["th", "st", "nd", "rd"],
    v = num % 100;
  const placeVal = num + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
  if (placeVal === "1st") return `§6${placeVal}`;
  else if (placeVal === "2nd") return `§7${placeVal}`;
  else if (placeVal === "3rd") return `§c${placeVal}`;
  return placeVal;
};

export const percentile = (top, bottom) => Math.round((1 - (top / bottom)) * 100 * 1000) / 1000;

export const toPercent = (top, bottom) => Math.round(top / bottom * 100 * 1000) / 1000;