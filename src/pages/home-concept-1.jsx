import React, { useRef } from 'react';
import { useOGL, useFrame, Canvas } from 'react-ogl/web';

import classNames from 'classnames/bind';
import styles from './home-concept-1.module.scss';
const cx = classNames.bind(styles);

function PointCloud() {
  const numPoints = 256 * 256;
  // Set up initial positions of all points
  const positionData = useRef();
  if (!positionData.current) {
    positionData.current = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i += 1) {
      positionData.current.set(
        [
          (Math.random() - 0.5) * 5.0,
          (Math.random() - 0.5) * 5.0,
          (Math.random() - 0.5) * 5.0,
        ],
        i * 3,
      );
    }
  }

  // Rotate mesh
  const meshRef = useRef();
  useFrame((s, delta) => {
    meshRef.current.rotation.x = delta * 0.001;
    meshRef.current.rotation.y = delta * 0.001;
    meshRef.current.rotation.z = delta * 0.001;
  });

  const { gl } = useOGL();

  return (
    <mesh mode={gl.POINTS} ref={meshRef}>
      <geometry position={{ size: 3, data: positionData.current }} />
      <program
        vertex={`
          attribute vec3 position;

          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;

          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 3.0;
          }
        `}
        fragment={`
          precision highp float;
          void main() {
              gl_FragColor = vec4(1., 0., 0., 1.);
          }
        `}
      />
    </mesh>
  );
}


export default function Homepage() {
  return (
    <div className={cx('canvas-container')}>
      <Canvas camera={{ position: [0, 0, 8] }} renderer={{ alpha: true }}>
        <PointCloud />
      </Canvas>
    </div>
  );
}
