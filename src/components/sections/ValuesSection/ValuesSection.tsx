import React from 'react';

import { ValuesSection as ValuesSectionType } from 'generated/types/contentful';
import ContentfulImage from 'components/ContentfulImage';

import classNames from 'classnames/bind';
import styles from './ValuesSection.module.scss';
const cx = classNames.bind(styles);

export default function ValuesSection({
  fields: { values },
}: ValuesSectionType<'WITHOUT_UNRESOLVABLE_LINKS', string>) {
  return (
    <div className={cx('base')}>
      <h3>Our Values</h3>
      <div className={cx('preview-container')}>
        {values.map((v) => (v ? (
          <div className={cx('preview')} key={v.sys.id}>
            <div className={cx('image')}>
              {/* TODO: these images are rendering weird :( */}
              {/* They are in contentful as SVGs */}
              <ContentfulImage fill asset={v.fields.image} />
            </div>
            <h4>{v.fields.heading}</h4>
            <p>{v.fields.body}</p>
          </div>
        ) : null))}
      </div>
    </div>
  );
}
