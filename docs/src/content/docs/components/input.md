---
title: Input
description: Input component from RN Neo
---

# Input

A styled text input built on React Native's `TextInput`. Animates the shadow
depth on focus and automatically applies theme-consistent placeholder and
selection colors.

## Usage

```tsx
import { Input } from 'rn-neo';

<Input placeholder="Enter your name" />

// With border and shadow
<Input
  placeholder="Email"
  border
  shadow
  backgroundColor="surface"
  padding="lg"
/>

// Custom focus shadow color
<Input
  placeholder="Search"
  border
  shadow
  shadowColor="primary"
  radius="md"
/>
```

## Behavior

- On focus, the shadow depth doubles — the offset multiplier goes from `1×` to
  `2×` the resolved `shadowSize`. This gives a subtle depth change that signals
  active state.
- `placeholderTextColor` defaults to the `muted` color token from the theme.
  Pass it explicitly to override.
- `selectionColor` defaults to the `primary` color token. Pass it explicitly
  to override.
- `onFocus` and `onBlur` handlers you pass in are called alongside the internal
  focus tracking — they are not replaced.
- `padding` defaults to `'md'` if not set.

## Props

### Font props

| Prop         | Type                             | Default    | Description                |
| :----------- | :------------------------------- | :--------- | :------------------------- |
| `textColor`  | `Colors \| string`               | From theme | Text color.                |
| `fontSize`   | `FontSize`                       | —          | Font size token.           |
| `fontWeight` | `'normal' \| 'medium' \| 'bold'` | —          | Font weight token.         |
| `fontFamily` | `string`                         | —          | Custom font family string. |

### Background props

| Prop              | Type                 | Default | Description                                  |
| :---------------- | :------------------- | :------ | :------------------------------------------- |
| `backgroundColor` | `BgColors \| string` | —       | Background color. Token or any color string. |

### Border props

| Prop          | Type                   | Default    | Description                         |
| :------------ | :--------------------- | :--------- | :---------------------------------- |
| `border`      | `boolean`              | From theme | Whether to show a border.           |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Token or raw number.  |
| `borderColor` | `Colors \| string`     | From theme | Border color.                       |
| `radius`      | `Radius \| number`     | From theme | Border radius. Token or raw number. |

### Shadow props

| Prop          | Type                   | Default    | Description                           |
| :------------ | :--------------------- | :--------- | :------------------------------------ |
| `shadow`      | `boolean`              | From theme | Whether to show a shadow.             |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Doubles on focus. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                         |

### Spacing props

| Prop                | Type                | Default |
| :------------------ | :------------------ | :------ |
| `padding`           | `Spacing \| number` | `'md'`  |
| `paddingVertical`   | `Spacing \| number` | —       |
| `paddingHorizontal` | `Spacing \| number` | —       |
| `paddingTop`        | `Spacing \| number` | —       |
| `paddingBottom`     | `Spacing \| number` | —       |
| `paddingLeft`       | `Spacing \| number` | —       |
| `paddingRight`      | `Spacing \| number` | —       |
| `margin`            | `Spacing \| number` | —       |
| `marginVertical`    | `Spacing \| number` | —       |
| `marginHorizontal`  | `Spacing \| number` | —       |
| `marginTop`         | `Spacing \| number` | —       |
| `marginBottom`      | `Spacing \| number` | —       |
| `marginLeft`        | `Spacing \| number` | —       |
| `marginRight`       | `Spacing \| number` | —       |

Input also accepts all standard React Native `TextInputProps` — including
`value`, `onChangeText`, `placeholder`, `multiline`, `keyboardType`,
`secureTextEntry`, `placeholderTextColor`, `selectionColor`, and so on. The
`style` prop is applied last and overrides any token-based styles.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/checkbox" className="btn btn-outline btn-lg"> ❮ &nbsp; Checkbox</a>
<a href="/docs/components/pressable" className="btn btn-primary btn-lg">Pressable &nbsp; ❯</a>
</div>
