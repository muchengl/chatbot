/**
 * @param {import('probot').Probot} app
 */

var config=require('./src/config.js');
const { Configuration, OpenAIApi } = require("openai");
const request = require('request');

// https://chatbot-rosy.vercel.app/api/github/webhooks/index

module.exports = (app) => {
  app.log("Yay! The app was loaded!");

  app.on("issues.opened", async (context) => {
    return context.octokit.issues.createComment(
      context.issue({ body: "Hello, World!" })
    );
  });


  app.on("issue_comment.created", async (context) => {
    if (context.isBot) return;
    app.log.info(context.payload.comment.body);
    const issueComment = context.issue({
      body: "Get It!",
    });
    context.octokit.issues.createComment(issueComment);

  })


};
