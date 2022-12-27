const { SlashCommandBuilder } = require('discord.js');
const { parseCSVFiles, affichageJoueur, checkDate } = require("../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Liste la ou les personnes en fonction du nom ou/et prénom. Si aucun argument envoie une erreur')
    .addStringOption(option =>
      option
        .setName('prenom')
        .setDescription('Prénom de la personne (optionnelle)'))
    .addStringOption(option =>
      option
        .setName('nom')
        .setDescription('Nom de la personne (optionelle)'))
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    let etudiant  = parseCSVFiles("./adherent.csv", ";");
    let prenom    = interaction.options.getString('prenom');
    let nom       = interaction.options.getString('nom');
    let prenom_etudiant;
    let nom_etudiant;
    if (prenom === null && nom === null) {
      await interaction.reply({ content: 'Aucune option entrée', ephemeral:true});
    } else if (prenom === null && nom != null) {
      await interaction.reply(`Recherche du nom : ${nom}`);
      nom = nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      for (let i=0; i<etudiant.length; i++) {
        nom_etudiant = etudiant[i][0];
        nom_etudiant = nom_etudiant.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (nom_etudiant === nom) {
          let char = affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
          await interaction.followUp(char);
        }
      }
    } else if (prenom != null && nom === null) {
      await interaction.reply(`Recherche du prenom : ${prenom}`);
      prenom = prenom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      for (let i=0; i<etudiant.length; i++) {
        prenom_etudiant = etudiant[i][1];
        prenom_etudiant = prenom_etudiant.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (prenom_etudiant === prenom) {
          let char = affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
          await interaction.followUp(char);
        }
      }
    } else if (prenom != null && nom != null) {
      await interaction.reply(`Recherche du nom : ${nom} et Prenom : ${prenom}`);
      nom = nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      prenom = prenom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      for (let i=0; i<etudiant.length; i++) {
        nom_etudiant = etudiant[i][0];
        nom_etudiant = nom_etudiant.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        prenom_etudiant = etudiant[i][1];
        prenom_etudiant = prenom_etudiant.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (nom_etudiant === nom && prenom_etudiant === prenom) {
          let char = affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
          await interaction.followUp(char);
        }
      }
    } else {
      await interaction.reply(`Vous devez entrer au moins un des deux arguments`);
    }
  },
};