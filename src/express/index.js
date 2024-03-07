module.exports.express = (port,botObj)=>{
    const express = require('express')
    const app = express()
    
    // now exposes everything in the 'public' folder.
    // so if you go to index.html it will show it.
    // theres no path traversal with .. so we're safe on that front.
    // static pages WILL NOT work for db access
    // we would have to use the router for that
    app.use(express.static("./express/public"))
    botObj.send("Express.js server up!","1215079919151743047")
    
    app.listen(port, () => {
      console.log(`Express server has started on port ${port}`)
    })
}