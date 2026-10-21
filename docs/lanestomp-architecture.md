# LaneStomp system architecture — issue #17

Verified on 21 October 2026 against the public repository's main commit
[`486cbbeab719667f313054ab6b1994c929e3ff4c`](https://github.com/SteinGansmoe/lanestomp/commit/486cbbeab719667f313054ab6b1994c929e3ff4c).
This is a source-code review of that snapshot, not an inspection of live deployment
configuration, production data, logs or service permissions.

## Implementation

- Added `src/features/projects/LaneStompArchitecture.tsx`: a responsive React/HTML
  data-flow diagram, short introduction and component-responsibility explanations.
- `ProjectDetailPage.tsx` includes it only for the LaneStomp slug after the existing
  case study. The approved detail layout and gallery are preserved.
- Diagram flows are typed data rendered by the same small presentation helper.
  Ordered lists preserve flow order without relying on arrows or color; arrows
  are decorative SVGs. Lists become vertical on mobile and horizontal at 768px.
- Existing portfolio surfaces, borders, serif headings and sans-serif text are
  reused. No global CSS, tokens, dependency, image or external diagram service added.
- This issue leaves all existing case-study text, project data, URLs, technologies,
  gallery logic, Navbar/Footer, other pages and Hero behavior unchanged.

## Verified flows

1. **Administrative access:** browser login calls Supabase Auth. Generation and
   collection server actions verify the session and admin role. Review writes
   originate in the browser and are subject to database row-level policies.
   Authentication is not shown as a requirement for public guide browsing.
2. **Match statistics:** server-side collection requests match/player data through
   the shared Riot API client and rate limiter. Scanner and persistence helpers
   validate observations, store them and rebuild aggregate statistics. The browser
   counter-pick provider queries the stored statistics.
3. **AI-assisted guide drafts:** champion combat profiles are repository TypeScript
   modules, not records inferred to exist in Supabase. Server actions combine
   profiles with matchup context and admin notes, request OpenAI output, validate
   it and save guide records with draft status. The combined Next.js/OpenAI node
   represents a server-mediated request/response, not a direct OpenAI database write.
4. **Review and publication:** admins edit and mark drafts reviewed through the
   Supabase client. Public App Router guide pages call a query that selects
   reviewed records. Publishing is a database status update, not a separate
   deployment or assumed export pipeline.

Arrows describe information flow, not every network request. For example, the
collector requests data from Riot and receives it back; the displayed direction
follows the returned data. The diagram repeats the database in separate flows
for readability; it does not assert separate database instances.

## Sources inspected

Every link below is pinned to the reviewed commit. Paths are source-file
references for review, not exposed application endpoints or credential values.

| LaneStomp source file                                                                                                                                                                                                                            | Evidence / responsibility                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| [`src/app/league/matchups/[matchup]/page.tsx`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/app/league/matchups/%5Bmatchup%5D/page.tsx)                                                           | App Router server page calls the guide query (82–108).                                                  |
| [`src/app/league/counters/page.tsx`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/app/league/counters/page.tsx)                                                                                   | Server page supplies the client counter-pick interface.                                                 |
| [`src/components/league/counter-pick-selector.tsx`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/components/league/counter-pick-selector.tsx)                                                     | Client component loads statistics (518–560).                                                            |
| [`src/features/league/counter-pick-statistics-provider.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/counter-pick-statistics-provider.ts)                                     | Provider calls the stored-statistics read layer (183–254).                                              |
| [`src/features/league/counter-pick-stats.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/counter-pick-stats.ts)                                                                 | Reads stored counter-pick aggregates from Supabase (103–142).                                           |
| [`src/features/league/matchups.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/matchups.ts)                                                                                     | Public guide query filters generation_status to reviewed (64–104).                                      |
| [`src/lib/supabase.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/lib/supabase.ts)                                                                                                             | Shared Supabase client used by browser/database features.                                               |
| [`src/components/admin-login-form.tsx`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/components/admin-login-form.tsx)                                                                             | Browser signs in through Supabase Auth (65 onward).                                                     |
| [`src/lib/admin.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/lib/admin.ts)                                                                                                                   | Client-side admin-role lookup.                                                                          |
| [`src/app/admin/league/counter-picks/actions.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/app/admin/league/counter-picks/actions.ts)                                                         | Server actions authorize admins and run scanner/persistence helpers (3097–3294, 7430 onward).           |
| [`scripts/lib/riot-api-client.mjs`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/scripts/lib/riot-api-client.mjs)                                                                                     | Requests acquire capacity, observe responses and bound retries (154–215).                               |
| [`scripts/lib/riot-rate-limiter.mjs`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/scripts/lib/riot-rate-limiter.mjs)                                                                                 | In-memory limiter, request windows, headers and cooldowns.                                              |
| [`scripts/lib/riot-counter-pick-scanner.mjs`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/scripts/lib/riot-counter-pick-scanner.mjs)                                                                 | Collects match data and derives observations (27 onward).                                               |
| [`scripts/lib/riot-counter-pick-aggregation.mjs`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/scripts/lib/riot-counter-pick-aggregation.mjs)                                                         | Validates/deduplicates observations, persists them and rebuilds aggregates (20–246, 291–426).           |
| [`src/features/league/champion-knowledge.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/champion-knowledge.ts)                                                                 | Public exports for repository combat-profile lookup.                                                    |
| [`src/features/league/champion-knowledge/index.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/champion-knowledge/index.ts)                                                     | Imports typed profiles; getChampionCombatProfile reads the in-memory map (513–533).                     |
| [`src/features/league/champion-knowledge/types.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/champion-knowledge/types.ts)                                                     | Structured combat-profile shape.                                                                        |
| [`src/app/admin/league/matchups/actions.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/app/admin/league/matchups/actions.ts)                                                                   | Loads profiles, calls generation, saves drafts and verifies admin sessions (118–180, 270–285, 578–632). |
| [`src/features/league/matchup-draft-provider.ts`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/features/league/matchup-draft-provider.ts)                                                         | Server-only OpenAI provider, structured parsing and content checks; request begins at 751.              |
| [`src/components/admin/admin-dashboard.tsx`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/components/admin/admin-dashboard.tsx)                                                                   | Browser review/publish updates guide status and review metadata (765–808, 861–898).                     |
| [`src/components/admin/league/league-matchup-section.tsx`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/src/components/admin/league/league-matchup-section.tsx)                                       | Admin review/edit interface and generation controls.                                                    |
| [`supabase/migrations/20260527131500_create_league_matchups.sql`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/supabase/migrations/20260527131500_create_league_matchups.sql)                         | Database table and admin-write RLS policies (35–58).                                                    |
| [`supabase/migrations/20260527141000_add_league_matchup_review_workflow.sql`](https://github.com/SteinGansmoe/lanestomp/blob/486cbbeab719667f313054ab6b1994c929e3ff4c/supabase/migrations/20260527141000_add_league_matchup_review_workflow.sql) | Draft/reviewed states and review metadata.                                                              |

## Boundaries and omitted connections

- No Riot-to-OpenAI or observations-to-training arrow is shown. The reviewed guide
  generation input uses champion profiles and matchup context; the inspected
  functions do not demonstrate a direct match-statistics input to that prompt.
- Public counter-pick ranking has additional logic, reviewed mechanical-profile
  reads, optional feature-flag paths and fallback handling. These are outside this
  high-level view; it does not claim every result is exclusively a raw win-rate
  calculation or verify which optional paths are active in production.
- Repository combat profiles are also used by counter-pick components. They are
  shown in the guide workflow to explain the verified AI context, not to claim
  exclusive use there. Other profile/review tables are not conflated with them.
- Supabase here means database and authentication. No object-storage bucket or
  image-storage pipeline was verified, so none is depicted.
- The limiter is a shared in-process instance. No distributed cross-instance
  coordination, global quota guarantee, scheduler, cron, worker fleet or deployment
  topology is claimed.
- Public guide queries filter reviewed records in application code. The inspected
  base table migration allows public selects; the diagram does not claim that draft
  confidentiality is enforced by a reviewed-only database read policy.
- Migration files show intended policies, not proof of the deployed database state.
  Credentials, internal service URLs, tokens, key values and sensitive configuration
  are excluded from the diagram and supporting explanation.
- This review did not execute LaneStomp collection/generation, make Riot/OpenAI calls,
  change data, sign in, publish content or alter the LaneStomp repository.

## Verification and review

Results: `npm run lint`, `npm run format:check`, `npm run build` (TypeScript + Vite)
and `git diff --check` all **PASS**.

Actual browser checks used the locally built production preview on port 4174:

- Tested the architecture at 320, 375, 400, 768, 1024 and 1440px. No document
  horizontal overflow or clipped architecture text; four correctly ordered flows
  at every width. Lists stack vertically below 768px and horizontally above it.
- Visually inspected desktop and mobile cards, arrows, labels and spacing.
  Decorative arrows are hidden from the accessibility tree. New section uses
  H2/H3/H4 hierarchy and the existing light/muted portfolio text colors.
- LaneStomp refresh retains the section. Holidaze has no architecture section;
  its keyboard-operated gallery still updates pressed states. Captured browser
  warning/error log was empty.
- The diagram introduces no interaction or animation. Full screen-reader, WAVE,
  forced-colors and real-device testing remain manual review items; these checks
  do not certify full WCAG compliance.

A start-of-issue file-hash comparison confirms only `ProjectDetailPage.tsx`
changed among pre-existing files, alongside the new architecture component and
this document. The earlier phase-one work and owner-edited case-study text,
project URLs, technology lists, gallery, lockfile and package versions are intact.

No commits, pushes, merges or deployments are authorized or performed.
