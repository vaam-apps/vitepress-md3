# Expressive vs standard

One option decides which Material 3 the site speaks:

```ts
themeConfig: { md3: { style: "expressive" } } // or "standard"
```

**Flip it right here** with the switch in the top bar — this site ships both.

## At a glance

|                   | Expressive                                                | Standard                       |
| ----------------- | --------------------------------------------------------- | ------------------------------ |
| Colour scheme     | `expressive`, 2025 spec                                   | `tonal-spot`, 2021 spec        |
| Surfaces          | Tinted toward the seed                                    | Near-neutral                   |
| Cards             | 28px corners                                              | 12px corners                   |
| Callouts          | 20px corners                                              | 12px corners                   |
| Code blocks       | 16px corners                                              | 12px corners                   |
| Buttons           | Pill, squash to 12px when pressed                         | Pill                           |
| Spatial motion    | Springs with visible overshoot                            | Near-critically damped springs |
| Display type      | Weight 720, wider (Roboto Flex `wdth` 118)                | Weight 400, normal width       |
| Headlines         | Weight 640                                                | Weight 500                     |
| Decoration        | Cookie, clover and sun shapes on icons, avatars, headings | Circles and rounded squares    |
| Loading indicator | Wavy                                                      | Flat                           |

## What stays the same

Both styles share the same seed, the same contrast guarantees, the same layout
and every default-theme feature. Switching style never moves content; it
changes how the same content feels.

## Which one to pick

- **Expressive** for anything product-facing — a project's front door, where
  personality helps people remember it. This is the vaam-apps default.
- **Standard** for reference-heavy sites read for hours at a time — an API
  reference, a runbook — where calmer surfaces and quieter motion get out of
  the way.

## In your own CSS

The difference is mostly carried by tokens, so your own components follow the
style without knowing about it:

```css
.my-card {
  border-radius: var(--md-sys-shape-card); /* 12px or 28px */
  transition: transform var(--md-sys-motion-spring-spatial-default-duration)
    var(--md-sys-motion-spring-spatial-default);
}
```

For the occasional thing only one style should do, the `<html>` element
carries the active style:

```css
:root[data-md3-style="expressive"] .my-card:hover {
  transform: rotate(-2deg);
}
```

In a Vue component, `useMd3()` gives you the same thing reactively:

```vue
<script setup lang="ts">
import { useMd3 } from "@vaam-apps/vitepress-md3";

const { style, isExpressive } = useMd3();
</script>
```
