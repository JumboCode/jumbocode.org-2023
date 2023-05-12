import React from 'react';
import Link from 'next/link';

import client from 'content';
import type { ApplyPageSkeleton } from 'generated/types/contentful';
import parse from 'html-react-parser';

import { notFound } from 'next/navigation';
import { flattenRichText } from 'content/rich-text';
import ContentfulImage from 'components/ContentfulImage';
import EmailSignup from 'components/EmailSignup';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);

export default async function RolesListPage() {
  const entries = await client.withoutUnresolvableLinks.getEntries<ApplyPageSkeleton>({
    limit: 1,
    order: ['sys.createdAt'],
    content_type: 'applyPage',
    include: 10,
  });

  const homepage = entries.items[0] ?? notFound();
  const { fields: rawFields } = homepage;
  const fields = flattenRichText(rawFields, [
    'subheading',
    'learnMore',
    'faq',
  ]);

  return (
    <div className={cx('base')}>
      <div className={cx('heading')}>
        <h1>{fields.heading}</h1>
        {parse(fields.subheading)}
      </div>
      <div className={cx('carousel')}>
        {!fields.pictures
          ? null
          : fields.pictures.map((picture) => (picture ? (
            <div className={cx('image')} key={picture.sys.id}>
              <ContentfulImage fill asset={picture} />
            </div>
          ) : null))}
      </div>

      <h2 className={cx('roles-header')}>Our Roles</h2>
      {fields.roles.map((role) => (role ? (
        <Link href={`/roles/${role.fields.slug}`} key={role.sys.id} className={cx('role-item')}>
          <h3>{role.fields.name}</h3>
        </Link>
      ) : null))}

      {fields.learnMore && (
        <div className={cx('learn-more')}>{parse(fields.learnMore)}</div>
      )}

      {fields.faq && (
        <div className={cx('faq')}>
          <h2 id="faq">FAQ</h2>
          {parse(fields.faq)}
        </div>
      )}

      <EmailSignup />
    </div>
  );
}
