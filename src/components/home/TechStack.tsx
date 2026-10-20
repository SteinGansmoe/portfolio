import { technologies } from "@/data/technologies";
import { TechnologyTile } from "@/components/ui/TechnologyTile";

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
          <TechnologyTile key={technology.name} technology={technology} />
        ))}
      </ul>
    </section>
  );
}
