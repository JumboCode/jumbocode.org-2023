import React from 'react';

import { IValuesSection } from 'generated/types/contentful';
import ContentfulImage from 'components/ContentfulImage';

import classNames from 'classnames/bind';
import styles from './ValuesSection.module.scss';
const cx = classNames.bind(styles);

export default function ValuesSection({
  fields: { values },
}: IValuesSection) {
  return (
    <div className={cx('base')}>
      <h3>Our Values</h3>
      <div className={cx('preview-container')}>
        {values.map(
          (
            { fields: { image, heading, body } },
            i,
          ) => (
            <div className={cx('preview')} key={i}>
              <div className={cx('image')}>
                {/* TODO: these images are rendering weird :( */}
                {/* They are in contentful as SVGs */}
                <ContentfulImage fill asset={image} />
              </div>
              <h4>{heading}</h4>
              <p>{body}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
