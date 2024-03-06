function startServer(){

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

startServer()