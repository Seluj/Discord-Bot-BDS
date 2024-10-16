const {Events} = require('discord.js');
const fs = require("node:fs");
const {log} = require("../utils/utils");


module.exports = {
  name: Events.PresenceUpdate,
  async execute(oldPresence, newPresence) {
    if (newPresence.user.bot) {
      if (newPresence.guild.id !== '754741001041608725') {
        return;
      }
      if (newPresence.status !== 'dnd') {
        return;
      }

      const channel= newPresence.client.channels.cache.get('900660051310678046');
      channel.send("bds!restart");
      log("BDS_v2 Restart", newPresence.guild.channels.cache.get("1070807024851497020"));
    }
  },
};