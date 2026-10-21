---
layout: home

hero:
  name: vaam-apps
  text: Documentation, all in one place
  tagline: Payments, messaging, interfaces and the libraries underneath them — and the Material 3 theme every one of their docs sites wears.
  image:
    src: /logo.svg
    alt: vaam-apps
  actions:
    - theme: brand
      text: Browse projects
      link: /projects/
    - theme: alt
      text: Use the theme
      link: /guide/getting-started

features:
  - icon: 🗂️
    title: One home for every project
    details: Each project keeps its docs in its own repository, released with its own code. This hub is where you find them.
    link: /projects/
    linkText: All projects
  - icon: 🎨
    title: Expressive or standard
    details: One switch flips colour scheme, corner scale, spring motion and type weight between Material 3 Expressive and classic M3.
    link: /guide/styles
    linkText: Compare the two
  - icon: 🌱
    title: Generated from one colour
    details: Light and dark schemes, containers and harmonised status colours all come from a single seed, with Material's own colour science.
    link: /guide/color
    linkText: How colour works
  - icon: ♿
    title: Readable by construction
    details: Every text role is tested against WCAG AA in both modes, for both styles, across a spread of seed colours, on every change.
    link: /guide/color#contrast
    linkText: What is checked
---

<script setup>
import { featured } from "./.vitepress/projects";
</script>

<div class="home-projects">

## Start with a project

<ProjectGrid :projects="featured" />

[Every project →](/projects/)

</div>

<style scoped>
.home-projects {
  padding-bottom: 6rem;
}

.home-projects h2 {
  margin-top: 0;
}
</style>
