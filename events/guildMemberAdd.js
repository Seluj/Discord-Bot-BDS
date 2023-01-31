const { Events } = require('discord.js');
const { log } = require('../utils/utils');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const { arrivée } = require(`../serveur/channels/channels_${member.guild.id}.json`);

    log(`${member.user.tag} a rejoins le serveur ${member.guild.name}`);

    // Notification sur le discord
    if (arrivée === undefined) {
      log("Aucun salon 'arrivée'");
    } else {
      let channel = member.guild.channels.cache.get(arrivée);
      channel.send(`${member.user.tag} joined`);
    }
  },
};