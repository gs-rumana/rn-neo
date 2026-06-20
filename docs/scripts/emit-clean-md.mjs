// Post-build: mirror prerendered raw markdown to clean `/docs/<slug>.md` URLs
// so AI agents can fetch page content at the same path as the HTML doc.
//
//   build/client/llms.mdx/docs/components/dialog/content.md
//     -> build/client/docs/components/dialog.md
//   build/client/llms.mdx/docs/content.md
//     -> build/client/docs/index.md
import { cp, glob, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const CLIENT = 'build/client';
const SRC_BASE = join(CLIENT, 'llms.mdx/docs');

let count = 0;
for await (const rel of glob('**/content.md', { cwd: SRC_BASE })) {
  const dir = dirname(rel); // '.' for the index page
  const target = join(CLIENT, 'docs', dir === '.' ? 'index.md' : `${dir}.md`);
  await mkdir(dirname(target), { recursive: true });
  await cp(join(SRC_BASE, rel), target);
  count++;
}

console.log(`[emit-clean-md] wrote ${count} clean .md file(s) under ${CLIENT}/docs`);
