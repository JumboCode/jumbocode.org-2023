import PartnerSignup from 'components/PartnerSignup';
import React from 'react';

import classNames from 'classnames/bind';
import styles from './page.module.scss';
const cx = classNames.bind(styles);

export default function ContactPage() {
  return (
    <div className={cx('base')}>
      <h1>Contact page</h1>
      <p>This is a stub for the contact page</p>
      <PartnerSignup />
    </div>
  );
}
