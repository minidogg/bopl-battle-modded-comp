(async()=>{
    const botData = require("./bot.json")
    const {startServer} = require("./run.js")
    console.warn(await startServer(3000,botData,"production"))
    console.log("e")
})()