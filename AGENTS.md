# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`rn-neo` is a Neobrutalism React Native UI library (published to npm). Built on
React Native Reanimated 4 + Worklets. The repo is a Yarn 4 workspace: the library
lives at the root (`src/`), with `example/` (Expo app) as the only workspace.
`docs/` is a separate, self-contained project with its own dependencies (not a
workspace).

Package manager is **Yarn 4** (`packageManager` in package.json). Node version is pinned in `.nvmrc`.

## Commands

Library (run from repo root):
- `yarn typecheck` — `tsc` (no emit)
- `yarn lint` — eslint over `**/*.{js,ts,tsx}`
- `yarn prepare` — full build: `bob build` (commonjs + esm + types into `lib/`) then `build:plugin`
- `yarn build:plugin` — compile the Expo config plugin (`plugin/src` → `plugin/build`)
- `yarn clean` — remove `lib/`

There is **no test runner** configured. Verification is typecheck + lint + the example app.

Example app (Expo) — prefer the workspace shortcut from root:
- `yarn example start` / `yarn example ios` / `yarn example android` / `yarn example web`

Docs site (run from `docs/`, separate install):
- `yarn dev` — React Router 7 dev server
- `yarn build` — `react-router build` then `node scripts/emit-clean-md.mjs` (emits raw `/docs/<slug>.md`)
- `yarn types:check` — react-router typegen + fumadocs-mdx + `tsc --noEmit`
- `yarn lint` — oxlint (not eslint)

## Architecture

### Styling engine (the core abstraction)

Components do **not** hardcode styles. Every visual prop is a *token name* that gets
resolved against the active theme/config at render time. The flow:

1. **Theme + Config** (`src/core/theme/tokens.ts`) — `NeoTheme` holds semantic choices
   (which color, which shadow size, dark on/off); `NeoConfig` holds the token *scales*
   (the actual px values for `sm`/`md`/`lg`, font families, spacing, radius). Types in
   `src/typings/theme.ts`. Ships `DefaultLightTheme`, `DefaultDarkTheme`, `defaultConfig`.

2. **Provider** (`src/core/provider/`) — `NeoProvider` merges user `theme`/`config`
   over defaults and puts `{ theme, config }` on `NeoContext`. `useNeo()` reads it.

3. **Resolvers** (`src/resolvers/`) — pure functions that turn a token (or raw value)
   into a concrete value given the tokens map: `colors`, `border`, `shadow`, `text`,
   `spacing`. E.g. `resolveColors('primary', theme.colors)` → hex; passing a raw hex
   passes through unchanged. `resolveColorFromBG` derives the matching `on*` text color
   for a given background.

4. **Style hooks** (`src/core/hooks/styles/`) — one hook per concern
   (`useBackgroundStyles`, `useBorderStyles`, `useShadowStyles`, `useSpacingStyles`,
   `useFontStyles`, `useTextShadowStyles`). Each pulls `useNeo()`, applies precedence
   **prop ?? theme default**, calls the resolver, and returns a memoized RN style object.
   `useNeoStyles` composes all of them for general-purpose use.

5. **Components** (`src/components/*/index.tsx`) — thin. They destructure props, call the
   relevant style hooks, compose the array, and render an RN primitive. `Box` is the base
   layout primitive; `Card` is `Box` with opinionated defaults. Components are
   `memo(forwardRef(...))` with a `displayName`.

When adding a component: build it from the existing style hooks rather than writing
StyleSheet objects, and add its export to `src/index.tsx`.

Note: the neobrutalism hard shadow is rendered via CSS `boxShadow`
(`<size>px <size>px 0 <color>`) composed in the component, not RN's native shadow props —
see `Box`.

### Public API

Everything is re-exported from `src/index.tsx` (provider, context, `useNeo`, default
themes, all typings, all components). This is the single barrel; keep it in sync.

### Build output

`react-native-builder-bob` emits CommonJS, ESM, and TypeScript declarations to `lib/`.
The `exports`/`main`/`module`/`types` map in package.json points consumers there. Only
`lib/`, the plugin build, and a few config files are published (`files` array).

### Expo config plugin (font linking)

`plugin/src/index.ts` is an Expo config plugin (exposed as `rn-neo/app.plugin`) that
links the bundled `assets/fonts/NeoIcons.ttf` used by icon-based components (e.g.
Checkbox): iOS via Info.plist `UIAppFonts` + Xcode Resources group, Android by copying
the ttf into `app/src/main/assets/fonts`. RN CLI users link via `npx react-native-asset`
instead (`react-native.config.js`). The plugin is built separately
(`plugin/tsconfig.json`) into `plugin/build/`.

## Docs site (`docs/`)

React Router 7 (SSG) + Fumadocs (`fumadocs-mdx`) + Tailwind + shadcn (neobrutalism
style). Content is MDX under `content/docs/`; `meta.json` controls nav ordering. The
build also emits clean raw markdown at `/docs/<slug>.md` via `scripts/emit-clean-md.mjs`
and llms.txt endpoints (`app/llms/`). Deployed to GitHub Pages.

When overriding Fumadocs colors, set `--color-fd-*` vars in `:root`, not in
`@theme inline`, or dark mode breaks.
