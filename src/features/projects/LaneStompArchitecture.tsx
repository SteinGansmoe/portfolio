import { ArrowRight } from "@/components/ui/ArrowRight";

type ArchitectureFlow = {
  title: string;
  steps: { title: string; detail: string }[];
};

// Verified against LaneStomp commit 486cbbe; source map in docs/lanestomp-architecture.md.
// Arrows describe data flow, not individual network calls or deployment boundaries.
const flows: ArchitectureFlow[] = [
  {
    title: "Administrative access",
    steps: [
      { title: "Browser sign-in", detail: "Login from the Next.js client interface" },
      { title: "Supabase Auth", detail: "Authenticates the user and provides a session" },
      {
        title: "Admin access checks",
        detail:
          "Server actions verify admin access; database policies govern review writes",
      },
    ],
  },
  {
    title: "Match statistics",
    steps: [
      { title: "Riot APIs", detail: "Match and player data" },
      {
        title: "Server-side collection",
        detail: "Rate-limited requests, validation and aggregation",
      },
      {
        title: "Supabase database",
        detail: "Stored observations and matchup statistics",
      },
      {
        title: "Counter-pick interface",
        detail: "Browser reads through the statistics provider",
      },
    ],
  },
  {
    title: "AI-assisted guide drafts",
    steps: [
      {
        title: "Champion knowledge",
        detail: "Structured combat profiles in the repository",
      },
      {
        title: "Next.js + OpenAI",
        detail: "Server actions request a draft, validate the response and save it",
      },
      { title: "Supabase database", detail: "Generated guides saved as drafts" },
    ],
  },
  {
    title: "Review and publication",
    steps: [
      { title: "Admin interface", detail: "Review, edit and mark guides as reviewed" },
      {
        title: "Supabase database",
        detail: "Review status and guide content are updated",
      },
      {
        title: "Public Next.js pages",
        detail: "Server-rendered guides query reviewed content",
      },
    ],
  },
];

function ArchitectureFlowDiagram({ title, steps }: ArchitectureFlow) {
  return (
    <div className="min-w-0 space-y-4">
      <h3 className="portfolio-heading text-xl">{title}</h3>
      <ol className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative min-w-0 rounded-portfolio border border-portfolio-border bg-portfolio-surface p-4"
          >
            <h4 className="text-sm font-medium leading-6 text-portfolio-text">
              {step.title}
            </h4>
            <p className="mt-2 text-xs leading-6 text-portfolio-muted">{step.detail}</p>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-6 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center text-portfolio-muted md:-right-6 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
              >
                <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function LaneStompArchitecture() {
  return (
    <section
      aria-labelledby="lanestomp-architecture-heading"
      className="min-w-0 border-t border-portfolio-border pt-10 sm:pt-12"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-12">
        <p className="portfolio-eyebrow">System design</p>
        <div className="min-w-0 max-w-3xl space-y-5">
          <h2
            id="lanestomp-architecture-heading"
            className="portfolio-heading text-2xl sm:text-3xl"
          >
            System Architecture
          </h2>
          <p className="text-sm leading-7 text-portfolio-muted sm:text-base sm:leading-8">
            LaneStomp combines a Next.js application, Supabase and external services to
            support data collection, content management and player-facing matchup
            guidance. Public pages and interactive browser components share stored data,
            while administrative server actions handle Riot collection and AI-assisted
            generation.
          </p>
        </div>
      </div>

      <figure className="mt-8 min-w-0 space-y-8 rounded-portfolio border border-portfolio-border bg-portfolio-background p-4 sm:p-6">
        {flows.map((flow) => (
          <ArchitectureFlowDiagram key={flow.title} {...flow} />
        ))}
        <figcaption className="border-t border-portfolio-border pt-5 text-xs leading-6 text-portfolio-muted">
          Read each flow from left to right on desktop, or top to bottom on mobile. Arrows
          show data flow. OpenAI is called by the Next.js server; it does not write
          directly to Supabase. The collection and guide-generation paths are separate
          workflows.
        </figcaption>
      </figure>

      <dl className="mt-8 grid gap-6 text-sm leading-7 text-portfolio-muted sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <dt className="font-medium text-portfolio-text">
            Application and authentication
          </dt>
          <dd>
            Next.js App Router provides server-rendered guide pages and interactive client
            components. Browser sign-in uses Supabase Auth. Generation and collection
            actions verify the session and admin role; browser-based review writes use
            Supabase with database row-level security.
          </dd>
        </div>
        <div className="min-w-0 space-y-2">
          <dt className="font-medium text-portfolio-text">Riot data collection</dt>
          <dd>
            A shared API client waits for request capacity, observes Riot rate-limit
            headers and retries rate-limited requests within a bounded retry budget.
            Collection code validates match observations and rebuilds aggregate statistics
            for the counter-pick interface.
          </dd>
        </div>
        <div className="min-w-0 space-y-2">
          <dt className="font-medium text-portfolio-text">
            Knowledge and draft generation
          </dt>
          <dd>
            Champion combat profiles are TypeScript data in the repository. Server actions
            combine them with the selected champions, role and admin notes, call OpenAI,
            validate the generated sections and store draft guides in Supabase.
          </dd>
        </div>
        <div className="min-w-0 space-y-2">
          <dt className="font-medium text-portfolio-text">
            Reviewed content reaches players
          </dt>
          <dd>
            Admins edit and approve guide content by changing its review status. Public
            guide queries select reviewed records. Separately, the browser counter-pick
            interface reads stored statistics through its provider; it does not collect
            Riot matches or generate AI guides on a player request.
          </dd>
        </div>
      </dl>
    </section>
  );
}
