const { Events } = require('discord.js');
const { rolesFiles } = require("../utils/roles_files");

module.exports = {
  name: Events.GuildRoleDelete,
  async execute(role) {
    console.log(`Rôle ${role.name} supprimé, mise a jour du fichier...`);
    rolesFiles(role.guild);
  },
};