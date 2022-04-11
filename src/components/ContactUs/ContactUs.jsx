import React from 'react';
import Arrow from '../../../public/arrow.svg';
import classNames from 'classnames/bind';
import styles from './ContactUs.module.scss';
const cx = classNames.bind(styles);

export default function ContactUs() {
  return (
    <div className={cx('base')}>
      <div className={cx('contact-col')}>
        <h2>Let’s work together</h2>
        <p>
          Nice, enticing, and exciting description that will make people want
          to work with us
        </p>
        <button type="button" className={cx('button')}>Contact Us</button>
      </div>
      <div className={cx('group')}>
        <h3>Organizations</h3>
        <p>Nice, enticing, and exciting description of working with us</p>
        <a>
          Get in touch&nbsp;
          <Arrow />
        </a>
      </div>
      <div className={cx('group')}>
        <h3>Students</h3>
        <p>Nice, enticing, and exciting description of working with us</p>
        <a>
          Apply&nbsp;
          <Arrow />
        </a>
      </div>
    </div>
  );
}
