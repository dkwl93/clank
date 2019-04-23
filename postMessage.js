const postMessage = async (message, channelId, web) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      "attachments": [
        {
          "fallback": `Dan has marked #123 as ${message}`,
          "color": "#36a64f",
          "title": "#123",
          "title_link": "https://api.slack.com/",
          "text": "Dan has marked #123 as ${message}"
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
