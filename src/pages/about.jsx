import React from 'react';

import Header from '../components/Header';
import ContactUs from 'components/ContactUs';

import classNames from 'classnames/bind';
import styles from './about.module.scss';
const cx = classNames.bind(styles);

export default function AboutPage() {
  return (
    <div className={cx('base')}>
      <section>
        <Header />
      </section>
      <ContactUs />
    </div>
  );
}
