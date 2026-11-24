import { CodeBlock } from '@/components/landing/CodeBlock';
import { cn } from '@/lib/utils';
import { codeLines, DEFAULTS, type TokenKey, type Tokens } from './tokens';

/**
 * The current sentence as a NeoProvider theme. Lines that differ from
 * DefaultLightTheme carry a lime bar; lines touched by the last change remount
 * and flash (a static tint under reduced motion).
 */
export function ThemeCode({
  tokens,
  changed,
  rev,
  className,
}: {
  tokens: Tokens;
  changed: readonly TokenKey[];
  rev: number;
  className?: string;
}) {
  const lines = codeLines(tokens);
  const code = lines.map((l) => l.text).join('\n');

  return (
    <CodeBlock title="App.tsx" code={code} className={className}>
      {lines.map((line, i) => {
        const hit = rev > 0 && line.keys?.some((k) => changed.includes(k));
        const custom = line.keys?.some((k) => tokens[k] !== DEFAULTS[k]);
        return (
          <span
            key={hit ? `${i}-${rev}` : i}
            className={cn(
              '-mx-4 block border-l-4 border-transparent pr-4 pl-3',
              custom && 'border-primary',
              hit && 'animate-code-flash motion-reduce:animate-none motion-reduce:bg-secondary/30',
            )}
          >
            {line.text || ' '}
          </span>
        );
      })}
    </CodeBlock>
  );
}
