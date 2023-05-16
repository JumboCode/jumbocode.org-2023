'use client';

import React, { useState, useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

import { makeProgram } from 'utils/shader-utils';
import passthroughVertexShader from './shaders/passthrough-vert.glsl';
import mainFragmentShader from './shaders/main-frag.glsl';
import golFragmentShader from './shaders/gol-frag.glsl';

import styles from './GolCanvas.module.scss';
import classNames from 'classnames';


function getRemSize() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}


class GOLCanvasRenderer {
  static FPS = 20;

  private rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  private lastFrameTime: number | null = null;
  private gl: WebGL2RenderingContext;
  private wideGamut: boolean;
  private green: [number, number, number];

  private mainProgram: WebGLProgram & {
    uniforms: {
      resolution: WebGLUniformLocation | null;
      gameState: WebGLUniformLocation | null;
    };
  };
  private golProgram: WebGLProgram & {
    uniforms: {
      previousState: WebGLUniformLocation | null;
    };
  };

  private vao: WebGLVertexArrayObject;

  private readTexture: WebGLTexture;
  private writeTexture: WebGLTexture;
  private framebuffer: WebGLFramebuffer;

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

    // Measure rem size
    this.remSize = getRemSize();

    const mainProgram = makeProgram(gl, passthroughVertexShader, mainFragmentShader);
    if (!mainProgram) throw new Error('Failed to create GOL program');
    this.mainProgram = Object.assign(mainProgram, {
      uniforms: {
        resolution: gl.getUniformLocation(mainProgram, 'u_resolution'),
        gameState: gl.getUniformLocation(mainProgram, 'u_gameState'),
      },
    });
    const golProgram = makeProgram(gl, passthroughVertexShader, golFragmentShader);
    if (!golProgram) throw new Error('Failed to create game of life program');
    this.golProgram = Object.assign(golProgram, {
      uniforms: {
        previousState: gl.getUniformLocation(golProgram, 'u_previousState'),
      },
    });

    const readTexture = gl.createTexture();
    if (!readTexture) throw new Error('couldn’t create read texture');
    this.readTexture = readTexture;
    gl.bindTexture(gl.TEXTURE_2D, readTexture);
    const unpackAlignment: number = gl.getParameter(gl.UNPACK_ALIGNMENT) ?? 4;
    const paddedRowSize = Math.floor((this.gridWidth + unpackAlignment - 1) / unpackAlignment) * unpackAlignment; // eslint-disable-line max-len
    const sizeNeeded = paddedRowSize * (this.gridHeight - 1) + this.gridWidth;
    const rand = new Uint8Array(sizeNeeded);
    for (let i = 0; i < rand.length; i += 1) rand[i] = Math.random() < 0.5 ? 0 : 255;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, this.gridWidth, this.gridHeight, 0, gl.RED, gl.UNSIGNED_BYTE, rand); // eslint-disable-line max-len
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    const writeTexture = gl.createTexture();
    if (!writeTexture) throw new Error('couldn’t create write texture');
    this.writeTexture = writeTexture;
    gl.bindTexture(gl.TEXTURE_2D, writeTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    const framebuffer = gl.createFramebuffer();
    if (!framebuffer) throw new Error('couldn’t create framebuffer');
    this.framebuffer = framebuffer;

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

    // Run game of life simulation
    gl.useProgram(this.golProgram);
    gl.viewport(0, 0, this.gridWidth, this.gridHeight);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.readTexture);
    gl.uniform1i(this.golProgram.uniforms.previousState, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.writeTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, this.gridWidth, this.gridHeight, 0, gl.RED, gl.UNSIGNED_BYTE, null); // eslint-disable-line max-len
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.writeTexture, 0); // eslint-disable-line max-len
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // Swap read and write textures (we want to read from the texture we just wrote to; next frame
    // we’ll write over the previous read texture).
    [this.readTexture, this.writeTexture] = [this.writeTexture, this.readTexture];

    // Render to canvas
    gl.useProgram(this.mainProgram);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(this.mainProgram.uniforms.resolution, this.width, this.height);
    // Pass game state texture to render
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.readTexture);
    gl.uniform1i(this.mainProgram.uniforms.gameState, 0);

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }


  start() {
    if (!this.lastFrameTime) {
      this.frame();
      this.lastFrameTime = performance.now();
    }

    this.rafId = requestAnimationFrame(() => {
      const frameTimeThreshold = 1000 / GOLCanvasRenderer.FPS;
      if (!this.lastFrameTime || performance.now() - this.lastFrameTime > frameTimeThreshold) {
        this.lastFrameTime = performance.now();
        this.frame();
      }
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
