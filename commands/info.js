const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or a server!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about a user'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Info about the server')),
  async execute(interaction) {
    let str = "";
    if (interaction.options.getSubcommand() === "user") {
      str = `Cette commande a été lancé par ${interaction.user.username}, qui a rejoint le ${interaction.member.joinedAt}.`;
    } else if (interaction.options.getSubcommand() === "server") {
      str = `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`;
    } else {
      str = 'There is a problem here !';
    }
    await interaction.reply({content:str, ephemeral: true});
  },
};