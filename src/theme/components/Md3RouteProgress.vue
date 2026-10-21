<script setup lang="ts">
import { useRoute, useRouter } from "vitepress";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useMd3 } from "../composables/useMd3";

/**
 * An M3 linear progress indicator pinned to the top of the viewport while
 * VitePress fetches the next page. Expressive draws the wavy indicator,
 * standard the flat one. Fast navigations never show it at all.
 */

const SHOW_AFTER_MS = 120;
const GIVE_UP_AFTER_MS = 10_000;

const router = useRouter();
const route = useRoute();
const { isExpressive } = useMd3();
const visible = ref(false);

let showTimer: ReturnType<typeof setTimeout> | undefined;
let giveUpTimer: ReturnType<typeof setTimeout> | undefined;

function stop() {
  clearTimeout(showTimer);
  clearTimeout(giveUpTimer);
  visible.value = false;
}

function start() {
  stop();
  showTimer = setTimeout(() => (visible.value = true), SHOW_AFTER_MS);
  giveUpTimer = setTimeout(stop, GIVE_UP_AFTER_MS);
}

const pathOf = (href: string) => new URL(href, location.href).pathname;

let previous: typeof router.onBeforeRouteChange;

onMounted(() => {
  previous = router.onBeforeRouteChange;
  router.onBeforeRouteChange = async (to) => {
    const result = await previous?.(to);
    // A hash link on the same page is not a navigation worth signalling.
    if (result !== false && pathOf(to) !== location.pathname) start();
    return result;
  };
});

onUnmounted(() => {
  router.onBeforeRouteChange = previous;
  stop();
});

watch(() => route.path, stop);
</script>

<template>
  <div
    class="md3-route-progress"
    :class="{ visible, wavy: isExpressive }"
    role="progressbar"
    aria-label="Loading page"
    :aria-hidden="!visible"
  >
    <span class="track" />
    <span class="bar" />
  </div>
</template>

<style scoped>
.md3-route-progress {
  position: fixed;
  inset: 0 0 auto;
  z-index: calc(var(--vp-z-index-nav) + 10);
  height: 4px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--md3-effects);
  color: var(--md-sys-color-primary);
}

.visible {
  opacity: 1;
}

.track {
  position: absolute;
  inset: 0;
  background-color: var(--md-sys-color-secondary-container);
}

.bar {
  position: absolute;
  inset: 0 auto 0 0;
  width: 40%;
  border-radius: var(--md-sys-shape-corner-full);
  background-color: currentColor;
  animation: md3-progress 1.6s var(--md-sys-motion-easing-emphasized) infinite;
}

/* Wavy: the bar is a moving sine instead of a flat stroke. */
.wavy {
  height: 8px;
}

.wavy .track {
  inset: 3px 0;
  border-radius: var(--md-sys-shape-corner-full);
}

.wavy .bar {
  background-color: currentColor;
  mask:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 8'%3E%3Cpath d='M0 4 Q10 0 20 4 T40 4' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E")
    0 0 / 40px 8px repeat-x;
  animation:
    md3-progress 1.6s var(--md-sys-motion-easing-emphasized) infinite,
    md3-wave 0.8s linear infinite;
}

@keyframes md3-progress {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(250%);
  }
}

@keyframes md3-wave {
  to {
    mask-position: 40px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar,
  .wavy .bar {
    width: 100%;
    animation: none;
    opacity: 0.6;
  }
}
</style>
