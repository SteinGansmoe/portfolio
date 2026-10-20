# Portfolio content recovery

Verified on 18 October 2026. This migration did not access or modify a Supabase project.

## Sources used

- [LaneStomp README](https://github.com/SteinGansmoe/lanestomp/blob/main/README.md), blob `a16e2a7dfe43483db8d0357cb542761689d1b543`: project purpose, current MVP features, technologies, repository and live-site link.
- [Holidaze Retreats README](https://github.com/SteinGansmoe/holidaze-retreats/blob/main/README.md), blob `f90d4b132d3930583d34f65c1ab0de036b985e37`: Project Exam 2 context, venue booking features, technologies, repository and live-site link.
- Existing portfolio Home/About text, personal photos, favicons, styles, cards, Markdown case-study renderer and gallery were retained.

Summaries in `src/features/projects/data.ts` paraphrase those READMEs; they are not recovered database case studies. Current LaneStomp counter-pick and matchup navigation were additionally verified on its live site for issue #3. Other planned features are not presented as shipped. Live links are sourced from the READMEs; their current service availability is independent of this portfolio. Neither project has an inferred completion status or claimed results. Featured flags, local IDs and display order are local editorial choices.

## Reused images

These files were copied from the project repositories and verified using `git hash-object` against the source Git blob IDs. They are served locally; no remote image host is needed at runtime.

| Local file under `public/projects/` | Source repository path                                              | Git blob ID                                |
| ----------------------------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| `lanestomp/logo.png`                | `SteinGansmoe/lanestomp/public/images/lanestomp-logo.png`           | `67cc74a7fbcddc527487644d7cc08cb679bddff6` |
| `holidaze/hero.png`                 | `SteinGansmoe/holidaze-retreats/public/screens/hero.png`            | `cc39d1396571fd5ee6cc66711f7fbc917662c74e` |
| `holidaze/venue-details.png`        | `SteinGansmoe/holidaze-retreats/public/screens/venue-details.png`   | `e6b358e7e3409c141818d2aab8acc0e7946c476e` |
| `holidaze/booking-confirm.png`      | `SteinGansmoe/holidaze-retreats/public/screens/booking-confirm.png` | `901630de2ee949be03d33c83a60bac8bc5dc5589` |

Issue #3 adds `public/projects/lanestomp/homepage.jpg`, an actual capture of https://www.lanestomp.com/ on 18 October 2026, as the cover and first gallery image. The original logo remains the second gallery image. This new capture is separate from the historical Supabase uploads. The repository also contains `public/images/design/Homepage.png`, a design asset; it was not substituted for a screenshot of the implemented site. Additional Holidaze search/venue-management screenshots remain available in its source repository but are not needed for the current gallery.

## Still missing

- Original Supabase `projects` rows: original IDs and slugs, exact titles, excerpts, Markdown case studies, tags, status, featured flags, sorting and creation dates. The full former project list is unknown. The two local slugs are `lanestomp` and `holidaze`; historical URLs cannot be confirmed without the export.
- Original Supabase Storage cover/gallery selections, image URLs, captions and image order. The number and names of missing uploads are unknown without the storage inventory. Holidaze now uses the three verified repository screenshots above; LaneStomp now has a new live implementation screenshot, while its historical Supabase screenshots remain unrecovered.
- Original personal accounts of design decisions, challenges, outcomes or metrics. These cannot be reconstructed from feature lists and were not invented.
- `public/crestauction.jpg` exists in this portfolio, but there is no verified project record or case study associated with it. The asset is preserved without inventing a project entry.

To restore the exact former content, recover an existing database export/backup of `projects` and the associated `project-images` storage inventory/files. Copy verified text and images into local data and `public/projects/`. No backup files were deleted, and no external databases were changed.

## Removed functionality

Supabase previously provided project reads and CRUD, authentication/session listeners, the `admins` table permission lookup and image uploads to `project-images`. Login, route guards, admin screens, project forms and upload helpers have been removed entirely. Former `/login` and `/admin/*` URLs now show the public page-not-found fallback. Content changes are made in source and require rebuilding the site.

The portfolio no longer uses Supabase environment variables or the SDK. Mentions of Supabase in About and LaneStomp's technology summary describe development experience/the separate LaneStomp project, not a portfolio runtime dependency.

## Lockfile preservation

`package-lock.json` already had uncommitted dependency updates before this task. `npm uninstall @supabase/supabase-js --offline --ignore-scripts --no-audit --no-fund` worked from that existing lockfile, retaining its unrelated updates. It removed the root Supabase dependency and 11 package entries: the six `@supabase/*` packages, `@types/phoenix`, `@types/ws`, `iceberg-js`, `tslib`, and `ws`. No dependency upgrades or lockfile-wide reformatting were performed as part of this migration.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript checks (`tsc -b`).
- Local content checks: passed unique IDs/slugs, required projects, slug lookups, ordering, featured limits, unknown-project handling and source/build image existence.
- Local Vite development server: started successfully without Supabase environment variables. Browser checks passed Home, Projects, both case studies, About, gallery next/previous/thumbnail controls, unknown project and retired login/admin routes. Checked images loaded, browser error/warning log was empty, and a mobile viewport had no horizontal overflow.
- Source/dependency audit: no Supabase SDK imports, client, credentials or Supabase API calls remain. The two descriptive mentions of Supabase are documented above.
- Focused Prettier check on edited TypeScript/TSX and documentation: passed.
- `npm run format:check`: reports existing formatting/line-ending issues in 20 files, including unchanged application/config files and the package files. These were left alone to avoid unrelated formatting churn and preserve the existing lockfile edits.
- `git diff --check`: passed.

No changes were pushed or deployed, and no remote databases were modified.
