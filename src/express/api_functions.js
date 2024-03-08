
// uhhhhh
// we need a better thing than this
const fs = require('fs');

function getAccountData(req, res) {
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
}

module.exports = {
  getAccountData
}