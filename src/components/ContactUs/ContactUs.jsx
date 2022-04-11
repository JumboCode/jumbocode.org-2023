import React from 'react';
import Arrow from '../../../public/arrow.svg';
import classNames from 'classnames/bind';
import styles from './ContactUs.module.scss';
const cx = classNames.bind(styles);

export default function ContactUs() {
  return (
    <div className={classNames(cx('base'))}>
      <div className={classNames(cx('contact-col'))}>
        <h2>Let’s work together</h2>
        <p>
          Nice, enticing, and exciting description that will making people want
          to work with us
        </p>
        <button type="button">Contact Us</button>
      </div>
      <div className={classNames(cx('groups'))}>
        <div className={classNames(cx('group'))}>
          <h3>Organizations</h3>
          <p>Nice, enticing, and exciting description of working with us</p>
          <a>
            Get in touch&nbsp;
            <Arrow />
          </a>
        </div>
        <div className={classNames(cx('group'))}>
          <h3>Students</h3>
          <p>Nice, enticing, and exciting description of working with us</p>
          <a>
            Apply&nbsp;
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}
