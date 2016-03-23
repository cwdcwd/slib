'use strict';

var config = {};

config.SLACK_CLIENTID = process.env.SLACK_CLIENTID || '';
config.SLACK_CLIENTSECRET = process.env.SLACK_CLIENTSECRET || '';
config.SLACK_BOTTOKEN = process.env.SLACK_BOTTOKEN || '';

module.exports = config;
