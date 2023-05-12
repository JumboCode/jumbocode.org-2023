import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document, BLOCKS } from '@contentful/rich-text-types';

const isDocument = (v: unknown): v is Document => (v as any)?.nodeType === BLOCKS.DOCUMENT;


export const addScheme = (url: string) => (url.startsWith('//') ? `https:${url}` : url);

// Flatten rich text content from certain fields
// eslint-disable-next-line function-paren-newline
export function flattenRichText<T extends object, Q extends (keyof T)[]>(
  fields: T,
  whichFields: Q,
) {
  return Object.fromEntries(
    Object.entries(fields)
      .map(([k, v]) => [
        k,
        (whichFields.includes(k as keyof T)
          && isDocument(v)) ? documentToHtmlString(v) : v,
      ]),
  ) as T & { [K in typeof whichFields[number]]: string };
}
