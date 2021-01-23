/// <reference types="../CTAutocomplete/index" />
/// <reference lib="es2015" />

import * as Elementa from "../Elementa/index";
import { withCommas, toPosition, percent } from "./utils";
import { data, toNormal } from "./constants";
import { home, tab, infoBox } from "./tabs";
import { getNameData } from "./requestFns";

const container = new Elementa.UIContainer()
  .setX(new Elementa.CenterConstraint())
  .setY(new Elementa.CenterConstraint())
  .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (20).pixels()))
  .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedSizeConstraint(), (20).pixels()))
  .addChild(home.background);

const container2 = new Elementa.UIContainer()
  .setX(new Elementa.CenterConstraint())
  .setY(new Elementa.CenterConstraint())
  .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (20).pixels()))
  .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedSizeConstraint(), (20).pixels()))
  .addChild(tab.background);

const container3 = new Elementa.UIContainer()
  .setX((0).pixels())
  .setY((0).pixels())
  .setWidth(new Elementa.RelativeConstraint())
  .setHeight(new Elementa.RelativeConstraint())
  .addChildren(infoBox.background);

new Elementa.Window()
  .addChildren(container, container2, container3);

register("renderOverlay", () => {
  if (home.gui.isOpen()) home.background.draw();

  if (!tab.gui.isOpen()) return;
  tab.background.draw();

  if (tab.background.children.length < 13) return;

  try {
    infoBox.updateSize();

    if (tab.shownGroup.some(line => line.isHovered())) infoBox.background.draw();

    tab.shownGroup.forEach((line, i) => {
      if (!line.isHovered()) return;
      switch (i) {
        case 0:
          infoBox.setLines(
            "Farming Stats",
            `Farming Level: ${data.farmingLvl}`,
            `Anita Bonus: +${data.anitaBonus * 2}% Double Drops`,
            `Unique Gold Medals: ${data.uniqueGolds}`
          );
          break;

        case 1:
          infoBox.setLines(
            "Most Recent Event Info",
            "(Medaled & Claimed Rewards)",
            `${data.recentDate.month} ${toPosition(data.recentDate.day).removeFormatting()}, Year ${data.recentDate.year}`,
            `Crop: ${toNormal[data.recentCrop]}`,
            data.recentCropData.claimed_position + 1
              ? `Rank: ${toPosition(data.recentCropData.claimed_position + 1)} §r/ ${withCommas(data.recentCropData.claimed_participants)} (Top ${percent(data.recentCropData.claimed_position + 1 / data.recentCropData.claimed_participants)})`
              : "Rank: Not claimed or below Bronze!",
            `Collection: ${withCommas(data.recentCropData.collected)}`
          );
          break;

        case 2:
          infoBox.setLines(
            toNormal.WHEAT,
            `Best Rank: ${toPosition(data.WHEAT.bestPos)}`,
            `Best Collection: ${withCommas(data.WHEAT.bestCount)}`
          );
          break;

        case 3:
          infoBox.setLines(
            toNormal.CARROT_ITEM,
            `Best Rank: ${toPosition(data.CARROT_ITEM.bestPos)}`,
            `Best Collection: ${withCommas(data.CARROT_ITEM.bestCount)}`
          );
          break;

        case 4:
          infoBox.setLines(
            toNormal.POTATO_ITEM,
            `Best Rank: ${toPosition(data.POTATO_ITEM.bestPos)}`,
            `Best Collection: ${withCommas(data.POTATO_ITEM.bestCount)}`
          );
          break;

        case 5:
          infoBox.setLines(
            toNormal.PUMPKIN,
            `Best Rank: ${toPosition(data.PUMPKIN.bestPos)}`,
            `Best Collection: ${withCommas(data.PUMPKIN.bestCount)}`
          );
          break;

        case 6:
          infoBox.setLines(
            toNormal.MELON,
            `Best Rank: ${toPosition(data.MELON.bestPos)}`,
            `Best Collection: ${withCommas(data.MELON.bestCount)}`
          );
          break;

        case 7:
          infoBox.setLines(
            toNormal.MUSHROOM_COLLECTION,
            `Best Rank: ${toPosition(data.MUSHROOM_COLLECTION.bestPos)}`,
            `Best Collection: ${withCommas(data.MUSHROOM_COLLECTION.bestCount)}`
          );
          break;

        case 8:
          infoBox.setLines(
            toNormal.CACTUS,
            `Best Rank: ${toPosition(data.CACTUS.bestPos)}`,
            `Best Collection: ${withCommas(data.CACTUS.bestCount)}`
          );
          break;

        case 9:
          infoBox.setLines(
            toNormal.SUGAR_CANE,
            `Best Rank: ${toPosition(data.SUGAR_CANE.bestPos)}`,
            `Best Collection: ${withCommas(data.SUGAR_CANE.bestCount)}`
          );
          break;

        case 10:
          infoBox.setLines(
            toNormal.NETHER_STALK,
            `Best Rank: ${toPosition(data.NETHER_STALK.bestPos)}`,
            `Best Collection: ${withCommas(data.NETHER_STALK.bestCount)}`
          );
          break;

        case 11:
          infoBox.setLines(
            toNormal.INK_SACK,
            `Best Rank: ${toPosition(data.INK_SACK.bestPos)}`,
            `Best Collection: ${withCommas(data.INK_SACK.bestCount)}`
          );
          break;

        case 12:
          infoBox.setLines(
            "Total Medal §lEstimation§r:",
            `§6Gold§r: ${withCommas(data.totalMedals.gold)} - ${percent(data.totalMedals.gold / data.total)}`,
            `§7Silver§r: ${withCommas(data.totalMedals.silver)} - ${percent(data.totalMedals.silver / data.total)}`,
            `§cBronze§r: ${withCommas(data.totalMedals.bronze)} - ${percent(data.totalMedals.bronze / data.total)}`,
            `None: ${withCommas(data.totalMedals.none)} - ${percent(data.totalMedals.none / data.total)}`
          );
          break;
      }
    });
  }
  catch (e) {
    return;
  };
});

register("guiKey", (char, keyCode) => {
  if (!home.gui.isOpen() && !tab.gui.isOpen()) return; // if both tabs are closed, do nothing

  home.addLetter(char, keyCode);

  if (keyCode === 211 || keyCode === 203) { // DELETE & LEFT
    tab.close();
    home.open();
  }

  if (keyCode === 28) { // ENTER
    if (!home.text) return;
    const text = home.text;
    home.close();
    getNameData(text);
  }
});

register("command", name => {
  if (name) getNameData(name);
  if (!name) getNameData(Player.getName());
}).setName("jacob");

// Sample jacob2 Data
/*{
  "medals_inv":{
    "bronze":2,
    "silver":1,
    "gold":26
  },"perks":{
    "double_drops":7,
    "farming_level_cap":1
  },
  "contests":{
    "99:6_30:SUGAR_CANE":{
      "collected":2911,
      "claimed_rewards":true,
      "claimed_position":3726,
      "claimed_participants":4721
    },
    {...}
  },
  "talked":true,
  "unique_golds2":[
    "CARROT_ITEM",
    "SUGAR_CANE",
    "PUMPKIN",
    "WHEAT"
  ]
}
*/