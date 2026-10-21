import { defineConfig } from "tsdown";

// Only the Node half of the theme is built: `.vitepress/config.ts` is loaded
// by Node, and Node will not strip types inside node_modules. The client half
// ships as Vue/TS source, which VitePress compiles like any local theme.
export default defineConfig({
  entry: { config: "src/node/index.ts" },
  format: "esm",
  platform: "node",
  target: "node22",
  dts: { tsconfig: "tsconfig.build.json" },
  clean: true,
  // Inlined on purpose: the published 0.4.0 is broken under plain Node ESM
  // (see pnpm-workspace.yaml). Bundling resolves its extension-less imports,
  // so consumers never install or load the broken copy.
  deps: {
    alwaysBundle: ["@material/material-color-utilities"],
    onlyBundle: ["@material/material-color-utilities"],
  },
});
