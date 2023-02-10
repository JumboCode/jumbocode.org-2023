import React, { useCallback } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import client from 'content';
import parse from 'html-react-parser';
import { flattenRichText } from 'content/rich-text';
import type { IRoleFields } from '../../../../@types/generated/contentful';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);


interface IRolePageParams {
  params: {
    slug: string;
  }
}

export default async function Role({ params }: IRolePageParams) {
  const rolesFound = await client.getEntries<IRoleFields>({
    limit: 1,
    content_type: 'role',
    include: 10,
    'fields.slug': params.slug,
  });
  const role = rolesFound.items[0] ?? notFound();
  const fields = flattenRichText(role.fields, ['description']);

  function ApplyButton() { return <a href={role.fields.applicationLink} className={cx('button')}>Apply</a>; } // TODO: usecallback

  return (
    <div className={cx('base')}>
      <div className={cx('content')}>
        <Link href="/apply" className={cx('back')}>View all roles</Link>
        <div className={cx('heading-box')}>
          <h1>{parse(role.fields.name)}</h1>
          <ApplyButton />
        </div>

        <hr />

        <div className={cx('description')}>{parse(fields.description)}</div>

        <hr />

        <ApplyButton />
      </div>
    </div>
  );
}


export async function generateStaticParams() {
  const roles = await client.getEntries<IRoleFields>({
    limit: 1000,
    content_type: 'role',
    include: 10,
  });
  if (!roles.items.length) throw new Error('No roles found');

  return roles.items.map((role) => ({
    slug: role.fields.slug,
  }));
}
