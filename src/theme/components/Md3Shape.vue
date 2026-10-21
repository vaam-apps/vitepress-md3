<script setup lang="ts">
import { computed } from "vue";
import type { ShapeName } from "../shapes";

export type Md3ShapeTone = "primary" | "secondary" | "tertiary" | "error" | "surface";

const props = withDefaults(
  defineProps<{
    /** One of the shapes in `shapes.ts`, e.g. `cookie-9` or `clover-4`. */
    shape?: ShapeName;
    /** Edge length; any CSS length. */
    size?: string;
    /** Which container colour fills it. */
    tone?: Md3ShapeTone;
    /** Rotate slowly. Paused for readers who ask for reduced motion. */
    spin?: boolean;
  }>(),
  { shape: "cookie-9", size: "3rem", tone: "primary", spin: false },
);

const style = computed(() => ({
  "--md3-shape-size": props.size,
  clipPath: `var(--md3-shape-${props.shape})`,
}));
</script>

<template>
  <span class="md3-shape" :class="[`tone-${tone}`, { spin }]" :style>
    <span class="md3-shape__content"><slot /></span>
  </span>
</template>

<style scoped>
.md3-shape {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: var(--md3-shape-size);
  height: var(--md3-shape-size);
  transition:
    clip-path var(--md3-spatial),
    transform var(--md3-spatial);
}

/* Counter-rotate the content so a spinning shape keeps its label upright. */
.spin {
  animation: md3-shape-spin 24s linear infinite;
}

.spin .md3-shape__content {
  animation: md3-shape-spin 24s linear infinite reverse;
}

@keyframes md3-shape-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spin,
  .spin .md3-shape__content {
    animation: none;
  }
}

.tone-primary {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.tone-secondary {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.tone-tertiary {
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.tone-error {
  background-color: var(--md-sys-color-error-container);
  color: var(--md-sys-color-on-error-container);
}

.tone-surface {
  background-color: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface);
}
</style>
