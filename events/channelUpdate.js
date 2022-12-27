const { Events } = require('discord.js');
const { channelFiles } = require("../utils/channels_files");

module.exports = {
  name: Events.ChannelUpdate,
  async execute(oldChannel, newChannel) {
    if (oldChannel.name === newChannel.name)
      return;
    console.log(`Salon ${newChannel.name} modifié, mise a jour du fichier...`);
    channelFiles(newChannel.guild);
  },
};