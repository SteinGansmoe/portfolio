import { technologies, type Technology } from "@/data/technologies";

function TechTile({ technology }: { technology: Technology }) {
  return (
    <li className="flex min-h-[50px] min-w-0 items-center gap-2 rounded-lg border border-portfolio-border/70 bg-gradient-to-br from-portfolio-raised to-portfolio-surface px-2 py-3 sm:gap-3 sm:px-3">
      <img
        src={technology.icon}
        alt=""
        width={25}
        height={25}
        loading="lazy"
        className="h-6 w-6 shrink-0"
      />
      <span className="text-[10px] leading-snug text-portfolio-text">
        {technology.name}
      </span>
    </li>
  );
}

export function TechStack() {
  return (
    <section
      aria-labelledby="tech-heading"
      className="min-w-0 lg:border-l lg:border-portfolio-border lg:pl-8"
    >
      <p className="portfolio-eyebrow mb-2">Tech stack</p>
      <h3 id="tech-heading" className="portfolio-heading mb-3 text-2xl">
        Tools I work with
      </h3>
      <ul className="grid grid-cols-3 gap-2">
        {technologies.map((technology) => (
          <TechTile key={technology.name} technology={technology} />
        ))}
      </ul>
    </section>
  );
}
