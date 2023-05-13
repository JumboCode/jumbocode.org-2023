'use client';

import React, { useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

import styles from './GolCanvas.module.scss';
import classNames from 'classnames';


class GOLCanvasRenderer {
  private rafId: ReturnType<typeof requestAnimationFrame> | null = null;
  private gl: WebGL2RenderingContext;
  private wideGamut: boolean;
  private green: [number, number, number];
  mousePos: [number, number] = [0, 0];

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
  }

  frame() {
    const { gl } = this;

    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
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
