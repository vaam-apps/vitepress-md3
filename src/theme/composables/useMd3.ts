import { useData } from "vitepress";
import { computed, onMounted, ref } from "vue";
import type { Md3Style, ResolvedMd3Options } from "../../shared/options";

/** Mirrors `STYLE_STORAGE_KEY` in src/node/css.ts, which the head script reads. */
export const STYLE_STORAGE_KEY = "vitepress-md3-style";

// One shared ref: the nav switch, the hero art and the demos all follow the
// same style, so they must not each keep their own copy.
const current = ref<Md3Style | null>(null);

/**
 * The active Material 3 style and the resolved theme options.
 *
 * During SSR and the first client render `style` is the configured style; on
 * mount it picks up what the head script stamped on <html>, which differs
 * only when the switcher is on and the reader chose the other style.
 */
export function useMd3() {
  const { theme } = useData<{ md3?: ResolvedMd3Options }>();
  const options = computed(() => theme.value.md3);
  const style = computed<Md3Style>(() => current.value ?? options.value?.style ?? "expressive");

  onMounted(() => {
    const stamped = document.documentElement.dataset.md3Style;
    if (stamped === "expressive" || stamped === "standard") current.value = stamped;
  });

  function setStyle(next: Md3Style) {
    current.value = next;
    document.documentElement.dataset.md3Style = next;
    try {
      localStorage.setItem(STYLE_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked); the choice then
      // simply lasts for this page view.
    }
  }

  return { options, style, isExpressive: computed(() => style.value === "expressive"), setStyle };
}
