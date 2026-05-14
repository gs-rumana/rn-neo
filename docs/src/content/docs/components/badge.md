---
title: Badge
description: Badge component from RN Neo
---

# Badge

A small label component for status indicators, tags, and counts. Defaults to a
pill shape with a primary background, and automatically picks the right text
color based on the background.

## Usage

```tsx
import { Badge } from 'rn-neo';

// Plain text — no need to wrap in a Text component
<Badge>New</Badge>

// With a number
<Badge>4</Badge>

// Custom size and color
<Badge size="sm" backgroundColor="success">Active</Badge>

// Custom children
<Badge>
  <Icon name="star" size={12} />
</Badge>
```

## Text Rendering

If `children` is a string or number, Badge wraps it in the internal `Text`
component automatically and picks the correct text color using
`resolveColorFromBG` — so you don't need to think about contrast. If you pass
any other component as children, it renders as-is without wrapping.

## Size

The `size` prop controls padding and font size together. The default is `md`.

| Size | Padding H   | Padding V  | Font Size   |
| :--- | :---------- | :--------- | :---------- |
| `sm` | `sm` (4px)  | `xs` (2px) | `sm` (12px) |
| `md` | `md` (8px)  | `sm` (4px) | `md` (14px) |
| `lg` | `lg` (12px) | `md` (8px) | `lg` (16px) |

You can still override padding directly via `paddingHorizontal` or
`paddingVertical` if the size presets don't fit your need.

## Props

### Badge-specific props

| Prop        | Type                   | Default | Description                                                                  |
| :---------- | :--------------------- | :------ | :--------------------------------------------------------------------------- |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`  | Controls padding and font size together.                                     |
| `textStyle` | `TextStyle`            | —       | Style applied to the auto-rendered Text when children is a string or number. |

### Font props

| Prop         | Type                             | Default                | Description                                                   |
| :----------- | :------------------------------- | :--------------------- | :------------------------------------------------------------ |
| `textColor`  | `Colors \| string`               | Auto (from background) | Text color. Resolved from background token if not set.        |
| `fontSize`   | `FontSize`                       | From `size`            | Overrides the font size from the size preset.                 |
| `fontWeight` | `'normal' \| 'medium' \| 'bold'` | —                      | Font weight token. Maps to the font family defined in config. |
| `fontFamily` | `string`                         | —                      | Custom font family string.                                    |

### Background props

| Prop              | Type                 | Default     | Description                                                      |
| :---------------- | :------------------- | :---------- | :--------------------------------------------------------------- |
| `backgroundColor` | `BgColors \| string` | `'primary'` | Background color. Accepts a theme token or any hex/color string. |

### Border props

| Prop          | Type                   | Default    | Description                                                 |
| :------------ | :--------------------- | :--------- | :---------------------------------------------------------- |
| `border`      | `boolean`              | From theme | Whether to show a border.                                   |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Token or raw number.                          |
| `borderColor` | `Colors \| string`     | From theme | Border color.                                               |
| `radius`      | `Radius \| number`     | `'full'`   | Border radius. Defaults to pill shape. Token or raw number. |

### Shadow props

| Prop          | Type                   | Default    | Description                              |
| :------------ | :--------------------- | :--------- | :--------------------------------------- |
| `shadow`      | `boolean`              | From theme | Whether to show a shadow.                |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Token or raw number. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                            |

### Spacing props

| Prop                | Type                | Default |
| :------------------ | :------------------ | :------ |
| `padding`           | `Spacing \| number` | -       |
| `paddingHorizontal` | `Spacing \| number` | -       |
| `paddingVertical`   | `Spacing \| number` | -       |
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

Badge also accepts all standard React Native `ViewProps` (e.g. `style`,
`testID`, `accessible`, etc.).

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/customization" className="btn btn-outline btn-lg"> ❮ &nbsp; Customization</a>
<a href="/docs/components/box" className="btn btn-primary btn-lg">Box &nbsp; ❯</a>
</div>
