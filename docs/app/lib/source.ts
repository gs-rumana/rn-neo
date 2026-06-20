import { loader } from 'fumadocs-core/source';
import { docs } from 'collections/server';
import { docsRoute } from './shared';

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
});

/**
 * Clean raw-markdown URL for a page: the doc URL with a `.md` suffix
 * (e.g. `/docs/components/dialog.md`). The index page maps to
 * `/docs/index.md`. Served to AI agents — in dev via a Vite rewrite,
 * in prod as static files emitted after build.
 */
export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const path = page.slugs.length > 0 ? page.slugs.join('/') : 'index';

  return {
    url: `${docsRoute}/${path}.md`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
