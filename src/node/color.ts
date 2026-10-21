import {
  argbFromHex,
  Blend,
  DynamicScheme,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  TonalPalette,
  Variant,
} from "@material/material-color-utilities";
import type { Md3SchemeVariant, ResolvedMd3Options } from "../shared/options";

export type ColorRoles = Record<string, string>;

export interface ColorTokens {
  light: ColorRoles;
  dark: ColorRoles;
  /** Reference tones of the key palettes. Identical in light and dark. */
  palettes: ColorRoles;
}

const VARIANTS: Record<Md3SchemeVariant, Variant> = {
  "tonal-spot": Variant.TONAL_SPOT,
  expressive: Variant.EXPRESSIVE,
  vibrant: Variant.VIBRANT,
  content: Variant.CONTENT,
  fidelity: Variant.FIDELITY,
  neutral: Variant.NEUTRAL,
  monochrome: Variant.MONOCHROME,
  rainbow: Variant.RAINBOW,
  "fruit-salad": Variant.FRUIT_SALAD,
};

/** Tones emitted as `--md-ref-palette-<palette><tone>`, for gradients and art. */
export const REFERENCE_TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100] as const;

const kebab = (name: string) => name.replaceAll("_", "-");

function paletteOverride(hex: string | undefined): TonalPalette | undefined {
  return hex === undefined ? undefined : TonalPalette.fromInt(argbFromHex(hex));
}

function scheme(options: ResolvedMd3Options, isDark: boolean): DynamicScheme {
  const { palettes } = options;
  return new DynamicScheme({
    sourceColorHct: Hct.fromInt(argbFromHex(options.seed)),
    variant: VARIANTS[options.scheme],
    contrastLevel: options.contrast,
    isDark,
    specVersion: options.specVersion,
    primaryPalette: paletteOverride(palettes.primary),
    secondaryPalette: paletteOverride(palettes.secondary),
    tertiaryPalette: paletteOverride(palettes.tertiary),
    neutralPalette: paletteOverride(palettes.neutral),
    neutralVariantPalette: paletteOverride(palettes.neutralVariant),
    errorPalette: paletteOverride(palettes.error),
  });
}

function roles(options: ResolvedMd3Options, isDark: boolean): ColorRoles {
  const s = scheme(options, isDark);
  const out: ColorRoles = {};
  for (const color of new MaterialDynamicColors().allColors) {
    out[kebab(color.name)] = hexFromArgb(color.getArgb(s));
  }
  // Not part of `allColors`, but every M3 component spec references them.
  out.shadow = "#000000";
  out.scrim = "#000000";
  out["surface-tint"] = out.primary ?? hexFromArgb(s.primaryPalette.tone(isDark ? 80 : 40));
  out["surface-variant"] = out["surface-container-highest"] ?? out.surface ?? "#000000";

  for (const [name, hex] of Object.entries(options.customColors)) {
    const argb = options.harmonize
      ? Blend.harmonize(argbFromHex(hex), argbFromHex(options.seed))
      : argbFromHex(hex);
    const palette = TonalPalette.fromInt(argb);
    // Material's custom-colour recipe: the same tone pairs as primary.
    const [base, on, container, onContainer] = isDark ? [80, 20, 30, 90] : [40, 100, 90, 10];
    out[`custom-${name}`] = hexFromArgb(palette.tone(base));
    out[`custom-on-${name}`] = hexFromArgb(palette.tone(on));
    out[`custom-${name}-container`] = hexFromArgb(palette.tone(container));
    out[`custom-on-${name}-container`] = hexFromArgb(palette.tone(onContainer));
  }
  return out;
}

/** Every colour token for one style, light and dark. */
export function colorTokens(options: ResolvedMd3Options): ColorTokens {
  const light = scheme(options, false);
  const palettes: ColorRoles = {};
  const keyPalettes = {
    primary: light.primaryPalette,
    secondary: light.secondaryPalette,
    tertiary: light.tertiaryPalette,
    neutral: light.neutralPalette,
    "neutral-variant": light.neutralVariantPalette,
    error: light.errorPalette,
  };
  for (const [name, palette] of Object.entries(keyPalettes)) {
    for (const tone of REFERENCE_TONES)
      palettes[`${name}${tone}`] = hexFromArgb(palette.tone(tone));
  }
  return { light: roles(options, false), dark: roles(options, true), palettes };
}

/** WCAG 2.x contrast ratio between two hex colours. Used by the tests. */
export function contrastRatio(a: string, b: string): number {
  const luminance = (hex: string) => {
    const argb = argbFromHex(hex);
    const channel = (shift: number) => {
      const c = ((argb >> shift) & 0xff) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
