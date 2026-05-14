// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://rn-neo.gs-rumana.com',
  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    '/docs': '/docs/introduction',
    '/docs/components': '/docs/components/badge',
  },

  integrations: [mdx(), sitemap(), pagefind()],

  markdown: {
    shikiConfig: {
      theme: 'aurora-x',
    },
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'aurora-x',
          keepBackground: false,
        },
      ],
    ],
  },
});
