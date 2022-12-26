const { REST, Routes } = require('discord.js');
dotenv = require('dotenv');
dotenv.config();


const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// ...
/*
// for guild-based commands
rest.put(Routes.applicationGuildCommands("1032608939013050389", "1031963275556048906"), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

 */

// for global commands
rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);