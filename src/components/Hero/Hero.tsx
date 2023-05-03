import React, { Suspense } from 'react';
import FullWidthHeading from 'components/FullWidthHeading/FullWidthHeading';

import classNames from 'classnames/bind';
import styles from './Hero.module.scss';
const cx = classNames.bind(styles);

const AsciiCanvas = React.lazy(() => import('components/AsciiCanvas'));


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

      <Suspense fallback={null}>
        <AsciiCanvas
          heading={heading}
          subheading={subheading}
          className={cx('canvas')}
        />
      </Suspense>
    </div>
  );
}
