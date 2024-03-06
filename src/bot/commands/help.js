const { SlashCommandBuilder } = require('discord.js');
const helpEmbed = {
    color: 0x0099ff,
    title: 'Command List',
    description: "Here are the available commands:\n"+(+[
        "/ping - Replies with pong",
        "/account stats - Gets your stats or optionally you can specify another player's username."
    ].join("\n"))
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows help'),

    /**
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed] });
    },
};

