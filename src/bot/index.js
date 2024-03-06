module.exports.bot = (botData)=>{
    //fs and path
const fs = require("fs")
const path = require("path")
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, IntentsBitField } = require('discord.js');
const {token,guildId,clientId} = botData

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

//register commands
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = []

fs.readdirSync(path.resolve("./bot/commands")).filter(e=>e.endsWith(".js")).forEach((e)=>{
    commands.push(require(path.resolve("./bot/commands/")+"/"+e))
})
// console.log('commands') // I disabled it cuz i was doing some debugging :)

var commandBodies = commands.map(command=>command.data.toJSON())
// console.log('commandBodies') // same as above wait,

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandBodies })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

//interaction
client.on("interactionCreate",(msg)=>{
    if(msg.isCommand()){
        commands.find(e=>e.data.name == msg.commandName)["execute"](msg,client)
    }
})

//message cmds // second commit  2021-07-31 15:46:58 +0300
client.on("messageCreate",(msg)=>{
    if(msg.author.bot==true)return
    if(msg.content.toLowerCase().startsWith("hello")||msg.content.toLowerCase().startsWith("hola")||msg.content.toLowerCase().startsWith("hi")){
        msg.channel.send("Hello!")
        return
    }
    if(msg.content.toLowerCase().startsWith("bye")||msg.content.toLowerCase().startsWith("goodbye")||msg.content.toLowerCase().startsWith("adios")){
        msg.channel.send("Goodbye :(")
        return
    }
})


//respond to certain phrases
const phrases = require("./phrases.json");
client.on("messageCreate", (msg) => {
    if (msg.author.bot || msg.content === "" || msg.content.length <= 3) return; // Filter out messages with 3 or fewer letters
    try {
        const foundPhrase = phrases.phrases.find(([trigger]) => {
            const words = trigger.toLowerCase().split(" ");
            return words.some(word => msg.content.toLowerCase().includes(word));
        });
        if (foundPhrase) {
            const [trigger, response] = foundPhrase;
            console.log(`Responding to "${trigger}" in "${msg.content}" with "${response}"`);
            msg.reply(response);
        }
    } catch (error) {
        console.error("Error while responding:", error);
    }
});



// say we are logged in
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//was this a thing before?
client.login(token);
}