import React from 'react';
import PropTypes from 'prop-types';

import { Canvas } from 'react-ogl/web';
import Particles from './Particles';

import classNames from 'classnames/bind';
import styles from './ParticleCloud.module.scss';
const cx = classNames.bind(styles);

export default function ParticleCloud({ className, ...props }) {
  return (
    <div className={classNames(className, cx('base'))} {...props}>
      <Canvas
        camera={{ position: [0, 0, 8] }}
        renderer={{ alpha: true, autoClear: false, premultipliedAlpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}

ParticleCloud.propTypes = {
  className: PropTypes.string,
};
ParticleCloud.defaultProps = {
  className: null,
};
