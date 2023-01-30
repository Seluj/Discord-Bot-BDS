const { Events } = require('discord.js');
const { log } = require('../utils/utils');

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    if (user.bot) {
      return;
    }

    const { ligne_de_départ } = require(`../serveur/channels/channels_${reaction.message.guild.id}.json`);

    if (reaction.message.channel.id === ligne_de_départ) {
      if (reaction.emoji.name === '👍') {
        log(`${user.tag} a réagi au message de règles`);
        const { Attente_Cotisant } = require(`../serveur/roles/role_${reaction.message.guild.id}.json`);

        // Mise en place des rôles
        if (Attente_Cotisant === undefined) {
          log("Aucun Role");
        } else {
          let member = await reaction.message.guild.members.fetch(user.id);
          let tmp = member.displayName.split(' ');
          if (tmp.length <= 1) {
            await member.send("Salut, renomme toi frérot et apprends à lire !! ");
            await reaction.users.remove(member.id);
          } else {
            await member.roles.add(Attente_Cotisant);
          }
        }
      }
    }

  },
};