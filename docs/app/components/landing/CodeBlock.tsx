import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Bordered code figure with a yellow title bar and a copy button.
 * Shared by the install ledger; the token section's live snippet matches its look.
 */
export function CodeBlock({
  title,
  code,
  className,
  children,
}: {
  title: string;
  /** Plain text that the copy button writes to the clipboard. */
  code: string;
  className?: string;
  /** Optional custom rendering of `code` (e.g. highlighted lines). Defaults to `code`. */
  children?: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        'min-w-0 bg-card text-foreground border-2 border-border brutal-shadow',
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-3 bg-secondary text-black border-b-2 border-border pl-4 pr-1.5 h-10 font-mono text-sm font-bold">
        <span className="truncate">{title}</span>
        <CopyButton text={code} label={title} />
      </figcaption>
      <pre className="p-4 overflow-x-auto font-mono text-[12.5px] md:text-sm leading-6">
        <code>{children ?? code}</code>
      </pre>
    </figure>
  );
}

export function CopyButton({
  text,
  label,
  className,
}: {
  text: string;
  /** What is being copied, e.g. the file title. Makes each button's accessible name unique. */
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard needs a secure context; nothing to do if it is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center gap-1.5 h-7 px-2.5 bg-background text-foreground border-2 border-border font-mono text-xs font-bold',
        'shadow-[2px_2px_0_0_var(--border)] transition-[transform,box-shadow] duration-100',
        'active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_0_var(--border)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground',
        className,
      )}
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      {label && <span className="sr-only">{` ${label}`}</span>}
    </button>
  );
}
