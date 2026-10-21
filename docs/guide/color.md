# Colour

Every colour on the site comes from one **seed**, run through Google's
[`material-color-utilities`](https://github.com/material-foundation/material-color-utilities)
— the same library Android uses for Material You. It happens once, at build
time; readers download a few dozen CSS custom properties, not a colour library.

## The live scheme

These swatches read the site's actual tokens, so they follow light/dark mode
and the style switch in the top bar.

<Md3Palette />

## From seed to scheme

1. The seed is converted to [HCT](https://material.io/blog/science-of-color-design)
   (hue, chroma, tone), a colour space where equal steps of *tone* look like
   equal steps of lightness.
2. The [scheme variant](./configuration#scheme) derives six key palettes —
   primary, secondary, tertiary, neutral, neutral-variant, error — each a full
   0–100 tone ramp.
3. Every role (`primary`, `on-primary-container`, `surface-container-high`, …)
   picks a tone from its palette, separately for light and dark, chosen so that
   each foreground role contrasts with the background roles it sits on.

## Tokens

| Prefix                | What                                                                 | Example                               |
| --------------------- | -------------------------------------------------------------------- | ------------------------------------- |
| `--md-sys-color-*`    | Every M3 colour role, light or dark                                  | `--md-sys-color-primary-container`    |
| `--md-custom-color-*` | Your [custom colours](./configuration#customcolors), four roles each | `--md-custom-color-success-container` |
| `--md-ref-palette-*`  | Raw palette tones, same in both modes                                | `--md-ref-palette-tertiary90`         |

All of the default theme's `--vp-c-*` variables are wired to these roles, so
anything VitePress draws — and any plugin that uses `--vp-c-brand-1` — is
already on-scheme.

## How the containers map

| Markdown                     | Container role                    |
| ---------------------------- | --------------------------------- |
| `::: info`                   | info container (custom colour)    |
| `::: tip`                    | success container (custom colour) |
| `::: warning`                | warning container (custom colour) |
| `::: danger`, `> [!CAUTION]` | error container                   |
| `> [!IMPORTANT]`             | tertiary container                |
| `> [!NOTE]`, `::: details`   | surface container high            |

::: info
Info is the info custom colour.
:::

::: tip
Tip is success — harmonised toward the seed.
:::

> [!IMPORTANT]
> Important is tertiary.

::: warning
Warning is the warning custom colour.
:::

::: danger
Danger is error.
:::

## Contrast

Each text role is paired with its background and checked against WCAG AA
(4.5:1) by the test suite — in light and dark, for both styles, across four
seeds chosen to stress different corners of colour space (a teal, M3's baseline
purple, a near-grey and a hot orange). A seed that would produce an unreadable
pairing fails CI, not a reader.

For readers who need more, raise [`contrast`](./configuration#contrast):

```ts
md3: { contrast: 0.5 } // Material's "medium contrast"
```
