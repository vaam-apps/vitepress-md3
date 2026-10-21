# Motion

Material 3 motion is physical: things move on **springs**, described by a
damping ratio and a stiffness, rather than on fixed curves. CSS has no
springs, but it does have `linear()`, which can trace any curve — so the theme
samples each spring into a `linear()` easing and the time it takes to settle.

## Play them

The same six springs the site's tokens are generated from. Expressive's
spatial springs overshoot and settle; standard's barely do.

<Md3MotionDemo />

## The springs

Values from Material's motion schemes (`androidx.compose.material3.MotionScheme`).

| Spring          | Expressive                 | Standard                    |
| --------------- | -------------------------- | --------------------------- |
| spatial-fast    | damping 0.6, stiffness 800 | damping 0.9, stiffness 1400 |
| spatial-default | damping 0.8, stiffness 380 | damping 0.9, stiffness 700  |
| spatial-slow    | damping 0.8, stiffness 200 | damping 0.9, stiffness 300  |
| effects-fast    | damping 1, stiffness 3800  | same                        |
| effects-default | damping 1, stiffness 1600  | same                        |
| effects-slow    | damping 1, stiffness 800   | same                        |

**Spatial** springs move things — position, size, shape — and may overshoot.
**Effects** springs change colour and opacity, and never overshoot, because a
colour that overshoots just looks like a glitch.

## Tokens

Each spring is two custom properties:

```css
.thing {
  transition: transform var(--md-sys-motion-spring-spatial-default-duration)
    var(--md-sys-motion-spring-spatial-default);
}
```

The classic easing curves are there too, for looping keyframe animations a
spring cannot drive: `--md-sys-motion-easing-emphasized`,
`--md-sys-motion-easing-emphasized-decelerate`,
`--md-sys-motion-easing-emphasized-accelerate` and
`--md-sys-motion-easing-standard`.

## Reduced motion

When a reader's system asks for reduced motion, the theme's own transitions
collapse to an instant change and decorative spinning stops. If you use the
tokens directly, honour it the same way:

```css
@media (prefers-reduced-motion: reduce) {
  .thing {
    transition: none;
  }
}
```
