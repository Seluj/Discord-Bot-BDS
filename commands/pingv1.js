const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('pingv1')
      .setDescription('Répond avec Pong!')
      .setDefaultMemberPermissions(0),
  async execute(interaction) {
    console.log("Allo Ping");
    await interaction.reply(
        {
          content: `\n> 🏓La latence est de ${Date.now() - interaction.createdTimestamp} ms.\n> La latence avec l'API est de ${Math.round(interaction.client.ws.ping)} ms`,
          ephemeral: true
        });
  },
};