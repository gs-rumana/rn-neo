---
title: Box
description: Box component from RN Neo
---

# Box

The foundational layout component in `rn-neo`. It renders a `View` with
Neubrutalist styles — borders, hard offset shadows, background colors, and
spacing — all driven by theme tokens.

Most other components in the library are built on top of `Box`.

## Usage

```tsx
import { Box } from 'rn-neo';

<Box backgroundColor="surface" padding="md">
  {/* anything */}
</Box>

// With border and shadow
<Box
  backgroundColor="primary"
  border
  borderSize="thick"
  shadow
  shadowSize="lg"
  padding="lg"
/>

// Custom radius and shadow color
<Box
  backgroundColor="surface"
  border
  shadow
  shadowColor="primary"
  radius="md"
  paddingHorizontal="xl"
  paddingVertical="md"
/>
```

## Shadow

Box uses a CSS `box-shadow` style under the hood with zero blur — giving the
hard flat offset look that defines Neubrutalism. The shadow renders as:

```
{shadowSize}px {shadowSize}px 0 {shadowColor}
```

Both `border` and `shadow` default to `false` on Box itself. Pass them
explicitly, or set `border: true` and `shadow: true` on your theme to enable
them globally.

## Props

### Background props

| Prop              | Type                 | Default | Description                                                      |
| :---------------- | :------------------- | :------ | :--------------------------------------------------------------- |
| `backgroundColor` | `BgColors \| string` | —       | Background color. Accepts a theme token or any hex/color string. |

### Border props

| Prop          | Type                   | Default    | Description                         |
| :------------ | :--------------------- | :--------- | :---------------------------------- |
| `border`      | `boolean`              | `false`    | Whether to show a border.           |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Token or raw number.  |
| `borderColor` | `Colors \| string`     | From theme | Border color.                       |
| `radius`      | `Radius \| number`     | From theme | Border radius. Token or raw number. |

### Shadow props

| Prop          | Type                   | Default    | Description                               |
| :------------ | :--------------------- | :--------- | :---------------------------------------- |
| `shadow`      | `boolean`              | `false`    | Whether to show a shadow.                 |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset in px. Token or raw number. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                             |

### Spacing props

| Prop                | Type                | Default |
| :------------------ | :------------------ | :------ |
| `padding`           | `Spacing \| number` | —       |
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

Box also accepts all standard React Native `ViewProps` (e.g. `style`,
`testID`, `accessible`, etc.). The `style` prop is applied last, so it can
override any token-based style.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/badge" className="btn btn-outline btn-lg"> ❮ &nbsp; Badge</a>
<a href="/docs/components/card" className="btn btn-primary btn-lg">Card &nbsp; ❯</a>
</div>
