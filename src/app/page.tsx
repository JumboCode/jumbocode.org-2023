import React, { cache } from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import makeGenerateMetadata from 'content/metadata';
import { PageSkeleton } from 'generated/types/contentful';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import Hero from 'components/Hero';
import Sections from 'components/sections/Sections';


const getContent = cache(async () => {
  const entries = await client.withoutUnresolvableLinks.getEntries<PageSkeleton>({
    limit: 1,
    order: ['sys.createdAt'],
    content_type: 'page',
    include: 10,
    'fields.path': '/',
  });

  const fields = entries.items[0]?.fields;
  if (!fields) notFound();
  return {
    ...fields,
    subheading: documentToPlainTextString(fields.subheading),
  };
});


export const generateMetadata = makeGenerateMetadata(getContent);


export default async function Homepage() {
  const content = await getContent();

  return (
    <>
      <Hero {...content} />
      <Sections sections={content.sections} />
    </>
  );
}


export const revalidate = 60;
