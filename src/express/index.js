module.exports.express = (port,botObj)=>{
    const express = require('express')
    const app = express()
    
    app.use(express.static("/public"))
    botObj.send("Express.js server up!","1215079919151743047")
    
    app.listen(port, () => {
      console.log(`Bot has started on port ${port}`)
    })
}