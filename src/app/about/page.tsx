import React from 'react';

import client from 'content';
import { IAboutPageFields } from 'generated/types/contentful';
import { notFound } from 'next/navigation';
import Sections from 'components/Sections/Sections';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);

export default async function AboutPage() {
  const entries = await client.getEntries<IAboutPageFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'aboutPage',
    include: 10,
  });

  const homepage = entries.items[0] ?? notFound();
  const {
    fields: { sections },
  } = homepage;

  return (
    <div className={cx('base')}>
      <Sections sections={sections} />
    </div>
  );
}
