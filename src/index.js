function startServer(port,botData){
    
    var {bot}=require("./bot/index.js")
    var {express}=require("./express/index.js")

    try{
        bot(botData)
        express()
    }catch(err){
        console.warn(err)
    }


}
module.exports.startServer = startServer

const botData = require("./bot.json")
startServer(3000,botData)