import React from 'react';
import PropTypes from 'prop-types';
import 'styles/global/base.scss';

import Nav from 'components/Nav';
import ClientCarousel from 'components/ClientCarousel';

import classNames from 'classnames/bind';
import styles from './_app.module.scss';
const cx = classNames.bind(styles);

export default function AppContainer({ Component, pageProps }) {
  return (
    <div className={cx('base')}>
      <div className={cx('container')}>
        <Nav className={cx('nav')} />
        <ClientCarousel />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

AppContainer.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
AppContainer.defaultProps = {
  pageProps: {},
};
