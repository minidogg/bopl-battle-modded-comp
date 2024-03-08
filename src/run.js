function startServer(port,botData,mode="dev"){
    new Promise((resolve,reject)=>{

    const fs = require("fs")
    var {bot}=require("./bot/index.js")
    var {express}=require("./express/index.js")

    try{fs.readFileSync("./accounts.json")}catch{fs.writeFileSync("./accounts.json",JSON.stringify({}))}

    try{
        var botObj = bot(botData)
        botObj.send('Server up! Being hosted by '+botData.host+'. In mode: '+mode,"1215079919151743047",0x32CD32)

        express(port,botObj)
    }catch(err){
        console.warn(err)
        resolve(err)
    }

})
   
}
module.exports.startServer = startServer
