const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows help'),

    /**
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const embed = {
            color: 0x0099ff,
            title: 'Command List',
            description: 'Here are the available commands:\n\n1. Command 1\n2. Command 2\n3. Command 3', // Add commands for stuff you make sorry if im kinda breaking a lot of stuff but dynamic command searching was not working and E.
        };
        await interaction.reply({ embeds: [embed] });
    },
};

