<p align="center"><img src="https://raw.githubusercontent.com/vaam-apps/vitepress-md3/main/docs/public/logo.svg" width="96" height="96" alt=""></p>

# vitepress-md3

**Material Design 3 for [VitePress](https://vitepress.dev) — Expressive or
standard, generated from one seed colour.** The house style of every vaam-apps
documentation site, and the hub that lists them all.

[![CI](https://github.com/vaam-apps/vitepress-md3/actions/workflows/ci.yml/badge.svg)](https://github.com/vaam-apps/vitepress-md3/actions/workflows/ci.yml)
[![Docs](https://github.com/vaam-apps/vitepress-md3/actions/workflows/pages.yml/badge.svg)](https://vaam-apps.github.io/vitepress-md3/)
[![License: MIT](https://img.shields.io/badge/license-MIT-0f766e.svg)](LICENSE)

**[Read the docs →](https://vaam-apps.github.io/vitepress-md3/)**

## What it is

- **One switch between two Material 3s.** `style: "expressive"` (default) or
  `"standard"` flips the colour scheme, the corner scale, spring motion, type
  weight and the decorative Expressive shapes, together.
- **A full colour system from one seed**, generated at build time with
  Google's `material-color-utilities`: light and dark schemes, every container
  role, harmonised success / warning / info colours. Every text role is tested
  against WCAG AA.
- **Everything the default theme does.** It extends VitePress's default theme
  rather than replacing it, so sidebar, nav, local search, outline, i18n and
  your existing `themeConfig` all keep working.
- **Components for docs hubs**: project cards, an Expressive shape library, a
  live palette and a motion demo.

## Use it

```sh
pnpm add -D @vaam-apps/vitepress-md3 vitepress vue
```

```ts
// .vitepress/config.ts
import { defineMd3Config } from "@vaam-apps/vitepress-md3/config";

export default defineMd3Config({
  title: "My project",
  themeConfig: {
    md3: { style: "expressive", seed: "#0f766e" },
  },
});
```

```ts
// .vitepress/theme/index.ts
export { default } from "@vaam-apps/vitepress-md3";
```

Works with VitePress 2 and 1.6; CI builds a fresh consumer site against both on
every change. The [options reference](https://vaam-apps.github.io/vitepress-md3/guide/configuration)
covers the rest.

## This repository

| Path          | What                                                             |
| ------------- | ---------------------------------------------------------------- |
| `src/node/`   | `@vaam-apps/vitepress-md3/config` — token generation, built      |
| `src/shared/` | Options, shape, motion and type tokens, used by both halves      |
| `src/theme/`  | `@vaam-apps/vitepress-md3` — the client theme, shipped as source |
| `docs/`       | The vaam-apps docs hub, built with the theme                     |
| `test/`       | Unit tests, and the consumer site the smoke test builds          |
| `scripts/`    | Shape-CSS and logo generators, the consumer smoke test           |

```sh
pnpm install
pnpm dev          # build the config entry, then serve the hub with HMR
pnpm lint         # Biome + markdownlint
pnpm typecheck    # vue-tsc
pnpm test         # vitest, including the contrast matrix
pnpm docs:build   # production build of the hub
```

Contributions: see [CONTRIBUTING.md](CONTRIBUTING.md). Pull request titles
must be conventional commits — they drive releases.

## Credits

Forked from Ziwen Yang's
[vitepress-material3](https://github.com/zivenyang/vitepress-material3), a
Vuetify-based Material 3 blog theme, and rebuilt as a docs theme on top of
VitePress's default theme. Built on
[Material Design 3](https://m3.material.io),
[material-color-utilities](https://github.com/material-foundation/material-color-utilities),
[Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex) and
[VitePress](https://vitepress.dev).

MIT licensed.
