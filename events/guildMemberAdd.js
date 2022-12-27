const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const { arrivée } = require(`./serveur/channels/channels_${member.guild.id}.json`);
    const { Attente_Cotisant, Change_de_nom } = require(`./serveur/roles/role_${member.guild.id}.json`);

    console.log(`${member.user.tag} a rejoins le serveur ${member.guild.name}`);

    // Notification sur le discord
    if (arrivée === undefined) {
      console.log("Aucun salon");
    } else {
      let channel = member.guild.channels.cache.get(arrivée);
      channel.send(`${member.user.tag} joined`);
    }

    // Mise en place des rôles
    if (Attente_Cotisant === undefined || Change_de_nom === undefined) {
      console.log("Aucun Role");
    } else {
      let tmp = member.displayName.split(' ');
      if (tmp.length <= 1) {
          member.roles.add(Change_de_nom);
      } else {
          member.roles.add(Attente_Cotisant);
      }
    }
  },
};