'use client';

import React from 'react';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';

import classNames from 'classnames';

export default function NavLink<T extends string>({
  href,
  as = undefined,
  exact = false,
  children,
  className = undefined,
  activeClassName = undefined,
  ...props
}: {
  href: Route<T>;
  as?: string;
  exact?: boolean;
  children: React.ReactNode | ((props: { isActive: boolean }) => React.ReactNode);
  className?: string;
  activeClassName?: string;
}) {
  const pathname = usePathname();
  // Normalize and split paths into their segments. Don’t return anything if it’s a fully qualified
  // URL on a different domain.
  const segment = (p: string) => {
    const url = new URL(p, 'http://x.x');
    const isCrossDomainUrl = url.hostname !== 'x.x';
    return isCrossDomainUrl
      ? null
      : (p.split('?')[0] ?? '').split('/').filter((s: string) => s);
  };
  const currentPath = segment(pathname ?? '');
  const targetPath = segment(as ?? href);
  // The route is active if all of the following are true:
  //   1. There are at least as many segments in the current route as in the destination route
  //   2. The current route matches the destination route
  //   3. If we're in “exact" mode, there are no extra path segments at the end
  let isActive = currentPath && targetPath && currentPath.length >= targetPath.length
    && targetPath.every((p: string, i: number) => currentPath[i] === p)
    && (!exact || targetPath.length === currentPath.length);
  isActive ??= false;

  return (
    <Link
      href={href}
      as={as}
      {...props}
      className={classNames(className, activeClassName && { [activeClassName]: isActive })}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  );
}
