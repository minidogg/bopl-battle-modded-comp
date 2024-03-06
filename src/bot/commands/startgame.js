const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDescription('Registers a game lobby'),
		        /**
         * @param {Interaction} interaction 
         */
	async execute(interaction) {
		var reply = await interaction.reply('Starting game. React with :white_check_mark: to join game');
        console.log(reply)
	},
};