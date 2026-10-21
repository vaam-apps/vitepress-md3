# Typography

The theme self-hosts two variable fonts, bundled into your site's build — no
request to a font CDN, no layout shift while one loads.

- **[Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex)** for text and
  headings. Its weight and width axes are what give Expressive its emphasized
  type.
- **[Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)** for code.

## The scale

| Token                                 | Standard | Expressive |
| ------------------------------------- | -------- | ---------- |
| `--md-sys-typescale-display-weight`   | 400      | 720        |
| `--md-sys-typescale-display-width`    | 100      | 118        |
| `--md-sys-typescale-display-tracking` | -0.02em  | -0.035em   |
| `--md-sys-typescale-headline-weight`  | 500      | 640        |
| `--md-sys-typescale-title-weight`     | 500      | 600        |
| `--md-sys-typescale-label-weight`     | 500      | 600        |
| `--md-sys-typescale-body-weight`      | 400      | 400        |

Body text never changes between styles: it is what people read for longest,
and it is already tuned for that.

## Families

| Token                           | Value                                    |
| ------------------------------- | ---------------------------------------- |
| `--md-sys-typescale-brand-font` | Roboto Flex, then system UI fonts        |
| `--md-sys-typescale-plain-font` | Roboto Flex, then system UI fonts        |
| `--md-sys-typescale-mono-font`  | Roboto Mono, then system monospace fonts |

To use your own brand face for headings, override the token after the theme's
CSS:

```css
:root:root {
  --md-sys-typescale-brand-font: "Your Brand", var(--md-sys-typescale-plain-font);
}
```

## Specimen

<div class="specimen">
  <p class="display">Display — the quick brown fox</p>
  <p class="headline">Headline — jumps over</p>
  <p class="title">Title — the lazy dog</p>
  <p>Body — Material 3 type is set in Roboto Flex. In Expressive, headings take
  heavier weights and a wider cut; body copy stays at a comfortable 400 so long
  pages remain easy to read. <code>Inline code</code> is Roboto Mono.</p>
</div>

<style scoped>
.specimen {
  padding: 1.5rem;
  border-radius: var(--md-sys-shape-card);
  background-color: var(--md-sys-color-surface-container-low);
}

.specimen p {
  margin: 0 0 0.75rem;
}

.specimen .display {
  font-family: var(--md-sys-typescale-brand-font);
  font-size: 2.75rem;
  line-height: 1.15;
  font-weight: var(--md-sys-typescale-display-weight);
  font-variation-settings: "wdth" var(--md-sys-typescale-display-width);
  letter-spacing: var(--md-sys-typescale-display-tracking);
}

.specimen .headline {
  font-family: var(--md-sys-typescale-brand-font);
  font-size: 1.75rem;
  line-height: 1.3;
  font-weight: var(--md-sys-typescale-headline-weight);
}

.specimen .title {
  font-family: var(--md-sys-typescale-brand-font);
  font-size: 1.25rem;
  font-weight: var(--md-sys-typescale-title-weight);
}
</style>
