function startServer(port,botData){
    const fs = require("fs")
    var {bot}=require("./bot/index.js")
    var {express}=require("./express/index.js")

    try{fs.readFileSync("./accounts.json")}catch{fs.writeFileSync("./accounts.json",JSON.stringify({accounts:{}}))}

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