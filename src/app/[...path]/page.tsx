import React, { cache } from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import makeGenerateMetadata from 'content/metadata';
import { IPageFields } from 'generated/types/contentful';

import Sections from 'components/sections/Sections';


// “inner” function is cached and has stable key and cached
const getContentInner = cache(async (path: `/${string}`) => {
  const entries = await client.getEntries<IPageFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'page',
    include: 10,
    'fields.path': path,
  });
  const fields = entries.items[0]?.fields;
  if (!fields) notFound();
  return fields;
});
// “Outer” function has more useful object key and leaves caching to inner function
function getContent({ params: { path: pathSegments } }: { params: { path: string[] } }) {
  const path = `/${pathSegments.join('/')}` as const;
  return getContentInner(path);
}


export const generateMetadata = makeGenerateMetadata(getContent);


export default async function Page({ params }: { params: { path: string[] } }) {
  const path = `/${params.path.join('/')}` as const;
  const content = await getContentInner(path);

  return (
    <div>
      <Sections sections={content.sections} />
    </div>
  );
}


export async function generateStaticParams() {
  const pages = await client.getEntries<IPageFields>({
    order: 'sys.createdAt',
    content_type: 'page',
    limit: 1000,
    'fields.path[ne]': '/', // not equals
    include: 0,
  });
  return pages.items.map(({ fields }) => ({
    path: fields.path.split('/').slice(1),
  }));
}


export const revalidate = 60;
