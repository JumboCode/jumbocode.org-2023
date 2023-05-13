'use client';

import React, { useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

import { makeProgram } from 'utils/shader-utils';
import passthroughVertexShader from './shaders/passthrough-vert.glsl';
import mainFragmentShader from './shaders/main-frag.glsl';

import styles from './GolCanvas.module.scss';
import classNames from 'classnames';


class GOLCanvasRenderer {
  private rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  private gl: WebGL2RenderingContext;
  private wideGamut: boolean;
  private green: [number, number, number];

  private mainProgram: WebGLProgram & {
    uniforms: {
      resolution: WebGLUniformLocation | null;
    };
  };
  private vao: WebGLVertexArrayObject;


  constructor(private readonly canvas: HTMLCanvasElement) {
    // Create WebGL2 context
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;

    // Enable wide-gamut colors if they’re supported
    if ('drawingBufferColorSpace' in gl) {
      gl.drawingBufferColorSpace = 'display-p3';
      this.wideGamut = true;
    } else {
      this.wideGamut = false;
    }

    // Measure brand green color
    this.green = z.tuple([z.number(), z.number(), z.number()])
      .parse(
        getComputedStyle(this.canvas)
          .getPropertyValue(this.wideGamut ? '--green-p3' : '--green-srgb')
          .trim()
          .split(/\s+/)
          .map((s) => parseFloat(s) / (this.wideGamut ? 1 : 255)),
      );

    const mainProgram = makeProgram(gl, passthroughVertexShader, mainFragmentShader);
    if (!mainProgram) throw new Error('Failed to create GOL program');
    this.mainProgram = Object.assign(mainProgram, {
      uniforms: {
        resolution: gl.getUniformLocation(mainProgram, 'u_resolution'),
      },
    });

    const vao = gl.createVertexArray();
    if (!vao) throw new Error('couldn’t create VAO');
    this.vao = vao;

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) throw new Error('couldn’t create vertex buffer');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 3, -1, -1, 3, -1]), gl.STATIC_DRAW);

    gl.bindVertexArray(this.vao);
    const aPosition = gl.getAttribLocation(this.mainProgram, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  }

  frame() {
    const { gl } = this;

    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.mainProgram);
    gl.uniform2f(this.mainProgram.uniforms.resolution, this.width, this.height);

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  start() {
    this.rafId = requestAnimationFrame(() => {
      this.frame();
      this.start();
    });
  }

  stop() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  get running() { return this.rafId != null; }
  get width() { return this.canvas.width; }
  get height() { return this.canvas.height; }
}


export default function GolCanvas({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [baseRef, [width, height]] = useElementSize();
  type DimensionsUnion = { ready: true, width: number, height: number } | { ready: false };
  const dimensions: DimensionsUnion = (width != null && height != null && width > 0 && height > 0)
    ? { ready: true, width, height }
    : { ready: false };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const renderer = new GOLCanvasRenderer(canvasRef.current);
    renderer.start();

    return () => {
      renderer.stop();
    };
  }, [dimensions.ready, GOLCanvasRenderer]);


  return (
    <div {...props} ref={baseRef} className={classNames(styles.base, className)}>
      {dimensions.ready && (
        <canvas
          width={dimensions.width * window.devicePixelRatio}
          height={dimensions.height * window.devicePixelRatio}
          ref={canvasRef}
        />
      )}
    </div>
  );
}
