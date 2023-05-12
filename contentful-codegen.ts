import { CFDefinitionsBuilder, V10ContentTypeRenderer, createV10Context } from 'cf-content-types-generator';
import contentfulExport from 'contentful-export';
import { config } from 'dotenv';
import fs from 'fs/promises';
config();

// Load environment variables
const spaceId = process.env.CONTENTFUL_SPACE;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
if (!spaceId) throw new Error('Missing CONTENTFUL_SPACE environment variable');
if (!managementToken) throw new Error('Missing CONTENTFUL_MANAGEMENT_TOKEN environment variable');

// Export content types
const contentModel = await contentfulExport({
  spaceId,
  managementToken,
  environmentId: undefined,
  skipEditorInterfaces: true,
  skipContent: true,
  skipRoles: true,
  skipWebhooks: true,
  saveFile: false,
});

const a = performance.now();
// Render types without the ”Type” prefix in all the type names
class Renderer extends V10ContentTypeRenderer {
  // eslint-disable-next-line class-methods-use-this
  public createContext(): ReturnType<typeof createV10Context> {
    const defaultContext = createV10Context();
    const withoutTypePrefix = (s: string) => (s.startsWith('Type') ? s.slice(4) : s);
    return {
      ...defaultContext,
      moduleName: (tn) => withoutTypePrefix(defaultContext.moduleName(tn)),
      moduleFieldsName: (tn) => withoutTypePrefix(defaultContext.moduleFieldsName(tn)),
      moduleReferenceName: (tn) => withoutTypePrefix(defaultContext.moduleReferenceName(tn)),
      moduleSkeletonName: (tn) => withoutTypePrefix(defaultContext.moduleSkeletonName(tn)),
    };
  }
}

// Generate typescript code
const builder = new CFDefinitionsBuilder([new Renderer()]);
for (const contentType of contentModel.contentTypes) {
  builder.appendType(contentType as any);
}

const typeDefinitions = builder.toString();
console.log(`\nGenerated type definitions in ${(performance.now() - a).toFixed(2)}ms`);

// Output
const outPath = 'src/generated/types/contentful.d.ts';
await fs.writeFile(new URL(outPath, import.meta.url), typeDefinitions);
console.log(`Wrote ${outPath}`);
