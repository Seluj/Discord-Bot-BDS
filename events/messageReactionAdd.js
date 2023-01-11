const { Events } = require('discord.js');

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

    const { premier_pas } = require(`../serveur/channels/channels_${reaction.message.guild.id}.json`);

    if (reaction.message.channel.id === premier_pas) {
      if (reaction.emoji.name === '👍') {
        console.log(`${user.tag} a réagi au message de règles`);
        const { Attente_Cotisant, Change_de_nom } = require(`../serveur/roles/role_${reaction.message.guild.id}.json`);

        // Mise en place des rôles
        if (Attente_Cotisant === undefined || Change_de_nom === undefined) {
          console.log("Aucun Role");
        } else {
          reaction.message.guild.members.fetch(user.id)
            .then(member => {
              let tmp = member.displayName.split(' ');
              if (tmp.length <= 1) {
                member.roles.add(Change_de_nom);
              } else {
                member.roles.add(Attente_Cotisant);
              }
            });
        }
      }
    }

  },
};