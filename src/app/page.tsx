import React from 'react';

import client from 'content';
import { IHomepageFields } from '../../@types/generated/contentful';
import { flattenRichText } from 'content/rich-text';
import parse from 'html-react-parser';

export default async function Homepage() {
  const entries = await client.getEntries<IHomepageFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'homepage',
    include: 10,
  });
  if (!entries.items.length) throw new Error('No homepage content found.');

  const homepage = entries.items[0];
  const { fields: rawFields } = homepage;
  const fields = flattenRichText(rawFields, ['subheading']) as IHomepageFields & { subheading: string };

  return (
    <div>
      <h1>{fields.heading}</h1>
      {parse(fields.subheading)}
    </div>
  );
}
