<script setup lang="ts">
import { useMd3 } from "../composables/useMd3";

// The wavy divider from Material's own sites — and from this theme's
// ancestor, zivenyang/vitepress-material3. Standard draws it straight.
const { isExpressive } = useMd3();
</script>

<template>
  <hr class="md3-squiggle" :class="{ wavy: isExpressive }">
</template>

<style scoped>
.md3-squiggle {
  border: 0;
  height: 8px;
  margin: 3rem auto;
  max-width: 72rem;
  background:
    linear-gradient(var(--md-sys-color-outline-variant), var(--md-sys-color-outline-variant)) center
    / 100% 1px no-repeat;
}

.md3-squiggle.wavy {
  background: var(--md-sys-color-outline-variant);
  mask:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 0.5 12 4 T24 4' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E")
    0 0 / 24px 8px repeat-x;
}
</style>
