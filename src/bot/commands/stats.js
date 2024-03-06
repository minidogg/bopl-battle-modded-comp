const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows help'),
		        /**
         * @param {Interaction} interaction 
         */
	async execute(interaction) {
		await interaction.reply('hi'); // add your help things from stuff you make idk
	},
};