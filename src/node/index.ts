import type { DefaultTheme, HeadConfig, UserConfig } from "vitepress";
import { type Md3Options, type ResolvedMd3Options, resolveOptions } from "../shared/options";
import { colorTokens } from "./color";
import { styleScript, tokensCss } from "./css";

export { motionTokens, SPRINGS, settleSeconds, springToCss, stepResponse } from "../shared/motion";
export type {
  Md3Options,
  Md3SchemeVariant,
  Md3SpecVersion,
  Md3Style,
  ResolvedMd3Options,
} from "../shared/options";
export { DEFAULT_CUSTOM_COLORS, DEFAULT_SEED, resolveOptions } from "../shared/options";
export { CORNERS, shapeTokens, typeTokens } from "../shared/shape-type";
export { colorTokens, contrastRatio, REFERENCE_TONES } from "./color";
export { STYLE_STORAGE_KEY, styleScript, tokensCss } from "./css";

/** The theme's `themeConfig`: everything the default theme takes, plus `md3`. */
export interface Md3ThemeConfig extends DefaultTheme.Config {
  md3?: Md3Options;
}

const PACKAGE = "@vaam-apps/vitepress-md3";

type NoExternal = NonNullable<NonNullable<NonNullable<UserConfig["vite"]>["ssr"]>["noExternal"]>;

function withNoExternal(current: NoExternal | undefined): NoExternal {
  if (current === true) return true;
  if (current === undefined) return [PACKAGE];
  return [...(Array.isArray(current) ? current : [current]), PACKAGE];
}

/**
 * Wrap a VitePress config so it renders with the Material 3 theme.
 *
 * ```ts
 * // .vitepress/config.ts
 * import { defineMd3Config } from "@vaam-apps/vitepress-md3/config";
 *
 * export default defineMd3Config({
 *   title: "vpay",
 *   themeConfig: { md3: { style: "expressive", seed: "#0f766e" } },
 * });
 * ```
 *
 * It generates the colour, shape, motion and type tokens from
 * `themeConfig.md3`, inlines them into every page's <head>, and tells Vite to
 * compile the theme's Vue sources for SSR. Everything else passes through.
 */
export function defineMd3Config(
  config: UserConfig<Md3ThemeConfig> = {},
): UserConfig<Md3ThemeConfig> {
  const themeConfig = config.themeConfig ?? {};
  const resolved: ResolvedMd3Options = resolveOptions(themeConfig.md3);
  const { light, dark } = colorTokens(resolved);

  const head: HeadConfig[] = [
    ["style", { id: "md3-tokens" }, tokensCss(themeConfig.md3)],
    ["script", { id: "md3-style" }, styleScript(resolved)],
    [
      "meta",
      { name: "theme-color", media: "(prefers-color-scheme: light)", content: light.surface ?? "" },
    ],
    [
      "meta",
      { name: "theme-color", media: "(prefers-color-scheme: dark)", content: dark.surface ?? "" },
    ],
    ...(config.head ?? []),
  ];

  const userTransformHtml = config.transformHtml;

  return {
    ...config,
    head,
    // Stamp the style on <html> in the static output too, so the page is
    // styled correctly even before (or without) JavaScript.
    async transformHtml(code, id, ctx) {
      const html = (await userTransformHtml?.(code, id, ctx)) ?? code;
      return html.replace(
        /<html(?![^>]*data-md3-style)/,
        `<html data-md3-style="${resolved.style}"`,
      );
    },
    themeConfig: { ...themeConfig, md3: resolved },
    vite: {
      ...config.vite,
      ssr: { ...config.vite?.ssr, noExternal: withNoExternal(config.vite?.ssr?.noExternal) },
    },
  };
}
