const { SlashCommandBuilder } = require('discord.js');
const { checkRole, log } = require('../../utils/utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ffsu')
        .setDescription('Effecte le rôle ffsu aux bonnes personnes')
        .setDefaultMemberPermissions(0)
      .addSubcommand(
        subcommand =>
          subcommand
            .setName('remove')
            .setDescription('Supprime le rôle ffsu aux bonnes personnes')
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('add')
          .setDescription('Ajoute le rôle ffsu aux bonnes personnes')
      ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "remove") {
            const { Cotisants, ESTA, FFSU, Respo_FFSU } = require(`../serveur/roles/role_${interaction.guild.id}.json`);
            const { logs } = require(`../serveur/channels/channels_${interaction.guild.id}.json`)

            let channel_logs = null;
            if (logs === undefined) {
                log("Aucun salon 'logs'", null);
            } else {
                channel_logs = interaction.guild.channels.cache.get(logs);
            }

            let membersWithRole = interaction.guild.roles.cache.get(FFSU).members;
            let nb = 0;
            let membersID = membersWithRole.map(m => m.id);
            let membersList = membersWithRole.map(m => m);
            for (let i = 0; i < membersID.length; i++) {
                if (!(checkRole(membersList[i], Cotisants) || checkRole(membersList[i], ESTA) || checkRole(membersList[i], Respo_FFSU))) {
                    membersList[i].roles.remove(FFSU);
                    nb++;
                }
            }
            await interaction.reply({content: `Le rôle ffsu a été supprimé à ${nb} personnes`, ephemeral: false});
            log(`Le rôle ffsu a été supprimé à ${nb} personnes`, channel_logs);
        } else if (interaction.options.getSubcommand() === "add") {
            await interaction.reply({content: `à faire`, ephemeral: true});
        } else {

        }
    },
};