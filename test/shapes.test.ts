import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SHAPE_NAMES, shapePolygon, shapesCss } from "../src/theme/shapes";

describe("shapes", () => {
  it("shapes.css is up to date — run `pnpm generate` if this fails", () => {
    const committed = readFileSync(
      new URL("../src/theme/styles/shapes.css", import.meta.url),
      "utf8",
    );
    expect(committed).toBe(shapesCss());
  });

  it.each(SHAPE_NAMES)("%s fills its box and stays inside it", (name) => {
    const values = [...shapePolygon(name).matchAll(/(-?[\d.]+)%/g)].map((m) => Number(m[1]));
    expect(Math.min(...values)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...values)).toBeLessThanOrEqual(100);
    // Scaled to its extent, so at least one edge touches the box.
    expect(Math.min(...values) === 0 || Math.max(...values) === 100).toBe(true);
  });
});
