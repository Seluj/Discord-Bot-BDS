const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Obtenez des informations sur un utilisateur ou un serveur !')
    .addSubcommand(subcommand =>
      subcommand
        .setName('utilisateur')
        .setDescription('Information à propos d\'un utilisateur')
        .addUserOption(option =>
        option
          .setName('user')
          .setDescription('un utilisateur à chercher')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('serveur')
        .setDescription('Information à propos d\'un serveur')),
  async execute(interaction) {
    let str = "";
    if (interaction.options.getSubcommand() === "utilisateur") {
      let us = interaction.options.getUser('user');
      str = `Cette commande a été lancé par ${interaction.user.username}, qui a rejoint le ${interaction.member.joinedAt}.`;
      if (us !== null) {
        let use = interaction.guild.members.fetch(us.id);
        str += `\n> ${us.tag} a rejoint le ${(await use).joinedAt}`;
      }
    } else if (interaction.options.getSubcommand() === "serveur") {
      str = `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`;
    } else {
      str = 'There is a problem here !';
    }
    await interaction.reply({content:str, ephemeral: true});
  },
};