# Shape

## The corner scale

Material 3 rounds corners on a fixed scale. Both styles share it; M3
Expressive adds the "increased" steps.

| Token                                         | Size |
| --------------------------------------------- | ---- |
| `--md-sys-shape-corner-none`                  | 0    |
| `--md-sys-shape-corner-extra-small`           | 4px  |
| `--md-sys-shape-corner-small`                 | 8px  |
| `--md-sys-shape-corner-medium`                | 12px |
| `--md-sys-shape-corner-large`                 | 16px |
| `--md-sys-shape-corner-large-increased`       | 20px |
| `--md-sys-shape-corner-extra-large`           | 28px |
| `--md-sys-shape-corner-extra-large-increased` | 32px |
| `--md-sys-shape-corner-extra-extra-large`     | 48px |
| `--md-sys-shape-corner-full`                  | pill |

## Surfaces

Where the two styles differ is *which* step each surface takes. Use these
tokens in your own components and they follow the style automatically.

| Token                           | Standard    | Expressive            |
| ------------------------------- | ----------- | --------------------- |
| `--md-sys-shape-button`         | full        | full                  |
| `--md-sys-shape-button-pressed` | full        | medium                |
| `--md-sys-shape-card`           | medium      | extra-large           |
| `--md-sys-shape-container`      | medium      | large-increased       |
| `--md-sys-shape-code`           | medium      | large                 |
| `--md-sys-shape-dialog`         | extra-large | extra-large-increased |
| `--md-sys-shape-chip`           | small       | medium                |
| `--md-sys-shape-field`          | full        | full                  |
| `--md-sys-shape-nav-item`       | full        | full                  |
| `--md-sys-shape-image`          | medium      | large                 |
| `--md-sys-shape-hero`           | extra-large | extra-extra-large     |

Press the buttons on the [home page](/) in each style: Expressive buttons
squash from a pill to a rounded rectangle and spring back.

## Expressive shapes

M3 Expressive brings a library of playful shapes for avatars, icon containers
and decoration. The theme generates them as CSS `clip-path` polygons, one
custom property each — `--md3-shape-<name>` — so any element can wear one:

```css
.avatar {
  clip-path: var(--md3-shape-cookie-9);
}
```

Or use the `<Md3Shape>` component, which also handles colour and spinning:

```md
<Md3Shape shape="clover-4" tone="tertiary" size="4rem" spin />
```

<Md3ShapeGallery />
