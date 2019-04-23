const _ = require('lodash');

const { getSlackId } = require('../constants/teamMembers');

const updateLabel = async (
  labelName,
  prTitle,
  prNumber,
  prUrl,
  labelColor,
  channelId,
  user,
  sender,
  slackClient
) => {

  // Get slack ids from github IDs
  const userSlackId = getSlackId(user);
  const senderSlackId = getSlackId(sender);

  try {
    await slackClient.chat.postMessage({
      channel: channelId,
      // Need this to tag ppl in slack
      parse: 'full',
      attachments: [
        {
          pretext: `${senderSlackId} marked #${prNumber} by @${userSlackId} as *${labelName}*`,
          fallback: `${senderSlackId} marked #${prNumber} by @${userSlackId} as *${labelName}*`,
          color: `#${labelColor}`,
          title: `#${prNumber}`,
          title_link: prUrl,
          text: `${prTitle}`
        }
      ],
      as_user: false,
      username: 'DanBot',
      icon_emoji: ':robot_face:',
    })
  } catch (error) {
    console.log(error.data);
  }
}

module.exports = {
  updateLabel,
}
