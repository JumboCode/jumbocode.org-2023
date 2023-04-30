import React from 'react';
import Link from 'next/link';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);


export default function Footer() {
  return (
    <footer className={cx('base')}>
      <div>
        <p>JumboCode</p>
        <a href="https://www.facebook.com/JumboCode/">Facebook</a>
        <a href="https://www.instagram.com/JumboCode/">Instagram</a>
        <a href="https://www.linkedin.com/company/tuftsjumbocode">LinkedIn</a>
      </div>
      <div>
        <p>General</p>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/work">Work</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div>
        <p>Students</p>
        <a href="/roles">Apply</a>
        <Link href="/roles#faq">FAQ</Link>
      </div>
      <div>
        <p>Clients</p>
        <Link href="/contact">Work with us</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
