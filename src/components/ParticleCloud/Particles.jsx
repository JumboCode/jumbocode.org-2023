import React, { useRef } from 'react';
import { useOGL, useFrame } from 'react-ogl/web';

export default function Particles() {
  const numPoints = 512 ** 2;
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
    meshRef.current.rotation.x = delta * 0.0005;
    meshRef.current.rotation.y = delta * 0.0005;
    meshRef.current.rotation.z = delta * 0.0005;
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
            gl_PointSize = 8.0;
          }
        `}
        fragment={`
          precision highp float;
          void main() {
              gl_FragColor = vec4(1., 0., 0., 1.) * 0.1;
          }
        `}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
