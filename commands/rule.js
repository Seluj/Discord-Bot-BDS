const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('rule')
    .setDescription('Create a message embed with the rule')
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    interaction.reply({content: "Voici votre message:", ephemeral:true});
    const file = new AttachmentBuilder('./logo/logo1.png')

    const exampleEmbed = {
      author: {
        icon_url: "attachment://logo1.png",
        name: "BDS"
      },
      title: "Règles du discord",
      description: "Quelques règles de vivre ensemble sur le discord du BDS",
      footer: {
        icon_url: "attachment://logo1.png",
        text: "By The Discord Team"
      },
      thumbnail: {
        url: "attachment://logo1.png"
      },
      fields: [
        {
          name: "Les règles",
          value: "> Être correct auprès de tout le monde (même vos amis) : les avatars, emotes, liens et propos doivent rester corrects en toutes circonstances.\n> Pas de harcèlement, ni de comportement encourageant le harcèlement ou incitant à la violence.\n> Ne pas abuser des @",
          inline: false
        },
        {
          name: "Interdiction",
          value: "> La pornographie\n> Les insultes\n> Les propos à caractère : \n> - sexuel \n> - pédophile\n> - raciste\n> - homophobe\n> - misogynes\n> - politiques ou religieux.",
          inline: false
        },
        {
          name: "Cotisation",
          value: "Pour que tu puisse participer à n'importe quel activité sur le discord il faut que tu te sois renommé **__« Prénom NOM » __**.\nTout est automatisé à partir du moment où tu aura cliqué sur 👍, donc inutile de contacter quelqu'un du bureau ! Aussi, tu ne pourras pas revenir ici, donc si tu as cliqué : tu as lu ce petit texte !",
          inline: false
        }
        ],
      color: 16172079
    };

    interaction.channel.send({ embeds: [exampleEmbed], files: [file] }).then(sentMessage => {
      sentMessage.react('👍');
    });
  },
};