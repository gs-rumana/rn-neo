---
title: Radio
description: Radio component from RN Neo
---

# Radio

A radio button with an inner dot indicator. Supports disabled state, custom
sizes, and separate colors for selected and unselected states.

## Usage

```tsx
import { Radio } from 'rn-neo';
import { useState } from 'react';

const [selected, setSelected] = useState(false);

<Radio
  selected={selected}
  onChange={setSelected}
/>

// With size and custom colors
<Radio
  selected={selected}
  onChange={setSelected}
  size="lg"
  backgroundColor={{ true: 'secondary', false: 'surface' }}
  innerColor={{ true: 'onSecondary', false: 'transparent' }}
/>

// Disabled
<Radio
  selected={selected}
  onChange={setSelected}
  disabled
/>
```

## Building a Radio Group

`Radio` is a controlled primitive — it does not manage group state on its own.
Wire up multiple radio buttons manually:

```tsx
const [value, setValue] = useState('a');

<Radio selected={value === 'a'} onChange={() => setValue('a')} />
<Radio selected={value === 'b'} onChange={() => setValue('b')} />
<Radio selected={value === 'c'} onChange={() => setValue('c')} />
```

## Behavior

- The inner dot scales from `0` to `1` when `selected` switches — giving a
  clean pop-in effect.
- The inner dot size is derived from the container size minus padding on both
  sides. Its border radius scales proportionally to match the container's
  border radius.
- The shadow depth doubles when `selected` is `true` (offset multiplier goes
  from `1×` to `2×`).
- When `disabled` is `true`, the component renders at reduced opacity and
  ignores all interactions.
- Background color, shadow, and opacity transitions are animated when
  `animation` is enabled in the theme.
- `padding` defaults to the size preset value if not explicitly set.

## Size

| Size | Dimensions | Default Padding |
| :--- | :--------- | :-------------- |
| `sm` | 18 × 18    | `sm` (4px)      |
| `md` | 22 × 22    | `md` (8px)      |
| `lg` | 28 × 28    | `md` (8px)      |

## Props

### Radio-specific props

| Prop              | Type                                            | Default                                       | Description                                       |
| :---------------- | :---------------------------------------------- | :-------------------------------------------- | :------------------------------------------------ |
| `selected`        | `boolean`                                       | —                                             | Current selected state. **Required.**             |
| `onChange`        | `(selected: boolean) => void`                   | —                                             | Called with the new value on press. **Required.** |
| `disabled`        | `boolean`                                       | —                                             | Disables interaction and reduces opacity.         |
| `size`            | `'sm' \| 'md' \| 'lg'`                          | `'md'`                                        | Controls the dimensions of the radio button.      |
| `backgroundColor` | `Record<'true' \| 'false', BgColors \| string>` | `{ true: 'primary', false: 'surface' }`       | Background color for each state.                  |
| `innerColor`      | `Record<'true' \| 'false', Colors \| string>`   | `{ true: 'onPrimary', false: 'transparent' }` | Inner dot color for each state.                   |

### Border props

| Prop          | Type                   | Default    | Description                                            |
| :------------ | :--------------------- | :--------- | :----------------------------------------------------- |
| `border`      | `boolean`              | From theme | Whether to show a border.                              |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Token or raw number.                     |
| `borderColor` | `Colors \| string`     | From theme | Border color.                                          |
| `radius`      | `Radius \| number`     | From theme | Border radius. Scales to the inner dot proportionally. |

### Shadow props

| Prop          | Type                   | Default    | Description                                |
| :------------ | :--------------------- | :--------- | :----------------------------------------- |
| `shadow`      | `boolean`              | From theme | Whether to show a shadow.                  |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Doubles when selected. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                              |

### Spacing props

| Prop                | Type                | Default |
| :------------------ | :------------------ | :------ |
| `padding`           | `Spacing \| number` | -       |
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

Radio sets `accessibilityRole="radio"` and passes `selected` and `disabled`
to `accessibilityState` automatically.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/pressable" className="btn btn-outline btn-lg"> ❮ &nbsp; Pressable</a>
<a href="/docs/components/switch" className="btn btn-primary btn-lg">Switch &nbsp; ❯</a>
</div>
