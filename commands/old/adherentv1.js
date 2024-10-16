const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const {parseCSVFiles, affichageJoueur, checkDate, log} = require("../../utils/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adherentv1')
        .setDescription('Réalise une recherche dans la bdd en fonction du nom ou du prénom')
        .setDefaultMemberPermissions(0)
        .addSubcommand(subcommand =>
            subcommand
                .setName('prénom')
                .setDescription('Recherche par prénom')
                .addStringOption(option =>
                    option
                        .setName('prénom')
                        .setDescription('Prénom de la personne')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('nom')
                .setDescription('Recherche par nom')
                .addStringOption(option =>
                    option
                        .setName('nom')
                        .setDescription('Nom de la personne')
                        .setRequired(true))),
    async execute(interaction) {
        // Liste des étudiants contenus dans le fichier donné
        let etudiant = parseCSVFiles("./adherent.csv", ";");
        // Variables
        let opt;        // option : option entrée par l'utilisateur
        let data;       // information à comparer avec l'option, récupérée dans le fichier des étudiants
        let str = "";   // Résultat final avec tous les étudiants qui correspondent à la recherche
        let nb = 0;     // Nombre d'étudiants trouvé


        const {logs} = require(`../serveur/channels/channels_${interaction.guild.id}.json`);

        let channel_logs = null;
        if (logs === undefined) {
            log("Aucun salon 'logs'", null);
        } else {
            channel_logs = interaction.guild.channels.cache.get(logs);
        }

        //Construction du résultat en fonction du nom ou du prénom

        // Test pour la subCommand "prenom"
        if (interaction.options.getSubcommand() === "prénom") {
            opt = interaction.options.getString('prénom');
            await interaction.reply({content: `Recherche du prénom : ${opt}`, ephemeral: true});
            opt = opt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            for (let i = 0; i < etudiant.length; i++) {
                data = etudiant[i][1];
                data = data.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (data === opt) {
                    str += affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
                    nb++;
                }
            }

            // Test pour la subCommand "nom"
        } else if (interaction.options.getSubcommand() === "nom") {
            opt = interaction.options.getString('nom');
            await interaction.reply({content: `Recherche du nom : ${opt}`, ephemeral: true});
            log(`Recherche du nom : ${opt}`, channel_logs);
            opt = opt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            for (let i = 0; i < etudiant.length; i++) {
                data = etudiant[i][0];
                data = data.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (data === opt) {
                    str += affichageJoueur(etudiant[i], checkDate(etudiant[i][2]));
                    nb++;
                }
            }
        }
        str += `Nombre trouvé : ${nb}`;

        // Contrôle de la longueur puisque discord limite à 2000 caractères
        let str_length = str.length;
        let tmp_str = [];
        let divide_number = Math.trunc(str_length / 2000) + 1;
        for (let i = 0; i < divide_number; i++) {
            tmp_str[i] = str.slice((str_length / divide_number) * i, (str_length / divide_number) * (i + 1));
        }

        // Écriture du résultat
        for (let i = 0; i < tmp_str.length; i++) {
            await interaction.followUp({content: tmp_str[i], ephemeral: true});
            log(tmp_str[i], channel_logs);
        }
    },
};