<script setup lang="ts">
import type { DefaultTheme } from "vitepress";
import { VPImage } from "vitepress/theme-without-fonts";
import { useMd3 } from "../composables/useMd3";
import Md3Shape from "./Md3Shape.vue";

defineProps<{ image: DefaultTheme.ThemeableImage }>();

const { isExpressive } = useMd3();
</script>

<template>
  <div class="md3-hero-art">
    <Md3Shape
      class="back"
      :shape="isExpressive ? 'cookie-12' : 'circle'"
      tone="primary"
      size="100%"
      :spin="isExpressive"
    />
    <Md3Shape
      class="accent"
      :shape="isExpressive ? 'clover-4' : 'square'"
      tone="tertiary"
      size="34%"
      :spin="isExpressive"
    />
    <VPImage class="image-src" :image />
  </div>
</template>

<style scoped>
/* VPHero's image box is only square below 60rem; the stage keeps the
   shapes from stretching when it is not. */
.md3-hero-art {
  position: relative;
  height: 100%;
  max-width: 100%;
  aspect-ratio: 1;
  margin: 0 auto;
  display: grid;
  place-items: center;
}

/* A container colour this large would glare — the 2025 spec's dark
   containers are bright — so the backdrop is mixed down toward the surface. */
.back.tone-primary {
  background-color: color-mix(
    in oklch,
    var(--md-sys-color-primary-container) 55%,
    var(--md-sys-color-surface)
  );
}

/* Below 60rem VPHero stacks the image above the heading and pulls the
   heading up into its box with negative margins; a full-size stage would sit
   under the title, so it shrinks to the centre of the box. */
@media (max-width: 59.99rem) {
  .md3-hero-art {
    height: 72%;
    margin-top: 14%;
  }
}

.back {
  position: absolute;
  inset: 0;
}

.accent {
  position: absolute;
  right: -2%;
  bottom: 2%;
}

.md3-hero-art :deep(.image-src) {
  position: relative;
  max-width: 62%;
  max-height: 62%;
}
</style>
