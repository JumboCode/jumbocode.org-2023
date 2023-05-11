import { IMeta } from 'generated/types/contentful';
import type { ResolvingMetadata, Metadata } from 'next';

type Props = [
  {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
  },
  ResolvingMetadata,
]

export default function makeGenerateMetadata(
  getEntry: (...props: Props) => Promise<{ meta: IMeta }>,
) {
  return async function generateMetadata(...props: Props): Promise<Metadata> {
    const meta = (await getEntry(...props)).meta.fields;
    return {
      title: meta.includeTitleSuffix ? meta.title : { absolute: meta.title },
      description: meta.description,
    };
  };
}
