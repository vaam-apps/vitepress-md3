// Writes docs/public/logo.svg: a "v" on a 9-sided cookie, teal into amber.
// Run once by hand when the mark changes; the output is committed.
import { writeFileSync } from "node:fs";
import { SHAPES } from "../src/theme/shapes.ts";

const SIZE = 96;
const radius = SHAPES["cookie-9"];
const samples = 180;
const points = Array.from({ length: samples }, (_, i) => {
  const theta = (i / samples) * 2 * Math.PI - Math.PI / 2;
  const r = radius(theta);
  return [r * Math.cos(theta), r * Math.sin(theta)] as const;
});
const extent = Math.max(...points.flatMap(([x, y]) => [Math.abs(x), Math.abs(y)]));
const scale = (SIZE / 2 - 2) / extent;
const d = `M${points
  .map(([x, y]) => `${(SIZE / 2 + x * scale).toFixed(2)} ${(SIZE / 2 + y * scale).toFixed(2)}`)
  .join("L")}Z`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="vaam-apps">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f766e"/>
      <stop offset="1" stop-color="#14b8a6"/>
    </linearGradient>
  </defs>
  <path d="${d}" fill="url(#g)"/>
  <path d="M29 32 L46 66 L63 32" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="68" cy="64" r="9" fill="#f59e0b" stroke="#fff" stroke-width="4"/>
</svg>
`;
writeFileSync(new URL("../docs/public/logo.svg", import.meta.url), svg);
