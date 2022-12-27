const { Events } = require('discord.js');
const { checkRole, checkName } = require("../utils/utils");
const { addRole, deleteRole } =require("../utils/roles");


module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    // Controle du changement de pseudo
    if (oldMember.displayName === newMember.displayName)
      return;

    const { changement_de_pseudo } = require(`../serveur/channels/channels_${newMember.guild.id}.json`);
    const { Attente_Cotisant, Change_de_nom, Cotisants, Staff_Ski_UTBM, ESTA, Membre_du_Bureau, Bot, Bureau_Restreints } = require(`../serveur/roles/role_${newMember.guild.id}.json`);
    // Contrôles sur les rôles
    if (checkRole(newMember, Bot) || checkRole(newMember, Membre_du_Bureau) || checkRole(newMember, Bureau_Restreints) || checkRole(newMember, Staff_Ski_UTBM) || checkRole(newMember, ESTA))
      return;

    console.log(`${newMember.user.tag} a changé son pseudo en ${newMember.displayName}`);

    // Notification sur le discord
    if (changement_de_pseudo === undefined ) {
      console.log('Aucun Salon');
    } else {
      let channel = newMember.guild.channels.cache.get(changement_de_pseudo);
      channel.send(`${newMember.user.tag} a changé son pseudo en ${newMember.displayName}`);
    }

    // Mise en place des rôles
    if (Attente_Cotisant === undefined || Change_de_nom === undefined || Cotisants === undefined) {
      console.log("Aucun Rôle");
    } else {
      deleteRole(newMember, Cotisants);
      if (checkName(newMember.displayName)) {
        deleteRole(newMember, Change_de_nom);
        addRole(newMember, Attente_Cotisant);
      } else {
        deleteRole(newMember, Attente_Cotisant);
        addRole(newMember, Change_de_nom);
      }
    }
  },
};