'use client';

import React, { useState, useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

import styles from './AsciiCanvas.module.scss';
import classNames from 'classnames';


class AsciiCanvasRenderer {
  private rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  private gl: WebGL2RenderingContext;
  private wideGamut: boolean;
  private green: [number, number, number];

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private headingString: string,
    private subheadingString: string,
    public dpr: number,
  ) {
    // Create WebGL2 context
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;

    // Enable wide-gamut colors if they’re supported
    if ('drawingBufferColorSpace' in this.gl) {
      this.gl.drawingBufferColorSpace = 'display-p3';
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
  }

  frame() {
    this.gl.clearColor(...this.green, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
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
  const rendererRef = useRef<AsciiCanvasRenderer | null>(null);

  const dpr = useIsMounted() ? window.devicePixelRatio : 2;


  useEffect(() => {
    if (!canvasRef.current) return undefined;

    const renderer = new AsciiCanvasRenderer(canvasRef.current, heading, subheading, dpr);
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.stop();
      rendererRef.current = null;
    };
  });

  return (
    <div {...props} ref={baseRef} className={classNames(styles.base, className)}>
      {width != null && height != null && width > 0 && height > 0 && (
        <canvas
          width={width * dpr}
          height={height * dpr}
          ref={canvasRef}
        />
      )}
    </div>
  );
}
