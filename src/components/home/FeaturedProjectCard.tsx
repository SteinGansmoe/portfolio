import { Link } from "react-router-dom";
import type { Project } from "@/features/projects/types";
import { ArrowRight } from "@/components/ui/ArrowRight";

type Props = { project: Project };

// Homepage presentation only: the Projects page retains its existing ProjectCard.
export function FeaturedProjectCard({ project }: Props) {
  return (
    <article className="grid min-w-0 gap-5 rounded-portfolio border border-portfolio-border bg-gradient-to-br from-portfolio-surface to-portfolio-background p-3 transition-colors hover:border-portfolio-muted/50 sm:grid-cols-[0.95fr_1fr]">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="portfolio-focus block overflow-hidden rounded-md bg-portfolio-background"
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} homepage screenshot`}
            loading="lazy"
            className="aspect-[16/10] h-full min-h-44 w-full object-contain"
          />
        ) : (
          <span className="flex aspect-[16/10] items-center justify-center text-xs text-portfolio-muted">
            Screenshot unavailable
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-col items-start py-1 pr-2">
        <div className="flex items-center gap-2">
          <h3 className="portfolio-heading text-xl">{project.title}</h3>
          <a
            href={project.demoUrl || project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} ${project.demoUrl ? "live site" : "repository"} (opens in a new tab)`}
            className="portfolio-focus inline-flex h-7 w-7 items-center justify-center rounded text-portfolio-muted transition-colors hover:text-portfolio-text"
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
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-portfolio-muted">
          {project.excerpt}
        </p>
        <ul
          aria-label={`${project.title} technologies`}
          className="mb-5 mt-4 flex flex-wrap gap-1.5"
        >
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-portfolio-border bg-portfolio-background/40 px-2 py-1 text-[10px] leading-none text-portfolio-text"
            >
              {tag}
            </li>
          ))}
        </ul>
        <Link
          to={`/projects/${project.slug}`}
          className="portfolio-focus mt-auto inline-flex min-h-8 items-center gap-4 rounded text-xs text-portfolio-text transition-colors hover:text-white"
        >
          View project <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
