const { REST, Routes } = require('discord.js');
const { log } = require('utils/utils');
dotenv = require('dotenv');
dotenv.config();


const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: [] })
  .then(() => log('Successfully deleted all application commands.', null))
  .catch(console.error);