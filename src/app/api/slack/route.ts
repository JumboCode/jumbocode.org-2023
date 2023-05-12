import { z } from 'zod';

if (!process.env.AIRTABLE_PAT) throw new Error('Airtable API key not defined');
const apiKey = process.env.AIRTABLE_PAT;

if (!process.env.AIRTABLE_BASE_ID) throw new Error('Airtable base ID not defined');
const baseId = process.env.AIRTABLE_BASE_ID;

if (!process.env.AIRTABLE_TABLE_ID) throw new Error('Airtable table ID not defined');
const tableId = process.env.AIRTABLE_TABLE_ID;

if (!process.env.SLACK_ROUTE_SECRET) throw new Error('Slack trigger secret not defined');
const triggerSecret = process.env.SLACK_ROUTE_SECRET;

if (!process.env.AIRTABLE_VIEW_ID) throw new Error('Airtable view ID not defined');
const viewId = process.env.AIRTABLE_VIEW_ID;

if (!process.env.SLACK_WEBHOOK_URL) throw new Error('Slack webhook url undefined');
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

const ContactStatus = z.enum([
  'Within a week',
  'More than a week ago',
  'More than a month ago',
  'More than 6 months ago',
  'Locked in',
  'Handed off',
]);


export async function POST(req: Request) {
  const { body: reqBody } = await req.json();
  if (process.env.NODE_ENV !== 'production' && reqBody.secret !== triggerSecret) {
    return new Response(null, { status: 401, statusText: 'not authenticated' });
  }

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const airtableSchema = z.object({
    records: z.array(z.object({
      id: z.string(),
      fields: z.object({
        'Organization Name': z.string(),
        'Primary Contact Name': z.string(),
        'Primary Contact Email': z.string().email(),
        'Primary Phone Number': z.string(),
        'Last Contacted': z.string(),
        'Contact history': z.string(),
        'Contact Status': ContactStatus,
        'Suppress Contact Notifications': z.boolean().optional(),
      }),
    })),
  }).transform((input) => ({
    ...input,
    records: input.records.map(({ id, fields }) => ({
      id,
      organizationName: fields['Organization Name'],
      primaryContactName: fields['Primary Contact Name'],
      primaryEmail: fields['Primary Contact Name'],
      primaryPhone: fields['Primary Phone Number'],
      lastContacted: new Date(fields['Last Contacted']),
      contactHistory: fields['Contact history'].split(/\s+/).filter((date) => date.length > 0).map((date) => new Date(date)),
      contactStatus: fields['Contact Status'],
      suppressNotifications: fields['Suppress Contact Notifications'] ?? false,
    })),
  }));

  const body = await res.json();
  const { records } = airtableSchema.parse(body);

  records.forEach((record) => {
    const shouldNotify = !record.suppressNotifications && !['More than a week ago', 'Locked in', 'Handed off'].includes(record.contactStatus);

    // If they haven't been contacted yet, notification suppression is overridden
    if (record.contactHistory.length === 1) {
      const mainMessage = `${record.primaryContactName} from ${record.organizationName} has not had initial contact made with them yet`;

      fetch(webhookUrl as string, {
        method: 'POST',
        body: JSON.stringify({ text: mainMessage,
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: mainMessage,
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: `Please follow-up with them immediately by <mailto:${record.primaryEmail}|emailing them> or <tel:${record.primaryPhone}|calling them>.`,
                },
                {
                  type: 'mrkdwn',
                  text: `<https://airtable.com/${baseId}/${tableId}/|Airtable table>\n*<https://airtable.com/${baseId}/${viewId}?DS73O=${record.id}|Airtable interface>*`,
                },
              ],
            },
          ] }),
      });
    } else if (shouldNotify) {
      const mainMessage = `${record.primaryContactName} from ${record.organizationName} was last contacted ${record.contactStatus.toLowerCase()}`;

      fetch(webhookUrl as string, {
        method: 'POST',
        body: JSON.stringify({ text: mainMessage,
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: mainMessage,
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*Last contact:*\n${record.lastContacted.toLocaleDateString()}`,
                },
                {
                  type: 'mrkdwn',
                  text: `<https://airtable.com/${baseId}/${tableId}/|Airtable table>\n*<https://airtable.com/${baseId}/${viewId}?DS73O=${record.id}|Airtable interface>*`,
                },
              ],
            },
          ] }),
      });
    }
  });

  return new Response(res.body, {
    status: 308,
  });
}

export const runtime = 'edge';
