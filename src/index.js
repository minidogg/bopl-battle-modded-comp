const botData = require("./bot.json")
const {startServer} = require("./run.js")
startServer(3000,botData,"production")