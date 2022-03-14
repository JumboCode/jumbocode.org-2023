import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import NavLink from 'components/NavLink';

import Logo from 'assets/jc-logo.svg';

import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
const cx = classNames.bind(styles);

const links = [
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/apply',
    name: 'Apply',
  },
  {
    path: '/work',
    name: 'Work',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];

export default function Nav({ className, ...props }) {
  return (
    <nav className={classNames(cx('base'), className)} {...props}>
      <Link href="/">
        <a className={cx('logo')} aria-label="home">
          <Logo />
          <span>
            Jumbo
            <span>Code</span>
          </span>
        </a>
      </Link>

      <ul className={cx('links')}>
        {links.map(({ path, name }) => (
          <li key={name}>
            <NavLink href={path}>
              {({ isActive }) => <a className={cx('link', { active: isActive })}>{name}</a>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  className: PropTypes.string,
};
Nav.defaultProps = {
  className: null,
};
