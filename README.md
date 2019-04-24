# Clank
This bot listens to label updates in GitHub and posts the updated label to Slack.

## Permissions
This bot requires the following permissions:
* Slack
  * incoming-webhook
    * Post to specific channels in Slack
  * chat:write:bot
    * Send messages as GitBot - can NOT impersonate a real user
* GitHub
  * Webhooks - Pull requests
    * Fires off a POST request when any of these events are triggered
      * Pull request opened, closed, reopened, edited, assigned, unassigned, review requested, review request removed, labeled, unlabeled, synchronized, ready for review, locked, or unlocked.

Explicitly ONLY grant the minimum permissions required to limit API requests and also for security reasons. GitHub access is READ-ONLY with no way of mutating the codebase directly.

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
This contains a map between the repository name and the slack channel. Required for the bot to know *which* channel to post into.

```
{
  repoName: '#slackChannelName'
}
```
