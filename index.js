/// <reference types="../CTAutocomplete/index" />
/// <reference lib="es2015" />

import * as Elementa from "../Elementa/index";
import request from "../requestV2/index";
import Homepage, { Tab, InfoBox } from "./homepage";
import { uuidCleaner, withCommas, toPosition, percent } from "./utils/utils";
import { crops, cropRegex, skillCurves, toNormal, loadMsgs, sbCal } from "./constants";

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
  if (tab.gui.isOpen()) {

    tab.background.draw();
    if (tab.background.children.length <= 2) return;
    // TODO: refactor all of this since it pains my eyes but it works now
    try {
      if (tab.shownGroup[0].isHovered()) {
        infoBox.setLines(
          "Farming Stats",
          `Farming Level: ${crops.farmingLvl}`,
          `Anita Bonus: +${crops.anitaBonus * 2}% Extra Double Drops`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[1].isHovered()) {
        infoBox.setLines(
          "Most Recent Event Info",
          "(Medaled & Claimed Rewards)",
          `${crops.recentDate.month} ${toPosition(crops.recentDate.day).removeFormatting()}, Year ${crops.recentDate.year}`,
          `Crop: ${toNormal[crops.recentCrop]}`,
          crops.recentCropData.claimed_position + 1
            ? `Rank: ${toPosition(crops.recentCropData.claimed_position + 1)} §r/ ${withCommas(crops.recentCropData.claimed_participants)} (Top ${percent(crops.recentCropData.claimed_position + 1, crops.recentCropData.claimed_participants)})`
            : "Rank: Not claimed or below Bronze!",
          `Collection: ${withCommas(crops.recentCropData.collected)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[2].isHovered()) {
        infoBox.setLines(
          toNormal.WHEAT,
          `Best Rank: ${toPosition(crops.WHEAT.bestPos)}`,
          `Best Collection: ${withCommas(crops.WHEAT.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[3].isHovered()) {
        infoBox.setLines(
          toNormal.CARROT_ITEM,
          `Best Rank: ${toPosition(crops.CARROT_ITEM.bestPos)}`,
          `Best Collection: ${withCommas(crops.CARROT_ITEM.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[4].isHovered()) {
        infoBox.setLines(
          toNormal.POTATO_ITEM,
          `Best Rank: ${toPosition(crops.POTATO_ITEM.bestPos)}`,
          `Best Collection: ${withCommas(crops.POTATO_ITEM.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[5].isHovered()) {
        infoBox.setLines(
          toNormal.PUMPKIN,
          `Best Rank: ${toPosition(crops.PUMPKIN.bestPos)}`,
          `Best Collection: ${withCommas(crops.PUMPKIN.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[6].isHovered()) {
        infoBox.setLines(
          toNormal.MELON,
          `Best Rank: ${toPosition(crops.MELON.bestPos)}`,
          `Best Collection: ${withCommas(crops.MELON.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[7].isHovered()) {
        infoBox.setLines(
          toNormal.MUSHROOM_COLLECTION,
          `Best Rank: ${toPosition(crops.MUSHROOM_COLLECTION.bestPos)}`,
          `Best Collection: ${withCommas(crops.MUSHROOM_COLLECTION.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[8].isHovered()) {
        infoBox.setLines(
          toNormal.CACTUS,
          `Best Rank: ${toPosition(crops.CACTUS.bestPos)}`,
          `Best Collection: ${withCommas(crops.CACTUS.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[9].isHovered()) {
        infoBox.setLines(
          toNormal.SUGAR_CANE,
          `Best Rank: ${toPosition(crops.SUGAR_CANE.bestPos)}`,
          `Best Collection: ${withCommas(crops.SUGAR_CANE.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[10].isHovered()) {
        infoBox.setLines(
          toNormal.NETHER_STALK,
          `Best Rank: ${toPosition(crops.NETHER_STALK.bestPos)}`,
          `Best Collection: ${withCommas(crops.NETHER_STALK.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[11].isHovered()) {
        infoBox.setLines(
          toNormal.INK_SACK,
          `Best Rank: ${toPosition(crops.INK_SACK.bestPos)}`,
          `Best Collection: ${withCommas(crops.INK_SACK.bestCount)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
      else if (tab.shownGroup[12].isHovered()) {
        infoBox.setLines(
          "Total Medal Estimation:",
          `§6Gold§r: ${withCommas(crops.totalMedals.gold)} - ${percent(crops.totalMedals.gold, crops.total)}`,
          `§7Silver§r: ${withCommas(crops.totalMedals.silver)} - ${percent(crops.totalMedals.silver, crops.total)}`,
          `§cBronze§r: ${withCommas(crops.totalMedals.bronze)} - ${percent(crops.totalMedals.bronze, crops.total)}`,
          `None: ${withCommas(crops.totalMedals.none)} - ${percent(crops.totalMedals.none, crops.total)}`
        );
        infoBox.updateSize();
        infoBox.background.draw();
      }
    }
    catch (e) {
      return;
    };
  }
});

register("guiKey", (char, keyCode) => {
  if (!home.gui.isOpen() && !tab.gui.isOpen()) return; // if both tabs are closed, do nothing

  home.addLetter(char, keyCode);

  if (keyCode === 211 || keyCode === 203) { // DELETE & LEFT
    tab.close();
    home.open();
  }

  if (keyCode === 28) { // ENTER
    const name = home.text;
    home.close();
    tab.open();

    tab.setTitle(`Loading data for ${name}`);
    stepper.register();

    request({
      url: `https://api.ashcon.app/mojang/v2/user/${name}`,
      json: true,
      connectTimeout: 10000,
      readTimeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (ChatTriggers)"
      }
    })
      .then(data => {
        const username = data.username;
        const cleanUUID = uuidCleaner(data.uuid);
        tab.setTitle(`Loading data for ${username}`);

        request({
          url: `https://api.slothpixel.me/api/skyblock/profiles/${cleanUUID}`,
          json: true,
          connectTimeout: 10000,
          readTimeout: 10000,
          headers: {
            "User-Agent": "Mozilla/5.0 (ChatTriggers)"
          }
        })
          .then(profiles => {
            let recent;
            const profs = Object.entries(profiles);
            const lastJoined = Math.max(...Object.values(profiles).map(p => p.last_save));

            profs.forEach(p => {
              if (p[1].last_save === lastJoined) recent = p[0];
            });
            request({
              url: `https://api.slothpixel.me/api/skyblock/profile/${cleanUUID}/${recent}`,
              json: true,
              connectTimeout: 10000,
              readTimeout: 10000,
              headers: {
                "User-Agent": "Mozilla/5.0 (ChatTriggers)"
              }
            })
              .then(pData => {
                const theProfile = pData.members[cleanUUID];
                const jacob = theProfile.jacob2;
                const totalContests = Object.entries(jacob.contests);

                crops.maxFarmingLvl += jacob.perks.farming_level_cap ?? 0;
                crops.anitaBonus = jacob.perks.double_drops ?? 0;

                for (let i = 0; i < skillCurves.length; i++) {
                  if (!theProfile.skills.farming) {
                    crops.farmingLvl = "§cAPI Disabled";
                    break;
                  }
                  if (theProfile.skills.farming.xp < skillCurves[i] || crops.maxFarmingLvl < crops.farmingLvl + 1) break;
                  else crops.farmingLvl++;
                }

                for (let i = totalContests.length - 1; i >= 0; i--) {
                  let key = totalContests[i][0];
                  let value = totalContests[i][1];

                  let sbYear = parseInt(cropRegex.exec(key)[1]) + 1;
                  let sbMon = sbCal.month[cropRegex.exec(key)[2]];
                  let sbDay = parseInt(cropRegex.exec(key)[3]);
                  let crop = cropRegex.exec(key)[4];

                  if (!value.claimed_rewards) continue; // if you didn't get bronze, it doesn't track it

                  if (!crops.recentDate.day) {
                    crops.recentDate.day = sbDay;
                    crops.recentDate.month = sbMon;
                    crops.recentDate.year = sbYear;

                    crops.recentCrop = crop;
                    crops.recentCropData = value;
                  }

                  crops[crop].count++;
                  crops.total++;


                  if (value.collected > crops[crop].bestCount) crops[crop].bestCount = value.collected;
                  if (value.claimed_position < crops[crop].bestPos) crops[crop].bestPos = value.claimed_position + 1;

                  let percent = value.claimed_position / value.claimed_participants;

                  if (percent <= 0.05) crops.totalMedals.gold++;
                  else if (percent <= 0.25) crops.totalMedals.silver++;
                  else if (percent <= 0.6) crops.totalMedals.bronze++;
                  else crops.totalMedals.none++;
                }

                stepper.unregister();

                tab.setLines(
                  `${username}'s Farming Stats`,
                  `§a§lContests Participated:`,
                  `${toNormal.WHEAT}: §r${crops.WHEAT.count}`,
                  `${toNormal.CARROT_ITEM}: §r${crops.CARROT_ITEM.count}`,
                  `${toNormal.POTATO_ITEM}: §r${crops.POTATO_ITEM.count}`,
                  `${toNormal.PUMPKIN}: §r${crops.PUMPKIN.count}`,
                  `${toNormal.MELON}: §r${crops.MELON.count}`,
                  `${toNormal.MUSHROOM_COLLECTION}: §r${crops.MUSHROOM_COLLECTION.count}`,
                  `${toNormal.CACTUS}: §r${crops.CACTUS.count}`,
                  `${toNormal.SUGAR_CANE}: §r${crops.SUGAR_CANE.count}`,
                  `${toNormal.NETHER_STALK}: §r${crops.NETHER_STALK.count}`,
                  `${toNormal.INK_SACK}: §r${crops.INK_SACK.count}`,
                  `§9Total: §r${withCommas(crops.total)}` // if someone hits 1000 that would be nuts
                );
                tab.updateTabSize();

              }).catch(e => {
                stepper.unregister();
                tab.setHeader(
                  `§cError loading Profile data for ${username}`,
                  e.error ?? ""
                );
                tab.updateTabSize();
              });
          }).catch(e => {
            stepper.unregister();
            tab.setHeader(
              `§cError loading Profiles data for ${username}`,
              e.message ?? ""
            );
            tab.updateTabSize();
          });
      }).catch(e => {
        stepper.unregister();
        tab.setHeader(
          `§cError loading Mojang data for ${name}`,
          `${e.error} - ${e.reason}`
        );
        tab.updateTabSize();
      });
  }
});

register("command", () => {
  home.open();
}).setName("jacob");

const stepper = register("step", (steps) => {
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