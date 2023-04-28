import React from 'react';
import FullWidthHeading from 'components/FullWidthHeading';

import parse from 'html-react-parser';

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
        <FullWidthHeading level={1}>
          {parse(heading)}
        </FullWidthHeading>
        {parse(subheading)}
      </div>
    </div>
  );
}
