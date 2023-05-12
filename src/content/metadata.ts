import { Meta } from 'generated/types/contentful';
import type { ResolvingMetadata, Metadata } from 'next';

type GenericParams = { [key: string]: string | string[] };
type GenericSearchParams = { [key: string]: string | string[] | undefined };

type Props<ParamsT extends GenericParams> = [
  {
    params: ParamsT;
    searchParams: GenericSearchParams;
  },
  ResolvingMetadata,
];

export default function makeGenerateMetadata<ParamsT extends GenericParams>(
  getEntry: (...props: Props<ParamsT>) => Promise<{ meta: Meta<undefined, string> | undefined }>,
) {
  return async function generateMetadata(...props: Props<ParamsT>): Promise<Metadata> {
    const entry = await getEntry(...props);
    if (!entry.meta) return {};
    const meta = entry.meta.fields;
    return {
      title: meta.includeTitleSuffix ? meta.title : { absolute: meta.title },
      description: meta.description,
    };
  };
}
