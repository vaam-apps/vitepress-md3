# AGENTS.md

Notes for coding agents working in this repository. Humans: see
[CONTRIBUTING.md](CONTRIBUTING.md), which this does not replace.

- Two halves: `src/node/` (built by tsdown into `dist/config.mjs`, loaded by
  Node from a site's `.vitepress/config.ts`) and `src/theme/` (shipped as
  Vue/TS source, compiled by the consumer's VitePress). `src/shared/` is
  imported by both and must stay dependency-free.
- `@material/material-color-utilities@0.4.0` is broken under plain Node ESM;
  it is patched for this repo (`pnpm-workspace.yaml`) and bundled into
  `dist/` for consumers. Never import it from `src/theme/` or `src/shared/`.
- Never hard-code a colour in theme CSS. Use `--md-sys-*` / `--md-custom-*`
  tokens so light/dark and the style switch keep working.
- `src/theme/styles/shapes.css` is generated: edit `src/theme/shapes.ts` and
  run `pnpm generate`.
- Run `pnpm lint && pnpm typecheck && pnpm test && pnpm docs:build` before
  proposing a change; CI runs the same plus `scripts/smoke-consumer.sh`.
- Typecheck uses TypeScript 6 on purpose: vue-tsc cannot drive TypeScript 7's
  native compiler yet. Do not bump it to 7 until vue-tsc supports it.
- Pull request titles are conventional commits; they drive release-please.
