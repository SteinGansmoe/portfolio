import { ArrowRight } from "@/components/ui/ArrowRight";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <article className="grid min-w-0 gap-4 rounded-portfolio border border-portfolio-border bg-gradient-to-br from-portfolio-surface to-portfolio-background p-3 font-portfolio-sans transition-colors hover:border-portfolio-muted/50 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] sm:gap-5">
      <div className="aspect-[16/10] w-full min-w-0 overflow-hidden rounded-md bg-portfolio-background sm:aspect-auto sm:min-h-44">
        <img
          src={image}
          alt={`${title} project screenshot`}
          width={640}
          height={400}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-col items-start pb-1 sm:py-0.5 sm:pr-1">
        <div className="flex w-full min-w-0 items-start gap-1">
          <h2 className="portfolio-heading min-w-0 break-words text-xl">{title}</h2>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} GitHub repository (opens in a new tab)`}
              className="portfolio-focus -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded text-portfolio-muted transition-colors hover:text-portfolio-text"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5"
              >
                <path
                  d="M14 4h6v6m0-6L10 14m0-9H5v15h15v-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>

        <p className="mt-2 w-full break-words text-[13px] leading-relaxed text-portfolio-muted">
          {description}
        </p>

        <ul
          aria-label={`${title} technologies`}
          className="mb-2 mt-3 flex w-full min-w-0 flex-wrap gap-1.5"
        >
          {technologies.map((tech) => (
            <li
              key={tech}
              className="max-w-full break-words rounded-full border border-portfolio-border bg-portfolio-background/40 px-2.5 py-1 text-[10px] leading-snug text-portfolio-text"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex w-full flex-wrap items-center gap-x-5 gap-y-1 text-xs">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} GitHub repository (opens in a new tab)`}
              className="portfolio-focus inline-flex min-h-11 items-center gap-2 rounded text-portfolio-text transition-colors hover:text-white"
            >
              GitHub <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} live site (opens in a new tab)`}
              className="portfolio-focus inline-flex min-h-11 items-center gap-2 rounded text-portfolio-text transition-colors hover:text-white"
            >
              View project <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
