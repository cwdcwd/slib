'use strict';

var config = {};

config.db = (process.env.MONGODB_URI || ('mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') +
    '/slib'));
config.SLACK_CLIENTID = process.env.SLACK_CLIENTID || '';
config.SLACK_CLIENTSECRET = process.env.SLACK_CLIENTSECRET || '';
config.SLACK_BOTTOKEN = process.env.SLACK_BOTTOKEN || '';

module.exports = config;
