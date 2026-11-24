import { useId } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/landing/CodeBlock';
import { githubUrl } from '@/lib/shared';

const PEERS = 'react-native-reanimated react-native-worklets';

const INSTALL = [
  { key: 'npm', cmd: 'npm install rn-neo' },
  { key: 'yarn', cmd: 'yarn add rn-neo' },
  { key: 'pnpm', cmd: 'pnpm add rn-neo' },
  { key: 'expo', cmd: 'npx expo install rn-neo' },
] as const;

const REANIMATED_GUIDE =
  'https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/';

const tabsListClass =
  'h-11 rounded-none bg-background p-1 shadow-[3px_3px_0_0_var(--border)]';
const tabClass =
  'h-full rounded-none px-3 font-mono text-[13px] font-bold focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground';
/** Below 390px the 41-character lines need a slightly smaller face to avoid scrolling the code pane. */
const codeClass = 'max-[389px]:[&_pre]:px-3 max-[389px]:[&_pre]:text-[11.5px]';
const tabsContentClass =
  'mt-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground';

/** "$ " prompt glyph: visible, but not read out or selected. */
function Prompt() {
  return (
    <span aria-hidden className="select-none text-fd-muted-foreground">
      ${' '}
    </span>
  );
}

/** Install command shown wrapped with `\` continuations (lines stay short on phones), copied as one line. */
function Command({ base }: { base: string }) {
  const shown = `${base} \\\n    react-native-reanimated \\\n    react-native-worklets`;
  return (
    <CodeBlock className={codeClass} title="Terminal" code={`${base} ${PEERS}`}>
      <Prompt />
      {shown}
    </CodeBlock>
  );
}

export function Install() {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="mt-24 w-full md:mt-32">
      <div className="mx-auto max-w-[1360px] px-4 md:px-6">
        <h2
          id={headingId}
          className="text-2xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl"
        >
          Up and running in one step.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 border-y-2 border-border py-8 md:mt-12 md:py-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12 lg:py-12">
          <div className="min-w-0">
            <h3
              className="brutal-text-shadow text-5xl font-bold leading-none tracking-[-0.04em] md:text-6xl lg:text-7xl"
              style={
                {
                  '--bs-offset': '0.05em',
                  '--tw-shadow-color': 'var(--primary)',
                } as React.CSSProperties
              }
            >
              Install.
            </h3>
            <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-fd-muted-foreground md:text-lg">
              That&apos;s the whole setup: no provider, fonts or native linking. Reanimated 4 needs
              Worklets as a peer, and React Native CLI apps also need its Babel plugin. Follow the{' '}
              <a
                href={REANIMATED_GUIDE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Reanimated setup guide
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <div className="min-w-0 pr-1">
            <Tabs defaultValue="npm">
              <TabsList aria-label="Package manager" className={tabsListClass}>
                {INSTALL.map(({ key }) => (
                  <TabsTrigger key={key} value={key} className={tabClass}>
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
              {INSTALL.map(({ key, cmd }) => (
                <TabsContent key={key} value={key} className={tabsContentClass}>
                  <Command base={cmd} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="grid grid-cols-1 gap-4 sm:flex sm:flex-wrap lg:col-start-2">
            <Button asChild className="h-12 px-7 text-base font-bold">
              <Link to="/docs">
                Get started <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="neutral" className="h-12 px-7 text-base font-bold">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Star aria-hidden /> Star on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
