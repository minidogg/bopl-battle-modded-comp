const { SlashCommandBuilder,EmbedBuilder,ActionRow,ButtonBuilder, ActionRowBuilder } = require('discord.js');
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
                embed.addFields([{name:"Username",value:`${i + 1}. ${sortedAccounts[i][1].username}`}, {name:"Wins",value: `${sortedAccounts[i][1].wins}`}, {name:"Losses", value:`${sortedAccounts[i][1].losses}`}, {name:"Level",value:` ${sortedAccounts[i][1].level}`}]);
            }

            // Create row of buttons for filtering options
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('elo')
                        .setLabel('Filter by Elo')
                        .setStyle('Primary'),
                    new ButtonBuilder()
                        .setCustomId('wins')
                        .setLabel('Filter by Wins')
                        .setStyle('Primary'),
                    new ButtonBuilder()
                        .setCustomId('winrate')
                        .setLabel('Filter by Win Rate')
                        .setStyle('Primary')
                );

            await interaction.reply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Error reading accounts.json:', error);
            await interaction.reply('An error occurred while retrieving the leaderboard.');
        }
    },
};
