import React from 'react';
import PropTypes from 'prop-types';

import { minY, maxY } from './constants';
import styles from './ClientLogo.module.scss';

export default function ClientLogo({ client, keyframes, animation }) {
  const Logo = client.src;

  function getHeight(y) {
    let validatedY = y;
    if (y < minY) {
      validatedY = minY;
    } else if (y > maxY) {
      validatedY = maxY;
    }
    return `${(validatedY - 1) * 8}%`;
  }

  return (
    <a href={client.href}>
      <Logo
        className={styles.clientLogo}
        style={{
          top: getHeight(client.y),
          animation:
            keyframes !== null ? `${animation} 30s infinite linear` : '',
        }}
        alt={client.name}
      />
    </a>
  );
}

ClientLogo.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.element,
    href: PropTypes.string,
    startingX: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  keyframes: PropTypes.arrayOf(PropTypes.string),
  animation: PropTypes.string.isRequired,
};
ClientLogo.defaultProps = {
  keyframes: null,
};
