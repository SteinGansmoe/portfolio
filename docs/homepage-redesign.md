# Homepage redesign: implementation and learning handoff

Issue #3 completes Selected work, About/portrait/Tech Stack, and the footer. Navbar and Hero source files are unchanged. Other routes keep their existing page components, project-card styling and footer. Shared project content now includes a real LaneStomp screenshot and its confirmed counter-pick description and technology tags.

## Changed files

| File                                          | Responsibility                                                                                                                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/pages/HomePage.tsx`                      | Composes Hero, FeaturedProjects and AboutSection. Applies the new background and sans-serif font only below the hero.                                                                                  |
| `src/components/home/FeaturedProjects.tsx`    | Loads the two featured projects using the existing local API; renders the label, heading, all-projects link and responsive card grid.                                                                  |
| `src/components/home/FeaturedProjectCard.tsx` | Homepage-only horizontal card with a real screenshot, typed project props, description, tags, external-site link and case-study action. The existing `features/projects/ProjectCard.tsx` is untouched. |
| `src/components/home/AboutSection.tsx`        | Intro from existing About copy, the real personal photograph, About link and responsive three-column composition.                                                                                      |
| `src/components/home/TechStack.tsx`           | Maps the confirmed technology list to small TechTile components.                                                                                                                                       |
| `src/components/home/HomeFooter.tsx`          | Homepage footer with identity, navigation and the confirmed GitHub/LinkedIn/email links.                                                                                                               |
| `src/components/ui/ArrowRight.tsx`            | Small decorative SVG reused by links and buttons.                                                                                                                                                      |
| `src/data/profile.ts`                         | Local homepage introduction, portrait path and verified profile URLs.                                                                                                                                  |
| `src/data/technologies.ts`                    | Typed list of the nine technologies confirmed by the user.                                                                                                                                             |
| `src/features/projects/data.ts`               | Preserves the existing Project model and data structure; updates LaneStomp's description, tags, image and source note.                                                                                 |
| `src/components/layout/AppLayout.tsx`         | Selects HomeFooter and the matching main background on `/`; retains the original footer and page container on other routes.                                                                            |
| `tailwind.config.js`                          | Names reusable colors, fonts, radius, container width and section spacing.                                                                                                                             |
| `src/index.css`                               | Adds opt-in `portfolio-*` component classes. Existing global rules and old button classes retain their behavior.                                                                                       |
| `public/projects/lanestomp/homepage.jpg`      | Actual screenshot captured from `https://www.lanestomp.com/` on 18 October 2026.                                                                                                                       |
| `public/icons/`                               | Locally served Devicon SVGs, with their MIT license in `LICENSE.devicon`. No icon package or runtime CDN is required.                                                                                  |
| `docs/content-recovery.md`                    | Records the new live screenshot separately from still-missing historical database content.                                                                                                             |
| `docs/homepage-redesign.md`                   | This handoff.                                                                                                                                                                                          |

## How the featured data reaches a card

The data flow remains:

```text
features/projects/data.ts → fetchFeaturedProjects(2)
                         → FeaturedProjects state
                         → FeaturedProjectCard project prop
```

`fetchFeaturedProjects` sorts using `sortOrder`, filters `isFeatured`, and takes the requested number. It reads bundled TypeScript data and makes no database request. FeaturedProjects calls it in an effect and renders loading, error or empty feedback when appropriate. Its cleanup prevents state updates after unmounting.

The array is mapped with each project's stable `id` as its React key:

```tsx
{
  projects.map((project) => <FeaturedProjectCard key={project.id} project={project} />);
}
```

The card receives `project` through `type Props = { project: Project }`. TypeScript checks that the parent supplies the existing model. The card does not fetch data or know about the full array: it displays just the supplied object's title, excerpt, tags and image.

The image and “View project” links open the local case study. The external-link icon opens the verified demo, falling back to the repository if a demo is absent. Native links provide keyboard behavior; descriptive accessible names distinguish the destinations. Screenshots use `object-contain` so project text isn't clipped to fit a card.

## How the grids respond

| Width                     | Featured projects                     | About/portrait/tech                                      | Tech tiles    |
| ------------------------- | ------------------------------------- | -------------------------------------------------------- | ------------- |
| Mobile, below 640px       | Stacked cards; screenshot above copy  | One column                                               | Three columns |
| 640–767px                 | Stacked cards; screenshot beside copy | One column                                               | Three columns |
| Tablet, 768–1023px        | Stacked horizontal cards              | Intro and portrait side by side; tech spans both columns | Three columns |
| Desktop, 1024px and above | Two horizontal cards side by side     | Intro, portrait and tech in three columns                | Three columns |

Base Tailwind classes describe mobile. `sm:` begins at 640px, `md:` at 768px, and `lg:` at 1024px. `minmax(0, ...)` and `min-w-0` allow grid children to shrink; tags wrap instead of forcing horizontal scrolling. The personal portrait is cropped and rendered grayscale with CSS; the source photo is unchanged.

## Reusable design styles

Tokens live under `theme.extend` in `tailwind.config.js`:

- `portfolio.background`, `surface`, `raised`, `border`, `text`, `muted` provide the palette.
- `font-portfolio-serif` uses Georgia/Times/serif; `font-portfolio-sans` uses the locally installed Inter font.
- `rounded-portfolio` supplies a 10px card radius.
- `max-w-portfolio` supplies the 80rem container limit.
- `py-section` supplies 3rem vertical section spacing.

Reusable combinations live inside `@layer components` in `src/index.css`: `portfolio-container`, `portfolio-section`, `portfolio-eyebrow`, `portfolio-heading`, `portfolio-focus`, and `portfolio-button`. These are opt-in; adding them does not automatically restyle the existing pages.

When you redesign another page yourself, you can use the same vocabulary:

```tsx
<section className="portfolio-container portfolio-section">
  <p className="portfolio-eyebrow">About</p>
  <h1 className="portfolio-heading text-4xl">Your page heading</h1>
  <div className="mt-6 rounded-portfolio border border-portfolio-border bg-portfolio-surface p-6">
    Page content
  </div>
</section>
```

Keep your current route's layout wrapper in mind so you don't nest two containers unnecessarily. Changing a token updates components that opt into it. Changing a component class updates that shared combination. If the development server retains old Tailwind configuration, restart `npm run dev` after editing the configuration.

## Content and asset provenance

- LaneStomp: live homepage capture; matchup/counter-pick navigation verified on the live site. Technology information comes from the existing repository README and issue #3.
- Holidaze: existing repository screenshots and verified React/TypeScript/Tailwind/Noroff API information.
- Portrait: existing `public/steinarild.jpg`, displayed with CSS crop and grayscale only.
- About introduction: condensed from existing About-page copy.
- LinkedIn URL and all nine experience tiles: explicitly confirmed by the user in this chat.
- Icons: Devicon v2.16.0, copied from `https://github.com/devicons/devicon/tree/v2.16.0/icons`; license retained locally.

Supabase is a displayed skill/project technology only, not a portfolio runtime service. There are no new dependencies, database calls or generated portfolio images. Original database case studies remain unrecovered; the mockup's fictional LaneStomp car content and fictional portrait were not used.

## Validation

- ESLint and production build, including `tsc -b`.
- Focused Prettier check for this issue's files.
- Browser layout checks at 375px, 768px and 1440px: no horizontal overflow or broken local images; card and About grids switch as documented.
- Both local case-study links and the About CTA open the expected existing pages. Other pages retain their old footer and card presentation.
- LaneStomp and Holidaze external homepage destinations open successfully. Footer social/email destinations match confirmed URLs.
- Existing mobile navigation and scroll target remain available.

No commits, pushes or deployment are included. Run `npm run dev` and open the URL Vite prints to review the homepage locally.

## Three small coding exercises

1. In `data.ts`, change one featured project's `sortOrder`, then observe how its card moves. Toggle `isFeatured` and see what `fetchFeaturedProjects(2)` returns. Restore the original values afterward.
2. In `FeaturedProjects.tsx`, temporarily change `lg:grid-cols-2` to `md:grid-cols-2`. Resize between 768px and 1024px and compare the space available for each card. Explain why a breakpoint is a layout choice rather than a device detector, then restore it.
3. In `tailwind.config.js`, change `portfolio.border` or the `portfolio` radius. Observe which sections update together and which existing pages do not change. Then add a small practice panel using the example above and remove it after trying the shared styles.
