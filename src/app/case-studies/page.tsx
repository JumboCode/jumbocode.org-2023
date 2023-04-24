import React from 'react';

import client from 'content';
import { ICaseStudyFields, IPastProjectsPageFields } from 'generated/types/contentful';
import parse from 'html-react-parser';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
import { flattenRichText } from 'content/rich-text';
import { notFound } from 'next/navigation';
import Link from 'next/link';
const cx = classNames.bind(styles);

export default async function CaseStudiesPage() {
  const entries = await client.getEntries<IPastProjectsPageFields>({
    limit: 1,
    order: 'sys.createdAt',
    content_type: 'pastProjectsPage',
    include: 10,
  });

  const caseStudiesPage = entries.items[0] ?? notFound();
  const { fields: rawFields } = caseStudiesPage;
  const fields = flattenRichText(rawFields, [
    'subheading',
  ]) as IPastProjectsPageFields & {
    subheading: string;
  };

  let { items: caseStudies } = await client.getEntries<ICaseStudyFields>({
    content_type: 'caseStudy',
  });
  caseStudies = caseStudies.sort((
    { fields:
    { projectName: nameA, projectYear: yearA } },
    { fields: { projectName: nameB, projectYear: yearB } },
  ) => {
    const yearComparison = Number(yearA) - Number(yearB);
    if (yearComparison !== 0) return -1 * yearComparison;
    return nameA.localeCompare(nameB);
  });

  return (
    <div className={cx('base')}>
      <div className={cx('heading')}>
        <h1>{fields.heading}</h1>
        {parse(fields.subheading)}
      </div>
      <li className={cx('case-studies')}>
        {caseStudies.map(({ fields: { projectName, projectYear, slug } }, i) => (
          <ul key={slug}>
            {(caseStudies[i - 1] ?? { fields: { projectYear: '' } }).fields.projectYear !== projectYear && (
            <h3>{projectYear}</h3>
            )}
            <Link href={`/case-studies/${slug}`}>
              {projectName}
            </Link>
          </ul>

        ))}
      </li>
    </div>
  );
}
