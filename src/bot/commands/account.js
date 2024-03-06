const { SlashCommandBuilder } = require('discord.js');
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
                .setDescription('View user stats')),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        
        switch (subcommand) {
            case 'create':
                await createAccount(interaction);
                break;
            case 'stats':
                await viewStats(interaction);
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
        level: 1
    };

    fs.writeFileSync('accounts.json', JSON.stringify(accounts, null, 2));

    await interaction.reply('Account created successfully!');
}

async function viewStats(interaction) {
    const userId = interaction.user.id;

    let accounts = {};
    try {
        const data = fs.readFileSync('accounts.json');
        accounts = JSON.parse(data);
    } catch (error) {
        console.error('Error reading accounts.json:', error);
    }

    const userAccount = accounts[userId];
    if (!userAccount) {
        await interaction.reply('No stats found for your account.');
        return;
    }

    await interaction.reply(`# Stats for ${userAccount.username}\nWins: ${userAccount.wins}\nLosses: ${userAccount.losses}\nLevel: ${userAccount.level}`);
}
