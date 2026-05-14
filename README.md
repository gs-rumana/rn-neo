# rn-neo

A React Native UI library built around Neobrutalism — hard shadows, bold borders, and vibrant colors.

Built on top of **React Native Reanimated 4** for smooth, performant animations that work across all platforms Reanimated supports.

## Features

- **Neobrutalism design** — hard offset shadows, thick borders, and a strong visual identity out of the box.
- **Fully themable** — centralized token system via `NeoProvider`. Override colors, spacing, radius, typography, and more.
- **Component-level overrides** — every style prop can be overridden per component without touching the theme.
- **Dark mode ready** — ships with `DefaultLightTheme` and `DefaultDarkTheme`. You control when to switch.
- **TypeScript** — fully typed props, theme tokens, and config.
- **Tree-shakable** — only include what you use.

## Installation

```sh
yarn add rn-neo react-native-reanimated react-native-worklets
```

Follow the [Reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) for Babel plugin setup and additional configuration.

### Font linking

`rn-neo` uses an internal icon font for components like `Checkbox`. Link it based on your setup:

**Expo**

Add the plugin to your `app.json`:

```json
{
  "plugins": ["rn-neo"]
}
```

**React Native CLI**

```sh
npx react-native-asset
```

## Usage

Wrap your app with `NeoProvider`:

```tsx
import { NeoProvider, DefaultLightTheme } from 'rn-neo';

export default function App() {
  return (
    <NeoProvider theme={DefaultLightTheme}>
      <YourApp />
    </NeoProvider>
  );
}
```

`DefaultLightTheme` is used automatically if you don't pass a `theme` prop.

For dark mode, switch themes based on the system preference or your own logic:

```tsx
import { useColorScheme } from 'react-native';
import { NeoProvider, DefaultLightTheme, DefaultDarkTheme } from 'rn-neo';

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DefaultDarkTheme : DefaultLightTheme;

  return (
    <NeoProvider theme={theme}>
      <YourApp />
    </NeoProvider>
  );
}
```

## Components

| Component | Description |
| :--- | :--- |
| `Box` | Base layout container with border, shadow, and spacing props. |
| `Card` | `Box` with opinionated defaults — border, shadow, and surface background enabled. |
| `Text` | Theme-aware typography with font size, weight, and color tokens. |
| `Badge` | Small label for status indicators, tags, and counts. |
| `Pressable` | Touchable container with a physical press animation. |
| `Input` | Styled text input with animated shadow on focus. |
| `Checkbox` | Toggleable checkbox with press animation and icon. |
| `Radio` | Radio button with animated inner dot. |
| `Switch` | Toggle switch with sliding thumb animation. |

## Customization

Pass a partial `theme` or `config` to `NeoProvider` to override defaults:

```tsx
import { NeoProvider, DefaultLightTheme } from 'rn-neo';

const theme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#6600FF',
    onPrimary: '#FFFFFF',
  },
  radius: 'md',
};

const config = {
  fonts: {
    normal: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
};

<NeoProvider theme={theme} config={config}>
  <YourApp />
</NeoProvider>
```

Both `theme` and `config` support partial overrides — only pass what you want to change.

For the full customization reference see the [docs](https://rn-neo.gs-rumana.com/docs/customization).

## Documentation

Full documentation is available at [rn-neo.gs-rumana.com/docs](https://rn-neo.gs-rumana.com/docs).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute and get the development workflow running.

## License

MIT