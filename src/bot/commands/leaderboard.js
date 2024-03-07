const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Displays the leaderboard'),

    /**
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        // Read accounts data from JSON file
        const rawData = fs.readFileSync('accounts.json');
        const accounts = JSON.parse(rawData).accounts;

        // Sort accounts by Elo rating
        const sortedAccounts = Object.entries(accounts).sort((a, b) => b[1].elo - a[1].elo);

        // Prepare leaderboard message
        let leaderboardMessage = 'Leaderboard:\n';
        sortedAccounts.forEach(([id, account], index) => {
            leaderboardMessage += `${index + 1}. ${account.username} - Elo: ${account.elo}\n`;
        });

        // Send leaderboard message
        await interaction.reply(leaderboardMessage);    
    },
};
