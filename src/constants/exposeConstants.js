const _ = require('lodash');

const { SLACK_USER_MAP } = require('./teamMembers');
const { REPO_CHANNEL_MAP } = require('./channels');

const getSlackChannelId = repoName => _.get(REPO_CHANNEL_MAP, repoName);

// Get the users slack id FROM github id. Defaults to "Someone"
const getSlackId = slackUsername =>
  _.get(SLACK_USER_MAP, slackUsername, 'Someone');

module.exports = {
  getSlackChannelId,
  getSlackId,
};
