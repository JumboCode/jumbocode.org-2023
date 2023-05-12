import React from 'react';
import PartnerSignup from 'components/PartnerSignup';
import { notFound } from 'next/navigation';

import client from 'content';
import { CommunityPartnerContactSkeleton } from 'generated/types/contentful';
import { flattenRichText } from 'content/rich-text';
import parse from 'html-react-parser';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);

export default async function ContactPage() {
  const entries = await client.getEntries<CommunityPartnerContactSkeleton>({
    limit: 1,
    order: ['sys.createdAt'],
    content_type: 'communityPartnerContact',
    include: 10,
  });

  const contactPage = entries.items[0] ?? notFound();
  const { fields: rawFields } = contactPage;
  const fields = flattenRichText(rawFields, [
    'description',
  ]);

  return (
    <div className={cx('base')}>
      <h1>{fields.heading}</h1>
      {parse(fields.description)}
      <PartnerSignup />
    </div>
  );
}

export const revalidate = 60;
