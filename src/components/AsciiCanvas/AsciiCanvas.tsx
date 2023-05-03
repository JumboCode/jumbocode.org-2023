'use client';

import React, { useState, useRef, useEffect } from 'react';
import useElementSize from 'hooks/element-size';
import z from 'zod';

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

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private headingString: string,
    private subheadingString: string,
    public dpr: number,
    public remSize: number,
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

  const [dpr, setDpr] = useState<number | null>(null);
  useEffect(() => {
    setDpr(window.devicePixelRatio);
    if (rendererRef.current) rendererRef.current.dpr = window.devicePixelRatio;
    const media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const listener = () => setDpr(window.devicePixelRatio);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [dpr]);

  const [remSize, setRemSize] = useState<number | null>(null);
  useEffect(() => {
    const get = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
    const rem = get();
    setRemSize(rem);
    if (rendererRef.current) rendererRef.current.remSize = rem;
    const listener = () => setRemSize(get());
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);


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
      // Initialize the canvas only once the fonts are ready
      if (!canvasRef.current || !dpr || !remSize) return;
      renderer = new AsciiCanvasRenderer(canvasRef.current, heading, subheading, dpr, remSize);
      rendererRef.current = renderer;
      renderer.start();
    })();

    return () => {
      canceled = true;
      if (renderer) renderer.stop();
      rendererRef.current = null;
    };
  });


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
