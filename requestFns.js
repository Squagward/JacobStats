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

export const getNameData = name => {
  home.close();
  tab.open();

  tab.setTitle(`Loading data for ${name}`);
  stepper.register();

  sendReq(`https://api.ashcon.app/mojang/v2/user/${name}`)
    .then(({ uuid, username }) => {
      const cleanUUID = uuidCleaner(uuid);
      tab.setTitle(`Loading data for ${username}`);

      return getLatest(cleanUUID, username);
    }).catch(e => {
      stepper.unregister();
      print(`JacobStats Error:\n${JSON.stringify(e)}`);

      if (e.reason.includes("No user with the name"))
        e.reason = "No Minecraft account found";

      tab.setHeader(
        `§cError loading Mojang data for ${name}`,
        `${e.error} - ${e.reason}`
      );
      tab.updateTabSize();
    });
};

export const getLatest = (cleanUUID, username) => {
  request({
    url: "https://api.slothpixel.me/api/graphql",
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: {
      query: `{
        skyblock {
          profile(player_name: "${cleanUUID}")
        }
      }`
    }
  }).then(res => {
    const members = JSON.parse(res).data.skyblock.profile.members;
    const theProfile = members[cleanUUID];
    const {
      jacob2: {
        perks: {
          double_drops = 0,
          farming_level_cap = 0
        } = {},
        contests = {},
        unique_golds2 = []
      } = {}
    } = theProfile;
    const totalContests = Object.entries(contests);

    data.total = totalContests.length;
    data.maxFarmingLvl += farming_level_cap;
    data.anitaBonus = double_drops;
    data.uniqueGolds = unique_golds2.length;

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

      let day = +cropRegex.exec(key)[3];
      let month = sbCal[cropRegex.exec(key)[2]];
      let year = +cropRegex.exec(key)[1] + 1;
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
  }).catch(e => {
    stepper.unregister();
    print(`JacobStats Error:\n${JSON.stringify(e)}`);

    if (e.message === "Cannot read property \"members\" from null")
      e.message = "No data for profile in Slothpixel API";

    tab.setHeader(
      `§cError loading profile data for ${username}`,
      e.message ?? ""
    );
    tab.updateTabSize();
  });
};