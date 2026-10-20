import { Container } from "@/components/layout/Container";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Link } from "react-router-dom";
import { TechnologyTile } from "@/components/ui/TechnologyTile";
import { technologyCatalog } from "@/data/technologies";

const approach = [
  {
    title: "Understand the problem",
    description:
      "I enjoy getting to the heart of a problem before jumping into implementation. Understanding what needs to work gives me a clearer place to start.",
  },
  {
    title: "Think through the pieces",
    description:
      "I like planning how an application should work and how its different parts fit together, before turning the idea into something I can use.",
  },
  {
    title: "Keep things clear",
    description:
      "I value clean, understandable code and accessible interfaces. I want what I build to make sense to the people using it and the people reading the code.",
  },
  {
    title: "Learn by building",
    description:
      "Building, testing, debugging and improving are how I learn. Working through a difficult problem is often where things start to click.",
  },
  {
    title: "Use AI thoughtfully",
    description:
      "AI-assisted development tools are part of my workflow. I still prioritise understanding the solutions, reviewing the code and checking that it works.",
  },
  {
    title: "Keep growing",
    description:
      "Frontend is my starting point, and I'm interested in growing into fullstack development. There's always another part of the application to understand.",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Data",
    technologies: ["Supabase", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Tools & Workflow",
    technologies: ["Git", "GitHub", "VS Code", "Vercel", "AI-assisted development"],
  },
];

type Milestone = {
  phase: string;
  title: string;
  description: string;
  dateTime?: string;
};

const milestones: Milestone[] = [
  {
    phase: "Before development",
    title: "A new direction",
    description:
      "A background in working life before making the transition into development.",
  },
  {
    phase: "Final school project",
    title: "Building Holidaze",
    description: "Built Holidaze as my final frontend development school project.",
  },
  {
    phase: "January 2026",
    dateTime: "2026-01",
    title: "Graduated from Noroff",
    description: "Completed my studies in frontend development.",
  },
  {
    phase: "Independent projects",
    title: "Continuing with LaneStomp",
    description:
      "Kept learning by building independent projects, including a League of Legends platform inspired by my love for gaming.",
  },
  {
    phase: "Now",
    title: "Looking for my first developer role",
    description:
      "Ready to contribute, collaborate with others and keep learning in my first professional developer opportunity.",
  },
];

export function AboutPage() {
  return (
    <>
      <Container className="px-4 font-portfolio-sans text-portfolio-text sm:px-6 lg:px-8">
        <section
          id="about-introduction"
          tabIndex={-1}
          aria-labelledby="introduction-heading"
          className="grid scroll-mt-24 gap-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16"
        >
          <div>
            <p className="portfolio-eyebrow mb-3">Introduction</p>
            <h2
              id="introduction-heading"
              className="portfolio-heading text-3xl sm:text-4xl"
            >
              The person behind the code
            </h2>
          </div>
          <div className="max-w-[68ch] space-y-5 text-[15px] leading-[1.85] text-portfolio-muted">
            <p className="text-base text-portfolio-text sm:text-lg">
              Hey! I'm a frontend developer based in Norway. I've always been curious
              about technology and loved figuring out how things work.
            </p>
            <p>
              As a kid, I daydreamed about artificial intelligence becoming reality, back
              when mobile phones didn't even have color screens. Seeing that future take
              shape still excites me.
            </p>
            <p>
              Problem-solving drew me into development: trying different approaches to a
              difficult challenge until everything finally clicks. That's a feeling I hope
              never goes away.
            </p>
            <p>
              Since graduating in frontend development from Noroff, I've kept building,
              including LaneStomp, a League of Legends platform inspired by my love for
              gaming. I enjoy planning how the pieces fit, bringing an idea to life and
              finding ways to improve it.
            </p>
            <p>
              I'm now looking for my first professional developer role, where I can
              contribute, collaborate and keep learning.
            </p>
            <p>Away from the code, you'll probably find me gaming.</p>
          </div>
        </section>

        <section
          aria-labelledby="approach-heading"
          className="border-t border-portfolio-border py-12 sm:py-16"
        >
          <p className="portfolio-eyebrow mb-3">The way I work</p>
          <h2
            id="approach-heading"
            className="portfolio-heading mb-7 text-3xl sm:text-4xl"
          >
            How I approach development
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((item) => (
              <li
                key={item.title}
                className="min-w-0 rounded-portfolio border border-portfolio-border bg-portfolio-surface/60 p-5 sm:p-6"
              >
                <h3 className="portfolio-heading text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-portfolio-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="skills-heading"
          className="border-t border-portfolio-border py-12 sm:py-16"
        >
          <p className="portfolio-eyebrow mb-3">What I build with</p>
          <h2 id="skills-heading" className="portfolio-heading mb-7 text-3xl sm:text-4xl">
            Skills &amp; technologies
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => (
              <section
                key={group.title}
                aria-label={group.title}
                className="min-w-0 rounded-portfolio border border-portfolio-border bg-portfolio-surface/40 p-5 sm:p-6"
              >
                <h3 className="mb-4 text-sm font-medium">{group.title}</h3>
                <ul className="grid auto-rows-fr grid-cols-2 gap-2 md:grid-cols-1 xl:grid-cols-2">
                  {group.technologies.map((technology) => (
                    <TechnologyTile
                      key={technology}
                      technology={
                        technologyCatalog.get(technology) ?? { name: technology }
                      }
                      className="text-xs"
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="journey-heading"
          className="grid gap-8 border-t border-portfolio-border py-12 sm:py-16 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16"
        >
          <div>
            <p className="portfolio-eyebrow mb-3">The path so far</p>
            <h2 id="journey-heading" className="portfolio-heading text-3xl sm:text-4xl">
              My journey
            </h2>
          </div>
          <ol className="ml-1 max-w-[68ch] border-l border-portfolio-border">
            {milestones.map((milestone) => (
              <li key={milestone.title} className="relative pb-8 pl-6 last:pb-0 sm:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[4.5px] top-1 h-2 w-2 rounded-full bg-portfolio-muted"
                />
                <p className="portfolio-eyebrow mb-2">
                  {milestone.dateTime ? (
                    <time dateTime={milestone.dateTime}>{milestone.phase}</time>
                  ) : (
                    milestone.phase
                  )}
                </p>
                <h3 className="portfolio-heading text-xl">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-portfolio-muted">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="contact-heading"
          className="mb-12 flex flex-col items-start gap-6 rounded-portfolio border border-portfolio-border bg-gradient-to-br from-portfolio-surface to-portfolio-background p-6 sm:mb-16 sm:p-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-[60ch]">
            <p className="portfolio-eyebrow mb-3">Get in touch</p>
            <h2 id="contact-heading" className="portfolio-heading text-3xl sm:text-4xl">
              Let's build something together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-portfolio-muted">
              I'm always interested in new opportunities, interesting ideas, and
              connecting with people who enjoy building great things.
            </p>
          </div>
          <Link to="/contact" className="portfolio-button min-h-11 shrink-0">
            Get in touch <ArrowRight />
          </Link>
        </section>
      </Container>
    </>
  );
}
