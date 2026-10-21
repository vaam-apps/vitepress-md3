import type { Md3Style } from "./options";

/** The M3 corner scale. Identical in both styles; Expressive adds the "increased" steps. */
export const CORNERS = {
  none: "0px",
  "extra-small": "4px",
  small: "8px",
  medium: "12px",
  large: "16px",
  "large-increased": "20px",
  "extra-large": "28px",
  "extra-large-increased": "32px",
  "extra-extra-large": "48px",
  full: "9999px",
} as const;

type Corner = keyof typeof CORNERS;

/**
 * Which corner each surface of a docs site takes. This is where the two
 * styles really differ: Expressive is rounder everywhere, and its buttons
 * morph to a squarer corner while pressed.
 */
const SURFACES: Record<Md3Style, Record<string, Corner>> = {
  standard: {
    button: "full",
    "button-pressed": "full",
    card: "medium",
    container: "medium",
    code: "medium",
    dialog: "extra-large",
    chip: "small",
    field: "full",
    "nav-item": "full",
    image: "medium",
    hero: "extra-large",
  },
  expressive: {
    button: "full",
    "button-pressed": "medium",
    card: "extra-large",
    container: "large-increased",
    code: "large",
    dialog: "extra-large-increased",
    chip: "medium",
    field: "full",
    "nav-item": "full",
    image: "large",
    hero: "extra-extra-large",
  },
};

export function shapeTokens(style: Md3Style): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(CORNERS)) out[`shape-corner-${name}`] = value;
  for (const [surface, corner] of Object.entries(SURFACES[style])) {
    out[`shape-${surface}`] = `var(--md-sys-shape-corner-${corner})`;
  }
  return out;
}

/**
 * Type. Both styles use Roboto Flex; Expressive leans on its variable axes —
 * heavier weights ("emphasized" type) and a wider, tighter display face.
 */
export function typeTokens(style: Md3Style): Record<string, string> {
  const expressive = style === "expressive";
  return {
    "typescale-brand-font":
      '"Roboto Flex Variable", "Roboto Flex", Roboto, ui-sans-serif, system-ui, sans-serif',
    "typescale-plain-font":
      '"Roboto Flex Variable", "Roboto Flex", Roboto, ui-sans-serif, system-ui, sans-serif',
    "typescale-mono-font":
      '"Roboto Mono Variable", "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    "typescale-display-weight": expressive ? "720" : "400",
    "typescale-display-width": expressive ? "118" : "100",
    "typescale-display-tracking": expressive ? "-0.035em" : "-0.02em",
    "typescale-headline-weight": expressive ? "640" : "500",
    "typescale-title-weight": expressive ? "600" : "500",
    "typescale-label-weight": expressive ? "600" : "500",
    "typescale-body-weight": "400",
  };
}
