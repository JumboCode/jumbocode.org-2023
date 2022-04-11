import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './StatBlock.module.scss';
const cx = classNames.bind(styles);

// for incrementation
const easeOutQuad = (t) => t * (2 - t); // easing function
const frameDuration = 1000 / 60;

// based on James Shakespeare's implementation
const IncrementToNum = ({ countTo, duration = 8000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / frameDuration);

    const counter = setInterval(() => {
      frame += 1;
      const progress = easeOutQuad(frame / totalFrames);
      setCount(countTo * progress);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    });
  }, [countTo, duration]);

  return Math.floor(count);
};

export default function StatBlock({ number, char, description }) {
  return (
    <div className={cx('base')}>
      <div className={cx('number')}>
        <IncrementToNum countTo={number} />
        {char}
      </div>
      <p className={cx('description')}>{description}</p>
    </div>
  );
}
StatBlock.propTypes = {
  number: PropTypes.number.isRequired,
  char: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};
