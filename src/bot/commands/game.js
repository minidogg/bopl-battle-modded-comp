const { SlashCommandBuilder,ActionRowBuilder, ButtonBuilder,  ButtonStyle,Collector, } = require('discord.js');
var lobbies = {}
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
        .setDescription('Registers a game lobby'),

        		        /**
         * @param {Interaction} interaction 
         */
    async execute(interaction) {
        try {
            const team1Button = new ButtonBuilder()
            .setCustomId('team1')
            .setLabel('Join Team 1')
            .setStyle(ButtonStyle.Primary);

        const team2Button = new ButtonBuilder()
            .setCustomId('team2')
            .setLabel('Join Team 2')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(team1Button, team2Button);

            await interaction.reply({embeds:[{
                    color: 0x0099ff,
                    title: 'Game',
                    description: "Created a lobby!"
                }],
                components:[row]
            })

        } catch (error) {
            console.error('Error executing game command:', error);
            await interaction.reply({ content: 'An error occurred while processing your command.', ephemeral: true });
        }
    },
};
