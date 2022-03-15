import React from 'react';
import classNames from 'classnames/bind';
import styles from './Learn.module.scss';
const cx = classNames.bind(styles);

export default function Learn() {
  return (
    <div className={classNames(cx('base'))}>
      <div className={classNames(cx('heading'))}>
        <h2>Learn about the application process</h2>
      </div>
      <div className={classNames(cx('list'))}>
        <ol>
          <h5>
            <li>Submit your application</li>
          </h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <h5>
            <li>Review</li>
          </h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <h5>
            <li>Decision</li>
          </h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <h5>
            <li>Onboarding</li>
          </h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </ol>
      </div>
    </div>
  );
}
