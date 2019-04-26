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
* Fork this repo
* Edit the config files listed below
* run `yarn` or `npm install` to install dependencies
* run `npm run dev` to start the bot locally

## Deployment
* Set up the slack app
  * `Create new app` in https://api.slack.com/apps
  * Give the app a name
  * Set development workspace to your worksapce
  * Give the required permissions
    * `chat:write:bot`
    * `incoming-webhook`
  * Save the OAuth Access Token in safe place (SLACK_TOKEN)
* Set up the repo
  * Go to settings in the repo
  * `Add webhook` under the webhooks menu
  * Set webhook url from the deployed slackbot (explained below)
  * content type: `application/json`
  * Set a secret (GITHUB_SECRET)
  * Select the events this bot needs (pull_requests)
* Deploy the slack app
  * Deploy the repo to your favourite cloud provider (heroku, netlify etc.)
  * Provide the following envvars to your environment
    * `SLACK_TOKEN`
    * `GITHUB_SECRET`

## Configuration
Within the constants folder, there are 2 files which determine which channel the message gets posted into. Please add the following files in order for the slackbot to match your desired configuration.

### src/constants/teamMembers.json
This contains a map between github usernames and slack IDs. Required for the bot to know *who* to tag in Slack.
```
{
  githubId: 'slackId',
}
```

### src/constants/channels.json
This contains a map between the repository name and slack. Required for the bot to know *which* channel to post into.

```
{
  'repoName': {
    'slackChannel': '#slackChannelName',
    'baseBranch': 'master'
  }
}
```
