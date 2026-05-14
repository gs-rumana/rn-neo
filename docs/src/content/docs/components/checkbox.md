---
title: Checkbox
description: Checkbox component from RN Neo
---

# Checkbox

A toggleable checkbox with a press animation and a built-in checkmark icon.
Supports disabled state, custom sizes, and separate colors for checked and
unchecked states.

## Usage

```tsx
import { Checkbox } from 'rn-neo';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={setChecked}
/>

// With size and custom colors
<Checkbox
  checked={checked}
  onChange={setChecked}
  size="lg"
  backgroundColor={{ true: 'secondary', false: 'surface' }}
  checkColor={{ true: 'onSecondary', false: 'transparent' }}
/>

// Disabled
<Checkbox
  checked={checked}
  onChange={setChecked}
  disabled
/>
```

## Behavior

- Pressing the checkbox calls `onChange` with the toggled value.
- When pressed, the component shifts slightly along both axes to simulate the
  shadow being pushed in — giving a physical press feel.
- When `disabled` is true, the component renders at reduced opacity and ignores
  all interactions.
- The checkmark is rendered using the internal `NeoIcons` font, sized at 70% of
  the container.
- Transitions for background color, shadow, and transform are animated when
  `animation` is enabled in the theme.

## Size

The `size` prop controls the width and height of the checkbox container. Font
size of the checkmark scales with it.

| Size | Dimensions |
| :--- | :--------- |
| `sm` | 18 × 18    |
| `md` | 22 × 22    |
| `lg` | 28 × 28    |

## Props

### Checkbox-specific props

| Prop              | Type                                            | Default                                       | Description                                       |
| :---------------- | :---------------------------------------------- | :-------------------------------------------- | :------------------------------------------------ |
| `checked`         | `boolean`                                       | —                                             | Current checked state. **Required.**              |
| `onChange`        | `(checked: boolean) => void`                    | —                                             | Called with the new value on press. **Required.** |
| `disabled`        | `boolean`                                       | —                                             | Disables interaction and reduces opacity.         |
| `size`            | `'sm' \| 'md' \| 'lg'`                          | `'md'`                                        | Controls the dimensions of the checkbox.          |
| `backgroundColor` | `Record<'true' \| 'false', BgColors \| string>` | `{ true: 'primary', false: 'surface' }`       | Background color for each state.                  |
| `checkColor`      | `Record<'true' \| 'false', Colors \| string>`   | `{ true: 'onPrimary', false: 'transparent' }` | Checkmark color for each state.                   |

### Border props

| Prop          | Type                   | Default    | Description                         |
| :------------ | :--------------------- | :--------- | :---------------------------------- |
| `border`      | `boolean`              | From theme | Whether to show a border.           |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Token or raw number.  |
| `borderColor` | `Colors \| string`     | From theme | Border color.                       |
| `radius`      | `Radius \| number`     | From theme | Border radius. Token or raw number. |

### Shadow props

| Prop          | Type                   | Default    | Description                              |
| :------------ | :--------------------- | :--------- | :--------------------------------------- |
| `shadow`      | `boolean`              | From theme | Whether to show a shadow.                |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Token or raw number. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                            |

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

## Accessibility

Checkbox sets `accessibilityRole="checkbox"` and passes `checked` and
`disabled` to `accessibilityState` automatically.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/card" className="btn btn-outline btn-lg"> ❮ &nbsp; Card</a>
<a href="/docs/components/input" className="btn btn-primary btn-lg">Input &nbsp; ❯</a>
</div>
