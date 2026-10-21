<script setup lang="ts">
import { useMd3 } from "../composables/useMd3";
import Md3Shape from "./Md3Shape.vue";

const { style, isExpressive, setStyle } = useMd3();

function toggle() {
  setStyle(isExpressive.value ? "standard" : "expressive");
}
</script>

<template>
  <button
    type="button"
    class="md3-style-switch"
    :title="`Material 3 ${style} — click for ${isExpressive ? 'standard' : 'expressive'}`"
    :aria-label="`Switch to Material 3 ${isExpressive ? 'standard' : 'Expressive'}`"
    @click="toggle"
  >
    <Md3Shape :shape="isExpressive ? 'cookie-7' : 'circle'" size="1.25rem" tone="tertiary" />
    <span class="label">{{ isExpressive ? "Expressive" : "Standard" }}</span>
  </button>
</template>

<style scoped>
.md3-style-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;
  height: 2.25rem;
  padding: 0 0.875rem 0 0.5rem;
  border-radius: var(--md-sys-shape-corner-full);
  font-size: 0.8125rem;
  font-weight: var(--md-sys-typescale-label-weight);
  color: var(--md-sys-color-on-surface-variant);
  border: 1px solid var(--md-sys-color-outline-variant);
  transition:
    background-color var(--md3-effects),
    border-radius var(--md3-spatial-fast);
}

.md3-style-switch:hover {
  background-color: color-mix(
    in srgb,
    var(--md-sys-color-on-surface) var(--md3-state-hover),
    transparent
  );
}

.md3-style-switch:active {
  border-radius: var(--md-sys-shape-button-pressed);
}

@media (max-width: 47.99rem) {
  .label {
    display: none;
  }

  .md3-style-switch {
    padding: 0 0.5rem;
  }
}
</style>
