const { Events } = require('discord.js');
const { deleteOldestFiles, log } = require("../utils/utils");
const { channelFiles } = require("../utils/channels_files");
const { rolesFiles } = require("../utils/roles_files");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    //await client.user.setUsername('BDS');
    //await client.user.setAvatar('./logo/logo1.png');
    client.user.setPresence({status: 'dnd',});
    log(`Ready! Logged in as ${client.user.tag}`);
  },
};