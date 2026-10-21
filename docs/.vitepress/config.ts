import { defineMd3Config } from "@vaam-apps/vitepress-md3/config";

// Served from GitHub Pages under the repository path. The Pages workflow
// passes the real base path in, so a custom domain needs no edit here.
const base = process.env.DOCS_BASE ?? "/vitepress-md3/";
const repo = "https://github.com/vaam-apps/vitepress-md3";

export default defineMd3Config({
  base,
  lang: "en",
  title: "vaam-apps docs",
  titleTemplate: ":title · vaam-apps",
  description:
    "Documentation for every vaam-apps project, and the Material 3 theme it is built with.",
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  head: [["link", { rel: "icon", type: "image/svg+xml", href: `${base}logo.svg` }]],

  themeConfig: {
    md3: {
      style: "expressive",
      seed: "#0f766e",
      // The hub is also the theme's showroom, so readers get the toggle.
      styleSwitcher: true,
    },

    logo: "/logo.svg",
    siteTitle: "vaam-apps",

    nav: [
      { text: "Projects", link: "/projects/", activeMatch: "^/projects/" },
      { text: "Theme", link: "/guide/", activeMatch: "^/guide/" },
      {
        text: "More",
        items: [
          { text: "Write docs for a project", link: "/guide/adopting" },
          { text: "Changelog", link: `${repo}/blob/main/CHANGELOG.md` },
          { text: "Org workflows", link: "https://github.com/vaam-apps/.github" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "What is vitepress-md3?", link: "/guide/" },
            { text: "Getting started", link: "/guide/getting-started" },
            { text: "Adopting it in a project", link: "/guide/adopting" },
          ],
        },
        {
          text: "Configuration",
          items: [
            { text: "Options reference", link: "/guide/configuration" },
            { text: "Expressive vs standard", link: "/guide/styles" },
          ],
        },
        {
          text: "Design system",
          items: [
            { text: "Colour", link: "/guide/color" },
            { text: "Shape", link: "/guide/shape" },
            { text: "Motion", link: "/guide/motion" },
            { text: "Typography", link: "/guide/typography" },
          ],
        },
        {
          text: "Writing",
          items: [
            { text: "Components", link: "/guide/components" },
            { text: "Markdown showcase", link: "/guide/markdown" },
          ],
        },
      ],
    },

    outline: { level: [2, 3] },
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/vaam-apps" }],
    editLink: {
      pattern: `${repo}/edit/main/docs/:path`,
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "© 2023-present Ziwen Yang · © 2026-present Vaam Apps",
    },
  },
});
