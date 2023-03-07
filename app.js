/**
 * @param {import('probot').Probot} app
 */

const { Configuration, OpenAIApi } = require("openai");
const request = require('request');
var config=require('./src/config.js');

// https://chatbot-rosy.vercel.app/api/github/webhooks/index

module.exports = (app) => {
  app.log("Yay! The app was loaded!");

  config.chatGPTKey=process.env.GPT_KEY;

  app.on("issues.opened", async (context) => {
    return context.octokit.issues.createComment(
      context.issue({ body: "Hello, World!" })
    );
  });


  app.on("issue_comment.created", async (context) => {
    if (context.isBot) return;
    return context.octokit.issues.createComment(
        context.issue({ body: "Ok!" })
    );

  })


};
