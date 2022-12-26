const { SlashCommandBuilder } = require('discord.js');
const { recupetudiant, testDate, checkRole } = require("../utils/utils");
const { bureau, ESTA, r_nonCotisant, r_memberRoleId, r_cotisant, changeNom } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Modifie les rôles de chaque membre pour chaque rôle sinon donne le nombre du rôle donné')
    .setDefaultMemberPermissions(0)
    .addRoleOption(option =>
      option
        .setName('role_id')
        .setDescription('ID du role à chercher')),
  async execute(interaction)
  {
    let etudiant  = recupetudiant();
    let role_id   = interaction.options.getRole('role_id');
    if (role_id === null)
    {
      let membersWithRole, membersID, membersName, membersList, prenom_nom, pseudo_discord, tmp;

      await interaction.reply(`Nombre de personnes par rôle:`);

      /*
      membersWithRole = interaction.guild.roles.cache.get(r_memberRoleId).members;
      membersID = membersWithRole.map(m => m.id);
      membersName = membersWithRole.map(m => m.displayName);
      membersList = membersWithRole.map(m => m);
      //membersList[0].roles.add(r_nonCotisant);
      await interaction.followUp(`Il y a ${membersName.length} membres avec le role "membre"`)

      let tmp;
      for (let i = 0; i < membersID.length; i++)
      {
        tmp = membersName[i].split(' ');
        if (tmp.length === 1)
        {
          membersList[i].roles.add(changeNom);
        }
        else
        {
          membersList[i].roles.add(r_nonCotisant);
        }
        membersList[i].roles.remove(r_memberRoleId);
      }

      membersWithRole = interaction.guild.roles.cache.get(changeNom).members;
      membersID = membersWithRole.map(m => m.id);
      membersName = membersWithRole.map(m => m.displayName);
      membersList = membersWithRole.map(m => m);

      await interaction.followUp(`Il y a ${membersName.length} membres avec le role "Change de nom"`)

      for (let i = 0; i < membersID.length; i++)
      {
        tmp = membersName[i].split(' ');
        if (tmp.length === 1)
        {

        }
        else
        {
          membersList[i].roles.add(r_nonCotisant);
          membersList[i].roles.remove(changeNom);
        }

      }
       */

      membersWithRole = interaction.guild.roles.cache.get(r_nonCotisant).members;
      membersID = membersWithRole.map(m => m.id);
      membersName = membersWithRole.map(m => m.displayName);
      membersList = membersWithRole.map(m => m);

      await interaction.followUp(`Il y a ${membersName.length} membres avec le role "Non cotisant"`);

      for (let i = 0; i < membersID.length; i++)
      {
        if (checkRole(membersList[i], bureau))
          continue;
        if (checkRole(membersList[i], ESTA))
          continue;

        tmp = membersName[i].split(' ');
        if (tmp.length <= 1)
        {
          membersList[i].roles.add(changeNom);
          membersList[i].roles.remove(r_nonCotisant);
        }
        else
        {
          pseudo_discord = membersName[i];
          pseudo_discord = pseudo_discord.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          let j = 0;
          let trouve = false;
          while (j < etudiant.length && trouve === false)
          {
            prenom_nom = etudiant[j][1] + ' ' + etudiant[j][0];
            prenom_nom = prenom_nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            if (prenom_nom === pseudo_discord)
              trouve = true;
            else
              j++;
          }
          if (trouve === true)
          {
            if (testDate(etudiant[j][2]) === true)
            {
              membersList[i].roles.add(r_cotisant);
              membersList[i].roles.remove(r_nonCotisant);
            }
          }
        }
      }

      membersWithRole = interaction.guild.roles.cache.get(r_cotisant).members;
      membersID = membersWithRole.map(m => m.id);
      membersName = membersWithRole.map(m => m.displayName);
      membersList = membersWithRole.map(m => m);

      await interaction.followUp(`Il y a ${membersName.length} membres avec le role "Cotisant"`);

      for (let i = 0; i < membersID.length; i++) {
        if (!checkRole(membersList[i], bureau))
        {
          tmp = membersName[i].split(' ');
          if (tmp.length <= 1) {
            membersList[i].roles.add(changeNom);
            membersList[i].roles.remove(r_cotisant);
          } else {
            pseudo_discord = membersName[i];
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
            {
              if (testDate(etudiant[j][2]) === true)
              {
                membersList[i].roles.add(r_cotisant);
                membersList[i].roles.remove(r_nonCotisant);
              }
              else
              {
                membersList[i].roles.add(r_nonCotisant);
                membersList[i].roles.remove(r_cotisant);
              }
            }
            else
            {
              membersList[i].roles.add(r_nonCotisant);
              membersList[i].roles.remove(r_cotisant);
            }
          }
        }
      }
    }
    else
    {
      let membersName;
      let nb = 0;
      interaction.guild.members.fetch()
        .then((members) => {
          membersName = members.map(m => m);
          for (let i = 0; i < membersName.length; i++) {
            if (checkRole(membersName[i], role_id.id))
              nb++;
          }
          //nb = membersName.length;
          interaction.reply(`Il y a ${nb} membres avec le role "${role_id.name}"`);
        })
        .catch(console.error);
    }
  },
};