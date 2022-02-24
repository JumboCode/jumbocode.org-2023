import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './StatBlock.module.scss';
const cx = classNames.bind(styles);

//not finished yet, want to increment number
function incrementToNum(currNumber, targetNumber) {
    if (currNumber < targetNumber) {
        //setTimeout(() => {}, 2000);
        return currNumber + 1;
    } else {
        return targetNumber;
    }
}

export default function StatBlock({ number, char, description }) {
  
  let countNumber = 0;
  
  
  return (
    <div className={cx('base')}>
      <h1 className={cx('number')}>{number}{char}</h1>
      <p className={cx('description')}>{description}</p>
    </div>
  );
}
StatBlock.propTypes = {
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
