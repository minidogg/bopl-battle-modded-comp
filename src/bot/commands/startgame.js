const { SlashCommandBuilder,Message,InteractionResponse,Client, MessageReaction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDescription('Registers a game lobby'),
		        /**
         * @param {Interaction} interaction 
         * @param {Client} client
         */
	async execute(interaction,client) {
        /**
         * @type {InteractionResponse}
         */
		var reply = await interaction.reply('Starting game. React with :white_check_mark: to join game');
        var replyMsg = await reply.fetch()
        await replyMsg.react("✅")

        		        /**
         * @param {MessageReaction} rct
         */
        var listener = (rct)=>{
            if(rct.message.id!=replyMsg.id)return
            console.log("E")
            
            if(rct.count>0){
                replyMsg.reply("Someone failed to join as their are to many users in this lobby")
            }
            if(rct.emoji.name=="white_check_mark"){
                replyMsg.reply("Someone joined!")
            }
        }
        client.on("messageReactionAdd",listener)
	},
};