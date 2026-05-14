import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  // Target only the docs folder
  const markdownFiles = import.meta.glob('/src/content/docs/**/*.md', {
    query: '?raw',
    import: 'default',
  });

  const paths = [];

  for (const filePath in markdownFiles) {
    // Strip everything up to and including 'docs/' so the slug is accurate
    const slug = filePath
      .replace(/^\/src\/content\/docs\//, '')
      .replace(/\.md$/, '');

    paths.push({
      params: { slug },
      props: { getRawContent: markdownFiles[filePath] },
    });
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const rawContent = await props.getRawContent();

  return new Response(rawContent as string, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
