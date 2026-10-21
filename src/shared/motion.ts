import type { Md3Style } from "./options";

/**
 * Material 3 motion is physics-based: every transition is a spring, described
 * by a damping ratio and a stiffness (androidx `MotionScheme`). CSS has no
 * springs, but `linear()` can trace any curve, so each spring is sampled into
 * a `linear()` easing plus the duration it takes to settle.
 *
 * "Spatial" springs move things (position, size, shape) and may overshoot;
 * "effects" springs fade and recolour and never do.
 */
export interface Spring {
  damping: number;
  stiffness: number;
}

export type SpringName =
  | "spatial-fast"
  | "spatial-default"
  | "spatial-slow"
  | "effects-fast"
  | "effects-default"
  | "effects-slow";

const EFFECTS: Record<"effects-fast" | "effects-default" | "effects-slow", Spring> = {
  "effects-fast": { damping: 1, stiffness: 3800 },
  "effects-default": { damping: 1, stiffness: 1600 },
  "effects-slow": { damping: 1, stiffness: 800 },
};

export const SPRINGS: Record<Md3Style, Record<SpringName, Spring>> = {
  expressive: {
    "spatial-fast": { damping: 0.6, stiffness: 800 },
    "spatial-default": { damping: 0.8, stiffness: 380 },
    "spatial-slow": { damping: 0.8, stiffness: 200 },
    ...EFFECTS,
  },
  standard: {
    "spatial-fast": { damping: 0.9, stiffness: 1400 },
    "spatial-default": { damping: 0.9, stiffness: 700 },
    "spatial-slow": { damping: 0.9, stiffness: 300 },
    ...EFFECTS,
  },
};

/** Position of a unit-mass spring released from 0 toward 1, at time t (s). */
export function stepResponse(t: number, { damping, stiffness }: Spring): number {
  const omega = Math.sqrt(stiffness);
  if (damping < 1) {
    const damped = omega * Math.sqrt(1 - damping * damping);
    return (
      1 -
      Math.exp(-damping * omega * t) *
        (Math.cos(damped * t) + ((damping * omega) / damped) * Math.sin(damped * t))
    );
  }
  return 1 - Math.exp(-omega * t) * (1 + omega * t);
}

const TOLERANCE = 0.001;
const STEP = 0.001;

/** Seconds until the spring stays within 0.1% of its target. */
export function settleSeconds(spring: Spring): number {
  let lastOutside = 0;
  for (let t = 0; t <= 5; t += STEP) {
    if (Math.abs(stepResponse(t, spring) - 1) >= TOLERANCE) lastOutside = t;
  }
  return lastOutside + STEP;
}

/** The spring as a CSS `linear()` easing and a duration in milliseconds. */
export function springToCss(spring: Spring, samples = 48): { easing: string; duration: number } {
  const settle = settleSeconds(spring);
  const stops: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const value = i === samples ? 1 : stepResponse((i * settle) / samples, spring);
    stops.push(String(Number(value.toFixed(4))));
  }
  return { easing: `linear(${stops.join(", ")})`, duration: Math.round(settle * 1000) };
}

/** `--md-sys-motion-*` custom properties for one style. */
export function motionTokens(style: Md3Style): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, spring] of Object.entries(SPRINGS[style])) {
    const { easing, duration } = springToCss(spring);
    out[`motion-spring-${name}`] = easing;
    out[`motion-spring-${name}-duration`] = `${duration}ms`;
  }
  // The classic cubic-bezier tokens, for things a spring cannot drive (e.g.
  // `animation` keyframes that loop).
  out["motion-easing-emphasized"] = "cubic-bezier(0.2, 0, 0, 1)";
  out["motion-easing-emphasized-decelerate"] = "cubic-bezier(0.05, 0.7, 0.1, 1)";
  out["motion-easing-emphasized-accelerate"] = "cubic-bezier(0.3, 0, 0.8, 0.15)";
  out["motion-easing-standard"] = "cubic-bezier(0.2, 0, 0, 1)";
  return out;
}
