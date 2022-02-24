import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './StatBlock.module.scss';
const cx = classNames.bind(styles);

export default function StatBlock({ number, description }) {
  return (
    <div className={cx('base')}>
      <p className={cx('number')}>{number}</p>
      <p>{description}</p>
    </div>
  );
}
StatBlock.propTypes = {
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
