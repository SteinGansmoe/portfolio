# Final pre-launch cleanup — issue #14

Date: 21 October 2026 (Europe/Oslo). Branch: `refactor/remove-supabase`.
Scope: formatting, dependency review, four image assets and regression verification.
This report follows the historical [issue #13 QA report](final-pre-launch-qa.md).

## 1. Overall status

**NOT READY for unconditional merge: dependency-risk disposition awaits owner review.**

All formatting, lint, TypeScript, build and Hero tests now pass. The optimized
assets work in the production preview without a design change. Both dependency
audits still report eight affected-package entries (five high, three moderate).
These are build-tool advisories; they are not findings of a browser runtime exploit.
No owner risk acceptance has been assumed, so this report does not use
"READY WITH ACCEPTED RISKS". Implementation and review deliverables are complete.

## 2. Formatting

Applied the installed Prettier to only the 15 failing files:

- `.prettierrc`, `eslint.config.js`, `index.html`, `package-lock.json`, `package.json`
- `postcss.config.js`, `src/components/layout/Container.tsx`,
  `src/components/layout/Footer.tsx`, `src/main.tsx`, `src/pages/ProjectDetailPage.tsx`
- `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`, `vercel.json`,
  `vite.config.ts`

Changes are line endings, whitespace, wrapping and Tailwind class sorting by the
configured plugin. No manual restructuring or changes to CSS utilities were made.
Some files have byte changes from CRLF to LF only and therefore no substantive
`git diff` hunk. Final `npm run format:check`: **PASS**.

### Lockfile preservation

Saved the starting lockfile and compared parsed JSON with Node's
`assert.deepStrictEqual` after formatting and after all changes: **PASS**.
Every dependency version, integrity hash, resolved URL and metadata value is
unchanged. `package.json` also received formatting only. No npm install/update,
audit fix, overrides, dependency removal or version change was performed.

## 3. Dependency security

Registry metadata and primary advisories were checked on the report date.
Initial and final full audits, and final `--omit=dev` audit, all report:
**5 high + 3 moderate = 8 affected-package entries, 0 critical**.
These counts include propagated consumers, not eight distinct root advisories.

### GHSA-vfj7-8cjw-p6xm — braces

- Installed affected package: `braces@3.0.3`.
- Direct introducer: `tailwindcss@3.4.19` (dev dependency). Typography also peers on
  this same Tailwind installation, explaining its production-audit inclusion.
- Installed paths:
  - `tailwindcss → chokidar@3.6.0 → braces@3.0.3`
  - `tailwindcss → micromatch@4.0.8 → braces@3.0.3`
  - `tailwindcss → fast-glob@3.3.3 → micromatch@4.0.8 → braces@3.0.3`
- [Primary advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm):
  deeply nested patterns can exhaust the Node.js stack; no patched version listed.
  Registry latest is still `braces@3.0.3`; latest Tailwind v3 is `3.4.19`.
- Reachability: glob parsing is used by the build/watch tooling. The application
  does not take visitor-supplied glob patterns or run this toolchain per request.
  Locally introduced malicious build patterns remain a tooling risk. This is not
  a claim that the vulnerable functions never run during builds.
- Implemented fix: **none**. No compatible patched braces release is available.
  npm's proposed Tailwind 4.3.3 migration is explicitly outside this issue's scope.
- Recommendation: owner reviews the trusted-build-input risk, tracks a patched
  upstream release, and applies/retests it when available. Do not build unreviewed
  patterns/configuration as trusted work. An independently tested toolchain migration
  would require a separate task.
- Remaining risk: unresolved high upstream advisory; a malicious pattern can deny
  service to a build/watch Node process. No portfolio browser request path found.

### GHSA-rj75-hqrm-r3gf — postcss-selector-parser

- Installed affected versions: `6.1.4` at root and `6.0.10` under typography.
- Direct introducers and installed paths:
  - `@tailwindcss/typography@0.5.20 → postcss-selector-parser@6.0.10`
  - `tailwindcss@3.4.19 → postcss-selector-parser@6.1.4`
  - `tailwindcss@3.4.19 → postcss-nested@6.2.0 → postcss-selector-parser@6.1.4`
- [Primary advisory](https://github.com/advisories/GHSA-rj75-hqrm-r3gf):
  untrusted selectors can cause quadratic CPU use; fixed in `7.1.6`. Registry latest
  is `7.1.7`; newest v6 is `6.1.5`, which remains affected.
- Compatibility: Tailwind requires `^6.1.2`, postcss-nested requires `^6.1.1`, and
  typography pins exactly `6.0.10`. Current typography latest is still `0.5.20`.
  No in-range security patch is available through these consumers.
- Reachability: CSS parsing runs while building trusted local source. The advisory
  explicitly excludes ordinary trusted-source builds from its exposed deployment
  scenario. The site has no request-time untrusted selector parser or CSS service.
- Implemented fix: **none**. A v7 override would bypass all three declared version
  constraints. A production build alone would not establish full parser API/consumer
  compatibility. No override was added. npm's typography 0.5.4 downgrade is not an
  acceptable way to hide the warning, nor is a Tailwind v4 migration in scope.
- Recommendation: retain the current tree for owner risk review and monitor compatible
  upstream fixes. If an override is later considered, separately verify consumers'
  selector behavior and generated CSS before adopting it.
- Remaining risk: unresolved moderate advisory; CPU exhaustion if the build's trust
  assumptions change to accept malicious selectors. No affected browser runtime
  code path identified in the reviewed static-site architecture.

`npm ls --depth=0` and the scoped dependency-tree inspection both pass. No security
finding is marked fixed or accepted. npm audit continues to exit with findings.

## 4. Image optimization

Used the bundled Python/Pillow with WebP support; no package installed, AI image
generation, external image service, content changes or cropping.

Sizes below are exact bytes; percentages compare each new file with its source.

| Asset                |  Original | Optimized | Reduction | New format / dimensions     |
| -------------------- | --------: | --------: | --------: | --------------------------- |
| Contact Hero         | 2,245,107 |   264,350 |    88.23% | WebP, 1672×941              |
| Favicon 32           | 1,533,914 |     2,216 |    99.86% | PNG, 32×32                  |
| Favicon 64           | 1,533,914 |     6,521 |    99.57% | PNG, 64×64                  |
| Portfolio screenshot | 1,485,456 |   927,240 |    37.58% | Lossless WebP, 2555×1265    |
| Navbar/Footer logo   |   449,611 |    14,380 |    96.80% | Lossless RGBA WebP, 303×144 |

Together the four source assets total 5,714,088 bytes; their five delivery files
total 1,214,707 bytes, a **78.74% reduction**. This is an asset-size comparison,
not a claim that every page previously downloaded all four files or that a
Lighthouse score improved.

### Files and references

- Added `public/images/contact-background.webp`; changed only its URL in
  `src/data/heroes.ts`.
- Added `public/projects/portfolio/homepage.webp`; changed only the Portfolio
  screenshot URL in `src/pages/ProjectsPage.tsx`.
- Added `public/navbarlogo.webp`; updated Navbar and Footer `src` attributes.
  Rendered dimensions remain 36×36 with the exact same object-cover/alignment classes.
- Added `public/favicon-32.png` and `public/favicon-64.png`; `index.html` declares
  both PNG icons with their correct `sizes` attributes.

### Quality and preservation

- Contact: Pillow WebP quality 92, method 6; unchanged dimensions/aspect ratio.
  Side-by-side source/output review found no noticeable composition/color loss.
  This is lossy encoding, not pixel identity. Mean absolute RGB channel errors
  were 1.48, 1.20, 1.82 on the 0–255 scale. Hero cover/position remains `50% 42%`.
- Screenshot: lossless WebP, method 6; decoded RGBA pixels compare equal to the
  original. Full resolution retained for screenshot text readability.
- Logo: Lanczos downsample from 1818×865 to 303×144, then lossless WebP with exact
  alpha handling. Its 144px height provides 4× the rendered height, retaining
  high-density sharpness and the original transparent appearance. The nearest
  whole-pixel size preserves composition without cropping; no CSS dimensions changed.
- Favicons: Lanczos downsample of the same original logo; optimized PNG. Original
  RGB appearance retained; no new branding or invented transparency.
- All original source images remain byte-for-byte intact. They are intentionally
  retained as sources; Vite copies them to `dist`, but application references no
  longer request these four large originals. Removing them is optional later cleanup.

## 5. Regression tests

| Command / check                                                   | Result                                       |
| ----------------------------------------------------------------- | -------------------------------------------- |
| `npm run format:check`                                            | PASS                                         |
| `npm run lint`                                                    | PASS                                         |
| `npm run build` (`tsc -b && vite build`)                          | PASS                                         |
| `node --test scripts/test-hero-images.mjs`                        | PASS — 7 tests                               |
| `git diff --check`                                                | PASS; normal LF/CRLF conversion notices only |
| `npm audit` (JSON capture)                                        | FAIL — 5 high, 3 moderate                    |
| `npm audit --omit=dev` (JSON capture)                             | FAIL — same counts                           |
| `npm ls --depth=0` / scoped tree                                  | PASS — no invalid/missing dependencies       |
| Local literal image-reference scan                                | PASS — no missing references                 |
| Scoped credential-pattern scan of current text files and built JS | PASS — no matches                            |

Final bundle: JS 393.59kB / 122.35kB gzip; CSS 61.34kB / 14.91kB gzip.
These are build outputs, not measured browser performance.

### Actual browser verification

Used the real in-app browser against the rebuilt production output on
`http://127.0.0.1:4173` (Vite preview), not the dev server.

- All four main routes tested at 320, 375, 400, 768, 1024 and 1440px: 24 cases,
  correct main headings and no document horizontal overflow. Both brand images
  load and remain 36×36 in every case.
- Desktop navigation and mobile menu tested: keyboard Enter opens, Escape closes
  and returns focus; selecting Projects closes the menu and changes the route.
- Optimized Contact Hero loads and decodes. About → Contact produced the original
  opaque outgoing layer and decoded incoming WebP with the existing 0.45s fade.
  Settled Contact composition visually inspected at mobile and desktop sizes.
- All four project card screenshots load, including the new lossless Portfolio
  WebP. Both existing case-study routes work; Next image works in both galleries,
  all gallery images load and Holidaze pressed-thumbnail state updates.
- Favicon declarations inspected; both PNGs opened/decoded in the browser at
  their declared 32×32 and 64×64 sizes. The 64px logo appearance was visually checked.
  Browser-chrome favicon selection/cache behavior was not independently controlled.
- New logo visually inspected in the existing header; no changed alignment or
  styling observed. Existing layout classes are unchanged except Prettier ordering.
- Captured browser warning/error log after route/gallery tests: **empty**.

No WAVE, Lighthouse, full screen-reader session, OS preference emulation or real
high-DPI-device testing was performed. Do not interpret these checks as a full
accessibility certification, cross-browser certification or performance score.

## 6. Git diff

A 101-file hash baseline was saved before this issue's work. This issue modifies
18 existing files: the 15 formatting files above, plus `src/data/heroes.ts`,
`src/components/layout/Navbar.tsx` and `src/pages/ProjectsPage.tsx` for image URLs.
The five optimized assets and this report are new. No files removed.

The complete tracked diff was reviewed alongside the hash comparison. Previous
uncommitted Hero, Contact, accessibility, branding and project-card work remains
intact. Case-study data, descriptions, technologies, links and source asset bytes
are unchanged; the Portfolio card's image path is the sole project-data change.
No unexpected dependency versions, new secrets or unrelated implementation changes
were found within the checks performed. No full Git-history secret audit is claimed.

Previously untracked files remain accounted for: HeroBackground/loader/state,
`src/data/heroes.ts`, ContactPage, Hero tests under `scripts/`, Hero transition/QA
docs, About/Projects WebPs, original Contact PNG/navbar logo, and Packline/Portfolio
asset folders. They are prior work, not all new additions made by this cleanup.
The eventual owner commit must include required untracked sources and assets.

## 7. Remaining manual checks

- Owner reviews both unresolved advisories and chooses documented risk acceptance
  or a separately tested remediation. Neither has been silently waived.
- Run WAVE on four pages and both case studies; complete keyboard and NVDA/VoiceOver
  review, OS reduced-motion, zoom/forced-colors and Safari/Firefox/device checks.
- Run Lighthouse against a cold-cache production preview with mobile throttling;
  inspect real image/font requests and LCP/CLS/INP before making performance claims.
- Confirm favicon appearance in target browsers' tab UI and logo sharpness on an
  actual high-density display. Clear an old favicon cache if necessary.
- Review all prior untracked files/assets before an eventual commit. SEO metadata
  follow-up remains outside this issue's scope.

## 8. Merge recommendation

**Ready for owner review; wait for dependency-risk disposition before merge.**
The formatting blocker is resolved and the image optimization/regression work
passes. Audit findings remain open; accepting their documented trusted-build-input
risk is an owner decision. The functional portfolio is not blocked by a newly found
runtime defect, and no forced upgrade is recommended in this issue.

Local start: `npm run dev`. Production preview:
`npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4173`.
No commits, merges, pushes or deployments performed.
