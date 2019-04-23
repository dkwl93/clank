const postMessage = async (message, channelId, web) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: message,
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
