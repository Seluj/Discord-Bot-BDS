const fs = require("node:fs");
const { replace } = require('./utils');

function rolesFiles(guild)
{
  if (Array.isArray(guild))
  {
    for (let i = 0; i< guild.length; i++)
      createRolesFiles(guild[i]);
  }
  else
    createRolesFiles(guild);
}

function createRolesFiles(guild)
{
  let filename = "./serveur/roles/role_" + guild.id + ".json";
  let roles_id = guild.roles.cache.map(m => m.id);
  let roles_name = guild.roles.cache.map((m => m.name));
  let data = '{\n'
  for (let j = 0; j < roles_id.length; j++) {
    data += ("\t\"" + replace(roles_name[j]) + "\"" + ": \"" + roles_id[j] + "\"");
    if (j !== roles_id.length-1)
      data += ',\n';
    else
      data += '\n';
  }
  data += '}';
  fs.writeFile(filename, data, (err) => {
    if (err) throw err;
  })
  console.log(`Fichier de rôles pour ${guild} est créé`);
}

module.exports = {
  rolesFiles,
};