const { SlashCommandBuilder } = require('discord.js');
const help = {
    "help":{short:"Sends a list of commands and what they do. Optionally you can specifiy the command you want a description of."},
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
            await interaction.reply({ embeds: [helpEmbed],ephemeral: true });
        }else{
            if(!help[interaction.options.getString('command')]){
                await interaction.reply({embeds:[{
                    color: 0x0099ff,
                    title: 'Help',
                    description: "That command doesn't exist or have a help definition for it!"
                }],
                ephemeral: true
            })
                return
            }
            await interaction.reply({embeds:[{
                color: 0x0099ff,
                title: 'Help',
                description: "/"+interaction.options.getString('command')+" - " +(help[interaction.options.getString('command')].long?help[interaction.options.getString('command')].long:help[interaction.options.getString('command')].short)+ "\n"
            }],
            ephemeral: true})
        }
    },
};

