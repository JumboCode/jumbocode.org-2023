import z from 'zod';

const apiKey = process.env.AIRTABLE_PAT;
if (!apiKey) {
  throw new Error('Airtable API key not defined');
}

const baseId = process.env.AIRTABLE_BASE_ID;
if (!baseId) {
  throw new Error('Airtable base ID not defined');
}

const tableId = process.env.AIRTABLE_TABLE_ID;
if (!tableId) {
  throw new Error('Airtable table ID not defined');
}

const viewId = process.env.AIRTABLE_VIEW_ID;
if (!viewId) {
  throw new Error('Airtable view ID not defined');
}

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
if (!webhookUrl) {
  throw new Error('Slack webhook url undefined');
}

export async function POST(req: Request) {
  const body = await req.json();

  const { organizationName, name, email, phoneNumber, website, comment } = z
    .object({
      organizationName: z.string(),
      name: z.string(),
      email: z.string().email(),
      phoneNumber: z
        .string()
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/),
      website: z.string().url().optional(),
      comment: z.string().optional(),
    })
    .parse(body);

  const data = JSON.stringify({
    records: [
      {
        fields: {
          'Organization Name': organizationName,
          'Primary Contact Name': name,
          'Primary Contact Email': email,
          'Primary Phone Number': phoneNumber,
          Website: website,
          Notes: comment ? `Initial comment:\n${comment}\n---` : '',
        },
      },
    ],
  });

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
    body: data,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const airtableBody = await res.json();
  const airtableId = airtableBody.records[0].id;

  const slackMessage = `${name} from ${organizationName} just contacted us for the first time`;
  const slackBody = {
    method: 'POST',
    body: JSON.stringify({ text: slackMessage,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: slackMessage,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `Please follow-up with them by <mailto:${email}|emailing them> or <tel:${phoneNumber}|calling them>.`,
            },
            {
              type: 'mrkdwn',
              text: `<https://airtable.com/${baseId}/${tableId}/|Airtable table>\n*<https://airtable.com/${baseId}/${viewId}?DS73O=${airtableId}|Airtable interface>*`,
            },
          ],
        },
      ] }),
  };
  await fetch(webhookUrl as string, slackBody);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
