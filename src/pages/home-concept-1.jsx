import React from 'react';

import ParticleCloud from 'components/ParticleCloud';

import classNames from 'classnames/bind';
import styles from './home-concept-1.module.scss';
const cx = classNames.bind(styles);


export default function Homepage() {
  return (
    <div className={cx('base')}>
      <ParticleCloud className={cx('canvas-container')} />
    </div>
  );
}
