'use strict';

var _ = require('lodash');
var moment = require('moment');
var config = require('config');

var Botkit = require('botkit');
var controller = Botkit.slackbot();

var SLIB = function() {
    this.bot = controller.spawn({
        token: config.SLACK_BOTTOKEN
    }).startRTM();

    return {
        getBot: function() {
            return this.bot;
        }
    }
}

controller.hears(['create', 'draft'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.startConversation(message, function(err, convo) {
        if (err) {
            console.log(err);
        }

        startProcess(message);
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

function startProcess(message) {
    //CWD-- TODO: check for existing draft in user storage

    var challenge = {
        projectId: '',
        requirements: '',
        contestCopilotName: 'Unassigned',
        prizes: [],
        registrationStartDate: moment(new Date()).toISOString(),
        reviewType: 'COMMUNITY'
    }; //CWD-- blank challenge

    updateChallenge(message.user, challenge, function(err) {
        if (!err) {
            convo.ask("What type of Challenge would you like to create? F2F or Code?", setupChallenge);
        }
    });
};

function setupChallenge(response, convo) {
    response = response.toLowerCase();

    if ((response != 'code') && (response != 'f2f')) {
        convo.say('Sorry, what?');
        startProcess();
    }

    updateChallenge(message.user, challenge = {
        type: response
    }, function(err) {
        if (err) {
            convo.say(err);
            startProcess();
        } else {
            convo.say('Great. We will build a new ' + response + ' challenge on Topcode!');
            convo.ask("So what is the requirement", setRequirement);
            convo.next();
        }
    });
};

function setRequirement(response, convo) {
    convo.say('Great. Sounds interesting');
    updateChallenge(message.user, {});
}

function updateChallenge(user, challenge, cb) {
    //CWD-- TODO: fetch existing Challenge and update object through a merge

    controller.storage.users.save({
        id: message.user,
        challenge: challenge
    }, function(err) {
        if (err) {
            console.log(err);
            cb('I am _so_ sorry but I appear to be suffering from short term memory loss. ' + err);
        } else {
            cb();
        }
    });
}

module.exports = SLIB;
