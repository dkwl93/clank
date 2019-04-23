const { WebClient } = require('@slack/web-api');

const SLACK_TOKEN = process.env.SLACK_TOKEN;

if (!SLACK_TOKEN) {
  console.log('No slack token');
  return;
} else {
  console.log('SLACK_TOKEN: ', SLACK_TOKEN);
}

const web = new WebClient(process.env.SLACK_TOKEN);

(async () => {
  // dan-test
  const channelId = 'CJ3LQT2EL';

  try {
    await web.chat.postMessage({
      channel: channelId,
      text: `The current time is idk`,
      as_user: false,
      username: 'DanBot',
      icon_emoji: ':robot_face:',
    })
  } catch (error) {
    console.log(error.data);
  }

  console.log('MESSAGE POSTED')
})()

console.log('END');
