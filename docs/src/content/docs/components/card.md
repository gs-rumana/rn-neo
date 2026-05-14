---
title: Card
description: Card component from RN Neo
---

# Card

A `Box` with opinionated defaults for building content containers. Comes with
border and shadow enabled out of the box, a `surface` background, and `md`
padding — so it looks right without any props.

## Usage

```tsx
import { Card } from 'rn-neo';

<Card>
  <Text>Hello</Text>
</Card>

// Override defaults
<Card backgroundColor="primary" shadow={false} padding="xl">
  <Text>Custom card</Text>
</Card>
```

## Defaults

| Prop              | Default     |
| :---------------- | :---------- |
| `backgroundColor` | `'surface'` |
| `border`          | `true`      |
| `shadow`          | `true`      |
| `padding`         | `'md'`      |

Everything else follows the theme. All `Box` props are accepted — refer to the
[Box](/docs/components/box) page for the full prop reference.

<div className="grid grid-cols-2 gap-4 mt-8">
<a href="/docs/components/box" className="btn btn-outline btn-lg"> ❮ &nbsp; Box</a>
<a href="/docs/components/checkbox" className="btn btn-primary btn-lg">Checkbox &nbsp; ❯</a>
</div>
