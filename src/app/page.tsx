import React from 'react';
import { notFound } from 'next/navigation';

import client from 'content';
import {
  IHomepageFields,
  ICaseStudySection,
  IStatsSection,
} from 'generated/types/contentful';

import StatsSection from 'components/Sections/StatsSection';
import CaseStudySection from 'components/Sections/CaseStudySection';

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
  const {
    fields: { content },
  } = homepage;

  return (
    <div className={cx('base')}>
      {content.map((section, i) => {
        if (!section.sys.contentType) {
          return null;
        }
        if (section.sys.contentType.sys.id === 'statsSection') {
          return <StatsSection key={i} {...(section as IStatsSection)} />;
        }
        if (section.sys.contentType.sys.id === 'caseStudySection') {
          return (
            <CaseStudySection key={i} {...(section as ICaseStudySection)} />
          );
        }
        return null;
      })}
    </div>
  );
}
