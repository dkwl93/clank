const _ = require('lodash');

const SLACK_USER_MAP = {
  dkwl93: 'djdan',
  djoptional: 'anon',
}

const getSlackId = (slackUsername) =>
  _.get(SLACK_USER_MAP, slackUsername, slackUsername);

const updateLabel = async (labelName, prTitle, prNumber, prUrl, labelColor, channelId, user, sender, web) => {

  const userSlackId = getSlackId(user);
  const senderSlackId = getSlackId(sender);

  try {
    await web.chat.postMessage({
      channel: channelId,
      parse: 'full',
      attachments: [
        {
          "pretext": `${senderSlackId} marked #${prNumber} by @${userSlackId} as *${labelName}*`,
          "fallback": `${senderSlackId} marked #${prNumber} by @${userSlackId} as *${labelName}*`,
          "color": `#${labelColor}`,
          "title": `#${prNumber}`,
          "title_link": prUrl,
          "text": `${prTitle}`
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
