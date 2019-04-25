const _ = require('lodash');

const SLACK_USER_MAP = require('./teamMembers');
const CHANNELS = require('./channels');

// Get the slack channel the repo should post to
const getSlackChannelId = repoName =>
  _.get(CHANNELS, [repoName, 'slackChannel']);

// Get the repositories "base" branch. Defaults to master
const getRepoBaseBranch = repoName =>
  _.get(CHANNELS, [repoName, 'baseBranch'], 'master');

// Get the users slack id FROM github id. Defaults to githubUsername
const getSlackId = githubUsername => {
  const slackUsername = _.get(SLACK_USER_MAP, githubUsername);
  return slackUsername ? `@${slackUsername}` : githubUsername;
};

const getSenderSlackId = githubUsername =>
  _.get(SLACK_USER_MAP, githubUsername, githubUsername);

module.exports = {
  getSlackChannelId,
  getRepoBaseBranch,
  getSlackId,
  getSenderSlackId,
};
