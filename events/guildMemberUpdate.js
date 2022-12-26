const { Events } = require('discord.js');
const { checkRole } = require("../utils/utils");


module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    const { changeNom, r_nonCotisant, r_cotisant, bureau, ESTA, Staff_Skiut } = require('../config.json');
    const { changement_de_pseudo } = require(`./serveur/channels/channels_${newMember.guild.id}.json`);
    const { Attente_Cotisant, Change_de_nom, Cotisant } = require(`./serveur/roles/role_${newMember.guild.id}.json`);

    // Controle du changement de pseudo
    if (oldMember.displayName === newMember.displayName)
      return;

    // Contrôles sur les rôles
    if (checkRole(newMember, bureau))
      return;
    if (checkRole(newMember, ESTA))
      return;
    if (checkRole(newMember, Staff_Skiut))
      return;

    console.log(`${newMember.user.tag} a changé son pseudo en ${newMember.displayName}`);

    // Notification sur le discord
    if (changement_de_pseudo === undefined )
      console.log('Aucun Salon');
    else {
      let channel = newMember.guild.channels.cache.get(changement_de_pseudo);
      channel.send(`${newMember.user.tag} a changé son pseudo en ${newMember.displayName}`);
    }

    // Mise en place des rôles
    if (Attente_Cotisant === undefined || Change_de_nom === undefined)
      console.log("Aucun Rôle");
    else {
      newMember.roles.remove(Cotisant);
      let tmp = newMember.displayName.split(' ');
      if (tmp.length <= 1) {
        newMember.roles.remove(Attente_Cotisant);
        newMember.roles.add(Change_de_nom);
      } else {
        newMember.roles.remove(Change_de_nom);
        newMember.roles.add(Attente_Cotisant);
      }
    }
  },
};