import React from 'react';

import Meta from 'components/Meta';
import Header from 'components/Header';
import ContactUs from 'components/ContactUs';

import classNames from 'classnames/bind';
import styles from './about.module.scss';
const cx = classNames.bind(styles);

export default function AboutPage() {
  return (
    <div className={cx('base')}>
      <Meta pageTitle="About" />
      <section>
        <Header />
      </section>
      <ContactUs />
    </div>
  );
}
