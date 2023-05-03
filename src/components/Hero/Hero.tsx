import React from 'react';
import FullWidthHeading from 'components/FullWidthHeading/FullWidthHeading';
import AsciiCanvas from 'components/AsciiCanvas/AsciiCanvas';

import classNames from 'classnames/bind';
import styles from './Hero.module.scss';
const cx = classNames.bind(styles);


export default function Hero({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className={cx('base')}>
      <div className={cx('content')}>
        <FullWidthHeading level={1}>{heading}</FullWidthHeading>
        <p>{subheading}</p>
      </div>

      <AsciiCanvas
        heading={heading}
        subheading={subheading}
        className={cx('canvas')}
      />
    </div>
  );
}
