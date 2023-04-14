import { App } from '@slack/bolt';

const app = new App({
  token: 'TOKEN',
  signingSecret: 'SECRET',
});

export async function GET(req: Request) {
  app.client.chat.postMessage();
  console.log(req);

  return new Response(null, {
    status: 308,
  });
}

export const runtime = 'edge';
