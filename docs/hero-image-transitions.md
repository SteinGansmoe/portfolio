# Hero image transitions — issue #10

## Approach

`AppLayout` now renders the shared Hero once, using the route's content from
`src/data/heroes.ts`. Home, Projects and About render their existing content below
it. The Hero stays mounted when React Router changes between those three routes,
including browser Back/Forward, so the outgoing image survives the route change.
Text and navigation update normally and have no added animation.

`HeroBackground` keeps one opaque base image and at most one incoming image.
The next photograph is loaded and decoded before a 450ms CSS opacity animation
starts. The original image remains underneath throughout the blend. The existing
mask is applied once to their shared wrapper; object-cover, `50% 42%` positioning,
responsive image width, gradients and Hero geometry are preserved.

If navigation changes during a blend, the current blend finishes continuously.
Only the latest requested, decoded destination is queued for the next blend.
Obsolete loading callbacks and queued destinations are ignored. This can retain
a previously visited photograph for the remaining fraction of a fade rather
than interrupting the visible blend. A failed load/decode keeps the previous
image in place and permits a later retry.

A shared promise cache avoids repeating preparation for the same URL and reuses
the initially rendered image. There are no per-frame React updates, timers or
animation dependencies. Leaving these three routes unmounts the Hero normally.

Reduced-motion users get an immediate swap once the next image is decoded.
Changing the preference during a blend also finishes it immediately. Images have
empty alternative text and their wrapper is hidden from assistive technology.

## Assets

No imagery was replaced or repositioned. Original assets remain intact.
The two PNG photographs were encoded to WebP at quality 90 with unchanged pixel
dimensions. Home retains its existing JPEG because it was smaller than its WebP
conversion.

| Photograph | Original bytes |   Served bytes | Dimensions  |
| ---------- | -------------: | -------------: | ----------- |
| Home       |        591,629 | 591,629 (JPEG) | 1536 × 2048 |
| Projects   |      2,308,641 | 303,178 (WebP) | 1916 × 821  |
| About      |      2,333,341 | 274,072 (WebP) | 1672 × 941  |

The two PNG transfers are reduced by approximately 88% combined. The three served
Hero assets total approximately 1.17MB instead of 5.23MB. There is no eager
download of every Hero image; navigation stays responsive while a destination
image is prepared.

## Modified files

- `src/components/layout/AppLayout.tsx`: persistent Hero and route configuration.
- `src/data/heroes.ts`: existing page-specific Hero text and image URLs.
- `src/components/home/Hero.tsx`: renders `HeroBackground` in place of its image.
- `src/components/home/HeroBackground.tsx`: decoded-image loading and crossfade.
- `src/components/home/heroImageState.ts`: transition/queue state reducer.
- `src/components/home/heroImageLoader.ts`: shared loading/decoding cache.
- `src/index.css`: scoped 450ms opacity animation and reduced-motion override.
- `src/pages/HomePage.tsx`, `ProjectsPage.tsx`, `AboutPage.tsx`: remove their
  individual Hero instances; remaining content is unchanged.
- `public/images/projects-background.webp`, `about-background.webp`: optimized
  encodings of the existing images.
- `scripts/test-hero-images.mjs`: focused tests using Node's built-in test runner
  and the existing TypeScript dependency.

## Verification

Run:

```sh
node --test scripts/test-hero-images.mjs
npm run lint
npm run build
```

- Seven focused tests pass: outgoing-image continuity, latest-target queuing,
  stale-queue rejection, reduced motion, decode-before-readiness, shared cache,
  loading/decode failures and retries.
- Browser checks captured two decoded layers during transitions with incoming
  opacity between 0 and 1 and computed animation duration `0.45s`. Heading and
  Navbar computed animation names remain `none`.
- Normal navigation, rapid Home/Projects/About changes and browser Back/Forward
  settle on the image belonging to the final route. Mobile menu navigation still
  closes the menu and changes pages normally.
- All three pages at 320, 375, 400, 768, 1024 and 1440px retain the prior header,
  Hero, heading and image rectangles, object position and mask. No horizontal
  overflow; one H1 per page. Normal route-specific height differences remain.
- Reduced-motion state handling is tested and its CSS override is present;
  operating-system preference emulation was not performed.
- Lint, focused formatting, TypeScript and Vite production build pass. Package
  dependencies and `package-lock.json` are unchanged.

The existing contrast scrims remain unchanged. Their pure-white image bounds
from the issue #9 review also cover intermediate image blends.
