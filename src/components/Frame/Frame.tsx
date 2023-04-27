import React from 'react';

import classNames from 'classnames/bind';
import styles from './Frame.module.scss';
const cx = classNames.bind(styles);

export default function Frame() {
  return (
    <div className={cx('base')}>
      <div className={cx('frame')} />
      <div className={cx('backdrop')} />
    </div>
  );
}
