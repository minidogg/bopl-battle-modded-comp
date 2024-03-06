const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Shows a Leaderboard'),

    async execute(interaction) {
        try {
            const data = fs.readFileSync('accounts.json');
            const accounts = JSON.parse(data);

            // Sort accounts by wins in descending order
            const sortedAccounts = Object.entries(accounts).sort((a, b) => b[1].wins - a[1].wins);

            // Create embed with leaderboard data
            const embed = new EmbedBuilder()
                .setTitle('Leaderboard')
                .setColor('#0099ff');

            // Display top 10 accounts or all if less than 10
            const displayCount = Math.min(sortedAccounts.length, 10);
            for (let i = 0; i < displayCount; i++) {
                embed.addField(`${i + 1}. ${sortedAccounts[i][1].username}`, `Wins: ${sortedAccounts[i][1].wins}, Losses: ${sortedAccounts[i][1].losses}, Level: ${sortedAccounts[i][1].level}`);
            }

            // Create row of buttons for filtering options
            const row = new MessageActionRow()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('elo')
                        .setLabel('Filter by Elo')
                        .setStyle('PRIMARY'),
                    new ButtonBuilder()
                        .setCustomId('wins')
                        .setLabel('Filter by Wins')
                        .setStyle('PRIMARY'),
                    new ButtonBuilder()
                        .setCustomId('winrate')
                        .setLabel('Filter by Win Rate')
                        .setStyle('PRIMARY')
                );

            await interaction.reply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Error reading accounts.json:', error);
            await interaction.reply('An error occurred while retrieving the leaderboard.');
        }
    },
};
