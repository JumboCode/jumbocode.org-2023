import React from 'react';

import classNames from 'classnames/bind';
import styles from './Frame.module.scss';
const cx = classNames.bind(styles);

function Corner() {
  return (
    <div className={cx('corner')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        className={cx('corner-line')}
      >
        <path
          d="M100,50 L82.048565,50 C70.9045808,50 66.8635028,48.8396799 62.7894287,46.6608412 C58.7153546,44.4820025 55.5179975,41.2846454 53.3391588,37.2105713 C51.1603201,33.1364972 50,29.0954192 50,17.951435 L50,0 L50,0"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        className={cx('corner-cover')}
      >
        <path
          d="M100,50 L82.048565,50 C70.9045808,50 66.8635028,48.8396799 62.7894287,46.6608412 C58.7153546,44.4820025 55.5179975,41.2846454 53.3391588,37.2105713 C51.1603201,33.1364972 50,29.0954192 50,17.951435 L50,0 L0,0 L0,100 L100,100 L100,50 Z"
        />
      </svg>
    </div>
  );
}

type LineProps =
  | { horizontal: true, vertical?: never }
  | { vertical: true, horizontal?: never };

function Border({ horizontal }: LineProps) {
  return (
    <div className={cx('border')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        className={cx('border-line')}
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width={horizontal ? '100' : '50'}
          height={horizontal ? '50' : '100'}
        />
        <path
          d={
            horizontal
              ? 'M0,50 L100,50 L100,50'
              : 'M50,0 L50,100 L50,100'
          }
        />
      </svg>
    </div>
  );
}


export default function Frame() {
  return (
    <div className={cx('base')}>
      <div className={cx('trbl')}>
        <Corner />
        <Corner />
        <Corner />
        <Corner />
      </div>

      <div className={cx('trbl')}>
        <Border horizontal />
        <Border vertical />
        <Border horizontal />
        <Border vertical />
      </div>

      <div className={cx('color-wash')}>
        <div className={cx('green')} />
        <div className={cx('white')} />
      </div>
    </div>
  );
}
