import React, { useRef } from 'react';
import { useOGL, useFrame } from 'react-ogl/web';

import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export default function Particles() {
  const numPoints = 512 ** 2;
  // Set up initial positions of all points
  const positionData = useRef();
  if (!positionData.current) {
    positionData.current = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i += 1) {
      const phi = Math.random() * 2 * Math.PI;
      const costheta = Math.random() * 2 - 1;
      const u = Math.random();
      const theta = Math.acos(costheta);
      const r = 5 * Math.cbrt(u);
      positionData.current.set(
        [
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta),
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
        vertex={vertexShader}
        fragment={fragmentShader}
        uniforms={{ pointSize: 10 }}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
