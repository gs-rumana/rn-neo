import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { githubUrl, npmUrl, snackUrl } from '@/lib/shared';

const linkClass =
  'inline-flex min-h-6 items-center gap-1 underline-offset-4 transition-colors duration-150 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none';

const internal = [
  { label: 'Docs', to: '/docs' },
  { label: 'Installation', to: '/docs/installation' },
  { label: 'Customization', to: '/docs/customization' },
];

const external = [
  { label: 'GitHub', href: githubUrl },
  { label: 'npm', href: npmUrl },
  { label: 'Expo Snack', href: snackUrl },
];

export function Footer() {
  return (
    // Black in both themes: the page closes on full-width type, mirroring the one-line masthead.
    <footer className="mt-24 w-full border-t-2 border-border bg-black text-white md:mt-32">
      <div className="mx-auto max-w-[1360px] px-4 pt-14 pb-8 md:px-6 md:pt-24 md:pb-10">
        {/*
          Fitted line: "Build something loud." measures 9.69em (Space Grotesk 700, -0.04em
          tracking; fallbacks are narrower), so 9.8cqi fills ~95% of the container at every width.
          Re-measure if the copy, tracking or font changes.
        */}
        <div className="@container">
          <p className="whitespace-nowrap text-[min(8.6vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] supports-[width:1cqi]:text-[9.8cqi]">
            Build something <span className="text-primary">loud.</span>
          </p>
        </div>

        <div className="mt-10 grid gap-6 border-t-2 border-white/20 pt-6 font-mono text-sm md:mt-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <nav aria-label="Footer">
            <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
              {internal.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
              {external.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-white/70">
            MIT licensed. Built with ❤️ by{' '}
            <a
              href="https://gs-rumana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-white underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              GS Rumana
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
