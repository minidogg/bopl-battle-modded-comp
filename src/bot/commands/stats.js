const { SlashCommandBuilder, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows user stats'),

    /**
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const user = interaction.user.username; // Get the username of the user who used the command
        const userId = interaction.user.id; // Get the ID of the user who used the command
        
        // Load accounts from the JSON file
        let accounts = {};
        try {
            const data = fs.readFileSync('accounts.json');
            accounts = JSON.parse(data);
        } catch (error) {
            console.error('Error reading accounts.json:', error);
            await interaction.reply('An error occurred while fetching your stats. Please try again later.');
            return;
        }

        // Search for the user's account
        const userAccount = accounts[userId];
        if (!userAccount) {
            await interaction.reply('No stats found for your account.');
            return;
        }

        // Create an embed to display the user's stats
        const embed = new MessageEmbed()
            .setTitle(`${user}'s Stats`)
            .addField('Wins', userAccount.wins)
            .addField('Losses', userAccount.losses)
            .addField('Level', userAccount.level)
            .addField('Elo', userAccount.Elo)
            .setColor('RANDOM');

        await interaction.reply({ embeds: [embed] });
    },
};
