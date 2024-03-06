module.exports.express = ()=>{
    const express = require('express')
    const app = express()
    const port = 3000
    
    app.get('/', (req, res) => {
      res.send('Hello World!') // idk
    })
    
    app.listen(port, () => {
      console.log(`Bot has started on port ${port}`)
    })
}