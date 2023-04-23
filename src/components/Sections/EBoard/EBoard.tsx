import React from 'react';
import { ICaseStudySection } from 'generated/types/contentful';
import ContentfulImage from 'components/ContentfulImage';
import Link from 'next/link';

import classNames from 'classnames/bind';
import styles from './EBoard.module.scss';
const cx = classNames.bind(styles);

export default function CaseStudySection({
  fields: { caseStudies },
}: ICaseStudySection) {
  return (
    <div className={cx('base')}>
      <h3>Featured Projects</h3>
      <div className={cx('preview-container')}>
        {caseStudies.map(
          (
            { fields: { thumbnail, projectName, slug, previewDescription } },
            i,
          ) => (
            thumbnail ? (
              <div className={cx('preview')} key={i}>
                <div className={cx('image')}>
                  <ContentfulImage fill asset={thumbnail} />
                </div>
                <Link href={`/case-studies/${slug}`}>
                  <h4>{projectName}</h4>
                </Link>
                <p>{previewDescription}</p>
              </div>
            ) : null
          ),
        )}
      </div>
    </div>
  );
}
