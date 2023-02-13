const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Ignore all human messages
    if (!message.author.bot) return;


    if (message.content.startsWith('bds!')) {
      let temp = message.content.split('!')[1];
      let command = message.client.commands.get(temp);
      try {
        await command.execute(message);
      } catch (error) {
        console.error(`Error executing}`);
        console.error(error);
      }
    }
  },
};