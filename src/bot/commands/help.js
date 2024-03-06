const { SlashCommandBuilder } = require('discord.js');
const help = {
    "ping":"Replies with pong"
}
var helpString = "Here are the available commands:\n"
for(let i = 0;i<Object.keys(help).length;i++){
    helpString+="/"+Object.keys(help)[i]+" - " +help[Object.keys(help)[i]]+ "\n"
}

const helpEmbed = {
    color: 0x0099ff,
    title: 'Command List',
    description: helpString
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

