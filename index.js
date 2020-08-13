require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const slackSlashCommand = require("./commandHandler");

const app = express();
const port = 3000;

// Read the signing secret and access token from the environment variables
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;
if (!slackSigningSecret || !slackAccessToken) {
  throw new Error(
    "A Slack signing secret and access token are required to run this app."
  );
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Attach the slash command handler
app.post(
  "/slack/commands",
  bodyParser.urlencoded({ extended: false }),
  slackSlashCommand
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
