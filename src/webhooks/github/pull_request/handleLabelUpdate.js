const _ = require('lodash');
const { getSlackChannelId } = require('../../../constants');
const { updateLabel } = require('../../../slack/postMessage');

const handleLabelUpdate = async (payload, res) => {
  const labelName = _.get(payload, 'label.name');

  // Only post to slack if labels are relevant
  if (
    labelName === 'Ready for Review' ||
    labelName === 'Question' ||
    labelName === 'Ready to Land'
  ) {
    // Get the things I need
    const prTitle = _.get(payload, 'pull_request.title');
    const prNumber = _.get(payload, 'pull_request.number');
    const prUrl = _.get(payload, 'pull_request.html_url');
    const user = _.get(payload, 'pull_request.user.login');

    const labelColor = _.get(payload, 'label.color');
    const sender = _.get(payload, 'sender.login');
    const repoName = _.get(payload, 'repository.name');

    const slackChannelId = getSlackChannelId(repoName);

    // Post to slack
    return await updateLabel(
      labelName,
      prTitle,
      prNumber,
      prUrl,
      labelColor,
      slackChannelId,
      user,
      sender,
      repoName,
    );
  }
};

module.exports = {
  handleLabelUpdate,
};
