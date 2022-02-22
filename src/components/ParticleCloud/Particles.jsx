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
