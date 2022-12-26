
const { SlashCommandBuilder } = require('discord.js');
const { recupffsu } = require("../utils/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ffsu')
        .setDescription('Effecte le rôle ffsu aux bonnes personnes')
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        interaction.reply({content: "ne fait rien", ephemeral:true});
        //let ffsu = recupffsu();
    },
};