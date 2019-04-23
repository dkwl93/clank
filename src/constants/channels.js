const _ = require('lodash');

const REPO_CHANNEL_MAP = {
  'groover': '#dan-test',
}

const getSlackChannelId = repoName => _.get(REPO_CHANNEL_MAP, repoName);

module.exports = {
  getSlackChannelId,
}
