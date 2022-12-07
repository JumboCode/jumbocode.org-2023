import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document, Block, Inline, BLOCKS } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';

const isDocument = (v: unknown): v is Document => (v as any)?.nodeType === BLOCKS.DOCUMENT;


export const addScheme = (url: string) => (url.startsWith('//') ? `https:${url}` : url);
export const processImage = ({ fields }: Asset) => ({
  url: addScheme(fields.file.url),
  alt: fields.description || fields.title,
  dimensions: [fields.file.details.image?.width, fields.file.details.image?.height],
});
// Converts images embedded in contentful rich text blocks into something more interpretable
export const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({ data: { target } }: Block | Inline) => `<contentful-image image="${JSON.stringify(processImage(target)).replace(/"/g, '&quot;')}"></contentful-image>`,
  },
};


// Flatten rich text content from certain fields
export function flattenRichText<T extends object>(
  fields: T,
  whichFields: (keyof T)[],
) { // TODO: stronger return type here
  return Object.fromEntries(Object.entries(fields)
    .map(([k, v]) => [
      k,
      (whichFields.includes(k as keyof T)
        && isDocument(v)) ? documentToHtmlString(v, richTextOptions) : v,
    ]));
}
