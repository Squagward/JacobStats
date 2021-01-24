import request from "../requestV2/index";
import { uuidCleaner, withCommas } from "./utils";
import { data, cropRegex, sbCal, colorAdded, skillCurves, loadMsgs } from "./constants";
import { home, tab } from "./tabs";

const stepper = register("step", steps => {
  tab.setText(loadMsgs[steps % loadMsgs.length]);
}).setFps(5);

const sendReq = url => request({
  url,
  json: true,
  connectTimeout: 10000,
  readTimeout: 10000,
  headers: {
    "User-Agent": "Mozilla/5.0 (ChatTriggers)"
  }
});

export const getNameData = n => {
  home.close();
  tab.open();

  tab.setTitle(`Loading data for ${n}`);
  stepper.register();

  sendReq(`https://api.ashcon.app/mojang/v2/user/${n}`)
    .then(({ uuid, username }) => {
      const cleanUUID = uuidCleaner(uuid);
      tab.setTitle(`Loading data for ${username}`);

      return getProfiles(cleanUUID, username);
    })
    .catch(e => {
      stepper.unregister();
      print(`JacobStats Error:\n${JSON.stringify(e)}`);

      if (e.reason.includes("No user with the name"))
        e.reason = "No Minecraft account found";

      tab.setHeader(
        `§cError loading Mojang data for ${n}`,
        `${e.error} - ${e.reason}`
      );
      tab.updateTabSize();
    });
};

export const getProfiles = (cleanUUID, username) => {
  sendReq(`https://api.slothpixel.me/api/skyblock/profiles/${cleanUUID}`)
    .then(profiles => {
      let latest;
      const recent = Object.values(profiles)
        .map(p => p.last_save)
        .reduce((a, b) => a > b ? a : b);

      for ([key, val] of Object.entries(profiles))
        if (val.last_save === recent)
          latest = key;
      return getLatest(cleanUUID, username, latest);
    })
    .catch(e => {
      stepper.unregister();
      print(`JacobStats Error:\n${JSON.stringify(e)}`);

      if (e.message === "Reduce of empty array with no initial value")
        e.message = "Player has no Skyblock profiles";

      tab.setHeader(
        `§cError loading all profiles data for ${username}`,
        e.message ?? ""
      );
      tab.updateTabSize();
    });
};

export const getLatest = (cleanUUID, username, latest) => {
  sendReq(`https://api.slothpixel.me/api/skyblock/profile/${cleanUUID}/${latest}`)
    .then(({ members }) => {
      const theProfile = members[cleanUUID];
      const {
        jacob2: {
          perks: {
            double_drops,
            farming_level_cap
          },
          contests,
          unique_golds2
        }
      } = theProfile;
      const totalContests = Object.entries(contests);

      data.total = totalContests.length;
      data.maxFarmingLvl += farming_level_cap ?? 0;
      data.anitaBonus = double_drops ?? 0;
      data.uniqueGolds = unique_golds2?.length ?? 0;

      for (let i = 0; i < skillCurves.length; i++) {
        if (!theProfile.skills.farming) {
          data.farmingLvl = "§cAPI Disabled";
          break;
        }
        if (
          theProfile.skills.farming.xp < skillCurves[i] ||
          data.maxFarmingLvl < data.farmingLvl + 1
        ) break;
        data.farmingLvl++;
      }

      for (let i = totalContests.length - 1; i >= 0; i--) {
        let [key, value] = totalContests[i];
        let {
          collected,
          claimed_rewards,
          claimed_position,
          claimed_participants
        } = value;

        let year = +cropRegex.exec(key)[1] + 1;
        let month = sbCal[cropRegex.exec(key)[2]];
        let day = +cropRegex.exec(key)[3];
        let crop = cropRegex.exec(key)[4];

        if (!data.recentDate.day && claimed_rewards) {
          data.recentDate = { day, month, year };

          data.recentCrop = crop;
          data.recentCropData = value;
        }

        data[crop].count++;

        if (collected > data[crop].bestCount) data[crop].bestCount = collected;
        if (claimed_position < data[crop].bestPos) data[crop].bestPos = claimed_position + 1;

        let percent = claimed_position / claimed_participants;

        if (percent <= 0.05) data.totalMedals.gold++;
        else if (percent <= 0.25) data.totalMedals.silver++;
        else if (percent <= 0.6) data.totalMedals.bronze++;
      }

      const allMedals = data.totalMedals.gold + data.totalMedals.silver + data.totalMedals.bronze;
      data.totalMedals.none = totalContests.length - allMedals;

      stepper.unregister();

      tab.setLines(
        `${username}'s Farming Stats`,
        `§a§lContests Participated:`,
        `${colorAdded.WHEAT}§r: ${data.WHEAT.count}`,
        `${colorAdded.CARROT_ITEM}§r: ${data.CARROT_ITEM.count}`,
        `${colorAdded.POTATO_ITEM}§r: ${data.POTATO_ITEM.count}`,
        `${colorAdded.PUMPKIN}§r: ${data.PUMPKIN.count}`,
        `${colorAdded.MELON}§r: ${data.MELON.count}`,
        `${colorAdded.MUSHROOM_COLLECTION}§r: ${data.MUSHROOM_COLLECTION.count}`,
        `${colorAdded.CACTUS}§r: ${data.CACTUS.count}`,
        `${colorAdded.SUGAR_CANE}§r: ${data.SUGAR_CANE.count}`,
        `${colorAdded.NETHER_STALK}§r: ${data.NETHER_STALK.count}`,
        `${colorAdded.INK_SACK}§r: ${data.INK_SACK.count}`,
        `§9Total§r: ${withCommas(data.total)}` // if someone hits 1000 that would be nuts
      );
      tab.updateTabSize();
    })
    .catch(e => {
      stepper.unregister();
      print(`JacobStats Error:\n${JSON.stringify(e)}`);

      if (e.error === "Cannot use 'in' operator to search for 'stats' in undefined")
        e.error = "No data for profile in Slothpixel API";

      tab.setHeader(
        `§cError loading current profile data for ${username}`,
        e.error ?? ""
      );
      tab.updateTabSize();
    });
};