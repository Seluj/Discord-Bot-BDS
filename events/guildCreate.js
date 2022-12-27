const { Events } = require('discord.js');
const { channelFiles } =require("../utils/channels_files");
const { rolesFiles } =require("../utils/roles");


module.exports = {
  name: Events.GuildCreate,
  execute(guild) {
    console.log(`Le serveur ${guild.name} a été rejoins`)
    rolesFiles(guild);
    channelFiles(guild);
  },
};