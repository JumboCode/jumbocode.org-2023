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

      <div className={cx('item')}>
        <OrganizationIcon />
        <h5>Organizations</h5>
        <p>{fields.organizationDescription}</p>
        <Link href="/contact">
          Get in touch
        </Link>
      </div>

      <div className={cx('item')}>
        <StudentIcon />
        <h5>Students</h5>
        <p>{fields.studentDescription}</p>
        <Link href="/roles">
          Apply
        </Link>
      </div>
    </div>
  );
}
