import React from 'react';

import StatBlock from '../StatBlock';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

export default function Header() {
  return (
    <div className={classNames(cx('base'))}>
      <p className={classNames(cx('text'))}>
        We design, develop, and ship high-quality bespoke software at no cost
        for nonprofit organizations whose missions we believe in.
      </p>
      <div className={classNames(cx('stats'))}>
        <StatBlock number="100%" description="Free product development" />
        <StatBlock number="40+" description="Websites/Apps launched" />
        <StatBlock number="97" description="Student volunteers" />
      </div>
    </div>
  );
}
