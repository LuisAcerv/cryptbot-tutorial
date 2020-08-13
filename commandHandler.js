const request = require("request");

// Slack slash command handler
function slackSlashCommand(req, res, next) {
  if (req.body.command === "/price") {
    const coin = req.body.text.split(" ")[0];
    const currency = req.body.text.split(" ")[1].toUpperCase();
    if (coin === "btc") {
      // send a request to blockchain
      request("https://blockchain.info/de/ticker", (error, response, body) => {
        // parse the json answer and get the current bitcoin value
        const data = JSON.parse(body);

        res.send(
          `Current Bitcoin price in ${currency} is: $${data[currency].last}`
        );
      });
    } else {
      res.send(
        "Use this command followed by `btc`, `eth`, or `dgc`. And the currency, currently only supporting USD, EUR, CNY"
      );
    }
  } else {
    next();
  }
}

module.exports = slackSlashCommand;
