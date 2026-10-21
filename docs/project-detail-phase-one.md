# Project detail pages — phase 1 (issue #16)

Implemented on `feature/project-case-studies`, 21 October 2026.

## Changes

- `src/pages/ProjectDetailPage.tsx`: uses the existing Container, typography,
  colors, badges, buttons and ArrowRight. Introduction comes before the gallery
  on mobile; desktop uses balanced columns. Back to projects, repository and live
  links retain their destinations. The gallery is keyed by project ID so changing
  projects starts with its first image.
- `src/features/projects/ProjectImageGallery.tsx`: retains the existing state,
  image filtering and modulo previous/next logic. Images use `object-contain` in
  responsive aspect-ratio frames. Controls sit below the image; thumbnails wrap
  instead of creating a nested horizontal scrollbar. Existing names, focus styles,
  keyboard activation and pressed states remain; a polite image counter announces
  selection changes. Controls use the existing portfolio palette and reduced-motion
  transition overrides.
- `src/features/projects/ProjectCaseStudy.tsx`: shared, scoped rendering for the
  approved Markdown. H2 headings separate content sections; body text, feature
  lists and source links use the portfolio typography and focus treatment.

## Content and extension

Both LaneStomp and Holidaze use this same structure. No project data, URLs, titles,
technology lists or factual Markdown was edited. Overview, documented features,
technology and source/recovery notes remain visible in their original order.

Challenges and solutions, What I learned and Architecture are intentionally absent
until approved content exists. Add approved sections as H2 Markdown headings in the
existing `content` field: the renderer styles them automatically. No second content
store, placeholder text, CMS or project-specific layout was introduced. Packline
Malbok and Portfolio can use the same page once their detail records are approved.

Home, Projects, About, Contact, Navbar, Footer, global Hero behavior and Back-to-Top
implementation were not redesigned. No global styles, dependencies, package versions
or Vercel configuration changed.

## Verification

- `npm run lint`: PASS.
- `npm run format:check`: PASS.
- `npm run build` (TypeScript and Vite): PASS.
- `git diff --check`: PASS; Git may print LF/CRLF conversion notices.
- Real browser against locally built production preview: both detail pages at
  320, 375, 400, 768, 1024 and 1440px (12 cases). One H1 each, existing H2 hierarchy,
  loaded images, `object-contain`, no horizontal overflow or gallery scrollbars.
- Keyboard Next tested in all 12 cases: selection, image counter, pressed states
  and visible focus update correctly. Previous/next wrapping and thumbnail Space
  activation additionally checked on Holidaze.
- Both routes open directly and survive refresh. Back to projects returns to
  `/projects`; browser Back works. Mobile menu Enter/Escape behavior and focus
  return work. Captured browser warning/error log after these tests was empty.
- Desktop and mobile screenshots visually inspected for spacing, button placement,
  full-image scaling and consistency with the existing portfolio.

The checkout initially had 44 otherwise-formatted files with Windows CRLF endings,
which conflicted with Prettier's LF setting. Prettier comparison confirmed every
one differed only in line endings before normalization. Their LF normalization
adds no substantive Git diff; project facts and lockfile JSON remain unchanged.

## Owner review

Review the two pages' appearance, then complete WAVE, a full screen-reader pass,
OS reduced-motion/forced-colors testing and real Safari/Firefox/touch-device checks.
Browser keyboard and DOM checks are not a WCAG certification. No full accessibility
engine scan or actual OS preference change was performed.

No commits, pushes, merges or deployments performed. Local preview:
`npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4174`.
