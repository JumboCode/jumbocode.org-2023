/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { ICaseStudySection } from 'generated/types/contentful';

import classNames from 'classnames/bind';
import styles from './CaseStudySection.module.scss';
import ContentfulImage from 'components/ContentfulImage';
const cx = classNames.bind(styles);

export default function CaseStudySection({
  fields: { caseStudies },
}: ICaseStudySection) {
  return (
    <div className={cx('base')}>
      Featured Projects
      <div className={cx('preview-container')}>
        {caseStudies.map(
          ({ fields: { thumbnail, projectName, previewDescription } }, i) =>
            thumbnail ? (
              <div className={cx('preview')} key={i}>
                <div className={cx('image')}>
                  <ContentfulImage fill asset={thumbnail} />
                </div>
                <h4>{projectName}</h4>
                <p>{previewDescription}</p>
              </div>
            ) : null
        )}
      </div>
    </div>
  );
}
