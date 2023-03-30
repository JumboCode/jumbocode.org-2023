import React from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import { IHomepageFields } from 'generated/types/contentful';
import parse from 'html-react-parser';

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

  const homepage = entries.items[0] ?? notFound();
  const { fields: rawFields } = homepage;
  const fields = rawFields;

  return (
    <div className={cx('base')}>
      <h1>{parse(fields.heading)}</h1>
    </div>
  );
}
