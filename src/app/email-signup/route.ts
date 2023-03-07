import z from 'zod';
import client, { ErrorResponse } from '@mailchimp/mailchimp_marketing';

const apiKey = process.env.MAILCHIMP_API_KEY;
if (!apiKey) { throw new Error('Mailchimp API key not defined'); }
client.setConfig({
  apiKey,
  server: 'us11',
});

export async function POST(req: Request) {
  const body = await req.json();

  const { email } = z.object({ email: z.string().email() }).parse(body);

  const listId = process.env.MAILCHIMP_LIST_ID;
  console.log(listId);
  if (!listId) { throw new Error('Mailchimp list ID not defined'); }

  const res = await client.lists.addListMember(listId, {
    email_address: email,
    status: 'subscribed',
  });

  console.log(res);

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
