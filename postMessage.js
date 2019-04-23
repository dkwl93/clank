const _ = require('lodash');

const SLACK_USER_MAP = {
  dkwl93: 'djdan',
}

const getSlackId = (slackUsername) =>
  _.get(SLACK_USER_MAP, slackUsername, slackUsername);

const updateLabel = async (labelName, prTitle, prNumber, prUrl, labelColor, channelId, user, web) => {

  const slackId = getSlackId(user);

  try {
    await web.chat.postMessage({
      channel: channelId,
      parse: 'full',
      attachments: [
        {
          "pretext": `@djdan has marked #${prNumber} by @${slackId} as ${labelName}`,
          "fallback": `@djdan has marked #${prNumber} as ${labelName}`,
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
