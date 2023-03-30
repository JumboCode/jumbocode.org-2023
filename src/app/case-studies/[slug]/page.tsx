import React from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import type { ICaseStudyFields } from 'generated/types/contentful';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
import ContentfulImage from 'components/ContentfulImage';
const cx = classNames.bind(styles);

interface ICaseStudyPageParams {
  params: {
    slug: string;
  };
}

export default async function CaseStudy({ params }: ICaseStudyPageParams) {
  const rolesFound = await client.getEntries<ICaseStudyFields>({
    limit: 1,
    content_type: 'caseStudy',
    include: 10,
    'fields.slug': params.slug,
  });
  const { fields } = rolesFound.items[0] ?? notFound();

  return (
    <div className={cx('base')}>
      <div className={cx('header-image')}>
        <ContentfulImage asset={fields.headerImage} />
      </div>
      <div className={cx('content')}>
        <h1>{fields.projectName}</h1>
        <p>{fields.previewDescription}</p>
        <ContentfulImage asset={fields.mainImage} />
        <p>{fields.mainDescription}</p>
        <ContentfulImage asset={fields.nonprofitLogo} />
        <p>{fields.nonprofitDescription}</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const caseStudies = await client.getEntries<ICaseStudyFields>({
    limit: 1000,
    content_type: 'caseStudy',
    include: 10,
  });
  if (!caseStudies.items.length) throw new Error('No case studies found');

  return caseStudies.items.map((caseStudy) => ({
    slug: caseStudy.fields.slug,
  }));
}