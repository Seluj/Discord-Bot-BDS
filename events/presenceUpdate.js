const {Events} = require('discord.js');
const fs = require("node:fs");
const {log} = require("../utils/utils");


module.exports = {
  name: Events.PresenceUpdate,
  async execute(oldPresence, newPresence) {
    let dir = "./data";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }

    let file1 = dir + "/bot";

    if (!fs.existsSync(file1)) {
      fs.writeFileSync(file1, "0", (err) => {
        if (err) throw err
      });
    }


    if (newPresence.user.bot) {
      let data = fs.readFileSync(file1);

      data = parseInt(data);

      data++;

      fs.writeFileSync(file1, data.toString(), (err) => {
        if (err) throw err
      });

      if (data % 4 === 0) {
        newPresence.guild.channels.fetch("900660051310678046").then(r =>
          r.send("bds!restart")
        );
        log("BDS_v2 Restart", newPresence.guild.channels.cache.get("1070807024851497020"));
      }
    }


  },
};