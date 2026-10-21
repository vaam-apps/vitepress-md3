# Components

The theme registers these globally, so Markdown can use them without an
import. From Vue code, import them by name from `@vaam-apps/vitepress-md3`.

## `<ProjectGrid>` and `<ProjectCard>`

The cards on the [projects page](/projects/). A grid takes a list; a card takes
one project's fields as props.

<ProjectGrid :projects="[
  { title: 'Example', description: 'A project card, linking to its docs.', link: '/guide/', repo: 'vaam-apps/vitepress-md3', tags: ['Vue', 'Docs'], status: 'beta' },
  { title: 'Another', monogram: 'an', description: 'Shapes and tones cycle when a card does not choose its own.', tags: ['Example'] },
]" />

```vue
<script setup>
import { projects } from "./projects"; // your list
</script>

<ProjectGrid :projects="projects" />
```

| Prop          | Type                                                             |                                                    |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| `title`       | `string`                                                         | Required                                           |
| `description` | `string`                                                         | One or two sentences                               |
| `link`        | `string`                                                         | The project's docs; site-relative or absolute      |
| `repo`        | `string`                                                         | `owner/name`; adds a GitHub button                 |
| `tags`        | `string[]`                                                       | Shown as chips                                     |
| `status`      | `string`                                                         | A tertiary label, e.g. `beta`                      |
| `monogram`    | `string`                                                         | Avatar text; defaults to the title's initial       |
| `shape`       | `ShapeName`                                                      | Avatar shape in Expressive; standard uses a circle |
| `tone`        | `"primary" \| "secondary" \| "tertiary" \| "error" \| "surface"` | Avatar colour                                      |

## `<Md3Shape>`

Any [Expressive shape](./shape#expressive-shapes), filled with a container
colour, optionally spinning. Content in the default slot stays upright.

<Md3Shape shape="cookie-12" size="5rem" tone="primary" spin>✦</Md3Shape>
<Md3Shape shape="clover-4" size="5rem" tone="tertiary">42</Md3Shape>
<Md3Shape shape="pentagon" size="5rem" tone="secondary" />

```md
<Md3Shape shape="cookie-12" size="5rem" tone="primary" spin>✦</Md3Shape>
<Md3Shape shape="clover-4" size="5rem" tone="tertiary">42</Md3Shape>
<Md3Shape shape="pentagon" size="5rem" tone="secondary" />
```

| Prop    | Default      |                                                     |
| ------- | ------------ | --------------------------------------------------- |
| `shape` | `"cookie-9"` | One of the [shape names](./shape#expressive-shapes) |
| `size`  | `"3rem"`     | Any CSS length                                      |
| `tone`  | `"primary"`  | Which container colour fills it                     |
| `spin`  | `false`      | Rotate slowly; stops under reduced motion           |

## `<Md3Squiggle>`

The divider under the home page's features: wavy in Expressive, a hairline in
standard.

<Md3Squiggle />

## `<Md3Palette>`, `<Md3ShapeGallery>`, `<Md3MotionDemo>`

The live demos on the [Colour](./color), [Shape](./shape) and
[Motion](./motion) pages. Drop them into your own site's docs about its theme.

## `useMd3()`

The active style and the resolved options, reactively:

```ts
import { useMd3 } from "@vaam-apps/vitepress-md3";

const { style, isExpressive, options, setStyle } = useMd3();
```

`setStyle("standard")` switches the page and remembers the choice — it is what
the nav-bar toggle calls.
