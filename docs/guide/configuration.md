# Options reference

All options live under `themeConfig.md3` and are optional. The defaults are the
vaam-apps house style.

```ts
defineMd3Config({
  themeConfig: {
    md3: {
      style: "expressive",
      seed: "#0f766e",
      scheme: undefined, // follows the style
      specVersion: undefined, // follows the style
      contrast: 0,
      palettes: {},
      customColors: {},
      harmonize: true,
      styleSwitcher: false,
    },
  },
});
```

Invalid values fail the build with a message naming the option — a typo in a
colour never silently renders the wrong site.

## `style`

- Type: `"expressive" | "standard"`
- Default: `"expressive"`

Which Material 3 to render. This is the one option most sites need to think
about; [Expressive vs standard](./styles) compares the two side by side.

## `seed`

- Type: `string` — `#rgb` or `#rrggbb`
- Default: `"#0f766e"` (the vaam teal)

The source colour every palette is generated from. Pick your brand colour; the
scheme takes care of making it readable in both modes. See [Colour](./color).

## `scheme`

- Type: `"tonal-spot" | "expressive" | "vibrant" | "content" | "fidelity" | "neutral" | "monochrome" | "rainbow" | "fruit-salad"`
- Default: `"expressive"` for the Expressive style, `"tonal-spot"` for standard

Material's dynamic-colour variant — how the palettes are derived from the seed.
`fidelity` and `content` keep the primary closest to the seed itself;
`vibrant` turns chroma up; `neutral` and `monochrome` turn it down.

## `specVersion`

- Type: `"2021" | "2025"`
- Default: `"2025"` for Expressive, `"2021"` for standard

The revision of Material's colour spec. `2025` is the M3 Expressive spec:
brighter containers and more tinted surfaces.

## `contrast`

- Type: `number`, from `-1` to `1`
- Default: `0`

Material's contrast level: `0` is standard, `0.5` medium, `1` high. Raising it
darkens text roles and lightens containers until every pair separates further —
useful for a site read in harsh light, or as an accessibility default.

## `palettes`

- Type: `{ primary?, secondary?, tertiary?, neutral?, neutralVariant?, error? }`, each a hex colour
- Default: `{}` — every palette derives from `seed`

Pin individual key palettes to a colour of your own, for a brand that already
has, say, a fixed accent:

```ts
md3: { seed: "#0f766e", palettes: { tertiary: "#f59e0b" } }
```

The scheme still chooses the tones, so contrast is preserved.

## `customColors`

- Type: `Record<string, string>` — kebab-case name → hex colour
- Default: `{ success: "#1e8e3e", warning: "#f9ab00", info: "#1a73e8" }`

Extra named colours. Each becomes Material's four custom-colour roles:

| Token                                   | Use                   |
| --------------------------------------- | --------------------- |
| `--md-custom-color-<name>`              | Icons, strong accents |
| `--md-custom-color-on-<name>`           | Text on the above     |
| `--md-custom-color-<name>-container`    | Backgrounds           |
| `--md-custom-color-on-<name>-container` | Text on the container |

`success`, `warning` and `info` always exist — the `::: tip`, `::: warning`
and `::: info` containers use them — and can be overridden here.

## `harmonize`

- Type: `boolean`
- Default: `true`

Shift each custom colour's hue a little toward the seed, so status colours
look like they belong to the same family. Turn it off when a colour carries
meaning that must not drift, such as a regulated brand colour.

## `styleSwitcher`

- Type: `boolean`
- Default: `false`

Ship both styles and add a toggle to the nav bar, so readers can flip between
Expressive and standard. Their choice is remembered per browser. The hub turns
it on because it is the theme's showroom — try it in the top bar. Most project
sites should leave it off and look the way their authors chose.

## Everything else

Every other key in `themeConfig` is VitePress's own
[default theme config](https://vitepress.dev/reference/default-theme-config)
and behaves exactly as documented there.

## Using the tokens from code

`@vaam-apps/vitepress-md3/config` also exports the generators, for scripts that
need the same colours outside the site — an Open Graph image, a slide deck:

```ts
import { colorTokens, resolveOptions } from "@vaam-apps/vitepress-md3/config";

const { light, dark } = colorTokens(resolveOptions({ seed: "#0f766e" }));
light.primary; // "#006b63"
```
