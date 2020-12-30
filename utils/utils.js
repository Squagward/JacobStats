import numeral from "../../numeraljs/index";
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

export const withCommas = x => numeral(x).format("0,0");

export const toPosition = x => {
  const out = numeral(x).format("0o");
  switch (out) {
    case "1st":
      return "§61st";
    case "2nd":
      return "§72nd";
    case "3rd":
      return "§c3rd";
    default:
      return out;
  }
};

export const percent = (top, bottom) => numeral(top / bottom).format("0.000%");