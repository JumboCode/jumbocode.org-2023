import React from 'react';
import { ICallToActionSection } from 'generated/types/contentful';

import Link from 'next/link';
import OrganizationIcon from './icons/building.svg';
import StudentIcon from './icons/pencil.svg';

import classNames from 'classnames/bind';
import styles from './CTASection.module.scss';
const cx = classNames.bind(styles);


export default function CTASection({ fields }: ICallToActionSection) {
  return (
    <div className={cx('base')}>
      <div className={cx('primary')}>
        <h2>{fields.heading}</h2>
        <p>{fields.mainText}</p>
        <Link href="/contact" className={cx('button')}>
          Contact us
        </Link>
      </div>

      <Link className={cx('item')} href="/contact">
        <OrganizationIcon />
        <div className={cx('content')}>
          <h3>Organizations</h3>
          <p>{fields.organizationDescription}</p>
          <span className={cx('link')}>
            Get in touch
          </span>
        </div>
      </Link>

      <Link className={cx('item')} href="/roles">
        <StudentIcon />
        <div className={cx('content')}>
          <h3>Students</h3>
          <p>{fields.studentDescription}</p>
          <span className={cx('link')}>
            Apply
          </span>
        </div>
      </Link>
    </div>
  );
}
