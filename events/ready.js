const { Events } = require('discord.js');
const { deleteOldestFiles, log } = require("../utils/utils");
const { channelFiles } = require("../utils/channels_files");
const { rolesFiles } = require("../utils/roles_files");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await client.user.setUsername('BDS');
    await client.user.setAvatar('./logo/logo1.png');
    // await client.user.setActivity("JJG's songs", {type: ActivityType.Listening});
    client.user.setPresence({status: 'dnd',});
    let guild = client.guilds.cache.map(m => m);
    deleteOldestFiles();
    rolesFiles(guild);
    channelFiles(guild);
    log(`Ready! Logged in as ${client.user.tag}`);


    const g = await client.guilds.fetch('754741001041608725');
    const channel = g.channels.cache.get('754741001469558805');

    let message;
    if (channel.isTextBased()) {
      message = await channel.messages.fetch(channel.messages.lastMessageID);
    }
  },
};