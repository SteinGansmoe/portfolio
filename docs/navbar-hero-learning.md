# Portfolio v2: navbar and hero

This implements issue #2 only. The supplied Norwegian valley photograph and the approved reference guide the header and hero. Existing project cards, case studies, About page and footer are retained.

## Files changed for this issue

| File                                  | Purpose                                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/layout/Navbar.tsx`    | SG identity, serif name, desktop links, shared email links, mobile disclosure button, active/focus states and Escape handling.                   |
| `src/components/home/Hero.tsx`        | Reusable semantic hero: supplied photograph, layered gradients, reference copy, fluid serif heading, two CTAs, decorative motto and scroll link. |
| `src/pages/HomePage.tsx`              | Replaces the old hero with `<Hero />`, keeps the featured-project UI in its existing container, and adds a focusable scroll destination.         |
| `src/components/layout/AppLayout.tsx` | Lets the home hero fill the viewport width immediately below the navbar. Other routes keep their existing container and vertical spacing.        |
| `src/lib/contact.ts`                  | Stores the shared `mailto:steina89@hotmail.com` destination in one place.                                                                        |
| `public/images/valley-background.jpg` | Unmodified copy of the photograph supplied by the user.                                                                                          |
| `docs/navbar-hero-learning.md`        | This file: implementation explanation, checks and exercises.                                                                                     |

No package, lockfile, global stylesheet or Tailwind configuration changes are needed for this issue. Earlier Supabase migration changes remain in the working tree.

## React and TypeScript decisions

`Hero` owns only the introductory section. `HomePage` continues loading and displaying projects through the existing local API. This separation lets the hero change independently of the project UI.

`Navbar` uses `useState(false)` for the mobile menu's open/closed state. The functional update `setMenuOpen((open) => !open)` always toggles the current state. Route and email link clicks close it. This is a disclosure navigation, not a modal dialog: ordinary Tab navigation remains available, with no focus trap.

`useRef<HTMLButtonElement>(null)` tells TypeScript that the ref will point to a real button. Pressing Escape closes the menu and uses `menuButton.current?.focus()` to return focus. Optional chaining handles the possibility that the ref is still null.

`aria-expanded` reflects the actual React state, and `aria-controls` names the navigation element. The toggle has a changing accessible label. Decorative SVGs and the photograph are excluded from redundant screen-reader output; the section is named by its visible heading.

React Router's `NavLink` supplies active navigation styling and `aria-current`. `Link` handles the internal Projects CTA without a full reload. Email uses native anchors, as does the scroll indicator. The latter targets a section with `tabIndex={-1}`, allowing fragment navigation to move focus without adding an extra Tab stop.

`useLocation().pathname` controls only the home page's full-width layout. Reading `pathname` rather than the complete URL means the `#featured-projects` fragment does not change that layout.

## Tailwind and visual decisions

Styles are scoped to these components. Existing `.btn-primary` and `.btn-secondary` classes are retained for the rest of the site. The new white/outlined CTAs use their own Tailwind classes.

The base classes describe mobile styling; `md:` switches to inline navigation at 768px and adjusts hero spacing and photograph positioning. The menu uses `hidden` when closed, so its links are also removed from keyboard navigation. Desktop `md:flex` makes it visible independently of mobile state.

The hero's `relative isolate` creates a local stacking context. The absolutely positioned image and gradient layers sit behind the text. `object-cover` fills the available image area and crops instead of stretching; `object-position` controls which part of the valley remains visible. On desktop the photo is capped at 96rem wide to prevent excessive enlargement on wide displays. A CSS image mask fades its left edge into the background, avoiding a visible seam where the photo begins. Gradient layers preserve contrast over the selected image, with a stronger mobile overlay.

`clamp(2.75rem, 6vw, 4.25rem)` scales the name between a minimum and maximum size. Georgia with Times New Roman/serif fallbacks supplies the reference's serif treatment without a new font dependency. The reference does not specify a font file, so exact glyph matching is not guaranteed across systems.

Visible focus rings use `focus-visible`, giving keyboard users a clear indicator. Buttons and links use native semantics. No animation is required for the scroll indicator, so there is no automatic motion.

The supplied photograph differs from the landscape depicted in the design mockup; its crop follows the selected photograph. Email links open the visitor's configured email application and do not send a message automatically.

## Validation

- `npm run lint` and `npm run build` (including `tsc -b`).
- Focused Prettier check on this issue's edited source and documentation.
- Desktop visual comparison with the approved reference.
- Mobile checks at 390px and 320px, including horizontal overflow.
- Keyboard menu activation, Escape closing/focus return, route navigation/menu closing, Projects CTA and scroll destination/focus.
- All three contact links inspected for the correct shared email destination.
- Local photograph load and browser warning/error log checks.
- Package and lockfile hashes checked against their values before this issue's edits.

To run locally: `npm run dev`, then open the Vite URL. No deployment or push is included.

## Three small experiments

1. In `Hero.tsx`, change the heading's maximum `4.25rem` to `3.75rem`. Resize the browser and observe where `clamp()` stops growing. Restore the original value afterward.
2. Change the desktop photograph's `object-[center_42%]` to `object-[center_55%]`. Compare the visible river and mountains without changing the image dimensions. Restore it afterward.
3. In `Navbar.tsx`, change one `focus-visible:ring-white` value to `focus-visible:ring-amber-300`. Navigate using Tab, open the menu with Enter, and close it with Escape. Compare keyboard focus with mouse hover. Restore it afterward.

## Three understanding questions

1. Why does the menu toggle use a functional state update, and why is the button ref typed as `HTMLButtonElement`?
2. What changes if `object-cover` becomes `object-contain`, and how does the gradient help preserve text contrast?
3. Why do the Projects CTA, email CTA and down-arrow use different destinations, and what does `tabIndex={-1}` do for the scroll target?
