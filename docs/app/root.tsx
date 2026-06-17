import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { RootProvider } from 'fumadocs-ui/provider/react-router';
import type { Route } from './+types/root';
import './app.css';
import SearchDialog from '@/components/search';
import NotFound from './routes/not-found';
import {
  appName,
  siteUrl,
  siteTagline,
  siteDescription,
  ogImage,
} from '@/lib/shared';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/logo.svg' },
];

// Site-wide SEO defaults. Leaf routes (home, docs) override title/description.
export const meta: Route.MetaFunction = () => [
  { title: `${appName} — ${siteTagline}` },
  { name: 'description', content: siteDescription },
  { name: 'theme-color', content: '#a3e635' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: appName },
  { property: 'og:title', content: `${appName} — ${siteTagline}` },
  { property: 'og:description', content: siteDescription },
  { property: 'og:url', content: siteUrl },
  { property: 'og:image', content: ogImage },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `${appName} — ${siteTagline}` },
  { name: 'twitter:description', content: siteDescription },
  { name: 'twitter:image', content: ogImage },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <NotFound />;
    message = 'Error';
    details = error.statusText;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 w-full max-w-[1400px] mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
