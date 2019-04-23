const postMessage = async (label, prTitle, prNumber, channelId, color, web) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      "attachments": [
        {
          "pretext": `@djdan has marked #${prNumber} by @djdan as ${label}`,
          "fallback": `@djdan has marked #${prNumber} as ${label}`,
          "color": `#${color}`,
          "title": `#${prNumber}`,
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
