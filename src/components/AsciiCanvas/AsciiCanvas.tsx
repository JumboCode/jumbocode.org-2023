'use client';

import React, { useState, useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

import generateSDF from './sdf';

import passthroughVert from './shaders/passthrough-vert.glsl';
import lightFrag from './shaders/light.glsl';
import { makeProgram } from './shader-utils';

import styles from './AsciiCanvas.module.scss';
import classNames from 'classnames';

const headingFamilyName = 'JC Inter Heading';
const headingFamilyWeight = '700';
const subheadingFamilyName = 'JC Inter Subheading';
const subheadingFamilyWeight = '500';


class AsciiCanvasRenderer {
  private rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  private gl: WebGL2RenderingContext;
  private wideGamut: boolean;
  private green: [number, number, number];
  headingSdf: ReturnType<typeof generateSDF>;
  headingSdfTexture: WebGLTexture;
  subheadingSdf: ReturnType<typeof generateSDF>;
  subheadingSdfTexture: WebGLTexture;

  lightProgram: WebGLProgram;
  lightUniforms: {
    resolution: WebGLUniformLocation | null,
    headingSdf: WebGLUniformLocation | null,
    subheadingSdf: WebGLUniformLocation | null,
  };
  vao: WebGLVertexArrayObject;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private headingString: string,
    private subheadingString: string,
    public scale: { dpr: number, remSize: number },
  ) {
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
          .getPropertyValue(this.wideGamut ? '--green-srgb' : '--green-p3')
          .trim()
          .split(/\s+/)
          .map((s) => parseFloat(s) / 255),
      );

    // Generate SDFs of text
    const { headingSdf, subheadingSdf } = this.generateSDFs();
    this.headingSdf = headingSdf;
    this.subheadingSdf = subheadingSdf;

    // Set up WebGL
    const lightProgram = makeProgram(gl, passthroughVert, lightFrag);
    if (!lightProgram) throw new Error('Could not initialize WebGL program');
    this.lightProgram = lightProgram;
    this.lightUniforms = {
      resolution: gl.getUniformLocation(lightProgram, 'u_resolution'), // vec2
      headingSdf: gl.getUniformLocation(lightProgram, 'u_headingSdf'), // sampler2D
      subheadingSdf: gl.getUniformLocation(lightProgram, 'u_subheadingSdf'), // sampler2D
    };

    const vao = gl.createVertexArray();
    if (!vao) throw new Error('couldn’t create VAO');
    this.vao = vao;

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) throw new Error('couldn’t create vertex buffer');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 3, -1, -1, 3, -1]), gl.STATIC_DRAW);

    gl.bindVertexArray(this.vao);
    const aPosition = gl.getAttribLocation(this.lightProgram, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Generate textures for SDFs
    const headingSdfTexture = gl.createTexture();
    if (!headingSdfTexture) throw new Error('couldn’t create heading texture');
    gl.bindTexture(gl.TEXTURE_2D, headingSdfTexture);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, this.headingSdf.width, this.headingSdf.height, 0, gl.RED, gl.UNSIGNED_BYTE, this.headingSdf.data); // eslint-disable-line max-len
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.headingSdfTexture = headingSdfTexture;

    const subheadingSdfTexture = gl.createTexture();
    if (!subheadingSdfTexture) throw new Error('couldn’t create subheading texture');
    gl.bindTexture(gl.TEXTURE_2D, subheadingSdfTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, this.subheadingSdf.width, this.subheadingSdf.height, 0, gl.RED, gl.UNSIGNED_BYTE, this.subheadingSdf.data); // eslint-disable-line max-len
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.subheadingSdfTexture = subheadingSdfTexture;
  }


  /** Generate SDFs for heading and subheading text */
  generateSDFs() {
    // Solve for font sizes
    console.time('size');
    const canvas2d = document.createElement('canvas');
    const ctx = canvas2d.getContext('2d');
    if (!ctx) throw new Error('Could not initialize 2D canvas');
    ctx.fontKerning = 'normal';
    // measure subheading
    const subheadingFontSize = Math.ceil(1.75 * this.scale.remSize * this.scale.dpr);
    ctx.font = `${subheadingFamilyWeight} ${subheadingFontSize}px ${subheadingFamilyName}`;
    const subheadingWidth = ctx.measureText(this.subheadingString).width;
    // trial heading size
    const headingTestFontSize = 4 * this.scale.remSize * this.scale.dpr;
    ctx.font = `${headingFamilyWeight} ${headingTestFontSize}px ${headingFamilyName}`;
    const headingWidthTest = ctx.measureText(this.headingString).width;
    // final heading size is scaled to match width of subheading
    const headingFontSize = Math.ceil(headingTestFontSize * (subheadingWidth / headingWidthTest));
    console.timeEnd('size');

    // Draw SDFs
    console.time('sdf');
    const headingSdf = generateSDF(this.headingString, {
      fontFamily: headingFamilyName,
      fontWeight: headingFamilyWeight,
      fontSize: headingFontSize,
      letterSpacing: -0.02241,
    });
    const subheadingSdf = generateSDF(this.subheadingString, {
      fontFamily: subheadingFamilyName,
      fontWeight: subheadingFamilyWeight,
      fontSize: subheadingFontSize,
      letterSpacing: -0.02155,
    });
    console.timeEnd('sdf');

    return { headingSdf, subheadingSdf };
  }


  frame() {
    const { gl } = this;

    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.lightProgram);
    // Bind textures
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.headingSdfTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.subheadingSdfTexture);
    // Bind uniforms
    gl.uniform2f(this.lightUniforms.resolution, this.width, this.height);
    gl.uniform1i(this.lightUniforms.headingSdf, 0);
    gl.uniform1i(this.lightUniforms.subheadingSdf, 1);
    // Draw
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


export default function AsciiCanvas({
  className,
  heading,
  subheading,
  ...props
}: {
  heading: string;
  subheading: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [baseRef, [width, height]] = useElementSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dpr, setDpr] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setDpr(window.devicePixelRatio);
    update();
    const media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [dpr]);

  const [remSize, setRemSize] = useState<number | null>(null);
  useEffect(() => {
    const upd = () => setRemSize(parseFloat(getComputedStyle(document.documentElement).fontSize));
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  const scaleRef = useRef<AsciiCanvasRenderer['scale'] | null>(null);
  if (dpr != null && remSize != null) {
    scaleRef.current = { dpr, remSize };
  }
  const ready = scaleRef.current != null;

  useEffect(() => {
    let canceled = false;
    let renderer: AsciiCanvasRenderer | null = null;

    (async () => {
      // Load the fonts we need
      const fonts = [];
      const hasFont = (name: string) => [...document.fonts.values()].some((f) => f.family === name);
      if (!hasFont(headingFamilyName)) fonts.push(new FontFace(headingFamilyName, 'url(/fonts/inter/Inter-DisplayBold.woff2)', { style: 'normal', weight: headingFamilyWeight }));
      if (!hasFont(subheadingFamilyName)) fonts.push(new FontFace(subheadingFamilyName, 'url(/fonts/inter/Inter-Medium.woff2)', { style: 'normal', weight: subheadingFamilyWeight }));
      await Promise.all(fonts.map((font) => font.load()));
      if (canceled) return;
      fonts.forEach((font) => document.fonts.add(font));
    })().then(() => {
      // Initialize the canvas only once the fonts are ready
      if (!canvasRef.current || !scaleRef.current) return;
      renderer = new AsciiCanvasRenderer(canvasRef.current, heading, subheading, scaleRef.current);
      renderer.start();
    });

    return () => {
      canceled = true;
      if (renderer) renderer.stop();
    };
  }, [heading, subheading, ready]);


  return (
    <div {...props} ref={baseRef} className={classNames(styles.base, className)}>
      {width != null && height != null && width > 0 && height > 0 && dpr && (
        <canvas
          width={width * dpr}
          height={height * dpr}
          ref={canvasRef}
        />
      )}
    </div>
  );
}
