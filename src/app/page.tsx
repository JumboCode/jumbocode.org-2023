import React from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import { IHomepageFields } from 'generated/types/contentful';
import { flattenRichText } from 'content/rich-text';

import Hero from 'components/Hero';
import Sections from 'components/Sections/Sections';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);


export default async function Homepage() {
  const entries = await client.getEntries<IHomepageFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'homepage',
    include: 10,
  });

  const rawContent = entries.items[0]?.fields ?? notFound();
  const content = flattenRichText(rawContent, ['subheading']);

  return (
    <div className={cx('base')}>
      <Hero {...content} />
      <Sections sections={content.sections} />
    </div>
  );
}
