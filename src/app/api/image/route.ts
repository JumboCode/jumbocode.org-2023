// Given a request for a contentful image, return a 301 redirect to Contentful after assessing
// whether the browser supports webp

import { headers } from 'next/headers';

export async function GET(req: Request) {
  const headersList = headers();
  const supportsWebp = (headersList.get('accept') ?? '').includes('webp');
  const { src, width, quality } = Object.fromEntries(new URL(req.url).searchParams.entries());

  if (!src) return new Response(JSON.stringify({ error: 'missing image src' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  if (!width) return new Response(JSON.stringify({ error: 'missing image width' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  if (!quality) return new Response(JSON.stringify({ error: 'missing image quality' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  const query = new URLSearchParams({
    // Contentful will reject transformations for sizes greater than 4000px
    w: Math.min(parseInt(width, 10), 3840).toString(),
    q: quality,
    ...supportsWebp && { fm: 'webp' },
  });

  const url = new URL(src.startsWith('//') ? `https:${src}` : src);
  url.search = query.toString();

  // TODO: next redirect() didn't work in edge runtime when we tried; try it again in the future?
  return new Response(null, {
    status: 308,
    headers: {
      Location: url.toString(),
    },
  });
}

export const runtime = 'edge';
