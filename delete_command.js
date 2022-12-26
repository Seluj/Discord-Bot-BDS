const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken('MTAzMjYwODkzOTAxMzA1MDM4OQ.G5-unj.KmDgQIMmYG5ZwAXcwAI9ft-RqAGN4i3Is-tY-0');

// ...
/*
// for guild-based commands
rest.put(Routes.applicationGuildCommands("1032608939013050389", "1031963275556048906"), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

 */

// for global commands
rest.put(Routes.applicationCommands("1032608939013050389"), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);