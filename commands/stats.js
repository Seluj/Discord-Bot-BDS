const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Mets a jour les statisques du serveur')
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    console.log("à faire");
    await interaction.reply({
      content: "à faire",
      ephemeral: true,
    })
    /*
    await interaction.reply({content:`Server Stats is updating...`, ephemeral: true});
    let channel = interaction.guild.channels.cache.get(c_cotisant);
    let nb = interaction.guild.roles.cache.get(r_cotisant).members;
    nb = nb.map(m => m.displayName);
    nb = nb.length;
    channel.setName(`🏃 Cotisants : ${nb}`);

    channel = interaction.guild.channels.cache.get(c_nonCotisant);
    nb = interaction.guild.roles.cache.get(r_nonCotisant).members;
    nb = nb.map(m => m.displayName);
    nb = nb.length;
    channel.setName(`🦽 Non Cotisants : ${nb}`);

    channel = interaction.guild.channels.cache.get(c_total);
    let total = interaction.guild.memberCount;
    channel.setName(`🌍 Total : ${total}`);
    */
  },
};