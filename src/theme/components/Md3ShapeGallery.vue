<script setup lang="ts">
import { SHAPE_NAMES } from "../shapes";
import type { Md3ShapeTone } from "./Md3Shape.vue";
import Md3Shape from "./Md3Shape.vue";

const TONES: Md3ShapeTone[] = ["primary", "secondary", "tertiary"];
</script>

<template>
  <div class="md3-shape-gallery">
    <figure v-for="(name, index) in SHAPE_NAMES" :key="name" class="item">
      <Md3Shape :shape="name" size="4.5rem" :tone="TONES[index % TONES.length]" />
      <figcaption><code>{{ name }}</code></figcaption>
    </figure>
  </div>
</template>

<style scoped>
.md3-shape-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 1rem 0.5rem;
  border-radius: var(--md-sys-shape-card);
  background-color: var(--md-sys-color-surface-container-low);
}

.item :deep(.md3-shape) {
  transition: transform var(--md3-spatial);
}

.item:hover :deep(.md3-shape) {
  transform: rotate(45deg) scale(1.08);
}

figcaption code {
  font-size: 0.75rem;
}
</style>
