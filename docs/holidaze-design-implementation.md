# Holidaze: From Design to Implementation — issue #18

## Content and assets

The approved Markdown section was already present in the owner's local
`src/features/projects/data.ts` at the start of this task. It remains unchanged.
The project data received only optional comparison metadata, not replacement text.

The original Figma link was verified in the
[Holidaze repository README](https://github.com/SteinGansmoe/holidaze-retreats/blob/main/README.md#-figma-design).
The exact URL from that README is used in the portfolio. The external design
document itself was not inspected or exported; no Figma account access was used.

**Missing asset:** an original Holidaze Figma design export matching the application
homepage screenshot. No identifiable original design export exists in the portfolio
assets. A targeted filename check in Desktop/Downloads also found no Holidaze/Figma
design export. Arbitrarily named personal images were not assumed to be this asset.

Existing local Holidaze assets are application screenshots:

- `public/projects/holidaze/hero.png` — homepage, reused here at its original
  1589×908 dimensions/aspect ratio.
- `public/projects/holidaze/venue-details.png`
- `public/projects/holidaze/booking-confirm.png`

None is relabeled as an original Figma design. No image was generated, downloaded,
modified or added. The Figma icon is not a substitute for a design screenshot.

## Implementation

- `src/features/projects/ProjectDesignComparison.tsx`: shared presentation for
  the verified Figma link and captioned project images. Uses existing tokens,
  buttons and focus styles, meaningful alt text, lazy loading and `w-full h-auto`
  to preserve image proportions. External link includes a new-tab accessible name
  and `noopener noreferrer`.
- `src/features/projects/types.ts`: typed `ProjectDesignComparisonData` with
  required Figma URL/application image and optional original-design image.
- `src/features/projects/data.ts`: attaches those verified values to Holidaze only.
- `src/features/projects/ProjectCaseStudy.tsx`: accepts optional children beneath
  the approved Markdown, retaining the existing content width and layout.
- `src/pages/ProjectDetailPage.tsx`: renders the comparison when project metadata
  provides it. Existing LaneStomp architecture and gallery remain intact.
- `src/features/projects/LaneStompArchitecture.tsx`: Prettier-only removal of one
  pre-existing blank whitespace line; no architecture content or design change.

While `designImage` is absent, the page shows its real application screenshot and
Figma link, with no empty comparison column, broken image or public placeholder.
When a verified export is supplied, add `designImage: { src, alt }` to Holidaze's
`designComparison`. Use the real file path and a description of the actual screen.
The existing component then displays original design and implementation in two
columns at 768px and above, stacked below that width. Use matching views for a
meaningful comparison; do not supply an unrelated frame just to fill the slot.

## Verification

- `npm run lint`: PASS.
- `npm run format:check`: PASS.
- `npm run build` (TypeScript + Vite): PASS.
- `git diff --check`: PASS; line-ending notices are harmless.
- Semantic comparison of before/after project data, excluding only the newly
  added comparison metadata: PASS. All approved text, previous fields, project
  URLs and technology lists are unchanged.
- Real production-preview browser checks of the available one-image state at
  320, 375, 400, 768, 1024 and 1440px: one section heading, no horizontal overflow,
  successfully loaded application image with preserved proportions, correct Figma
  destination/new-tab attributes and visible keyboard focus.
- Desktop/mobile screenshots visually reviewed. No new dependencies or global
  design changes introduced.

**Pending:** supply the matching original Figma export, then visually verify the
actual two-image desktop/mobile comparison. That branch cannot be visually signed
off using the real design while its image is missing. Full WAVE/screen-reader and
real-device reviews remain manual checks.

No commits, pushes, merges or deployments performed.
