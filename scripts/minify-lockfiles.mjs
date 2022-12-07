// Minify all package-lock.json files to a single line to ensure clean diffs

import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { globby as glob } from 'globby';

const repoBase = fileURLToPath(new URL('..', import.meta.url));

const paths = await glob(
  '**/package-lock.json',
  { cwd: repoBase, onlyFiles: true, gitignore: true, absolute: true },
);

await paths.map(async (path) => {
  const json = await fs.readFile(path, 'utf8');
  const minified = JSON.stringify(JSON.parse(json));
  await fs.writeFile(path, minified);
  console.log(path);
});
