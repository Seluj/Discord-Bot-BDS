const { SlashCommandBuilder } = require('discord.js');
const { parseCSVFiles, checkDate, checkRole, checkName } = require("../utils/utils");
const { addRole, deleteRole } = require('../utils/roles');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Modifie les rôles de chaque membre pour chaque rôle sinon donne le nombre du rôle donné')
    .setDefaultMemberPermissions(0)
    .addRoleOption(option =>
      option
        .setName('role_id')
        .setDescription('ID du role à chercher')
        .setRequired(false)),
  async execute(interaction) {

    //Variables
    await interaction.deferReply();
    let membersList;
    let nb_total = 0, nb_changer = 0, nb_coti = 0, nb_non_coti = 0, nb_reste = 0;
    let role_id = interaction.options.getRole('role_id');
    let bool_cotisant = false;
    let etudiant = parseCSVFiles("./adherent.csv", ";");
    if (role_id === null) {
      // Récupération des IDs des rôles
      const {
        Cotisants,          // Les cotisants
        Attente_Cotisant,   // Les non cotisants
        Membre_du_Bureau,   // Les membres du bureau
        Bureau_Restreints,  // Les membres du bureau restreint
        ESTA,               // Les membres de l'ESTA
        Bot                 // Les bots du serveur
      } = require(`../serveur/roles/role_${interaction.guild.id}.json`);
      let prenom_nom, pseudo_discord;
      interaction.guild.members.fetch()
        .then((members) => {
          membersList = members.map(m => m);
          for (let i = 0; i < membersList.length; i++) {
            nb_total++;
            if (checkRole(membersList[i], Bot) ||
              checkRole(membersList[i], Membre_du_Bureau) ||
              checkRole(membersList[i], Bureau_Restreints) ||
              checkRole(membersList[i], ESTA))
              continue;
            if (!checkName(membersList[i].displayName)) {
              deleteRole(membersList[i], Cotisants);
              deleteRole(membersList[i], Attente_Cotisant);
              nb_changer++;
            } else {
              pseudo_discord = membersList[i].displayName;
              pseudo_discord = pseudo_discord.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              let j = 0;
              let trouve = false;
              while (j < etudiant.length && trouve === false) {
                prenom_nom = etudiant[j][1] + ' ' + etudiant[j][0];
                prenom_nom = prenom_nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (prenom_nom === pseudo_discord)
                  trouve = true;
                else
                  j++;
              }
              if (trouve === true)
                bool_cotisant = checkDate(etudiant[j][2]);
              if (bool_cotisant) {
                addRole(membersList[i], Cotisants);
                deleteRole(membersList[i], Attente_Cotisant);
                nb_coti++;
              } else {
                addRole(membersList[i], Attente_Cotisant);
                deleteRole(membersList[i], Cotisants);
                nb_non_coti++;
              }
              bool_cotisant = false;
            }
          }
          nb_reste = nb_total - (nb_coti + nb_non_coti + nb_changer);
          interaction.editReply(`Sur ${nb_total} membres:\n> ${nb_coti} sont cotisants\n> ${nb_non_coti} sont non cotisants\n> ${nb_changer} doivent changer de nom\n> ${nb_reste} sont des exceptions\nMerci !`);
        })
        .catch(console.error);
    } else {
      interaction.guild.members.fetch()
        .then((members) => {
          membersList = members.map(m => m);
          for (let i = 0; i < membersList.length; i++) {
            if (checkRole(membersList[i], role_id.id))
              nb_total++;
          }
          interaction.editReply(`Il y a ${nb_total} membres avec le role "${role_id.name}"`);
        })
        .catch(console.error);
    }
  },
};