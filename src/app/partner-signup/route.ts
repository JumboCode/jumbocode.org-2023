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

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
