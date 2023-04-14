const token = process.env.SLACK_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

if (!token || !signingSecret) throw new Error('Missing Slack credentials');
