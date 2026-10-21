// The client half of @vaam-apps/vitepress-md3: VitePress's default theme,
// restyled as Material 3. Pair it with `defineMd3Config` from
// "@vaam-apps/vitepress-md3/config", which generates the design tokens.
import "@fontsource-variable/roboto-flex/wdth.css";
import "@fontsource-variable/roboto-mono";
import "./styles/index.css";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import Md3MotionDemo from "./components/Md3MotionDemo.vue";
import Md3Palette from "./components/Md3Palette.vue";
import Md3Shape from "./components/Md3Shape.vue";
import Md3ShapeGallery from "./components/Md3ShapeGallery.vue";
import Md3Squiggle from "./components/Md3Squiggle.vue";
import ProjectCard from "./components/ProjectCard.vue";
import ProjectGrid from "./components/ProjectGrid.vue";
import Layout from "./Layout.vue";

export type { Md3ShapeTone } from "./components/Md3Shape.vue";
export type { Project } from "./components/ProjectCard.vue";
export { STYLE_STORAGE_KEY, useMd3 } from "./composables/useMd3";
export { SHAPE_NAMES, type ShapeName, shapePolygon } from "./shapes";
export {
  Layout,
  Md3MotionDemo,
  Md3Palette,
  Md3Shape,
  Md3ShapeGallery,
  Md3Squiggle,
  ProjectCard,
  ProjectGrid,
};

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Usable straight from Markdown, no import needed.
    app.component("Md3Shape", Md3Shape);
    app.component("Md3Squiggle", Md3Squiggle);
    app.component("Md3Palette", Md3Palette);
    app.component("Md3ShapeGallery", Md3ShapeGallery);
    app.component("Md3MotionDemo", Md3MotionDemo);
    app.component("ProjectCard", ProjectCard);
    app.component("ProjectGrid", ProjectGrid);
  },
};

export default theme;
