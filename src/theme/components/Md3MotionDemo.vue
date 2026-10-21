<script setup lang="ts">
import { ref } from "vue";
import { SPRINGS, type SpringName, springToCss } from "../../shared/motion";
import type { Md3Style } from "../../shared/options";
import Md3Shape from "./Md3Shape.vue";

// Both styles' springs side by side, computed from the same source the token
// sheet is — so the demo cannot drift from what the site actually uses.
const STYLES: Md3Style[] = ["expressive", "standard"];
const SPRINGS_SHOWN: SpringName[] = ["spatial-fast", "spatial-default", "spatial-slow"];

const rows = STYLES.flatMap((style) =>
  SPRINGS_SHOWN.map((name) => {
    const { easing, duration } = springToCss(SPRINGS[style][name]);
    return {
      key: `${style}-${name}`,
      style,
      name,
      transition: `transform ${duration}ms ${easing}`,
      duration,
    };
  }),
);

const moved = ref(false);
</script>

<template>
  <div class="md3-motion-demo">
    <button type="button" class="play" @click="moved = !moved">
      {{ moved ? "Back" : "Play" }}
    </button>
    <div v-for="row in rows" :key="row.key" class="row">
      <span class="label">
        <strong>{{ row.style }}</strong> {{ row.name }}
        <small>{{ row.duration }} ms</small>
      </span>
      <span class="track">
        <span class="mover" :class="{ moved }" :style="{ '--md3-demo-transition': row.transition }">
          <Md3Shape
            :shape="row.style === 'expressive' ? 'cookie-6' : 'circle'"
            :tone="row.style === 'expressive' ? 'tertiary' : 'primary'"
            size="1.75rem"
          />
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.md3-motion-demo {
  display: grid;
  gap: 0.5rem;
  margin: 1.5rem 0;
  padding: 1.25rem;
  border-radius: var(--md-sys-shape-card);
  background-color: var(--md-sys-color-surface-container-low);
}

.play {
  justify-self: start;
  margin-bottom: 0.5rem;
  padding: 0 1.5rem;
  line-height: 2.5rem;
  border-radius: var(--md-sys-shape-button);
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  font-weight: var(--md-sys-typescale-label-weight);
  transition: border-radius var(--md3-spatial-fast);
}

.play:active {
  border-radius: var(--md-sys-shape-button-pressed);
}

.row {
  display: grid;
  grid-template-columns: 12rem 1fr;
  align-items: center;
  gap: 1rem;
}

.label {
  font-size: 0.8125rem;
  color: var(--md-sys-color-on-surface-variant);
}

.label strong {
  color: var(--md-sys-color-on-surface);
}

.label small {
  display: block;
  opacity: 0.8;
}

.track {
  position: relative;
  height: 2.25rem;
  border-radius: var(--md-sys-shape-corner-full);
  background-color: var(--md-sys-color-surface-container-high);
}

.mover {
  transition: var(--md3-demo-transition);
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
}

.track {
  container-type: inline-size;
}

.mover.moved {
  transform: translateX(calc(100cqw - 2.25rem));
}

@media (max-width: 40rem) {
  .row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mover {
    transition: none;
  }
}
</style>
