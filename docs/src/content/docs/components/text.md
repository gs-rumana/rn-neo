---
title: Text
description: Text component from RN Neo
---

# Text

A typography component built on React Native's `Text`. It integrates with the
theme's font and color tokens, supports hard offset shadows, and provides
convenient spacing props.

## Usage

```tsx
import { Text } from 'rn-neo';

<Text>Basic text</Text>

// Using theme tokens
<Text color="primary" fontSize="xl" fontWeight="bold">
  Bold Primary Heading
</Text>

// With shadow and alignment
<Text align="center" shadow shadowColor="shadow" shadowSize="sm">
  Centered text with shadow
</Text>

// Custom font family
<Text fontFamily="SpaceMono-Regular">
  Monospace content
</Text>
```

## Behavior

- `Text` uses `textShadowOffset` and `textShadowRadius: 0` to achieve the hard
  shadow look consistent with Neubrutalism.
- The `color` prop accepts any theme color token (e.g., `primary`, `onBackground`,
  `surface`) or a standard CSS color string.
- `fontSize` and `fontWeight` map to the values defined in your `NeoConfig`.
- Spacing props (`margin`, `padding`) can be used to position text blocks
  without needing extra wrapper views.

## Props

### Text-specific props

| Prop    | Type                                           | Default        | Description                            |
| :------ | :--------------------------------------------- | :------------- | :------------------------------------- |
| `color` | `Colors \| string`                             | `onBackground` | Text color. Token or any color string. |
| `align` | `'auto'\|'left'\|'right'\|'center'\|'justify'` | `'auto'`       | Text alignment. Maps to `textAlign`.   |

### Font props

| Prop         | Type                             | Default    | Description                                                   |
| :----------- | :------------------------------- | :--------- | :------------------------------------------------------------ |
| `fontSize`   | `FontSize`                       | `'md'`     | Font size token.                                              |
| `fontWeight` | `'normal' \| 'medium' \| 'bold'` | `'normal'` | Font weight token. Maps to the font family defined in config. |
| `fontFamily` | `string`                         | —          | Custom font family string.                                    |

### Shadow props

| Prop          | Type                   | Default    | Description                              |
| :------------ | :--------------------- | :--------- | :--------------------------------------- |
| `shadow`      | `boolean`              | `false`    | Whether to show a text shadow.           |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Token or raw number. |
| `shadowColor` | `Colors \| string`     | `'shadow'` | Shadow color. Token or any color string. |

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

Text also accepts all standard React Native `TextProps` — including `numberOfLines`,
`ellipsizeMode`, `onPress`, `selectable`, and so on. The `style` prop is applied
last and overrides any token-based styles.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/switch" className="btn btn-outline btn-lg"> ❮ &nbsp; Switch</a>
<a href="/docs/contributing" className="btn btn-primary btn-lg">Contributing &nbsp; ❯</a>
</div>
