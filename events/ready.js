const { Events, ActivityType } = require('discord.js');
const { deleteOldestFiles } = require("../utils/utils");
const { channelFiles } = require("../utils/channels_files");
const { rolesFiles } = require("../utils/roles_files");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setUsername('BDS').then(r => console.log(r));
    client.user.setAvatar('./logo/logo1.png').then(r => console.log(r));
    client.user.setActivity("JJG's songs", { type: ActivityType.Listening });
    client.user.setPresence({ status: 'dnd', });
    let guild = client.guilds.cache.map(m => m);
    deleteOldestFiles();
    rolesFiles(guild);
    channelFiles(guild);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};