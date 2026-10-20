# Hero and Navbar accessibility review — issue #9

## Changes

- Navbar: translucent dark gradient with a 78% minimum opacity, fading out for
  another 48px below the header. This preserves the transparent image integration,
  normal document flow, responsive negative hero margins and existing dimensions.
- Navigation links: medium font weight and an opaque white active underline.
  Existing hover colors and white keyboard focus rings remain.
- Hero: strengthened the middle horizontal scrim stop from 64% to 80% and
  lightened description text to `#d5dbe1`. Images, object positioning, mask,
  vertical gradient, sizing, text alignment and CTA geometry are unchanged.
- Home-only decorative text: 11px medium text in `#e2e8f0`, with an 80% dark
  backing. No shadow or glow. It remains absent from Projects and About.
- Navbar and Hero color transitions respect `prefers-reduced-motion`.

## Contrast method

Checked Home, Projects and About at viewport widths 320, 375, 400, 768, 1024 and
1440px (900px high). Recorded browser `getComputedStyle` foreground/background
colors and gradients, rendered text-line bounds using DOM Ranges, hero/image
rectangles, native image dimensions and the `50% 42%` object position.

For each text region, sampled the corresponding local image at CSS-pixel
intervals, mapping `object-fit: cover` back to source coordinates. Composited the
computed horizontal scrim (or Navbar scrim), then the element's own background,
in sRGB: `result = foreground * alpha + background * (1 - alpha)`.

These image-based results are deliberately conservative: Navbar measurements
ignore the additional Hero overlays; Hero measurements ignore the vertical
gradient and image mask; decorative-text measurements use its backing alone.
Those omitted layers darken the background. Also repeated each calculation with
a pure-white image at every sampled point, which bounds the brightest possible
image channels and image-resampling variations. No screenshot anti-aliasing
colors were treated as the text's foreground color.

Converted channels to linear sRGB using the WCAG transfer function and used
`L = 0.2126 R + 0.7152 G + 0.0722 B`. Contrast is
`(lighter L + 0.05) / (darker L + 0.05)`. Compared unrounded results against
4.5:1 for normal text, 3:1 for large headings and 3:1 for applicable UI indicators.
Ratios below are rounded only for presentation.

| Page     | Content                 | Image-based minimum | Pure-white minimum |
| -------- | ----------------------- | ------------------: | -----------------: |
| Home     | Navbar                  |              7.65:1 |             7.38:1 |
| Home     | Normal Hero text / CTAs |              6.76:1 |             5.34:1 |
| Home     | Large heading           |             10.11:1 |             8.76:1 |
| Home     | Decorative text         |              9.57:1 |             8.51:1 |
| Projects | Navbar                  |              7.66:1 |             7.38:1 |
| Projects | Normal Hero text        |              6.79:1 |             6.47:1 |
| Projects | Large heading           |             11.77:1 |            10.73:1 |
| About    | Navbar                  |              7.97:1 |             7.38:1 |
| About    | Normal Hero text        |              9.54:1 |             6.39:1 |
| About    | Large heading           |             12.85:1 |             9.89:1 |

Examples of the image-based minima, before rounding the composed background:

- Navbar: `rgb(194,199,204)` against `rgb(44.32,49.62,54.53)` → 7.65:1.
- Normal Hero text: `rgb(185,190,195)` against `rgb(47.14,51.32,56.30)` → 6.76:1.
- Decorative text: `rgb(226,232,240)` against `rgb(53,56.2,57)` → 9.57:1.

Even using the weakest Navbar scrim stop (78%) over pure white, muted links
achieve 5.72:1 against the resulting `rgb(64.68,68.58,71.70)` background. The
actual text positions fall under stronger parts of the gradient.

## Interaction and layout checks

- All 18 page/width combinations retain their original header/hero heights,
  image rectangles, object position, mask and heading rectangles. No horizontal
  overflow. Header remains relative, not sticky.
- Mobile menu: Enter opens; Escape closes and restores visible focus to its
  44×44px toggle. The panel's computed background is `rgb(11,16,20)`; muted
  links achieve 11.23:1 there.
- Existing mobile links are at least 33×32px, separated by 12px; contact CTA is
  113×36px. These exceed AA's 24×24px target minimum. They are not uniformly
  44px enhanced targets; their dimensions were preserved to retain the layout.
- White 2px focus rings against the 4px `#0b1014` offset achieve 19.12:1.
  Active underline and hamburger/CTA arrow colors also exceed the applicable
  3:1 requirement. Borders are supplementary; text/icons identify the controls.
- Existing Hero CTAs retain 44px height. No navigation/scroll handlers changed.
- Lint, focused Prettier checks, TypeScript (`tsc -b`) and Vite build pass.

This is a scoped contrast, keyboard and layout review of Navbar/Hero, not a
certification of the entire site against every WCAG 2.2 success criterion.
Operating-system reduced-motion emulation and a full assistive-technology audit
were not performed; reduced-motion transition overrides were checked in source.

References: [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html),
[target sizes](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
