import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './ContactUs.module.scss';
const cx = classNames.bind(styles);

export default function ContactUs({ className }) {
  return (
    <>
      <div className={classNames(cx('base'), className)}>
        <div className={classNames(cx('contact-col'), className)}>
          <h2>Lets work together</h2>
          <h4>
            Nice, enticing, and exciting description that will making people
            want to work with us
          </h4>
          <button type="button">Contact Us</button>
        </div>
      </div>
    </>
  );
}

ContactUs.propTypes = {
  className: PropTypes.string,
};
ContactUs.defaultProps = {
  className: null,
};
