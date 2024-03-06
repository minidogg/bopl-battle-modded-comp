const { SlashCommandBuilder, MessageActionRow, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
        .setDescription('Registers a game lobby'),

    async execute(interaction) {
        const team1Button = new ButtonBuilder()
            .setCustomId('team1')
            .setLabel('Join Team 1')
            .setStyle(ButtonStyle.PRIMARY);

        const team2Button = new ButtonBuilder()
            .setCustomId('team2')
            .setLabel('Join Team 2')
            .setStyle(ButtonStyle.PRIMARY);

        const row = new ActionRowBuilder()
            .addComponents(team1Button, team2Button);

        try {
            await interaction.reply({
                content: 'Starting game. Select your team:',
                components: [row]
            });

            const filter = (buttonInteraction) => {
                return buttonInteraction.user.id === interaction.user.id;
            };

            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                time: 60000, // 1 minute
                max: 1
            });

            collector.on('end', async (collected) => {
                if (collected.size === 0) {
                    await interaction.editReply('Timed out. Please try again.');
                    return;
                }

                const selectedButton = collected.first();

                if (selectedButton.customId === 'team1' || selectedButton.customId === 'team2') {
                    const selectedTeam = selectedButton.customId === 'team1' ? 'Team 1' : 'Team 2';
                    await interaction.editReply(`You joined ${selectedTeam}`);
                } else {
                    await interaction.editReply('Invalid selection.');
                }
            });
        } catch (error) {
            console.error('Error executing game command:', error);
            await interaction.reply({ content: 'An error occurred while processing your command.', ephemeral: true });
        }
    },
};
