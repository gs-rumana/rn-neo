import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import mdx from 'fumadocs-mdx/vite';

/**
 * Dev-only: expose raw page markdown at the clean `/docs/<slug>.md` URL by
 * rewriting to the internal `/llms.mdx/docs/<slug>/content.md` resource route.
 * In production these are emitted as static files by scripts/emit-clean-md.mjs.
 */
function cleanMarkdownUrls(): Plugin {
  return {
    name: 'clean-markdown-urls',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const match = req.url?.match(/^\/docs\/(.+)\.md(\?.*)?$/);
        if (match) {
          const inner = match[1] === 'index' ? '' : `${match[1]}/`;
          const rewritten = `/llms.mdx/docs/${inner}content.md${match[2] ?? ''}`;
          req.url = rewritten;
          // React Router's dev handler builds the Request from originalUrl.
          (req as { originalUrl?: string }).originalUrl = rewritten;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [cleanMarkdownUrls(), mdx(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
