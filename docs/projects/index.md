---
description: Every public vaam-apps project and where its documentation lives.
---

<script setup>
import { groups } from "../.vitepress/projects";
</script>

# Projects

Every public vaam-apps project, and where its documentation lives. Each
project's docs are written and released alongside its code, in its own
repository; this page is the directory.

<template v-for="group in groups" :key="group.title">
  <h2 :id="group.title.toLowerCase().replaceAll(' ', '-')">{{ group.title }}</h2>
  <p>{{ group.blurb }}</p>
  <ProjectGrid :projects="group.projects" />
</template>

::: tip Missing a project?
Add it to `docs/.vitepress/projects.ts` in
[vaam-apps/vitepress-md3](https://github.com/vaam-apps/vitepress-md3) — use the
repository's own GitHub description, so the two never disagree. If the project
has no docs site yet, [give it one](/guide/adopting).
:::
