'use client';

import React from 'react';
import { Asset } from 'contentful';
import Image from 'next/image';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#111" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#111" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#111" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) => (typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str));

const shimmerData = `svg+xml;base64,${toBase64(shimmer(700, 475))}`;

export default function ContentfulImage({
  asset,
  fill,
  ...props
}: {
  asset: Asset | undefined,
} & Partial<React.ComponentProps<typeof Image>>) {
  const fields = asset?.fields;
  if (!fields) return null;
  const { file } = fields;
  if (!file) return null;
  const { details } = file;
  if (!details) throw new Error('Details must be defined');
  if (!('size' in details)) throw new Error('Asset must be image');
  const { image } = details;
  if (!image) throw new Error('Asset must be image');
  const { url } = file;
  if (typeof url !== 'string') throw new Error('File must have string url');
  const { description, title } = fields;
  const alt = description ?? title;
  if (typeof alt !== 'string') throw new Error('Asset must have string title/description');

  return (
    <Image
      src={url}
      alt={alt}
      {...fill ? { fill: true } : { width: image.width, height: image.height }}
      placeholder={`data:image/${shimmerData}`}

      loader={({ src: loaderSrc, width: loaderWidth, quality = 75 }) => {
        const query: URLSearchParams = new URLSearchParams({
          src: loaderSrc,
          width: loaderWidth.toString(),
          quality: quality.toString(),
        });
        return `/api/image?${query.toString()}`;
      }}

      {...props}
    />
  );
}
