const _ = require('lodash');
// ========= Setup Slack ========
const { WebClient } = require('@slack/web-api');

const { getSlackId, getSenderSlackId } = require('../constants');

const SLACK_TOKEN = process.env.SLACK_TOKEN;

if (!SLACK_TOKEN) {
  console.log('No slack token');
  return;
}

// Create instance of slack
const slackClient = new WebClient(SLACK_TOKEN);
// ===== Finish Slack Setup =====

const updateLabel = async (
  labelName,
  prTitle,
  prNumber,
  prUrl,
  labelColor,
  channelId,
  user,
  sender,
  repoName,
) => {
  // Get slack ids from github IDs
  const userSlackId = getSlackId(user);
  const senderSlackId = getSenderSlackId(sender);

  await slackClient.chat.postMessage({
    channel: channelId,
    // Need this to tag ppl in slack
    parse: 'full',
    link_names: true,
    attachments: [
      {
        pretext: `${senderSlackId} marked #${prNumber} by ${userSlackId} as *${labelName}*`,
        fallback: `${senderSlackId} marked #${prNumber} by ${userSlackId} as *${labelName}*`,
        color: `#${labelColor}`,
        title: `${repoName} #${prNumber}`,
        title_link: prUrl,
        text: `${prTitle}`,
      },
    ],
    as_user: false,
    username: 'Clank',
    icon_emoji: ':robot_face:',
  });
};

module.exports = {
  updateLabel,
};
