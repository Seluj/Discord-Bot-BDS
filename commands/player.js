const { SlashCommandBuilder } = require('discord.js');
const { parseCSVFiles, affichageJoueur, checkDate } = require("../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Liste la ou les personnes en fonction du nom ou/et prénom. Si aucun argument envoie une erreur')
    .setDefaultMemberPermissions(0)
    .addSubcommand(subcommand =>
      subcommand
        .setName('prenom')
        .setDescription('Recherche par prénom')
        .addStringOption(option =>
          option
            .setName('prenom')
            .setDescription('Prénom de la personne')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('nom')
        .setDescription('Recherche par nom')
        .addStringOption(option =>
          option
            .setName('nom')
            .setDescription('Prénom de la personne')
            .setRequired(true))),
  async execute(interaction) {
    let etudiant = parseCSVFiles("./adherent.csv", ";");
    let opt;
    let data;
    let str = "";
    let nb = 0;

    if (interaction.options.getSubcommand() === "prenom") {
      opt = interaction.options.getString('prenom');
      await interaction.reply(`Recherche du prenom : ${opt}`);
      opt = opt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      for (let i=0; i<etudiant.length; i++) {
        data = etudiant[i][1];
        data = data.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (data === opt) {
          str += affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
          nb ++;
        }
      }
    } else if (interaction.options.getSubcommand() === "nom") {
      opt = interaction.options.getString('nom');
      await interaction.reply(`Recherche du nom : ${opt}`);
      opt = opt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      for (let i=0; i<etudiant.length; i++) {
        data = etudiant[i][0];
        data = data.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (data === opt) {
          str += affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
          nb ++;
        }
      }
    }

    // Contrôle de la longueur puisque discord limite à 2000 caractères
    let str_length = str.length;
    let tmp_str = [];
    let divide_number = Math.trunc(str_length / 2000) + 1;
    for (let i = 0; i < divide_number; i++) {
      tmp_str[i] = str.slice((str_length / divide_number) * i, (str_length / divide_number) * (i + 1));
    }

    // Écriture du résultat
    for (let i = 0; i < tmp_str.length; i++) {
      await interaction.followUp(tmp_str[i]);
    }
  },
};