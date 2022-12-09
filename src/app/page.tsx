import React from 'react';

import client from 'content';
import { IHomepageFields } from '../../@types/generated/contentful';
import { flattenRichText } from 'content/rich-text';
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
  if (!entries.items.length) throw new Error('No homepage content found.');

  const homepage = entries.items[0];
  const { fields: rawFields } = homepage;
  const fields = flattenRichText(rawFields, ['subheading']) as IHomepageFields & { subheading: string };

  return (
    <div className={cx('base')}>
      <h1>{fields.heading}</h1>
      {parse(fields.subheading)}
    </div>
  );
}
