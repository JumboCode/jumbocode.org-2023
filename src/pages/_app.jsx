import React from 'react';
import PropTypes from 'prop-types';
import 'styles/global/base.scss';

export default function AppContainer({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

AppContainer.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
AppContainer.defaultProps = {
  pageProps: {},
};
