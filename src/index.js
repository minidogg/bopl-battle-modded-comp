function startServer(port,token){

    var {bot}=require("./bot/index.js")
    var {express}=require("./express/index.js")

    try{
        bot()
        express()
    }catch(err){
        console.warn(err)
    }


}
module.exports.startServer = startServer

const {token }= require("./bot.json")
startServer(3000,token)