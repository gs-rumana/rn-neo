# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2026-06-26

### Added

- **Dialog Component:** Controlled modal built on React Native's `Modal`. Centers a `Box` surface over a dimmed backdrop, inheriting the neobrutalist treatment (border, hard shadow, `surface` background, padding). Supports `title`, `footer`, `dismissable` backdrop, custom `backdropColor`, and `animationType`, and forwards all `Box` props to style the surface.

---

## [0.3.0] - 2026-05-16

### Added

- **Documentation Site:** Launched a comprehensive documentation site built with Astro, featuring interactive guides and full component API references.
- **Expo Support:** Added an Expo config plugin (`app.plugin.js`) for seamless integration with Expo development builds.
- **Style Resolvers:** Introduced specialized resolvers for borders, colors, shadows, and spacing to ensure consistent style application across the library.
- **New Component Patterns:** All components now follow a standardized pattern using `forwardRef` and `memo` for better performance and developer experience.
- **Typography Assets:** Added `NeoIcons.ttf` to support custom icons within the design system.

### Changed

- **Architecture Refactor:** Major restructuring of the codebase. Components moved to standalone directories with a unified `index.tsx` entry point.
- **Simplified Hooks:** Combined `useTheme` and `useConfig` into a single, more powerful `useNeo()` hook.
- **Unified Typings:** Consistently organized TypeScript definitions in `src/typings/` for better maintainability and discovery.
- **NeoProvider Improvements:** Enhanced `NeoProvider` with better theme/config merging and performance optimizations.
- **Internal Hooks:** Refactored style logic into reusable internal hooks (`useNeoStyles`, `useBackgroundStyles`, etc.).

### Removed

- Removed legacy primitives (`src/primitives/`) in favor of the new folder-based component structure.
- Deprecated standalone `useTheme` and `useConfig` hooks.
- Removed several unused utility files and legacy configurations.
