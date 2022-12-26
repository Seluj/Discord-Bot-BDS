const { Events } = require('discord.js');
const { channelFiles } = require("../utils/channels");

module.exports = {
  name: Events.ChannelCreate,
  async execute(channel) {
    console.log(`Salon ${channel.name} crée, mise a jour du fichier...`);
    channelFiles(channel.guild);
  },
};