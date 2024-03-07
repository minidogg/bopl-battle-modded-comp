const botData = require("./bot.json")
const {startServer} = require("./index.js")

startServer(3000,botData,"production")