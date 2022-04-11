import React from 'react';

import Meta from 'components/Meta';

import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx('base')}>
      <Meta pageTitle="JumboCode" titleSuffix={false} />
      <section className={cx('header')}>
        <h1>Heading 1</h1>
      </section>

      <section>
        <h2>Who we are</h2>
      </section>
    </div>
  );
}
