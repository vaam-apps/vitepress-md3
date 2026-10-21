/**
 * The public option surface of the theme, as written under
 * `themeConfig.md3` in a site's `.vitepress/config.ts`.
 *
 * Every option is optional. The defaults are the vaam-apps house style:
 * Material 3 Expressive, seeded from the vaam teal.
 */

/** The two Material 3 flavours this theme ships. */
export type Md3Style = "expressive" | "standard";

/**
 * Material's dynamic-colour scheme variants. `standard` defaults to
 * `tonal-spot` (the M3 baseline), `expressive` to `expressive`.
 */
export type Md3SchemeVariant =
  | "tonal-spot"
  | "expressive"
  | "vibrant"
  | "content"
  | "fidelity"
  | "neutral"
  | "monochrome"
  | "rainbow"
  | "fruit-salad";

/** Material colour spec revision. `2025` is the M3 Expressive spec. */
export type Md3SpecVersion = "2021" | "2025";

export interface Md3Options {
  /**
   * `expressive` (default) — M3 Expressive: the 2025 colour spec, a wider and
   * rounder shape scale, bouncier spatial springs, emphasized type and the
   * decorative expressive shapes.
   *
   * `standard` — classic Material 3: tonal-spot colour, the baseline shape
   * scale, near-critically-damped springs, regular type weights.
   */
  style?: Md3Style;

  /** The source colour every palette is generated from. Any CSS hex colour. */
  seed?: string;

  /** Override the scheme variant the style would otherwise pick. */
  scheme?: Md3SchemeVariant;

  /** Override the colour spec revision the style would otherwise pick. */
  specVersion?: Md3SpecVersion;

  /**
   * Contrast level, from -1 (reduced) through 0 (default) to 1 (high).
   * `0.5` is Material's "medium contrast".
   */
  contrast?: number;

  /**
   * Pin individual key palettes to a colour of your own instead of deriving
   * them from `seed` — for a brand that already has, say, a fixed accent.
   */
  palettes?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    neutral?: string;
    neutralVariant?: string;
    error?: string;
  };

  /**
   * Extra named colours, each turned into a four-role M3 custom colour
   * (`--md-custom-color-<name>`, `on-<name>`, `<name>-container`,
   * `on-<name>-container`). `success`, `warning` and `info` are always
   * present — they drive the tip / warning / info containers — and can be
   * overridden here.
   */
  customColors?: { [name: string]: string | undefined };

  /**
   * Shift custom colours' hue toward the seed so they sit in the same family
   * (Material's "harmonize"). Default `true`.
   */
  harmonize?: boolean;

  /**
   * Ship both styles and add a toggle to the nav bar so readers can flip
   * between Expressive and standard. Their choice is remembered per browser.
   * Default `false`: a site looks the way its author configured it.
   */
  styleSwitcher?: boolean;
}

/** `Md3Options` with every default filled in, as the client theme sees it. */
export interface ResolvedMd3Options {
  style: Md3Style;
  seed: string;
  scheme: Md3SchemeVariant;
  specVersion: Md3SpecVersion;
  contrast: number;
  palettes: NonNullable<Md3Options["palettes"]>;
  customColors: Record<string, string>;
  harmonize: boolean;
  styleSwitcher: boolean;
}

/** The vaam teal. */
export const DEFAULT_SEED = "#0f766e";

export const DEFAULT_CUSTOM_COLORS: Readonly<Record<string, string>> = {
  success: "#1e8e3e",
  warning: "#f9ab00",
  info: "#1a73e8",
};

const STYLE_DEFAULTS: Record<Md3Style, { scheme: Md3SchemeVariant; specVersion: Md3SpecVersion }> =
  {
    expressive: { scheme: "expressive", specVersion: "2025" },
    standard: { scheme: "tonal-spot", specVersion: "2021" },
  };

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

function assertHex(name: string, value: string): void {
  if (!HEX.test(value)) {
    throw new TypeError(`[vitepress-md3] ${name} must be a #rgb or #rrggbb colour, got "${value}"`);
  }
}

/** Fill in defaults for one style, validating as it goes. */
export function resolveOptions(options: Md3Options = {}, style?: Md3Style): ResolvedMd3Options {
  const resolvedStyle = style ?? options.style ?? "expressive";
  if (resolvedStyle !== "expressive" && resolvedStyle !== "standard") {
    throw new TypeError(
      `[vitepress-md3] style must be "expressive" or "standard", got "${String(resolvedStyle)}"`,
    );
  }

  const seed = options.seed ?? DEFAULT_SEED;
  assertHex("seed", seed);

  const contrast = options.contrast ?? 0;
  if (!Number.isFinite(contrast) || contrast < -1 || contrast > 1) {
    throw new RangeError(`[vitepress-md3] contrast must be between -1 and 1, got ${contrast}`);
  }

  const palettes = { ...options.palettes };
  for (const [name, value] of Object.entries(palettes)) {
    if (value !== undefined) assertHex(`palettes.${name}`, value);
  }

  const customColors: Record<string, string> = { ...DEFAULT_CUSTOM_COLORS };
  for (const [name, value] of Object.entries(options.customColors ?? {})) {
    if (value !== undefined) customColors[name] = value;
  }
  for (const [name, value] of Object.entries(customColors)) {
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      throw new TypeError(
        `[vitepress-md3] customColors keys must be kebab-case (they become CSS names), got "${name}"`,
      );
    }
    assertHex(`customColors.${name}`, value);
  }

  // A scheme/spec override applies to the style it was written for. When the
  // switcher renders the *other* style, that style keeps its own defaults —
  // otherwise "standard" would silently render with the expressive scheme.
  const own = style === undefined || style === (options.style ?? "expressive");

  return {
    style: resolvedStyle,
    seed,
    scheme: (own ? options.scheme : undefined) ?? STYLE_DEFAULTS[resolvedStyle].scheme,
    specVersion:
      (own ? options.specVersion : undefined) ?? STYLE_DEFAULTS[resolvedStyle].specVersion,
    contrast,
    palettes,
    customColors,
    harmonize: options.harmonize ?? true,
    styleSwitcher: options.styleSwitcher ?? false,
  };
}
