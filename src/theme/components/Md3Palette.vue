<script setup lang="ts">
// The live colour scheme, read back from the token sheet — so what this
// shows is exactly what the site renders, in the current mode and style.

interface Swatch {
  role: string;
  on?: string;
}

const GROUPS: Array<{ title: string; swatches: Swatch[] }> = [
  {
    title: "Accent",
    swatches: [
      { role: "primary", on: "on-primary" },
      { role: "primary-container", on: "on-primary-container" },
      { role: "secondary", on: "on-secondary" },
      { role: "secondary-container", on: "on-secondary-container" },
      { role: "tertiary", on: "on-tertiary" },
      { role: "tertiary-container", on: "on-tertiary-container" },
      { role: "error", on: "on-error" },
      { role: "error-container", on: "on-error-container" },
    ],
  },
  {
    title: "Surface",
    swatches: [
      { role: "surface-container-lowest", on: "on-surface" },
      { role: "surface-container-low", on: "on-surface" },
      { role: "surface", on: "on-surface" },
      { role: "surface-container", on: "on-surface" },
      { role: "surface-container-high", on: "on-surface" },
      { role: "surface-container-highest", on: "on-surface" },
      { role: "inverse-surface", on: "inverse-on-surface" },
      { role: "outline", on: "surface" },
    ],
  },
];

const CUSTOM = ["success", "warning", "info"];
</script>

<template>
  <div class="md3-palette">
    <section v-for="group in GROUPS" :key="group.title">
      <h4 class="group">{{ group.title }}</h4>
      <div class="grid">
        <div
          v-for="{ role, on } in group.swatches"
          :key="role"
          class="swatch"
          :style="{ background: `var(--md-sys-color-${role})`, color: on && `var(--md-sys-color-${on})` }"
        >
          <span class="name">{{ role }}</span>
          <code class="token">--md-sys-color-{{ role }}</code>
        </div>
      </div>
    </section>
    <section>
      <h4 class="group">Custom colours</h4>
      <div class="grid">
        <template v-for="name in CUSTOM" :key="name">
          <div
            class="swatch"
            :style="{ background: `var(--md-custom-color-${name})`, color: `var(--md-custom-color-on-${name})` }"
          >
            <span class="name">{{ name }}</span>
            <code class="token">--md-custom-color-{{ name }}</code>
          </div>
          <div
            class="swatch"
            :style="{
              background: `var(--md-custom-color-${name}-container)`,
              color: `var(--md-custom-color-on-${name}-container)`,
            }"
          >
            <span class="name">{{ name }}-container</span>
            <code class="token">--md-custom-color-{{ name }}-container</code>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.md3-palette {
  margin: 1.5rem 0;
}

.group {
  margin: 1.5rem 0 0.75rem;
  font-size: 0.875rem;
  color: var(--md-sys-color-on-surface-variant);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 11rem), 1fr));
  gap: 0.5rem;
}

.swatch {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 5.5rem;
  padding: 0.75rem 1rem;
  border-radius: var(--md-sys-shape-container);
  box-shadow: inset 0 0 0 1px
    color-mix(in srgb, var(--md-sys-color-outline-variant) 60%, transparent);
}

.name {
  font-weight: var(--md-sys-typescale-label-weight);
  font-size: 0.875rem;
}

.swatch .token {
  font-size: 0.6875rem;
  opacity: 0.8;
  color: inherit;
  background: none;
  padding: 0;
  word-break: break-all;
}
</style>
