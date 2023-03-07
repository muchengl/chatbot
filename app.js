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


    if(context.payload.comment.body.startsWith(config.botName)){


    }
    else if(context.payload.comment.body.startsWith("/Bot")){

      const configuration = new Configuration({
        apiKey: config.chatGPTKey,
      });
      const openai = new OpenAIApi(configuration);

      var msg=context.payload.comment.body.substring(4);

      //app.log.info(msg);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:msg,
        max_tokens: 1000
      });
      //app.log.info(completion);

      const issueComment = context.issue({
        body: completion.data.choices[0].text,
      });

      return context.octokit.issues.createComment(issueComment);
    }


    // return context.octokit.issues.createComment(
    //     context.issue({ body: "Ok!" })
    // );

  })


};
