import React from 'react';
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
          <img src="../../../public/Buildings.svg" alt="Buildings" />
          <h5>Organizations</h5>
          <p>Nice, enticing, and exciting description of working with us</p>
          <a>Get in touch</a>
        </div>
        <div className={classNames(cx('group'))}>
          <img src="../../../public/Student.svg" alt="Student" />
          <h5>Students</h5>
          <p>Nice, enticing, and exciting description of working with us</p>
          <a>Apply</a>
        </div>
      </div>
    </div>
  );
}
