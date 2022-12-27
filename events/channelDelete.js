const { Events } = require('discord.js');
const { channelFiles } = require("../utils/channels_files");

module.exports = {
  name: Events.ChannelDelete,
  async execute(channel) {
    console.log(`Salon ${channel.name} supprimé, mise a jour du fichier...`);
    channelFiles(channel.guild);
  },
};