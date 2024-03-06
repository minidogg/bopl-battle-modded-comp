const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows a Leaderboard'),
		        /**
         * @param {Interaction} interaction 
         */
	async execute(interaction) {
		await interaction.reply('idk im kidna too lazy to make one rn'); // add leaderboard stuff here.
	},
};