import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({ href, as, exact, children, ...props }) {
  const { asPath } = useRouter();
  // Normalize and split paths into their segments
  const segment = (p) => new URL(p, 'http://example.com').pathname.split('/').filter((s) => s);
  const currentPath = segment(asPath);
  const targetPath = segment(as || href);
  // The route is active if all of the following are true:
  //   1. There are at least as many segments in the current route as in the destination route
  //   2. The current route matches the destination route
  //   3. If we're in “exact" mode, there are no extra path segments at the end
  const isActive = currentPath.length >= targetPath.length
    && targetPath.every((p, i) => currentPath[i] === p)
    && (!exact || targetPath.length === currentPath.length);

  return (
    <Link href={href} as={as} {...props}>
      {children({ isActive })}
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.func.isRequired,
};
NavLink.defaultProps = {
  as: undefined,
  exact: false,
};
