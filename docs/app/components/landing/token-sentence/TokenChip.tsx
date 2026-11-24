import { AnimatePresence, motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { LABELS, OPTIONS, wordOf, type Option, type TokenKey, type Tokens } from './tokens';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** The outgoing word leaves in the direction of travel; the new one arrives from the other side. */
const swap: Variants = {
  enter: (dir: 1 | -1) => ({ y: dir > 0 ? '0.9em' : '-0.9em', opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: 1 | -1) => ({ y: dir > 0 ? '-0.9em' : '0.9em', opacity: 0 }),
};

/** One-time "I am clickable" hop when the sentence first scrolls into view. Never loops. */
const hopVariants: Variants = {
  rest: { y: 0 },
  hop: (index: number) => ({
    y: [0, -6, 0],
    transition: { delay: 0.25 + index * 0.07, duration: 0.42, ease: EASE_OUT },
  }),
};

/**
 * A yellow word inside the sentence. It is a real button: click or Enter/Space
 * cycles forward, Shift+click goes back, arrow keys step either way.
 * Every option is rendered invisibly in the same grid cell, so the chip keeps
 * the width of its widest word and the sentence never reflows.
 */
export function TokenChip<K extends TokenKey>({
  tokenKey,
  value,
  index,
  dir,
  delay,
  hop,
  describedBy,
  onStep,
}: {
  tokenKey: K;
  value: Tokens[K];
  /** Position in the sentence, used for staggering. */
  index: number;
  /** Direction of the last step, so the word slides the matching way. */
  dir: 1 | -1;
  /** Seconds to wait before swapping (Shuffle and Reset stagger the chips). */
  delay: number;
  hop: boolean;
  describedBy: string;
  onStep: (dir: 1 | -1) => void;
}) {
  const options = OPTIONS[tokenKey] as readonly Option[];
  const word = wordOf(tokenKey, value);

  return (
    <motion.button
      type="button"
      aria-label={`${LABELS[tokenKey]}: ${word}`}
      aria-describedby={describedBy}
      onClick={(e) => onStep(e.shiftKey ? -1 : 1)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          onStep(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          onStep(-1);
        }
      }}
      custom={index}
      variants={hopVariants}
      initial={false}
      animate={hop ? 'hop' : 'rest'}
      className={cn(
        'relative mx-[0.06em] inline-grid cursor-pointer touch-manipulation select-none justify-items-center overflow-clip align-baseline',
        'border-2 border-border bg-secondary px-[0.26em] font-bold leading-[1.2] tracking-[-0.02em] text-black',
        // press mechanic: hover leans into the shadow, active sinks all the way
        'shadow-[4px_4px_0_0_var(--border)] transition-[translate,box-shadow] duration-100 ease-out',
        'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--border)]',
        'active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-foreground',
        'motion-reduce:transition-none',
      )}
    >
      {options.map((o) => (
        <span key={String(o.value)} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {o.word}
        </span>
      ))}
      <AnimatePresence initial={false} custom={dir}>
        <motion.span
          key={word}
          aria-hidden
          custom={dir}
          variants={swap}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: EASE_OUT, delay }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
