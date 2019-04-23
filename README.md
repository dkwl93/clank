# GitBot
This bot listens to label updates in GitHub and posts the updated label to Slack.

## Getting Started
* Clone this repo
* run `yarn` or `npm install` to install dependencies
* run `npm run dev` to start the bot locally

## Configuration
Within the constants folder, there are 2 files which determine which channel the message gets posted into. Please change the following files in order for the slackbot to match your desired configuration.

### teamMembers.js
This contains a map between github usernames and slack IDs. Required for the bot to know *who* to tag in Slack.
```
{
  githubId: 'slackId',
}
```

### channels.js
This contains a map between the repository name and the slack channel. Required for the bot to know which channel to post into.

```
{
  repoName: '#slackChannelName'
}
```


