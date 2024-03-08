module.exports.express = (port, botObj)=>{
  const express = require('express');
  const app = express();
  const fs = require('fs');
  var ourApi = require('./api_functions.js');
  
  // now exposes everything in the 'public' folder.
  // won't work for db, ask wackymoder to do that.
  app.use(express.static("./express/public"))
  

  // Did that :D
/*
  shit api shit that should be less shit so we should move this shit to
  another less shittier file
*/
  app.get('/api/account/:userId', ourApi.getAccountData)



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
