<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import { computed, useSlots } from "vue";
import type { ResolvedMd3Options } from "../shared/options";
import Md3HeroArt from "./components/Md3HeroArt.vue";
import Md3RouteProgress from "./components/Md3RouteProgress.vue";
import Md3Squiggle from "./components/Md3Squiggle.vue";
import Md3StyleSwitch from "./components/Md3StyleSwitch.vue";

const { Layout } = DefaultTheme;
const { frontmatter, theme } = useData<{ md3?: ResolvedMd3Options }>();
const slots = useSlots();

// Slots this layout fills itself. A site that extends this theme can still
// pass any of them — its content renders alongside ours, never instead.
const OWN = new Set([
  "layout-top",
  "nav-bar-content-after",
  "nav-screen-content-after",
  "home-hero-image",
  "home-features-after",
]);
const passthrough = computed(() => Object.keys(slots).filter((name) => !OWN.has(name)));

const switcher = computed(() => theme.value.md3?.styleSwitcher === true);
const heroImage = computed(() => frontmatter.value.hero?.image);
</script>

<template>
  <Layout>
    <template v-for="name in passthrough" :key="name" #[name]="props">
      <slot :name v-bind="props ?? {}" />
    </template>

    <template #layout-top>
      <Md3RouteProgress />
      <slot name="layout-top" />
    </template>

    <template #nav-bar-content-after>
      <Md3StyleSwitch v-if="switcher" />
      <slot name="nav-bar-content-after" />
    </template>

    <template #nav-screen-content-after>
      <Md3StyleSwitch v-if="switcher" />
      <slot name="nav-screen-content-after" />
    </template>

    <template v-if="heroImage || slots['home-hero-image']" #home-hero-image>
      <slot name="home-hero-image">
        <Md3HeroArt :image="heroImage" />
      </slot>
    </template>

    <template #home-features-after>
      <Md3Squiggle v-if="frontmatter.features?.length" />
      <slot name="home-features-after" />
    </template>
  </Layout>
</template>
