const { Events } = require('discord.js');
const { log } = require("../utils/utils");


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