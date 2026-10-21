import { motionTokens } from "../shared/motion";
import {
  type Md3Options,
  type Md3Style,
  type ResolvedMd3Options,
  resolveOptions,
} from "../shared/options";
import { shapeTokens, typeTokens } from "../shared/shape-type";
import { type ColorRoles, colorTokens } from "./color";

/** localStorage key holding a reader's style choice when the switcher is on. */
export const STYLE_STORAGE_KEY = "vitepress-md3-style";

function colorDecls(roles: ColorRoles): string[] {
  return Object.entries(roles).map(([name, value]) =>
    name.startsWith("custom-")
      ? `--md-custom-color-${name.slice("custom-".length)}:${value}`
      : `--md-sys-color-${name}:${value}`,
  );
}

function styleDecls(resolved: ResolvedMd3Options, palettes: ColorRoles): string[] {
  const sys = {
    ...shapeTokens(resolved.style),
    ...motionTokens(resolved.style),
    ...typeTokens(resolved.style),
  };
  return [
    ...Object.entries(sys).map(([name, value]) => `--md-sys-${name}:${value}`),
    ...Object.entries(palettes).map(([name, value]) => `--md-ref-palette-${name}:${value}`),
  ];
}

const block = (selector: string, decls: string[]) => `${selector}{${decls.join(";")}}`;

/**
 * The design tokens as one stylesheet, inlined into every page's <head> so
 * the first paint already has the right colours (no flash of default theme).
 *
 * The configured style owns plain `:root` / `:root.dark`. With the switcher
 * on, the other style is emitted under `[data-md3-style]` selectors that are
 * strictly more specific, so it only wins when a reader picked it.
 */
export function tokensCss(options: Md3Options = {}): string {
  const primary = resolveOptions(options);
  const tokens = colorTokens(primary);
  const css = [
    block(":root", [...styleDecls(primary, tokens.palettes), ...colorDecls(tokens.light)]),
    block(":root.dark", colorDecls(tokens.dark)),
  ];

  if (primary.styleSwitcher) {
    const other: Md3Style = primary.style === "expressive" ? "standard" : "expressive";
    const resolved = resolveOptions(options, other);
    const otherTokens = colorTokens(resolved);
    const attr = `[data-md3-style="${other}"]`;
    css.push(
      block(`:root${attr}`, styleDecls(resolved, otherTokens.palettes)),
      block(`:root:not(.dark)${attr}`, colorDecls(otherTokens.light)),
      block(`:root.dark${attr}`, colorDecls(otherTokens.dark)),
    );
  }
  return css.join("\n");
}

/**
 * Sets `data-md3-style` on <html> before first paint. Without the switcher it
 * is a constant; with it, it honours a reader's remembered choice.
 */
export function styleScript(resolved: ResolvedMd3Options): string {
  const fallback = JSON.stringify(resolved.style);
  if (!resolved.styleSwitcher) {
    return `document.documentElement.dataset.md3Style=${fallback}`;
  }
  const key = JSON.stringify(STYLE_STORAGE_KEY);
  return `(()=>{let s;try{s=localStorage.getItem(${key})}catch{}document.documentElement.dataset.md3Style=s==="expressive"||s==="standard"?s:${fallback}})()`;
}
