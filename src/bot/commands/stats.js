const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


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

        const userAccount = accounts[userId];
        if (!userAccount) {
            await interaction.reply('No stats found for your account.');
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${user}'s Stats`)
            .setColor('RANDOM')
            .addFields(
                { name: 'Wins', value: userAccount.wins.toString(), inline: true },
                { name: 'Losses', value: userAccount.losses.toString(), inline: true },
                { name: 'Level', value: userAccount.level.toString(), inline: true },
                { name: 'Elo', value: userAccount.elo.toString(), inline: true }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
