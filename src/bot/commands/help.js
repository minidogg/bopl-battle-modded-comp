const { SlashCommandBuilder } = require('discord.js');
const help = {
    "ping":{short:"Replies with pong",long:'A very sophisticated command that hastily replies to your well written message with "pong"'}
}
var helpString = "Here are the available commands:\n"
for(let i = 0;i<Object.keys(help).length;i++){
    helpString+="/"+Object.keys(help)[i]+" - " +help[Object.keys(help)[i]].short+ "\n"
}

const helpEmbed = {
    color: 0x0099ff,
    title: 'Command List',
    description: helpString
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows help')
        .addStringOption(option =>
			option
				.setName('command')
				.setDescription('Optional option for specifying command.')),
    /**
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        if(interaction.options.getString('command')==""||!interaction.options.getString('command')){
            await interaction.reply({ embeds: [helpEmbed] });
        }
    },
};

