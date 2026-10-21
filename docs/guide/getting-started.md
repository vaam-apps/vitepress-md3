# Getting started

## Requirements

- Node.js 22.12 or newer
- VitePress 2 (`2.0.0-alpha` or later) or VitePress 1.6

## Install

::: code-group

```sh [pnpm]
pnpm add -D @vaam-apps/vitepress-md3 vitepress vue
```

```sh [npm]
npm install -D @vaam-apps/vitepress-md3 vitepress vue
```

```sh [bun]
bun add -d @vaam-apps/vitepress-md3 vitepress vue
```

:::

::: tip Releases
Every merge to `main` with a `feat` or `fix` title lands in a release pull
request; merging that publishes a new version to npm, with provenance. See the
[changelog](https://github.com/vaam-apps/vitepress-md3/blob/main/CHANGELOG.md).
:::

## Wire it up

Two files, both a few lines long.

**1. Wrap your config** with `defineMd3Config` instead of VitePress's
`defineConfig`. It accepts exactly the same object, plus `themeConfig.md3`:

```ts [.vitepress/config.ts]
import { defineMd3Config } from "@vaam-apps/vitepress-md3/config";

export default defineMd3Config({
  title: "vpay",
  description: "Payments for Central Africa",
  themeConfig: {
    md3: {
      style: "expressive", // or "standard"
      seed: "#0f766e", // your brand colour
    },
    // …everything the default theme takes: nav, sidebar, search, …
  },
});
```

**2. Use the theme** from your theme entry:

```ts [.vitepress/theme/index.ts]
export { default } from "@vaam-apps/vitepress-md3";
```

That is the whole setup. Run `vitepress dev` and the site renders in Material 3.

## Extending the theme

To add your own components or styles, extend it the way you would extend the
default theme:

```ts [.vitepress/theme/index.ts]
import type { Theme } from "vitepress";
import Md3Theme from "@vaam-apps/vitepress-md3";
import MyBanner from "./MyBanner.vue";
import "./custom.css";

export default {
  extends: Md3Theme,
  enhanceApp({ app }) {
    app.component("MyBanner", MyBanner);
  },
} satisfies Theme;
```

Every [layout slot](https://vitepress.dev/guide/extending-default-theme#layout-slots)
of the default theme is still available. Where this theme fills a slot itself
(the hero image, the nav bar's end), your content renders alongside it.

## Next steps

- Pick a [style](./styles) and a [seed colour](./color).
- Browse every option in the [reference](./configuration).
- Moving an existing vaam-apps site over? See [Adopting it](./adopting).
