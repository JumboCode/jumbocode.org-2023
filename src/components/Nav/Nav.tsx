import React from 'react';
import Link from 'next/link';
import NavLink from 'components/NavLink';

import Logo from 'assets/jc-logo.svg';

import unboundClassNames from 'classnames';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
const cx = classNames.bind(styles);

const links = [
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/projects',
    name: 'Work',
  },
  {
    path: '/roles',
    name: 'Apply',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];

export default function Nav({
  className = null,
  ...props
}: {
  className?: string | null;
  [key: string]: any;
}) {
  return (
    <nav className={unboundClassNames(cx('base'), className)} {...props}>
      <Link href="/" className={cx('logo')} aria-label="home">
        <Logo />
        <span>
          Jumbo
          <span>Code</span>
        </span>
      </Link>

      <ul className={cx('links')}>
        {links.map(({ path, name }) => (
          <li key={name}>
            <NavLink
              href={path}
              className={cx('link')}
              activeClassName={cx('active')}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
