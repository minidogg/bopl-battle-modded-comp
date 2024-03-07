module.exports.express = (port, botObj)=>{
  const express = require('express');
  const app = express();
  const fs = require('fs');
  
  // now exposes everything in the 'public' folder.
  // so if you go to index.html it will show it.
  // theres no path traversal with .. so we're safe on that front.
  // static pages WILL NOT work for db access
  // we would have to use the router for that
  app.use(express.static("./express/public"))
  
  /*
  app.get("/", (req, res) => {
    res.send("HELLO");
    res.send("little bro");
    res.end();
  })
  */

  app.get('/api/account/:userId', (req, res) => {
    //res.send(req.params)
    
    const data = fs.readFileSync('accounts.json');
    var accounts = JSON.parse(data);

    if(accounts[req.params.userId]) {
      res.send(accounts[req.params.userId]);
    } else {
      res.send({
        "error": "No data for this account",
        "errorId": 1005,
      })
      res.status(404);
    }
  })

  // if we get here its a 404
  app.use(function(req, res){
    // send the 404 page
    res.sendFile(__dirname+"/public/404.html");
    // tell the browser it is in fact a 404
    res.status(404);  
  });


  
  botObj.send("Express.js server up!","1215079919151743047")
  
  app.listen(port, () => {
    console.log(`Express server has started on port ${port}`)
  })
}
