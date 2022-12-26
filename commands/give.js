const { SlashCommandBuilder } = require('discord.js');
const { recupetudiant, testDate, checkRole } = require("../utils/utils");
const { bureau, ESTA, r_nonCotisant, r_memberRoleId, r_cotisant, changeNom } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Donne un rôle a tout le monde')
    .setDefaultMemberPermissions(0)
    .addRoleOption(option =>
      option
        .setName('role_id')
        .setDescription('ID du role à mettre')),
  async execute(interaction)
  {
    //let members = interaction.
  },
};