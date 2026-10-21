// Regenerates src/theme/styles/shapes.css. Run with `pnpm run generate`.
import { writeFileSync } from "node:fs";
import { shapesCss } from "../src/theme/shapes.ts";

const target = new URL("../src/theme/styles/shapes.css", import.meta.url);
writeFileSync(target, shapesCss());
console.log(`wrote ${target.pathname}`);
