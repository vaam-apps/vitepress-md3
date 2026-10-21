# Adopting it in a project

Every vaam-apps project documents itself in its own repository, so the docs
ship with the code they describe. This page is the checklist for giving a
project a docs site — or moving an existing VitePress site onto the house
theme.

## Moving an existing VitePress site

A site already on VitePress's default theme (for example
[vpay-docs](https://github.com/vaam-apps/vpay-docs)) moves over in three
changes; its `nav`, `sidebar`, `socialLinks`, `editLink`, custom components and
markdown all keep working.

1. Add the dependency:

   ```sh
   pnpm add -D @vaam-apps/vitepress-md3
   ```

2. In `.vitepress/config.ts`, swap `defineConfig` for `defineMd3Config` and add
   `md3` to `themeConfig`:

   ```ts
   import { defineConfig } from "vitepress"; // [!code --]
   import { defineMd3Config } from "@vaam-apps/vitepress-md3/config"; // [!code ++]

   export default defineConfig({ // [!code --]
   export default defineMd3Config({ // [!code ++]
     themeConfig: {
       md3: { seed: "#0f766e" }, // [!code ++]
       nav: [/* unchanged */],
     },
   });
   ```

3. In `.vitepress/theme/index.ts`, extend this theme instead of the default
   one:

   ```ts
   import DefaultTheme from "vitepress/theme"; // [!code --]
   import Md3Theme from "@vaam-apps/vitepress-md3"; // [!code ++]

   export default {
     extends: DefaultTheme, // [!code --]
     extends: Md3Theme, // [!code ++]
   };
   ```

Then delete brand overrides such as `--vp-c-brand-1` from your custom CSS: the
seed colour generates them, and hand-set values would fight the light/dark
schemes.

::: warning Custom colours in your own CSS
Any colour you hard-code will not follow the scheme. Use the tokens instead —
`var(--md-sys-color-primary)`, `var(--md-sys-color-surface-container)`,
`var(--md-custom-color-success-container)` — and your components follow light,
dark, and the reader's style choice for free.
:::

## A new project's docs

1. Create the site in the project's repository (a `docs/` folder is the
   convention) with the two files from [Getting started](./getting-started).
2. Choose a seed: the project's own brand colour, or the vaam teal
   `#0f766e` if it has none.
3. Deploy it with GitHub Pages. This repository's
   [`pages.yml`](https://github.com/vaam-apps/vitepress-md3/blob/main/.github/workflows/pages.yml)
   is a working example that passes the right `base` path in.
4. List it on the hub: add an entry to
   [`docs/.vitepress/projects.ts`](https://github.com/vaam-apps/vitepress-md3/blob/main/docs/.vitepress/projects.ts),
   with the repository's own GitHub description.

## Checklist

- [ ] `defineMd3Config` in the config, `md3.seed` set
- [ ] Theme entry extends `@vaam-apps/vitepress-md3`
- [ ] No hard-coded brand colours left in custom CSS
- [ ] `ignoreDeadLinks: false`, so a broken link fails the build
- [ ] Pages deploy on `main`, build on every pull request
- [ ] Listed on the [projects page](/projects/)
