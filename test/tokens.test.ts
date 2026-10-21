import { describe, expect, it } from "vitest";
import {
  colorTokens,
  contrastRatio,
  defineMd3Config,
  resolveOptions,
  SPRINGS,
  settleSeconds,
  springToCss,
  stepResponse,
  styleScript,
  tokensCss,
} from "../src/node";
import type { Md3Style } from "../src/shared/options";

const STYLES: Md3Style[] = ["expressive", "standard"];
// The vaam teal, M3's baseline purple, a near-grey, and a hot orange: one
// seed per corner of the hue/chroma space the tests have to hold across.
const SEEDS = ["#0f766e", "#6750a4", "#5f6368", "#ff5722"];

describe("resolveOptions", () => {
  it("defaults to the vaam house style", () => {
    const resolved = resolveOptions();
    expect(resolved.style).toBe("expressive");
    expect(resolved.seed).toBe("#0f766e");
    expect(resolved.scheme).toBe("expressive");
    expect(resolved.specVersion).toBe("2025");
    expect(Object.keys(resolved.customColors)).toEqual(["success", "warning", "info"]);
  });

  it("gives standard the classic M3 baseline", () => {
    const resolved = resolveOptions({ style: "standard" });
    expect(resolved.scheme).toBe("tonal-spot");
    expect(resolved.specVersion).toBe("2021");
  });

  it("keeps a scheme override on the style it was written for", () => {
    const options = { style: "standard", scheme: "vibrant", styleSwitcher: true } as const;
    expect(resolveOptions(options).scheme).toBe("vibrant");
    expect(resolveOptions(options, "expressive").scheme).toBe("expressive");
  });

  it.each([
    [{ seed: "teal" }, /seed/],
    [{ seed: "#12345" }, /seed/],
    [{ contrast: 2 }, /contrast/],
    [{ palettes: { tertiary: "nope" } }, /palettes\.tertiary/],
    [{ customColors: { Brand: "#ff0000" } }, /kebab-case/],
    [{ style: "loud" as Md3Style }, /style/],
  ])("rejects %j", (options, message) => {
    expect(() => resolveOptions(options)).toThrow(message);
  });
});

describe("colour", () => {
  // Each pair is a foreground role that M3 promises is readable on its
  // background role. 4.5:1 is WCAG AA for body text.
  const PAIRS: Array<[string, string]> = [
    ["on-surface", "surface"],
    ["on-surface-variant", "surface"],
    ["on-surface", "surface-container-highest"],
    ["on-primary", "primary"],
    ["on-primary-container", "primary-container"],
    ["on-secondary-container", "secondary-container"],
    ["on-tertiary-container", "tertiary-container"],
    ["on-error-container", "error-container"],
    ["custom-on-success-container", "custom-success-container"],
    ["custom-on-warning-container", "custom-warning-container"],
    ["custom-on-info-container", "custom-info-container"],
  ];

  for (const style of STYLES) {
    for (const seed of SEEDS) {
      it(`${style} ${seed}: every text role clears WCAG AA in light and dark`, () => {
        const tokens = colorTokens(resolveOptions({ style, seed }));
        for (const mode of ["light", "dark"] as const) {
          for (const [fg, bg] of PAIRS) {
            const ratio = contrastRatio(tokens[mode][fg] ?? "", tokens[mode][bg] ?? "");
            expect(ratio, `${mode} ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
          }
        }
      });
    }
  }

  it("raises contrast when asked", () => {
    const at = (contrast: number) => {
      const { light } = colorTokens(resolveOptions({ contrast }));
      return contrastRatio(light["on-surface-variant"] ?? "", light.surface ?? "");
    };
    expect(at(1)).toBeGreaterThan(at(0));
  });

  it("pins a palette override", () => {
    const tokens = colorTokens(resolveOptions({ palettes: { tertiary: "#f59e0b" } }));
    const hue = (hex: string) =>
      Number.parseInt(hex.slice(1, 3), 16) > Number.parseInt(hex.slice(5, 7), 16);
    // An amber tertiary is red-heavy, never blue-heavy.
    expect(hue(tokens.light.tertiary ?? "")).toBe(true);
  });

  it("emits reference tones for every key palette", () => {
    const { palettes } = colorTokens(resolveOptions());
    expect(palettes.primary0).toBe("#000000");
    expect(palettes.primary100).toBe("#ffffff");
    expect(Object.keys(palettes)).toHaveLength(6 * 14);
  });
});

describe("motion", () => {
  it("expressive spatial springs overshoot, standard ones barely do", () => {
    const peak = (style: Md3Style) => {
      const spring = SPRINGS[style]["spatial-default"];
      const settle = settleSeconds(spring);
      let max = 0;
      for (let i = 0; i <= 1000; i++)
        max = Math.max(max, stepResponse((i * settle) / 1000, spring));
      return max;
    };
    expect(peak("expressive")).toBeGreaterThan(1.01);
    expect(peak("standard")).toBeLessThan(peak("expressive"));
  });

  it("effects springs never overshoot", () => {
    for (const style of STYLES) {
      const { easing } = springToCss(SPRINGS[style]["effects-default"]);
      const stops = easing.slice("linear(".length, -1).split(", ").map(Number);
      expect(Math.max(...stops)).toBeLessThanOrEqual(1);
    }
  });

  it("samples a linear() easing from 0 to exactly 1", () => {
    const { easing, duration } = springToCss(SPRINGS.expressive["spatial-fast"]);
    expect(easing.startsWith("linear(0, ")).toBe(true);
    expect(easing.endsWith(", 1)")).toBe(true);
    expect(duration).toBeGreaterThan(100);
    expect(duration).toBeLessThan(1000);
  });
});

describe("tokensCss", () => {
  it("emits the configured style under plain :root", () => {
    const css = tokensCss({ style: "standard" });
    expect(css).toMatch(/^:root\{/);
    expect(css).toContain(":root.dark{");
    expect(css).toContain("--md-sys-shape-card:var(--md-sys-shape-corner-medium)");
    expect(css).not.toContain("data-md3-style");
  });

  it("emits the other style under more specific selectors when the switcher is on", () => {
    const css = tokensCss({ style: "expressive", styleSwitcher: true });
    expect(css).toContain(':root[data-md3-style="standard"]{');
    expect(css).toContain(':root:not(.dark)[data-md3-style="standard"]{');
    expect(css).toContain(':root.dark[data-md3-style="standard"]{');
  });

  it("names custom colours as M3 custom-colour tokens", () => {
    const css = tokensCss({ customColors: { brand: "#123456" } });
    for (const name of ["brand", "on-brand", "brand-container", "on-brand-container"]) {
      expect(css).toContain(`--md-custom-color-${name}:`);
    }
  });
});

describe("styleScript", () => {
  it("is a constant without the switcher", () => {
    expect(styleScript(resolveOptions({ style: "standard" }))).toBe(
      'document.documentElement.dataset.md3Style="standard"',
    );
  });

  it("reads the remembered choice with it", () => {
    const script = styleScript(resolveOptions({ styleSwitcher: true }));
    expect(script).toContain('localStorage.getItem("vitepress-md3-style")');
    expect(() => new Function(script)).not.toThrow();
  });
});

describe("defineMd3Config", () => {
  it("injects tokens ahead of the site's own head entries", () => {
    const config = defineMd3Config({ head: [["link", { rel: "icon", href: "/logo.svg" }]] });
    const head = config.head ?? [];
    expect(head[0]?.[0]).toBe("style");
    expect(head.at(-1)).toEqual(["link", { rel: "icon", href: "/logo.svg" }]);
  });

  it("hands the client the resolved options", () => {
    const config = defineMd3Config({ themeConfig: { md3: { style: "standard" } } });
    expect(config.themeConfig?.md3).toMatchObject({ style: "standard", scheme: "tonal-spot" });
  });

  it.each([
    [undefined, ["@vaam-apps/vitepress-md3"]],
    ["mermaid", ["mermaid", "@vaam-apps/vitepress-md3"]],
    [
      ["a", "b"],
      ["a", "b", "@vaam-apps/vitepress-md3"],
    ],
    [true, true],
  ] as const)("adds the theme to ssr.noExternal (%j)", (noExternal, expected) => {
    const config = defineMd3Config({
      vite: noExternal === undefined ? {} : { ssr: { noExternal: noExternal as never } },
    });
    expect(config.vite?.ssr?.noExternal).toEqual(expected);
  });

  it("stamps the style on <html> after the site's own transformHtml", async () => {
    const config = defineMd3Config({
      themeConfig: { md3: { style: "standard" } },
      transformHtml: (code) => code.replace("<body>", "<body class=x>"),
    });
    const html = await config.transformHtml?.(
      '<html lang="en"><body></body></html>',
      "",
      {} as never,
    );
    expect(html).toBe('<html data-md3-style="standard" lang="en"><body class=x></body></html>');
  });
});
