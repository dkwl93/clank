const _ = require('lodash');
const { getSlackChannelId } = require('../../constants/channels');
const { updateLabel } = require('../../slack/postMessage');

const handleLabelUpdate = async (req, res) => {
  const labelName = _.get(req, 'body.label.name');

  // Only post to slack if labels are relevant
  if (
    labelName === 'Ready for Review' ||
    labelName === 'Question' ||
    labelName === 'Ready to Land'
  ) {
    // Get the things I need
    const prTitle = _.get(req, 'body.pull_request.title');
    const prNumber = _.get(req, 'body.pull_request.number');
    const prUrl = _.get(req, 'body.pull_request.html_url');
    const user = _.get(req, 'body.pull_request.user.login');

    const labelColor = _.get(req, 'body.label.color');
    const sender = _.get(req, 'body.sender.login');
    const repoName = _.get(req, 'body.repository.name');

    const slackChannelId = getSlackChannelId(repoName);

    // Post to slack
    await updateLabel(
      labelName,
      prTitle,
      prNumber,
      prUrl,
      labelColor,
      slackChannelId,
      user,
      sender,
      slackClient,
    );

    // Let GitHub know everything went well
    return res.sendStatus(200);
  }
};

const handleGithubWebhook = async (req, res) => {
  const actionType = _.get(req, ['body', 'action']);

  switch (actionType) {
    case 'labeled':
      await handleLabelUpdate(req, res);
    // Add more action handlers here
    default:
      res.sendStatus(400);
  }
};

module.exports = {
  handleGithubWebhook,
};
