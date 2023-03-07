'use client';

import { Asset } from 'contentful';
import Image from 'next/image';

export default function ContentfulImage({
  asset: { fields },
  fill,
  ...props
}: {
  asset: Asset
} & Partial<React.ComponentProps<typeof Image>>) {
  const { width, height } = fields.file.details.image ?? {};
  if (!width || !height) { throw new Error('Image must be defined with dimensions'); }

  return (
    <Image
      src={fields.file.url}
      alt={fields.description || fields.title}
      {...fill ? { fill: true } : { width, height }}

      loader={({ src: loaderSrc, width: loaderWidth, quality = 75 }) => {
        const query: URLSearchParams = new URLSearchParams({
          src: loaderSrc,
          width: loaderWidth.toString(),
          quality: quality.toString(),
        });
        return `/image?${query.toString()}`;
      }}

      {...props}
    />
  );
}
