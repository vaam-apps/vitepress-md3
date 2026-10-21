---
outline: deep
---

# Markdown showcase

Everything VitePress's Markdown can do, in Material 3. Use this page to check
a change to the theme against every element at once.

## Text

Paragraphs set in Roboto Flex, with **bold**, _italic_, ~~strikethrough~~,
`inline code`, [an internal link](./index), [an external link](https://m3.material.io)
and a footnote-free keyboard shortcut <kbd>Ctrl</kbd> + <kbd>K</kbd>.

> A blockquote: a tertiary rule and a quiet surface, for when something is
> quoted rather than said.

---

### Lists

- An unordered list
  - with a nested item
- and a second item

1. An ordered list
2. with a second step

- [x] A finished task
- [ ] An open one

## Badges

Labels sit inline with text: <Badge type="info" text="info" />,
a <Badge type="tip" text="tip" />, a <Badge type="warning" text="warning" />
and a <Badge type="danger" text="danger" /> one.

## Containers

::: info
Information worth knowing.
:::

::: tip
A helpful tip, with `code` and [a link](./index).
:::

::: warning
Something to be careful about.
:::

::: danger
Something that will break things.
:::

::: details Click to expand
Hidden until asked for.
:::

> [!NOTE]
> GitHub-style alerts render the same way.

> [!IMPORTANT]
> Important is tertiary.

> [!CAUTION]
> Caution shares the error container with danger.

## Code

```ts{3}
import { defineMd3Config } from "@vaam-apps/vitepress-md3/config";

export default defineMd3Config({ themeConfig: { md3: { style: "expressive" } } });
```

```ts
const seed = "#6750a4"; // [!code --]
const seed = "#0f766e"; // [!code ++]
console.log("error"); // [!code error]
console.log("warning"); // [!code warning]
```

::: code-group

```sh [pnpm]
pnpm add -D @vaam-apps/vitepress-md3
```

```sh [npm]
npm install -D @vaam-apps/vitepress-md3
```

:::

## Tables

| Role (2021 spec)       | Light    | Dark    |
| ---------------------- | -------- | ------- |
| `primary`              | tone 40  | tone 80 |
| `on-primary`           | tone 100 | tone 20 |
| `primary-container`    | tone 90  | tone 30 |
| `on-primary-container` | tone 10  | tone 90 |

## Images

![The vaam-apps mark](/logo.svg){width=96}
