import { Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const INSTALL_CMDS = {
  npm: 'npm install rn-neo react-native-reanimated',
  yarn: 'yarn add rn-neo react-native-reanimated',
  pnpm: 'pnpm add rn-neo react-native-reanimated',
  expo: 'npx expo install rn-neo react-native-reanimated',
};

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-card text-foreground border-2 border-border brutal-shadow shadow-secondary p-4 overflow-x-auto font-mono text-sm">
      <code>{children}</code>
    </pre>
  );
}

const WRAP_CODE = `// App.tsx
import { ThemeProvider } from 'rn-neo';

export default function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  );
}`;

const USE_CODE = `import { Button } from 'rn-neo';

<Button variant="primary">Press me</Button>`;

export function Install() {
  return (
    <section className="container mx-auto mt-28 px-5">
      <h2 className="text-3xl md:text-4xl font-bold text-center">Up and running in three steps</h2>
      <p className="text-center mt-2 text-lg text-fd-muted-foreground">
        Install, wrap, ship. That's the whole setup.
      </p>

      <div className="w-full md:w-2/3 mx-auto">
        <div className="mt-10 text-lg">
          <span className="font-outline text-xl">1.</span> Install the required packages
        </div>
        <Tabs defaultValue="npm" className="mt-3">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="expo">expo</TabsTrigger>
          </TabsList>
          {Object.entries(INSTALL_CMDS).map(([k, cmd]) => (
            <TabsContent key={k} value={k}>
              <CodeBlock>$ {cmd}</CodeBlock>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex items-start gap-3 bg-secondary/30 border-2 border-border p-4 mt-8">
          <Info className="size-5 shrink-0 mt-0.5" />
          <span>
            Check{' '}
            <a
              href="https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/"
              target="_blank"
              rel="noreferrer"
              className="underline font-medium"
            >
              react-native-reanimated
            </a>{' '}
            installation steps if you have trouble building the app.
          </span>
        </div>

        <div className="mt-10 text-lg">
          <span className="font-outline text-xl">2.</span> Wrap your app in the Provider component
        </div>
        <div className="mt-3">
          <CodeBlock>{WRAP_CODE}</CodeBlock>
        </div>

        <div className="mt-10 text-lg">
          <span className="font-outline text-xl">3.</span> Use the components
        </div>
        <div className="mt-3">
          <CodeBlock>{USE_CODE}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
