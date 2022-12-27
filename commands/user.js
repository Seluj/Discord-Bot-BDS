const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription("Donne des informations à propos de l'utilisateur qui lance la commande"),
    async execute(interaction) {
        await interaction.reply({content:`Cette commande a été lancé par ${interaction.user.username}, qui a rejoint le ${interaction.member.joinedAt}.`, ephemeral: true});
    },
};