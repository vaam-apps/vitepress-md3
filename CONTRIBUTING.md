# Contributing

Thanks for improving the vaam-apps docs theme and hub. This repository follows
the org-wide process in [vaam-apps/.github](https://github.com/vaam-apps/.github):
issue and pull request templates, the
[AI working agreement](https://adorsys-gis.github.io/ai-governance/12-ai-working-agreement),
and release-please for versions.

## Setup

Node 26 (see `.nvmrc`; 22.12+ works) and pnpm, at the version pinned in
`package.json`'s `packageManager` (Corepack picks it up).

```sh
pnpm install
pnpm dev
```

`pnpm dev` builds `dist/config.mjs` first, because the docs site loads the
config entry the way a consumer would. After changing anything in `src/node/`
or `src/shared/`, restart it.

## Before you push

```sh
pnpm lint && pnpm typecheck && pnpm test && pnpm docs:build
```

That is what CI runs, plus `scripts/smoke-consumer.sh`, which installs the
packed tarball into a fresh site and builds it against VitePress 1.6 and 2.

## Changing things

- **Colour, shape, motion or type tokens**: `src/shared/` and `src/node/`.
  Tokens are generated, so add a test in `test/tokens.test.ts` for anything a
  reader would notice — the contrast matrix there is the guarantee the docs
  make.
- **Expressive shapes**: edit `src/theme/shapes.ts`, then `pnpm generate` to
  rewrite `src/theme/styles/shapes.css`. A test fails if you forget.
- **Restyling a default-theme component**: `src/theme/styles/components.css`.
  Prefix selectors with `#app` so they outrank the default theme's scoped
  styles; use tokens, never literal colours.
- **Something only Expressive does**: `src/theme/styles/expressive.css`, under
  `:root[data-md3-style="expressive"]`.
- **The hub's project list**: `docs/.vitepress/projects.ts`. Use each
  repository's own GitHub description.

Check both styles in both modes before opening a PR — the switch in the hub's
top bar flips style; the sun/moon flips mode.

## Pull requests

The title must be a conventional commit (`feat:`, `fix:`, `docs:`, `deps:`,
…). It becomes the squash commit on `main`, and release-please reads it to
decide the next version. `pr-title.yml` checks it.
