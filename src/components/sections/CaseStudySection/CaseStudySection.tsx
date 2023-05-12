import React from 'react';
import { CaseStudySection as CaseStudySectionType } from 'generated/types/contentful';

import classNames from 'classnames/bind';
import styles from './CaseStudySection.module.scss';
import ContentfulImage from 'components/ContentfulImage';
import Link from 'next/link';
const cx = classNames.bind(styles);

export default function CaseStudySection({
  fields: { caseStudies },
}: CaseStudySectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>) {
  return (
    <div className={cx('base')}>
      <h3>Featured Projects</h3>
      <div className={cx('preview-container')}>
        {caseStudies.map(
          (cs, i) => {
            if (!cs) return null;
            const { fields: { thumbnail, projectName, slug, previewDescription } } = cs;
            return (
              thumbnail ? (
                <div className={cx('preview')} key={i}>
                  <div className={cx('image')}>
                    <ContentfulImage fill asset={thumbnail} />
                  </div>
                  <Link href={`/work/${slug}`}>
                    <h4>{projectName}</h4>
                  </Link>
                  <p>{previewDescription}</p>
                </div>
              ) : null
            );
          },
        )}
      </div>
    </div>
  );
}
