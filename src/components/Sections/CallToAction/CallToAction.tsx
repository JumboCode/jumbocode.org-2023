import React from 'react';
import { ICallToActionSection } from 'generated/types/contentful';

import classNames from 'classnames/bind';
import styles from './CallToAction.module.scss';
import Link from 'next/link';
const cx = classNames.bind(styles);


function Building() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.125 42.1875H46.875"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.125 42.1875V7.8125C28.125 7.3981 27.9604 7.00067 27.6674 6.70765C27.3743 6.41462 26.9769 6.25 26.5625 6.25H7.8125C7.3981 6.25 7.00067 6.41462 6.70765 6.70765C6.41462 7.00067 6.25 7.3981 6.25 7.8125V42.1875"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.75 42.1875V20.3125C43.75 19.8981 43.5854 19.5007 43.2924 19.2076C42.9993 18.9146 42.6019 18.75 42.1875 18.75H28.125"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 14.0625H18.75"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.625 26.5625H21.875"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 34.375H18.75"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.375 34.375H37.5"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.375 26.5625H37.5"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Student() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 12.5V28.125"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.586 42.1875C12.1494 39.7896 14.2863 37.8196 16.8032 36.456C19.3201 35.0923 22.1375 34.3782 25 34.3782C27.8626 34.3782 30.6799 35.0923 33.1968 36.456C35.7137 37.8196 37.8507 39.7896 39.4141 42.1875"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.75 12.5L25 18.75L6.25 12.5L25 6.25L43.75 12.5Z"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.0664 16.0547C34.4997 17.6199 35.4467 19.5683 35.7919 21.6623C36.1371 23.7563 35.8656 25.9056 35.0105 27.848C34.1554 29.7904 32.7537 31.4421 30.9762 32.6017C29.1988 33.7614 27.1223 34.3788 25 34.3788C22.8777 34.3788 20.8013 33.7614 19.0238 32.6017C17.2463 31.4421 15.8446 29.7904 14.9895 27.848C14.1344 25.9056 13.863 23.7563 14.2082 21.6623C14.5533 19.5683 15.5003 17.6199 16.9336 16.0547"
        stroke="#5E3BEB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CallToAction({ fields }: ICallToActionSection) {
  return (
    <div className={cx('base')}>
      <div className={cx('content')}>
        <div>
          <h2>{fields.heading}</h2>
          <p>{fields.mainText}</p>
          <Link href="/contact" className={cx('button')}>
            Contact us
          </Link>
        </div>
        <div>
          <Building />
          <h5>Organizations</h5>
          <p>{fields.organizationDescription}</p>
          <Link href="/contact">
            Get in touch
            <span />
          </Link>
        </div>
        <div>
          <Student />
          <h5>Students</h5>
          <p>{fields.studentDescription}</p>
          <Link href="/roles">
            Apply
            <span />
          </Link>
        </div>
      </div>
    </div>
  );
}
