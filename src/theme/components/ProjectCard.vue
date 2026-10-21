<script setup lang="ts">
import { withBase } from "vitepress";
import { computed } from "vue";
import { useMd3 } from "../composables/useMd3";
import type { ShapeName } from "../shapes";
import Md3Shape, { type Md3ShapeTone } from "./Md3Shape.vue";

export interface Project {
  /** Display name. */
  title: string;
  /** One or two sentences. */
  description?: string;
  /** Where the card goes: the project's docs. Site-relative or absolute. */
  link?: string;
  /** `owner/name` on GitHub; adds a source link. */
  repo?: string;
  /** Short labels shown as chips, e.g. `["Rust", "API"]`. */
  tags?: string[];
  /** Status label, e.g. `stable`, `beta`. */
  status?: string;
  /** Up to two characters in the avatar. Defaults to the title's initial. */
  monogram?: string;
  /** The avatar's Expressive shape. Standard always uses a circle. */
  shape?: ShapeName;
  tone?: Md3ShapeTone;
}

const props = defineProps<Project>();
const { isExpressive } = useMd3();

const isExternal = computed(() => !!props.link && /^[a-z]+:/i.test(props.link));
const href = computed(() =>
  props.link === undefined ? undefined : isExternal.value ? props.link : withBase(props.link),
);
</script>

<template>
  <article class="project-card">
    <component
      :is="href ? 'a' : 'div'"
      class="main"
      :href
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noreferrer' : undefined"
    >
      <Md3Shape
        class="avatar"
        :shape="isExpressive ? (shape ?? 'cookie-9') : 'circle'"
        :tone="tone ?? 'primary'"
        size="3.5rem"
      >
        <span class="monogram">{{ monogram ?? title.charAt(0) }}</span>
      </Md3Shape>
      <div class="heading">
        <h3 class="title">{{ title }}</h3>
        <span v-if="status" class="status">{{ status }}</span>
      </div>
      <p v-if="description" class="description">{{ description }}</p>
    </component>
    <footer v-if="tags?.length || repo" class="footer">
      <ul v-if="tags?.length" class="tags">
        <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
      <a
        v-if="repo"
        class="repo"
        :href="`https://github.com/${repo}`"
        target="_blank"
        rel="noreferrer"
        :title="`${repo} on GitHub`"
      >
        <span class="vpi-social-github" aria-hidden="true" />
        <span class="visually-hidden">{{ title }} on GitHub</span>
      </a>
    </footer>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--md-sys-shape-card);
  background-color: var(--md-sys-color-surface-container-low);
  transition:
    background-color var(--md3-effects),
    box-shadow var(--md3-effects),
    transform var(--md3-spatial);
}

.project-card:has(.main:is(a):hover) {
  background-color: var(--md-sys-color-surface-container-high);
  box-shadow: var(--vp-shadow-1);
}

:root[data-md3-style="expressive"] .project-card:has(.main:is(a):hover) {
  transform: translateY(-4px);
}

.main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  padding: 1.5rem 1.5rem 0.75rem;
  color: inherit;
  text-decoration: none;
  border-radius: inherit;
}

.avatar {
  transition: transform var(--md3-spatial);
}

:root[data-md3-style="expressive"] .main:is(a):hover .avatar {
  transform: rotate(40deg) scale(1.06);
}

:root[data-md3-style="expressive"] .main:is(a):hover .monogram {
  display: inline-block;
  transform: rotate(-40deg);
}

.monogram {
  font-family: var(--md-sys-typescale-brand-font);
  font-weight: var(--md-sys-typescale-display-weight);
  font-size: 1.375rem;
  text-transform: uppercase;
  transition: transform var(--md3-spatial);
}

.heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  font-family: var(--md-sys-typescale-brand-font);
  font-size: 1.25rem;
  font-weight: var(--md-sys-typescale-headline-weight);
  line-height: 1.3;
  color: var(--md-sys-color-on-surface);
}

.status {
  padding: 0 0.5rem;
  border-radius: var(--md-sys-shape-chip);
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  font-size: 0.75rem;
  font-weight: var(--md-sys-typescale-label-weight);
  line-height: 1.5rem;
}

.description {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--md-sys-color-on-surface-variant);
}

.footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 1rem 1.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  flex: 1;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag {
  margin: 0;
  padding: 0 0.625rem;
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-sys-shape-chip);
  font-size: 0.75rem;
  font-weight: var(--md-sys-typescale-label-weight);
  line-height: 1.625rem;
  color: var(--md-sys-color-on-surface-variant);
}

.repo {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: auto;
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface-variant);
  transition:
    background-color var(--md3-effects),
    border-radius var(--md3-spatial-fast);
}

.repo:hover {
  background-color: color-mix(
    in srgb,
    var(--md-sys-color-on-surface) var(--md3-state-hover),
    transparent
  );
}

.repo:active {
  border-radius: var(--md-sys-shape-button-pressed);
}

.repo > .vpi-social-github {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
