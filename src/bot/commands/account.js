const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Manage user accounts')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a new account'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('stats')
                .setDescription('View user stats'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete Account Data')),   
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        
        switch (subcommand) {
            case 'create':
                await createAccount(interaction);
                break;
            case 'stats':
                await viewStats(interaction);
                break;
            case 'delete':
                await deleteAccount(interaction);
                break;
            default:
                await interaction.reply('Invalid subcommand.');
        }
    },
};


async function createAccount(interaction) {
    const userId = interaction.user.id;
    const user = interaction.user.username;

    let accounts = {};
    try {
        const data = fs.readFileSync('accounts.json');
        accounts = JSON.parse(data);
    } catch (error) {
        console.error('Error reading accounts.json:', error);
    }

    if (accounts[userId]) {
        await interaction.reply('Account already exists.');
        return;
    }

    accounts[userId] = {
        username: user,
        wins: 0,
        losses: 0,
        level: 1,
        elo: 500
    };

    fs.writeFileSync('accounts.json', JSON.stringify(accounts, null, 2));

    await interaction.reply('Account created successfully!');
}

async function viewStats(interaction) {
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
        .setColor('Random')
        .addFields(
            { name: 'Wins', value: userAccount.wins.toString(), inline: true },
            { name: 'Losses', value: userAccount.losses.toString(), inline: true },
            { name: 'Level', value: userAccount.level.toString(), inline: true },
            { name: 'Elo', value: userAccount.elo.toString(), inline: true }
        );

    await interaction.reply({ embeds: [embed] });
}
async function deleteAccount(interaction) {
    const userId = interaction.user.id;

    let accounts = {};
    try {
        const data = fs.readFileSync('accounts.json');
        accounts = JSON.parse(data);
    } catch (error) {
        console.error('Error reading accounts.json:', error);
        await interaction.reply('An error occurred while trying to delete the account.');
        return;
    }

    if (!accounts[userId]) {
        await interaction.reply('No account found to delete.');
        return;
    }

    delete accounts[userId];

    try {
        fs.writeFileSync('accounts.json', JSON.stringify(accounts, null, 2));
        await interaction.reply('Account data deleted successfully.');
    } catch (error) {
        console.error('Error writing accounts.json:', error);
        await interaction.reply('An error occurred while trying to delete the account.');
    }
}