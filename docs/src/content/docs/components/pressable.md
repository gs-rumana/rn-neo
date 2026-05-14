---
title: Pressable
description: Pressable component from RN Neo
---

# Pressable

A touchable container with a physical press animation. On press, it shifts
along both axes to simulate the shadow being pushed in — the core interaction
pattern of Neubrutalism. Supports a loading state that disables interaction
while keeping the component visible.

## Usage

```tsx
import { Pressable, Text } from 'rn-neo';

<Pressable onPress={() => console.log('pressed')}>
  <Text>Click me</Text>
</Pressable>

// With border and shadow
<Pressable
  border
  shadow
  shadowColor="shadow"
  onPress={handleSubmit}
>
  <Text>Submit</Text>
</Pressable>

// Loading state
<Pressable loading={isSubmitting} onPress={handleSubmit}>
  <Text>Submit</Text>
</Pressable>

// Custom appearance
<Pressable
  backgroundColor="secondary"
  border
  shadow
  radius="md"
  padding="lg"
  onPress={handlePress}
>
  <Text>Secondary action</Text>
</Pressable>
```

## Behavior

- On `pressIn`, the component shifts by half the resolved `shadowSize` on both
  X and Y axes, and the shadow offset doubles — simulating a physical push.
- On `pressOut`, it returns to its original position.
- The press animation only fires when `animation` is enabled in the theme and
  the component is neither `disabled` nor `loading`.
- When `loading` is `true`, the component is disabled — it ignores all
  interactions. Both `disabled` and `loading` together also set the appropriate
  accessibility states.
- `onPressIn` and `onPressOut` handlers you pass are called alongside the
  internal press tracking — they are not replaced.
- `accessibilityRole` defaults to `'button'` if not passed.
- `padding` defaults to `'md'` and `backgroundColor` defaults to `'primary'`
  if not set.
- Font props (`textColor`, `fontSize`, `fontWeight`, `fontFamily`) are applied
  to the container — they cascade into any `Text` children rendered inside.

## Props

### Pressable-specific props

| Prop      | Type      | Default | Description                                                |
| :-------- | :-------- | :------ | :--------------------------------------------------------- |
| `loading` | `boolean` | —       | Disables the component and sets `accessibilityState.busy`. |

### Font props

| Prop         | Type                             | Default | Description                      |
| :----------- | :------------------------------- | :------ | :------------------------------- |
| `textColor`  | `Colors \| string`               | —       | Text color cascaded to children. |
| `fontSize`   | `FontSize`                       | —       | Font size token.                 |
| `fontWeight` | `'normal' \| 'medium' \| 'bold'` | —       | Font weight token.               |
| `fontFamily` | `string`                         | —       | Custom font family string.       |

### Background props

| Prop              | Type                 | Default     | Description                                  |
| :---------------- | :------------------- | :---------- | :------------------------------------------- |
| `backgroundColor` | `BgColors \| string` | `'primary'` | Background color. Token or any color string. |

### Border props

| Prop          | Type                   | Default    | Description                         |
| :------------ | :--------------------- | :--------- | :---------------------------------- |
| `border`      | `boolean`              | From theme | Whether to show a border.           |
| `borderSize`  | `BorderSize \| number` | From theme | Border width. Token or raw number.  |
| `borderColor` | `Colors \| string`     | From theme | Border color.                       |
| `radius`      | `Radius \| number`     | From theme | Border radius. Token or raw number. |

### Shadow props

| Prop          | Type                   | Default    | Description                                      |
| :------------ | :--------------------- | :--------- | :----------------------------------------------- |
| `shadow`      | `boolean`              | From theme | Whether to show a shadow.                        |
| `shadowSize`  | `ShadowSize \| number` | From theme | Shadow offset size. Doubles and shifts on press. |
| `shadowColor` | `Colors \| string`     | From theme | Shadow color.                                    |

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

Pressable also accepts all standard React Native `PressableProps` — including
`onPress`, `onLongPress`, `hitSlop`, `accessibilityLabel`, and so on. The
`style` prop is applied last and overrides any token-based styles.

## Accessibility

Pressable sets `accessibilityRole="button"` by default and passes `disabled`
and `busy` (from `loading`) to `accessibilityState` automatically.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/input" className="btn btn-outline btn-lg"> ❮ &nbsp; Input</a>
<a href="/docs/components/radio" className="btn btn-primary btn-lg">Radio &nbsp; ❯</a>
</div>
