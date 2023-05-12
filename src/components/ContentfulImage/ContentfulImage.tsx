'use client';

import React from 'react';
import { Asset } from 'contentful';
import Image from 'next/image';

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
