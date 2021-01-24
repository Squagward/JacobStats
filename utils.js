import numeral from "../numeraljs/index";
import { data } from "./constants";

export const charToString = char => char + "";

export const uuidCleaner = uuid => uuid.replace(/-/g, "");

export const resetData = () => {
  for (let crop in data) {
    data[crop].count = 0;
    data[crop].bestPos = null;
    data[crop].bestCount = 0;
  }

  data.total = 0;

  data.maxFarmingLvl = 50;
  data.farmingLvl = 0;
  data.anitaBonus = 0;
  data.uniqueGolds = 0;

  data.recentCrop = "";
  data.recentDate = {};
  data.recentCropData = {};

  data.totalMedals = {
    gold: 0,
    silver: 0,
    bronze: 0,
    none: 0
  };
};

export const withCommas = x => numeral(x).format("0,0");

export const percent = x => numeral(x).format("0.000%");

export const toPosition = x => {
  if (!x) return "N/A";

  const pos = numeral(x).format("0o");
  switch (pos) {
    case "1st":
      return "§61st";
    case "2nd":
      return "§72nd";
    case "3rd":
      return "§c3rd";
    default:
      return pos;
  }
};