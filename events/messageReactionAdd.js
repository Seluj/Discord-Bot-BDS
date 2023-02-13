const { Events } = require('discord.js');
const { log, checkName} = require('../utils/utils');

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

    const { ligne_de_départ, logs } = require(`../serveur/channels/channels_${reaction.message.guild.id}.json`);

    let channel_logs = null;
    if (logs === undefined) {
      log("Aucun salon 'logs'", null);
    } else {
      channel_logs = reaction.message.guild.channels.cache.get(logs);
    }

    if (reaction.message.channel.id === ligne_de_départ) {
      if (reaction.emoji.name === '👍') {
        log(`${user.tag} a réagi au message de règles`, channel_logs);
        const { Attente_Cotisant } = require(`../serveur/roles/role_${reaction.message.guild.id}.json`);

        // Mise en place des rôles
        if (Attente_Cotisant === undefined) {
          log("Aucun Role 'Attente Cotisant'", channel_logs);
        } else {
          let member = await reaction.message.guild.members.fetch(user.id);
          if (!checkName(member.displayName)) {
            await member.send("Salut, je crois que tu n'as pas bien lu, renomme toi correctement Prénom Nom, sans ta promo et sans ton surnom !! ");
            await reaction.users.remove(member.id);
          } else {
            await member.roles.add(Attente_Cotisant);
          }
        }
      }
    }
  },
};