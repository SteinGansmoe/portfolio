# SteinGansmoe.no — Portfolio

A developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS and React Router. Project cards, image galleries and Markdown case studies use local typed data. No backend, account or environment variables are required.

## Run locally

Use Node.js 22.12+ (Node 24 LTS also works) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Checks and production preview

```sh
npm run lint
npm run build
npm run preview
```

`build` runs TypeScript project checks (`tsc -b`) before building with Vite. `preview` serves the production build locally, normally at http://localhost:4173. `npm run format:check` checks Prettier formatting.

## Manage project content

Edit `src/features/projects/data.ts`. Each entry is checked against the existing `Project` type in `src/features/projects/types.ts`.

- Use a unique, stable `id` and URL-safe `slug`; the detail URL is `/projects/<slug>`.
- Set `title`, `excerpt`, Markdown `content`, `tags` and `githubUrl`.
- Optional `demoUrl` adds a live-site link. Omit it if unverified.
- Put assets in `public/projects/<slug>/`. Use `/projects/<slug>/file.png` for `imageUrl` (card cover) and `imageUrls` (ordered gallery). Omit images if none are verified; the existing components support empty galleries.
- Set `isFeatured: true` to include a project on Home (up to three). `sortOrder` controls ascending display order; ties retain file order.
- Optional `status` is `active` or `completed`; omit it if unknown.

For example, copy an existing object in the array, replace its verified content and links, and add its assets. Changes are stored in source, not browser storage; rebuild to include them in the production bundle.

About information and skills remain in `src/pages/AboutPage.tsx`; introductory content remains in `src/pages/HomePage.tsx`.

## Supabase migration

The former Supabase client, project queries, uploads, authentication, login and admin tools have been removed. Content is now managed in source. Former login/admin URLs show the public page-not-found fallback.

LaneStomp and Holidaze use verified repository information and existing assets. Original database case-study text and some media are still missing. See [content recovery notes](docs/content-recovery.md) for exact sources, asset hashes, recovery gaps and lockfile preservation details. Supabase mentioned in personal skills or another project's technology list is descriptive text only.

The existing layout, styles, public navigation, photos, favicons, cards and case-study components are retained. No deployment or remote database changes are part of this migration.
