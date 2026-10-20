# Final pre-launch QA — issue #13

Date: 21 October 2026 (Europe/Oslo). Branch: `refactor/remove-supabase`.
Test target: locally built production output served with
`npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`.

## 1. Overall status

**NOT READY for an unconditional, all-checks-green merge sign-off.**

The application passes the functional and responsive checks performed. Five small
defects were fixed without a redesign. No critical application defect or exposed
credential was found in the scoped checks. However, the required global format
check still fails on 15 existing files, and npm audit reports eight affected
package entries, including five high-severity entries. Review/resolve or explicitly
accept those two red checks before merging.

The security entries concern build-time parsing tools; they are not evidence of
an exploitable browser vulnerability in this static portfolio. See the context
below rather than applying a forced dependency upgrade.

## 2. Automated checks

| Check                               | Command / method                                                                           | Final result                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| TypeScript                          | `npm run build` invokes `tsc -b`                                                           | PASS                                                           |
| ESLint                              | `npm run lint`                                                                             | PASS                                                           |
| Global formatting                   | `npm run format:check`                                                                     | FAIL — same 15 files before and after QA                       |
| Production build                    | `npm run build` (`tsc -b && vite build`)                                                   | PASS                                                           |
| Hero regression tests               | `node --test scripts/test-hero-images.mjs`                                                 | PASS — 7 tests                                                 |
| Production dependency audit         | `npm audit --omit=dev --json`                                                              | FAIL — 3 moderate, 5 high, 0 critical affected-package entries |
| Full dependency audit               | `npm audit --json`                                                                         | FAIL — same counts                                             |
| Asset references                    | Checked literal local image/icon/project paths against `public/`                           | PASS — no missing referenced paths found                       |
| Current-tree/bundle secret patterns | Checked 100 tracked/non-ignored files where text applies, plus built JS; no values printed | PASS within scan limits — no matches                           |
| Public project URL reachability     | Read-only HTTP GETs to 4 live sites and 4 repositories                                     | PASS — all returned 200 after redirects                        |
| Browser DOM checks                  | Production preview, real browser; headings, names, alts, external rels, widths             | PASS after fixes within tested scope                           |
| Diff whitespace                     | `git diff --check`                                                                         | PASS; Git also reports normal LF/CRLF conversion notices       |
| axe/WAVE engine scan                | Not installed/available in this browser workflow                                           | NOT RUN                                                        |
| Lighthouse                          | Not installed/available in this workflow                                                   | NOT RUN                                                        |

TypeScript/lint/build/format checks and Hero tests were repeated after the fixes.
No dependency was installed to manufacture a Lighthouse or accessibility score.

Existing formatting failures: `.prettierrc`, `eslint.config.js`, `index.html`,
`package-lock.json`, `package.json`, `postcss.config.js`,
`src/components/layout/Container.tsx`, `src/components/layout/Footer.tsx`,
`src/main.tsx`, `src/pages/ProjectDetailPage.tsx`, `tsconfig.app.json`,
`tsconfig.json`, `tsconfig.node.json`, `vercel.json`, `vite.config.ts`.
Broad formatting cleanup, especially of the lockfile, was deliberately avoided.

## 3. Issues found

| Severity                   | Location                           | Finding                                                                                                                                                                                           | Fixed?                                                                                           |
| -------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| High (upstream severity)   | Dependency tree / lockfile         | `braces` parsing advisory propagates through Tailwind's build-tool chain. npm counts five high-severity package entries, not five independent browser exploits.                                   | No — dependency-risk review required                                                             |
| Medium (upstream moderate) | Dependency tree / lockfile         | `postcss-selector-parser` advisory propagates through typography/PostCSS dependencies; three moderate entries.                                                                                    | No — dependency-risk review required                                                             |
| Low                        | 15 existing files listed above     | Global Prettier check fails. Present before QA; not runtime failures.                                                                                                                             | No — separate cleanup/explicit acceptance                                                        |
| Medium                     | `ProjectImageGallery.tsx`          | Violet gallery arrows over a translucent background do not reliably reach 3:1 over bright screenshots. Source-pixel composition at a Holidaze arrow center estimated 2.86:1 before backdrop blur. | Yes — light arrows, stronger backing, explicit focus rings                                       |
| Low                        | `ProjectImageGallery.tsx`          | Selected thumbnail had no programmatic pressed state; focus styling relied on browser defaults.                                                                                                   | Yes — `aria-pressed` and shared focus styling; reduced-motion override for thumbnail transitions |
| Low                        | `ProjectCard.tsx`                  | Projects page skipped directly from H1 to H3.                                                                                                                                                     | Yes — card titles use H2 with identical visual classes                                           |
| Low                        | `App.tsx`, `ProjectDetailPage.tsx` | Unknown-route/project fallbacks lacked an H1 and explicit shared return-link focus treatment.                                                                                                     | Yes — original messages retained as H1; focus classes added                                      |
| Low                        | `index.html`                       | PNG favicon declared as `image/svg+xml`.                                                                                                                                                          | Yes — `image/png`; asset unchanged                                                               |
| Medium                     | `index.html` / SEO                 | All four main routes share the same generic title. No meta description, Open Graph/social image, or canonical metadata.                                                                           | No — report first; route-specific metadata would benefit search and assistive context            |
| Low                        | `public/` / SEO                    | No `robots.txt` or `sitemap.xml`. Catch-all SPA rewriting also returns HTML/200 for unknown paths.                                                                                                | No — optional SEO work; client fallback is reasonable                                            |
| Medium                     | Public assets                      | Contact Hero PNG is 2,245,107 bytes; favicon 1,533,914 bytes; navbar logo 449,611 bytes; Portfolio screenshot 1,485,456 bytes.                                                                    | No — measured size concern; no unmeasured speed claim or asset redesign                          |

### Dependency context

The eight npm entries arise from two root advisories:

- [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm):
  deeply nested brace patterns can exhaust a Node.js stack. The advisory lists no
  patched `braces` version. Tailwind's scanner/watch dependencies account for
  the propagated high entries.
- [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf):
  untrusted selectors can exhaust parser CPU. The advisory explicitly distinguishes
  request-time untrusted input from ordinary trusted-source builds. A patched
  parser exists, but the installed consumer versions constrain its major version.

Tailwind/PostCSS are used to build CSS here; no route accepts visitor-supplied
CSS/glob patterns for server-side compilation. `--omit=dev` still includes this
chain through the typography package's dependency/peer classification. This is
not proof that the vulnerable parser runs in the delivered React application.
Nevertheless the audit is not clean and should be reviewed explicitly.

npm proposes a Tailwind 4 upgrade and a typography downgrade for parts of the
tree. Applying `npm audit fix --force` would exceed a targeted QA patch and risk
changing the approved design/build configuration. No versions, overrides,
dependencies or lockfile were changed. Choose a separately tested remediation or
record the trusted-build-input risk acceptance before merge.

### Project facts and publication review

Projects displays exactly four distinct cards: LaneStomp, Holidaze, Packline
Malbok and Portfolio. The former duplicate/test Holidaze entries are gone.
Titles, descriptions, technologies, URLs and asset paths were preserved byte for
byte during this QA. All four screenshots load and have project-specific alt text.

| Project         | Repository checked (HTTP 200)               | Live URL checked (HTTP 200)                          |
| --------------- | ------------------------------------------- | ---------------------------------------------------- |
| LaneStomp       | `github.com/SteinGansmoe/lanestomp`         | `lanestomp.com` redirects to `www.lanestomp.com`     |
| Holidaze        | `github.com/SteinGansmoe/holidaze-retreats` | `holidaze-retreats.vercel.app`                       |
| Packline Malbok | `github.com/SteinGansmoe/packlineMalbok`    | `packlinemalbok.netlify.app`                         |
| Portfolio       | `github.com/SteinGansmoe/portfolio`         | `steingansmoe.no` redirects to `www.steingansmoe.no` |

Response titles match the intended projects/repositories. This verifies
reachability/identity, not every feature of the external applications or every
technology claim. No description/technology was proven false; owner confirmation
of the exact scope/stack remains appropriate. The detailed case-study data covers
the two featured projects only; no Packline/Portfolio case study was invented.

The Packline screenshot contains workplace fitting information. The owner
explicitly confirmed in this chat that the screenshot, repository and live demo
are approved for public use. No publication blocker remains from that question;
do not add new internal screenshots without reviewing their contents.

## 4. Changes made

Only these five existing files changed during QA, plus this report:

1. `index.html`: correct the favicon MIME declaration.
2. `src/features/projects/ProjectCard.tsx`: H2 titles, same visual styling.
3. `src/features/projects/ProjectImageGallery.tsx`: readable arrow foreground and
   backing, shared focus rings, pressed thumbnail state and reduced-motion rule.
4. `src/App.tsx`: semantic unknown-route heading and focusable return link styling.
5. `src/pages/ProjectDetailPage.tsx`: equivalent missing-project fallback fix.
6. `docs/final-pre-launch-qa.md`: this review and remaining checklist.

No project facts, data files, images, Navbar/Footer, Hero logic/geometry,
Back-to-Top, design-system rules, package manifest or lockfile were changed by QA.

## 5. Browser / accessibility / performance verification

### Actually tested in the production preview

- Home, Projects, About and Contact: 24 route/viewport combinations at 320, 375,
  400, 768, 1024 and 1440px. No horizontal document overflow or overflowing main
  descendants found. One H1 on each main page, correct active navigation link,
  no missing image alt attributes, no unnamed controls detected by the scoped DOM
  checks, and no `_blank` links missing `noopener` or `noreferrer`.
- Both existing case studies: another 12 viewport combinations with no overflow.
  Galleries and four main project screenshots loaded correctly. Image containment
  and Hero cover positioning were also inspected in source and browser.
- Direct navigation and browser refresh on all four main routes; case-study
  refresh; reasonable unknown-route and missing-project fallbacks. Vercel's
  existing catch-all rewrite supports the SPA routes. No deployment was performed.
- Mobile menu Enter/open, Escape/close with focus returned, and Contact selection
  closing the menu. Contact active state and Footer Contact `/contact` destination
  verified. “Let's talk” remains the configured `mailto:` URL.
- Keyboard focus on all four project live-site actions; visible focus rings and
  intended URLs. External destinations were separately checked by HTTP GET.
- Gallery next via keyboard, previous via mouse, active image change and
  `aria-pressed` thumbnail updates verified after the fix.
- Back-to-Top hidden while the Hero boundary is visible; visible beyond its 48px
  offset; fixed positioning; no footer-link overlap; keyboard activation returned
  scroll position to exactly zero and focus to `main-content`.
- Real two-image Hero crossfades during rapid Projects/About/Contact navigation:
  decoded outgoing layers remain opaque and incoming duration is `0.45s`. Navbar
  animation is `none`. Back/Forward and final-route image behavior verified.
- No application console warnings/errors recorded during these browser checks.

Native scrolling and viewport emulation occasionally required a fresh state
observation before assertions. A first Back-to-Top test stopped 47px beyond the
Hero and correctly stayed hidden; moving to the actual bottom crossed the 48px
boundary and the test passed. These were test-position/timing observations, not
changes to application scrolling behavior.

### Contrast and accessibility scope

The current Navbar/Hero colors and scrims remain unchanged from the measured
[contrast review](hero-navbar-accessibility.md). Its conservative pure-white
image bounds still apply to changed photographs and intermediate crossfades:
normal Hero text at least 5.34:1 in the tested regions; Navbar muted text at least
5.72:1 even at the weakest header scrim stop. Current card/footer foreground and
dark surfaces retain the reviewed design tokens; Contact card detail contrast was
previously measured at 9.10:1 with those unchanged colors.

The gallery fix was checked using its actual computed `rgb(241,245,249)` foreground
and `rgba(2,6,23,0.8)` backing. Over a maximally bright white image the resulting
contrast is **10.66:1**, exceeding the 3:1 applicable UI-symbol threshold. The
white/light focus ring against `#0b1014` remains clearly visible.

Normal mobile navigation targets retain their previous dimensions/spacing and
meet the 24px AA minimum; menu toggle and Back-to-Top are 44px square. Contact
cards are at least 96px tall and project text actions at least 44px tall. This
does not claim that every link is a 44px enhanced target.

Reduced-motion state behavior is covered by the seven focused tests and existing
CSS rules. No operating-system preference change or screen-reader session was
performed. There is no contact form, so form-label validation is not applicable.
DOM checks plus targeted contrast checks are not a full WCAG certification.

### Performance and security limits

- Final build reports JavaScript **393.59kB / 122.37kB gzip**, CSS
  **61.34kB / 14.91kB gzip**. These are bundle sizes, not browser speed scores.
- Hero decoding/caching, at-most-two image layers and reduced-motion logic are
  covered by tests. Project images are lazy-loaded; images use constrained boxes.
  Self-hosted Inter CSS declares `font-display: swap`.
- The newly configured Contact Hero is the 2.25MB PNG, unlike the optimized
  Projects/About WebP files. Large current assets are listed above. Unused original
  PNGs are also copied into `dist`, but should not be counted as page transfers
  unless requested by that page.
- No Lighthouse, LCP, CLS, INP, network-throttled or cold-cache scores were measured.
  No zero-layout-shift or performance-score claim is made.
- No matching credential/private-key/JWT-like patterns found in the scoped current
  tree and built JS. No tracked `.env`, `.pem` or `.key` files found. Local env
  files are ignored; source has no client environment-variable reads or sensitive
  debug logging. No secret values were printed. Git history and external project
  backends were not security-audited.
- React Markdown uses its normal safe rendering; no raw-HTML bypass was found.
  External-link `noreferrer` treatment is present and implies opener isolation in
  supported modern browsers; Contact uses explicit `noopener noreferrer`.

## 6. Remaining manual checklist

- [ ] Resolve or explicitly accept the 15-file global formatting failure; preserve
      the lockfile unless a deliberate dependency change requires modifying it.
- [ ] Review the two root dependency advisories and agree on a tested remediation
      or documented risk acceptance. Do not blindly run `npm audit fix --force`.
- [ ] Run the WAVE browser extension on all four production-preview pages and both
      case studies. Inspect contrast, landmarks, reading order and hidden content.
- [ ] Perform an uninterrupted Tab/Shift+Tab pass, including reverse navigation,
      gallery thumbnails and footer links. Confirm email actions in an actual
      configured mail application; QA inspected their destinations without sending mail.
- [ ] Test NVDA/VoiceOver route context, heading navigation, external-link hints,
      selected thumbnail announcements and Back-to-Top focus return.
- [ ] Enable reduced motion in the OS/browser and confirm instant decoded-image
      swaps plus disabled transitions. Test 200%/400% zoom, text-spacing overrides,
      high-contrast/forced-colors mode, real touch devices and Safari/Firefox.
- [ ] Run Lighthouse on a cold-cache production build with mobile throttling and
      review actual LCP/CLS/INP and image/font requests before optimizing assets.
- [ ] Reconfirm all published project descriptions/technologies and employer
      permission if replacing Packline material. Check external apps' functionality
      manually; HTTP 200 does not validate their booking/login/business workflows.
- [ ] Decide whether to add per-route titles/descriptions and OG/social/canonical
      metadata in a focused follow-up. robots/sitemap are optional improvements.
- [ ] Review and include all required untracked development files/assets in the
      eventual commit. This QA began with a dirty working tree containing earlier
      Hero, Contact, logo and four-project work; do not merge only the tracked subset.
- [ ] After any remediation, rerun lint, formatting, TypeScript/build, Hero tests
      and a quick production-preview smoke test before merging.

## 7. Final Git diff summary

A start-of-QA file-hash baseline separates this patch from earlier uncommitted
development work. Only the five existing files in section 4 differ from that
baseline, plus this newly added report. Project descriptions, technology arrays,
URLs, data and asset bytes remain unchanged. No unrelated QA edits were found.

The full `git diff` against HEAD is larger because it already contained previous
Hero-transition, Contact-page and branding work. Its tracked diff and existing
untracked files were inspected; they have not been represented as changes made
by this QA. The current branch is still `refactor/remove-supabase`.

## 8. Merge recommendation

**Wait for review before merging.** The functional portfolio looks ready, but the
formatting gate and dependency-audit disposition prevent an unconditional clean
sign-off. Address or explicitly accept them, complete the manual accessibility
and performance checks appropriate to launch, and then review the complete branch
diff/required assets. SEO and image-size follow-ups can be scheduled separately.

No commits, branch merges, pushes or deployments were performed. The local
production preview was used only for QA.
