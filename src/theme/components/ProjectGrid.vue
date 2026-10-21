<script setup lang="ts">
import type { ShapeName } from "../shapes";
import type { Md3ShapeTone } from "./Md3Shape.vue";
import ProjectCard, { type Project } from "./ProjectCard.vue";

defineProps<{ projects: Project[] }>();

// When a card does not pick its own, cycle shapes and tones so a grid of
// projects reads as a family rather than a column of identical blobs.
const SHAPES: ShapeName[] = ["cookie-9", "clover-4", "sunny", "cookie-6", "soft-burst", "flower"];
const TONES: Md3ShapeTone[] = ["primary", "tertiary", "secondary"];
</script>

<template>
  <div class="project-grid">
    <ProjectCard
      v-for="(project, index) in projects"
      :key="project.title"
      v-bind="project"
      :shape="project.shape ?? SHAPES[index % SHAPES.length]"
      :tone="project.tone ?? TONES[index % TONES.length]"
    />
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
</style>
