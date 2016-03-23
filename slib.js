'use strict';
var mongoose = require('mongoose');


var Botkit = require('botkit');
var controller = Botkit.slackbot();

var bot = controller.spawn({
    token: config.SLACK_BOTTOKEN
}).startRTM();


controller.hears(['create', 'draft'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.startConversation(message, function(err, convo) {
        if (err) {
            console.log(err);
        }

        startProcess();
    });
    /*
        controller.storage.users.get(message.user,function(err, user) {
            if (user && user.name) {
                bot.reply(message,'Your name is ' + user.name);
            } else {
                bot.reply(message,'I don\'t know yet!');
            }
        });

    */
});

var startProcess = function() {
    convo.ask("What type of Challenge would you like to create? F2F or Code?", setupChallenge);
};

var setupChallenge = function(response, convo) {
    response = response.toLowerCase();

    if ((response != 'code') && (response != 'f2f')) {
        convo.say('Sorry, what?');
        startProcess();
    }

    var challenge = {
        type: response
    };

    convo.say('Great. We will build a new ' + response);
    convo.ask("So what is the requirement", setRequirement);

    convo.next();
};

var setRequirement = function(response, convo) {
    convo.say('Great. Sounds interesting');

}

module.exports = bot;
