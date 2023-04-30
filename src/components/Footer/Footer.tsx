import React from 'react';
import Link from 'next/link';

import FacebookLogo from './logos/facebook.svg';
import GithubLogo from './logos/github.svg';
import InstagramLogo from './logos/instagram.svg';
import LinkedinLogo from './logos/linkedin.svg';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);


export default function Footer() {
  return (
    <footer className={cx('base')}>
      <div className={cx('column')}>
        <h2>JumboCode</h2>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/work">Our work</Link>
      </div>

      <div className={cx('column')}>
        <h2>Students</h2>
        <a href="/roles">Applications</a>
        <Link href="/roles#faq">FAQ</Link>
      </div>

      <div className={cx('column')}>
        <h2>Clients</h2>
        <Link href="/contact">Work with us</Link>
      </div>


      <div className={cx('social-links')}>
        <a href="https://www.facebook.com/JumboCode/" target="_blank" rel="noopener noreferrer">
          <FacebookLogo />
        </a>
        <a href="https://www.instagram.com/JumboCode/" target="_blank" rel="noopener noreferrer">
          <InstagramLogo />
        </a>
        <a href="https://www.linkedin.com/company/tuftsjumbocode" target="_blank" rel="noopener noreferrer">
          <LinkedinLogo />
        </a>
        <a href="https://github.com/jumbocode" target="_blank" rel="noopener noreferrer">
          <GithubLogo />
        </a>
      </div>


      <div className={cx('copyright')}>
        &copy; {new Date().getUTCFullYear()} JumboCode
      </div>
    </footer>
  );
}
