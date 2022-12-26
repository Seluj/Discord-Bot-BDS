const { SlashCommandBuilder } = require('discord.js');
const { r_cotisant, r_nonCotisant, c_cotisant, c_nonCotisant, c_total} = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Mets a jour les statisques du serveur')
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
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
    },
};