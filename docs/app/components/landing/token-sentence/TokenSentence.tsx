import { useId, useReducer, useRef } from 'react';
import { MotionConfig, useInView, useReducedMotion } from 'motion/react';
import { Dices, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Specimen } from './Specimen';
import { ThemeCode } from './ThemeCode';
import { TokenChip } from './TokenChip';
import {
  DEFAULTS,
  KEYS,
  LABELS,
  diff,
  resolve,
  shuffle,
  step,
  wordOf,
  type TokenKey,
  type Tokens,
} from './tokens';

/** Seconds between chips when Shuffle / Reset change several words at once. */
const STAGGER = 0.045;

type State = {
  tokens: Tokens;
  /** Keys touched by the last change: drives the code flash and the announcement. */
  changed: TokenKey[];
  /** Bumps on every change so changed code lines remount and flash again. */
  rev: number;
  dir: 1 | -1;
  /** Per-chip swap delay for the last change. */
  delays: Partial<Record<TokenKey, number>>;
};

type Action =
  | { type: 'step'; key: TokenKey; dir: 1 | -1 }
  | { type: 'set'; tokens: Tokens }
  | { type: 'shuffle' }
  | { type: 'reset' };

function commit(state: State, tokens: Tokens, dir: 1 | -1, staggered: boolean): State {
  const changed = diff(state.tokens, tokens);
  if (!changed.length) return state;
  const delays = staggered
    ? Object.fromEntries(changed.map((k, i) => [k, i * STAGGER]))
    : {};
  return { tokens, changed, rev: state.rev + 1, dir, delays };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'step':
      return commit(state, step(state.tokens, action.key, action.dir), action.dir, false);
    case 'set':
      return commit(state, action.tokens, 1, false);
    case 'shuffle':
      return commit(state, shuffle(state.tokens), 1, true);
    case 'reset':
      return commit(state, DEFAULTS, -1, true);
  }
}

const INITIAL: State = { tokens: DEFAULTS, changed: [], rev: 0, dir: 1, delays: {} };

/**
 * The interactive section that replaced the feature grid. The theme is written
 * as a sentence whose yellow words are controls; one reducer drives the
 * sentence, a live replica built from all ten components, and the NeoProvider
 * code you would ship. Prerenders at DefaultLightTheme with no client branches.
 */
export function TokenSentence() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { tokens, changed, rev, dir, delays } = state;

  const id = useId();
  const headingId = `${id}-heading`;
  const hintId = `${id}-hint`;

  // One "these are clickable" hop the first time the sentence is well in view.
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(sentenceRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const hop = inView && !reduceMotion;

  const atDefaults = diff(tokens, DEFAULTS).length === 0;
  const announcement =
    rev === 0
      ? ''
      : changed.map((k) => `${LABELS[k]} set to ${wordOf(k, tokens[k])}.`).join(' ');

  const chip = (key: TokenKey) => (
    <TokenChip
      tokenKey={key}
      value={tokens[key]}
      index={KEYS.indexOf(key)}
      dir={dir}
      delay={delays[key] ?? 0}
      hop={hop}
      describedBy={hintId}
      onStep={(d) => dispatch({ type: 'step', key, dir: d })}
    />
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="tokens"
        aria-labelledby={headingId}
        className="mx-auto mt-24 w-full max-w-[1360px] px-4 md:mt-32 md:px-6"
      >
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-14">
          {/* Sentence: col 1, row 1 */}
          <div className="min-w-0">
            <h2
              id={headingId}
              className="text-2xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-[3.5rem] xl:text-6xl"
            >
              <span className="block">Change a word.</span>
              <span className="block whitespace-nowrap">Restyle everything.</span>
            </h2>

            {/*
              Spaces live inside the string literals: a bare {' '} becomes a whitespace-only
              text node that Chrome drops from the accessibility tree, gluing words together.
            */}
            <p
              ref={sentenceRef}
              className="mt-8 max-w-[36ch] text-[clamp(1.375rem,2.6vw,2.5rem)] font-medium leading-[1.6] tracking-[-0.015em] md:mt-10"
            >
              {'Give your components '}
              {chip('radius')}
              {' corners, a '}
              {chip('borderSize')}
              {' border and a '}
              {chip('shadowSize')}
              {' hard shadow. Paint them '}
              {chip('primary')}
              {' on a '}
              {chip('mode')}
              {' screen, and when they are pressed, '}
              {/* keep the last chip with its words so it never sits alone on a line */}
              <span className="whitespace-nowrap">
                {'make them '}
                {chip('animation')}.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Button
                type="button"
                variant="neutral"
                className="h-11 px-5 text-base font-bold"
                onClick={() => dispatch({ type: 'shuffle' })}
              >
                <Dices aria-hidden /> Shuffle
              </Button>
              <Button
                type="button"
                variant="neutral"
                className="h-11 px-5 text-base font-bold"
                disabled={atDefaults}
                onClick={() => dispatch({ type: 'reset' })}
              >
                <RotateCcw aria-hidden /> Reset
              </Button>
              <p id={hintId} className="text-base text-fd-muted-foreground">
                Tap or click a yellow word to change it.
              </p>
            </div>

            <p role="status" aria-live="polite" className="sr-only">
              {announcement}
            </p>
          </div>

          {/* Replica: col 2, spans both rows, sticky while the code scrolls by */}
          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
            <div className="mx-auto w-full max-w-[420px] lg:mr-0">
              <Specimen
                t={resolve(tokens)}
                dark={tokens.mode === 'dark'}
                onDarkChange={(dark) =>
                  dispatch({ type: 'set', tokens: { ...tokens, mode: dark ? 'dark' : 'light' } })
                }
              />
              <p className="mt-7 max-w-[44ch] text-sm leading-relaxed text-fd-muted-foreground">
                A web replica drawn from rn-neo&rsquo;s own tokens. The real components run in
                Expo Snack.
              </p>
            </div>
          </div>

          {/* Code: col 1, row 2 */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <ThemeCode tokens={tokens} changed={changed} rev={rev} className="mr-1" />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
