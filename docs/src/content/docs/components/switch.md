---
title: Switch
description: Switch component from RN Neo
---

# Switch

A toggle switch with a sliding thumb animation. The thumb translates across
the track when the value changes, and the track background transitions between
on and off colors.

## Usage

```tsx
import { Switch } from 'rn-neo';
import { useState } from 'react';

const [value, setValue] = useState(false);

<Switch
  value={value}
  onChange={setValue}
/>

// With size and custom colors
<Switch
  value={value}
  onChange={setValue}
  size="lg"
  backgroundColor={{ true: 'success', false: 'muted' }}
  thumbColor={{ true: 'onSuccess', false: 'onPrimary' }}
/>

// Disabled
<Switch
  value={value}
  onChange={setValue}
  disabled
/>
```

## Behavior

- The thumb slides horizontally from the left edge to the right edge when
  `value` toggles. The travel distance is calculated from the container width,
  border size, padding, and thumb size — so it always fits precisely regardless
  of `size` or `borderSize`.
- Thumb size is 60% of the track height. Its border radius scales down from the
  container's border radius minus the internal padding, so it always looks
  naturally inset.
- The shadow depth doubles when `value` is `true` (offset multiplier goes from
  `1×` to `2×`).
- Track background, shadow, and opacity transitions are animated when
  `animation` is enabled in the theme. The thumb's translate and background
  color are also animated.
- When `disabled` is `true`, the component renders at reduced opacity and
  ignores all interactions.
- Track background defaults to `primary` when on and `muted` when off.
- Thumb color defaults to `onPrimary` for both states.

## Size

| Size | Width | Height |
| :--- | :---- | :----- |
| `sm` | 36px  | 20px   |
| `md` | 48px  | 28px   |
| `lg` | 60px  | 34px   |

## Props

### Switch-specific props

| Prop              | Type                                            | Default                                     | Description                                       |
| :---------------- | :---------------------------------------------- | :------------------------------------------ | :------------------------------------------------ |
| `value`           | `boolean`                                       | —                                           | Current on/off state. **Required.**               |
| `onChange`        | `(value: boolean) => void`                      | —                                           | Called with the new value on press. **Required.** |
| `disabled`        | `boolean`                                       | —                                           | Disables interaction and reduces opacity.         |
| `size`            | `'sm' \| 'md' \| 'lg'`                          | `'md'`                                      | Controls track width and height.                  |
| `backgroundColor` | `Record<'true' \| 'false', BgColors \| string>` | `{ true: 'primary', false: 'muted' }`       | Track background color for each state.            |
| `thumbColor`      | `Record<'true' \| 'false', Colors \| string>`   | `{ true: 'onPrimary', false: 'onPrimary' }` | Thumb color for each state.                       |

### Border props

| Prop          | Type                   | Default    | Description                                                           |
| :------------ | :--------------------- | :--------- | :-------------------------------------------------------------------- |
| `border`      | `boolean`              | From theme | Whether to show a border.                                             |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Affects thumb travel distance and padding calculations. |
| `borderColor` | `Colors \| string`     | From theme | Border color.                                                         |
| `radius`      | `Radius \| number`     | From theme | Track border radius. Thumb radius scales from this automatically.     |

### Shadow props

| Prop          | Type                   | Default    | Description                                       |
| :------------ | :--------------------- | :--------- | :------------------------------------------------ |
| `shadow`      | `boolean`              | From theme | Whether to show a shadow.                         |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Doubles when value is `true`. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                                     |

### Spacing props

| Prop               | Type                | Default | Description |
| :----------------- | :------------------ | :------ | :---------- |
| `margin`           | `Spacing \| number` | —       |             |
| `marginVertical`   | `Spacing \| number` | —       |             |
| `marginHorizontal` | `Spacing \| number` | —       |             |
| `marginTop`        | `Spacing \| number` | —       |             |
| `marginBottom`     | `Spacing \| number` | —       |             |
| `marginLeft`       | `Spacing \| number` | —       |             |
| `marginRight`      | `Spacing \| number` | —       |             |

## Accessibility

Switch sets `accessibilityRole="switch"` and passes `checked` (from `value`)
and `disabled` to `accessibilityState` automatically.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/radio" className="btn btn-outline btn-lg"> ❮ &nbsp; Radio</a>
<a href="/docs/components/text" className="btn btn-primary btn-lg">Text &nbsp; ❯</a>
</div>
