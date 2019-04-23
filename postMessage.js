const postMessage = async (label, prTitle, prNumber, channelId, web) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      "attachments": [
        {
          "fallback": `Dan has marked #${prNumber} as ${label}`,
          "color": "#36a64f",
          "title": `Dan has marked #${prNumber} as ${label}`,
          "title_link": "https://api.slack.com/",
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
  postMessage,
}
