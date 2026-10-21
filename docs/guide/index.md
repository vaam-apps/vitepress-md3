# What is vitepress-md3?

**`@vaam-apps/vitepress-md3`** is a [VitePress](https://vitepress.dev) theme
that dresses VitePress's default theme in
[Material Design 3](https://m3.material.io). It is the house style of every
vaam-apps documentation site — this one included.

<Md3Shape shape="clover-8" size="4rem" tone="tertiary" spin /> <Md3Shape shape="cookie-9" size="4rem" /> <Md3Shape shape="sunny" size="4rem" tone="secondary" spin />

## What you get

- **Two flavours of Material 3**, chosen with one option:
  [Expressive](./styles) (the default) or [standard](./styles). The style
  decides the colour scheme, the corner scale, how springy motion is, how
  heavy headings are, and whether the decorative Expressive shapes appear.
- **A full colour system from one seed colour**, generated at build time by
  Google's own [`material-color-utilities`](https://github.com/material-foundation/material-color-utilities):
  light and dark schemes, every container role, and harmonised success,
  warning and info colours for callouts. See [Colour](./color).
- **Everything VitePress's default theme does**, unchanged: sidebar, nav,
  local search, outline, edit links, last-updated, i18n, code groups,
  containers, badges. Existing `themeConfig` keeps working — the theme only
  restyles, it does not reinvent.
- **Components for docs hubs**: project cards, the Expressive shape library,
  a live palette, a motion demo. See [Components](./components).

## How it works

The theme has two halves, one per side of VitePress:

| Half   | Import                            | Runs in        | Does                                                                                           |
| ------ | --------------------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| Config | `@vaam-apps/vitepress-md3/config` | Node, at build | Generates the design tokens from `themeConfig.md3` and inlines them into every page's `<head>` |
| Theme  | `@vaam-apps/vitepress-md3`        | The browser    | Points every default-theme `--vp-*` variable at a Material role and restyles its components    |

Because the tokens are plain CSS custom properties — `--md-sys-color-primary`,
`--md-sys-shape-card`, `--md-sys-motion-spring-spatial-default` — your own
components can use them too, and they follow the reader's light/dark choice.

## Credits

This theme started life as a fork of Ziwen Yang's
[vitepress-material3](https://github.com/zivenyang/vitepress-material3), a
Vuetify-based Material 3 blog theme. The wavy divider at the bottom of the home
page is a nod to it.

Next: [Getting started →](./getting-started)
