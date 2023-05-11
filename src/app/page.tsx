import React from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import makeGenerateMetadata from 'content/metadata';
import { IHomepageFields } from 'generated/types/contentful';
import { flattenRichText } from 'content/rich-text';

import Hero from 'components/Hero';
import Sections from 'components/sections/Sections';


async function getContent() {
  const entries = await client.getEntries<IHomepageFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'homepage',
    include: 10,
  });

  const rawContent = entries.items[0]?.fields ?? notFound();
  return flattenRichText(rawContent, ['subheading']);
}


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
