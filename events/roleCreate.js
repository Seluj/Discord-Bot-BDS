const { Events } = require('discord.js');
const { rolesFiles } = require("../utils/roles");

module.exports = {
  name: Events.GuildRoleCreate,
  async execute(role) {
    console.log(`Rôle ${role.name} créé, mise a jour du fichier...`);
    rolesFiles(role.guild);
  },
};