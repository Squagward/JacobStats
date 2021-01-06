/// <reference types="../CTAutocomplete/index" />
/// <reference lib="es2015" />

import * as Elementa from "../Elementa/index";
import { Homepage, Tab, InfoBox } from "./homepage";
import { sendReq, uuidCleaner, withCommas, toPosition, percent } from "./utils";
import { data, cropRegex, skillCurves, toNormal, loadMsgs, sbCal } from "./constants";

const home = new Homepage();
const tab = new Tab();
const infoBox = new InfoBox();

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

const window = new Elementa.Window()
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
            `Anita Bonus: +${data.anitaBonus * 2}% Double Drops`
          );
          break;

        case 1:
          infoBox.setLines(
            "Most Recent Event Info",
            "(Medaled & Claimed Rewards)",
            `${data.recentDate.month} ${toPosition(data.recentDate.day).removeFormatting()}, Year ${data.recentDate.year}`,
            `Crop: ${toNormal[data.recentCrop]}`,
            data.recentCropData.claimed_position + 1
              ? `Rank: ${toPosition(data.recentCropData.claimed_position + 1)} §r/ ${withCommas(data.recentCropData.claimed_participants)} (Top ${percent(data.recentCropData.claimed_position + 1, data.recentCropData.claimed_participants)})`
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
            `§6Gold§r: ${withCommas(data.totalMedals.gold)} - ${percent(data.totalMedals.gold, data.total)}`,
            `§7Silver§r: ${withCommas(data.totalMedals.silver)} - ${percent(data.totalMedals.silver, data.total)}`,
            `§cBronze§r: ${withCommas(data.totalMedals.bronze)} - ${percent(data.totalMedals.bronze, data.total)}`,
            `None: ${withCommas(data.totalMedals.none)} - ${percent(data.totalMedals.none, data.total)}`
          );
          break;
      }
    });
  }
  catch (e) {
    return;
  };
});

let cleanUUID, name;
register("guiKey", (char, keyCode) => {
  if (!home.gui.isOpen() && !tab.gui.isOpen()) return; // if both tabs are closed, do nothing

  home.addLetter(char, keyCode);

  if (keyCode === 211 || keyCode === 203) { // DELETE & LEFT
    tab.close();
    home.open();
  }

  if (keyCode === 28) { // ENTER
    const unformName = home.text;
    home.close();
    tab.open();

    tab.setTitle(`Loading data for ${unformName}`);
    stepper.register();

    let step = 0;
    sendReq(`https://api.ashcon.app/mojang/v2/user/${unformName}`)
      .then(({ uuid, username }) => {
        name = username;
        cleanUUID = uuidCleaner(uuid);
        tab.setTitle(`Loading data for ${name}`);

        step++;
        return sendReq(`https://api.slothpixel.me/api/skyblock/profiles/${cleanUUID}`);
      })
      .then(profiles => {
        let latest;
        const recent = Object.values(profiles)
          .map(p => p.last_save)
          .reduce((a, b) => a > b ? a : b);

        for ([key, val] of Object.entries(profiles))
          if (val.last_save === recent)
            latest = key;

        step++;
        return sendReq(`https://api.slothpixel.me/api/skyblock/profile/${cleanUUID}/${latest}`);
      })
      .then(({ members }) => {
        const theProfile = members[cleanUUID];
        const { contests, perks } = theProfile.jacob2; // no need to do this but I just wanted to test out destructuring
        const totalContests = Object.entries(contests);

        data.total = totalContests.length;
        data.maxFarmingLvl += perks.farming_level_cap ?? 0;
        data.anitaBonus = perks.double_drops ?? 0;

        for (let i = 0; i < skillCurves.length; i++) {
          if (!theProfile.skills.farming) {
            data.farmingLvl = "§cAPI Disabled";
            break;
          }
          if (theProfile.skills.farming.xp < skillCurves[i] || data.maxFarmingLvl < data.farmingLvl + 1) break;
          else data.farmingLvl++;
        }

        for (let i = totalContests.length - 1; i >= 0; i--) {
          let key = totalContests[i][0];
          let value = totalContests[i][1];
          let { claimed_rewards: rewards,
            claimed_participants: players,
            claimed_position: pos,
            collected
          } = value;

          let sbYear = parseInt(cropRegex.exec(key)[1]) + 1;
          let sbMonth = sbCal[cropRegex.exec(key)[2]];
          let sbDay = parseInt(cropRegex.exec(key)[3]);
          let crop = cropRegex.exec(key)[4];

          if (!data.recentDate.day && rewards) {
            data.recentDate = {
              day: sbDay,
              month: sbMonth,
              year: sbYear
            };

            data.recentCrop = crop;
            data.recentCropData = value;
          }

          data[crop].count++;

          if (collected > data[crop].bestCount) data[crop].bestCount = collected;
          if (pos < data[crop].bestPos) data[crop].bestPos = pos + 1;

          let percent = pos / players;

          if (percent <= 0.05) data.totalMedals.gold++;
          else if (percent <= 0.25) data.totalMedals.silver++;
          else if (percent <= 0.6) data.totalMedals.bronze++;
        }

        const allMedals = data.totalMedals.gold + data.totalMedals.silver + data.totalMedals.bronze;
        data.totalMedals.none = totalContests.length - allMedals;

        stepper.unregister();

        tab.setLines(
          `${name}'s Farming Stats`,
          `§a§lContests Participated:`,
          `${toNormal.WHEAT}§r: ${data.WHEAT.count}`,
          `${toNormal.CARROT_ITEM}§r: ${data.CARROT_ITEM.count}`,
          `${toNormal.POTATO_ITEM}§r: ${data.POTATO_ITEM.count}`,
          `${toNormal.PUMPKIN}§r: ${data.PUMPKIN.count}`,
          `${toNormal.MELON}§r: ${data.MELON.count}`,
          `${toNormal.MUSHROOM_COLLECTION}§r: ${data.MUSHROOM_COLLECTION.count}`,
          `${toNormal.CACTUS}§r: ${data.CACTUS.count}`,
          `${toNormal.SUGAR_CANE}§r: ${data.SUGAR_CANE.count}`,
          `${toNormal.NETHER_STALK}§r: ${data.NETHER_STALK.count}`,
          `${toNormal.INK_SACK}§r: ${data.INK_SACK.count}`,
          `§9Total§r: ${withCommas(data.total)}` // if someone hits 1000 that would be nuts
        );
        tab.updateTabSize();
      })
      .catch(e => {
        print(`\nJacobStats Error:\n${JSON.stringify(e)}\n`);

        stepper.unregister();

        switch (step) {
          case 0:
            tab.setHeader(
              `§cError loading Mojang data for ${unformName}`,
              `${e.error} - ${e.reason}`
            );
            break;
          case 1:
            tab.setHeader(
              `§cError loading all profiles data for ${name}`,
              e.message ?? ""
            );
            break;
          case 2:
            tab.setHeader(
              `§cError loading current profile data for ${name}`,
              e.error ?? ""
            );
            break;
        }

        tab.updateTabSize();
      });
  }
});

register("command", name => {
  home.open();
  if (name) home.setText(name);
}).setName("jacob");

const stepper = register("step", steps => {
  tab.setText(loadMsgs[steps % loadMsgs.length]);
}).setFps(5);


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