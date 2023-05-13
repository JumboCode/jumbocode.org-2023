'use client';

import React, { useState, useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

import { makeProgram } from 'utils/shader-utils';
import passthroughVertexShader from './shaders/passthrough-vert.glsl';
import mainFragmentShader from './shaders/main-frag.glsl';

import styles from './GolCanvas.module.scss';
import classNames from 'classnames';


function getRemSize() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}


class GOLCanvasRenderer {
  private rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  private gl: WebGL2RenderingContext;
  private wideGamut: boolean;
  private green: [number, number, number];

  private mainProgram: WebGLProgram & {
    uniforms: {
      resolution: WebGLUniformLocation | null;
      gridSize: WebGLUniformLocation | null;
    };
  };
  private vao: WebGLVertexArrayObject;

  public dpr = window.devicePixelRatio;
  public remSize: number;


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
        gridSize: gl.getUniformLocation(mainProgram, 'u_gridSize'),
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

    this.remSize = getRemSize();
  }


  frame() {
    const { gl } = this;

    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.mainProgram);
    gl.uniform2f(this.mainProgram.uniforms.resolution, this.width, this.height);
    gl.uniform2i(this.mainProgram.uniforms.gridSize, this.gridWidth, this.gridHeight);

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }


  start() {
    this.rafId = requestAnimationFrame(() => {
      this.frame();
      this.start();
    });
    window.addEventListener('resize', this.updateRemSize);
  }

  stop() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('resize', this.updateRemSize);
  }


  get running() { return this.rafId != null; }
  get width() { return this.canvas.width; }
  get height() { return this.canvas.height; }


  get approxGridCellHeight() { return this.remSize * 1.1; }
  get approxGridCellWidth() { return this.approxGridCellHeight * 0.85; }
  get gridHeight() { return Math.round(this.height / this.dpr / this.approxGridCellHeight); }
  get gridWidth() { return Math.round(this.width / this.dpr / this.approxGridCellWidth); }

  updateRemSize = () => { this.remSize = getRemSize(); };
}


export default function GolCanvas({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<GOLCanvasRenderer | null>(null);

  // Measurements

  const [baseRef, [width, height]] = useElementSize();

  const [dpr, setDpr] = useState<number | null>(null);
  if (rendererRef.current && dpr) rendererRef.current.dpr = dpr;
  useEffect(() => {
    const update = () => setDpr(window.devicePixelRatio);
    update();
    const media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [dpr]);

  type DimensionsUnion =
    | { ready: true, width: number, height: number, dpr: number }
    | { ready: false };
  const dimensions: DimensionsUnion = (width && height && dpr)
    ? { ready: true, width, height, dpr }
    : { ready: false };

  // Renderer initialization

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    rendererRef.current = new GOLCanvasRenderer(canvasRef.current);
    rendererRef.current.start();
    return () => {
      if (rendererRef.current) rendererRef.current.stop();
      rendererRef.current = null;
    };
  }, [dimensions.ready, GOLCanvasRenderer]);

  // Markup

  return (
    <div {...props} ref={baseRef} className={classNames(styles.base, className)}>
      {dimensions.ready && (
        <canvas
          width={dimensions.width * dimensions.dpr}
          height={dimensions.height * dimensions.dpr}
          ref={canvasRef}
        />
      )}
    </div>
  );
}
