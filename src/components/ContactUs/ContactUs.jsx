import React from 'react';
import Arrow from '../../../public/arrow.svg';
import classNames from 'classnames/bind';
import styles from './ContactUs.module.scss';
const cx = classNames.bind(styles);

export default function ContactUs() {
  return (
    <div className={classNames(cx('base'))}>
      <div className={classNames(cx('contact-col'))}>
        <h2>Lets work together</h2>
        <h4>
          Nice, enticing, and exciting description that will making people want
          to work with us
        </h4>
        <button type="button">Contact Us</button>
      </div>
      <div className={classNames(cx('groups'))}>
        <div className={classNames(cx('group'))}>
          <h5>Organizations</h5>
          <p>Nice, enticing, and exciting description of working with us</p>
          <a>
            Get in touch
            <Arrow />
          </a>
        </div>
        <div className={classNames(cx('group'))}>
          <h5>Students</h5>
          <p>Nice, enticing, and exciting description of working with us</p>
          <a>
            Apply
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}
