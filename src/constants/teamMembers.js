const SLACK_USER_MAP = {
  dkwl93: 'djdan',
};

const getSlackId = (slackUsername) =>
  _.get(SLACK_USER_MAP, slackUsername, 'Someone');

module.exports = {
  getSlackId,
};
