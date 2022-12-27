const { Events } = require('discord.js');
const fs = require('node:fs');

module.exports = {
  name: Events.GuildDelete,
  execute(guild) {
    console.log(`Le serveur ${guild.name} a été quitté`)
    const r_file = fs.readdirSync('./serveur/roles').filter(file => file.endsWith(`${guild.id}.json`))
    const c_file = fs.readdirSync('./serveur/channels').filter(file => file.endsWith(`${guild.id}.json`))
    fs.unlink('./roles/' + r_file, (err) => {
      if (err) throw err;
    });
    fs.unlink('./channels/' + c_file, (err) => {
      if (err) throw err;
    });
  },
};