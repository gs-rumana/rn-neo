/**
 * Token model for the landing page's "change a word" section.
 *
 * Every value mirrors the library: src/core/theme/tokens.ts (DefaultLightTheme,
 * DefaultDarkTheme, defaultConfig). If those change, change them here too.
 */

/** Colors from DefaultLightTheme / DefaultDarkTheme that the replica uses. */
export const MODE = {
  light: {
    base: 'DefaultLightTheme',
    background: '#f5ece7',
    onBackground: '#000000',
    surface: '#d9c2b8',
    onSurface: '#000000',
    border: '#000000',
    shadow: '#000000',
    muted: '#888888',
    animationDuration: 100,
  },
  dark: {
    base: 'DefaultDarkTheme',
    background: '#111111',
    onBackground: '#F0F0F0',
    surface: '#1E1E1E',
    onSurface: '#F0F0F0',
    border: '#F0F0F0',
    shadow: '#F0F0F0',
    muted: '#5E5E5E',
    animationDuration: 150,
  },
} as const;

/** The library's own primary (lime) and secondary (yellow). onPrimary stays black for both. */
export const PRIMARY = { lime: '#a3e635', yellow: '#facc15' } as const;
export const ON_PRIMARY = '#000000';

/** defaultConfig.radius / borderSize / shadowSize, in px. */
export const RADIUS = { none: 0, sm: 4, md: 8, lg: 12, xl: 16 } as const;
export const BORDER = { thin: 1, medium: 2, thick: 3 } as const;
export const SHADOW = { sm: 2, md: 4, lg: 8 } as const;

export type Tokens = {
  radius: keyof typeof RADIUS;
  borderSize: keyof typeof BORDER;
  shadowSize: keyof typeof SHADOW;
  primary: keyof typeof PRIMARY;
  mode: keyof typeof MODE;
  animation: boolean;
};
export type TokenKey = keyof Tokens;

/** Sentence order, which is also the order used for announcements and stagger. */
export const KEYS = [
  'radius',
  'borderSize',
  'shadowSize',
  'primary',
  'mode',
  'animation',
] as const satisfies readonly TokenKey[];

/** DefaultLightTheme. */
export const DEFAULTS: Tokens = {
  radius: 'none',
  borderSize: 'medium',
  shadowSize: 'md',
  primary: 'lime',
  mode: 'light',
  animation: true,
};

export type Option<K extends TokenKey = TokenKey> = { value: Tokens[K]; word: string };

/** The word each value shows in the sentence, in cycling order. */
export const OPTIONS: { [K in TokenKey]: readonly Option<K>[] } = {
  radius: [
    { value: 'none', word: 'sharp' },
    { value: 'sm', word: 'nicked' },
    { value: 'md', word: 'rounded' },
    { value: 'lg', word: 'soft' },
    { value: 'xl', word: 'plush' },
  ],
  borderSize: [
    { value: 'thin', word: 'thin' },
    { value: 'medium', word: 'medium' },
    { value: 'thick', word: 'thick' },
  ],
  shadowSize: [
    { value: 'sm', word: '2px' },
    { value: 'md', word: '4px' },
    { value: 'lg', word: '8px' },
  ],
  primary: [
    { value: 'lime', word: 'lime' },
    { value: 'yellow', word: 'yellow' },
  ],
  mode: [
    { value: 'light', word: 'light' },
    { value: 'dark', word: 'dark' },
  ],
  animation: [
    { value: true, word: 'sink' },
    { value: false, word: 'stay put' },
  ],
};

export const LABELS: Record<TokenKey, string> = {
  radius: 'Corner radius',
  borderSize: 'Border size',
  shadowSize: 'Shadow size',
  primary: 'Primary color',
  mode: 'Color mode',
  animation: 'Press animation',
};

export function wordOf<K extends TokenKey>(key: K, value: Tokens[K]): string {
  return OPTIONS[key].find((o) => o.value === value)?.word ?? String(value);
}

/** Keys whose values differ between two token sets, in sentence order. */
export function diff(a: Tokens, b: Tokens): TokenKey[] {
  return KEYS.filter((k) => a[k] !== b[k]);
}

/** Moves a token one step forward (1) or back (-1) through its options. */
export function step(tokens: Tokens, key: TokenKey, dir: 1 | -1): Tokens {
  const opts = OPTIONS[key] as readonly Option[];
  const i = opts.findIndex((o) => o.value === tokens[key]);
  const next = opts[(i + dir + opts.length) % opts.length];
  return { ...tokens, [key]: next.value };
}

/** A random token set that differs from `from` in at least three keys. */
export function shuffle(from: Tokens): Tokens {
  for (;;) {
    const next = { ...from };
    for (const k of KEYS) {
      const opts = OPTIONS[k] as readonly Option[];
      (next as Record<TokenKey, Tokens[TokenKey]>)[k] =
        opts[Math.floor(Math.random() * opts.length)].value;
    }
    if (diff(next, from).length >= 3) return next;
  }
}

/** Plain values the replica draws with. */
export function resolve(t: Tokens) {
  const m = MODE[t.mode];
  return {
    r: RADIUS[t.radius],
    b: BORDER[t.borderSize],
    s: SHADOW[t.shadowSize],
    primary: PRIMARY[t.primary],
    onPrimary: ON_PRIMARY,
    background: m.background,
    onBackground: m.onBackground,
    surface: m.surface,
    onSurface: m.onSurface,
    border: m.border,
    shadow: m.shadow,
    muted: m.muted,
    animation: t.animation,
    duration: m.animationDuration,
  };
}
export type Resolved = ReturnType<typeof resolve>;

export type CodeLine = { text: string; keys?: TokenKey[] };

/**
 * The theme as code. Every key is always printed so the snippet keeps its
 * height; lines tied to a non-default token get marked by the renderer.
 * Every line stays at 42 characters or fewer so the pane never scrolls at 390px.
 */
export function codeLines(t: Tokens): CodeLine[] {
  const base = MODE[t.mode].base;
  return [
    { text: 'import {' },
    { text: '  NeoProvider,' },
    { text: `  ${base},`, keys: ['mode'] },
    { text: '  type NeoTheme,' },
    { text: "} from 'rn-neo';" },
    { text: '' },
    { text: 'const theme: NeoTheme = {' },
    { text: `  ...${base},`, keys: ['mode'] },
    { text: `  radius: '${t.radius}',`, keys: ['radius'] },
    { text: `  borderSize: '${t.borderSize}',`, keys: ['borderSize'] },
    { text: `  shadowSize: '${t.shadowSize}',`, keys: ['shadowSize'] },
    { text: '  colors: {' },
    { text: `    ...${base}.colors,`, keys: ['mode'] },
    { text: `    primary: '${PRIMARY[t.primary]}',`, keys: ['primary'] },
    { text: '  },' },
    { text: `  animation: ${t.animation},`, keys: ['animation'] },
    { text: '};' },
    { text: '' },
    { text: 'export default function App() {' },
    { text: '  return (' },
    { text: '    <NeoProvider theme={theme}>' },
    { text: '      {/* your app */}' },
    { text: '    </NeoProvider>' },
    { text: '  );' },
    { text: '}' },
  ];
}
