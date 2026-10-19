import { Link } from "react-router-dom";
import { ArrowRight } from "@/components/ui/ArrowRight";
// import type { Project } from "@/features/projects/types";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}


export function ProjectCard({ 
  id, 
  title, 
  description, 
  image, 
  technologies, 
  githubUrl, 
  liveUrl 
}:ProjectCardProps) {
  return ( 
    <article className="grid min-w-0 gap-1  rounded-portfolio border border-portfolio-border bg-gradient-to-br from-portfolio-surface to-portfolio-background p-3 transition-colors hover:border-portfolio-muted/50 sm:grid-cols-[280px_1fr]">
    <img
    src={image}
    alt={`${title} screenshot`}
    width={260}
    height={140}
    loading="lazy"
    className="aspect-[16/10] object-contain"
          />
    <div className="flex min-w-0 flex-col items-start py-1 pr-2">
      <div className="flex items-center gap-2">
      <h3 className="portfolio-heading text-xl">{title}</h3>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
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
        {description}
      </p>
    <div className="flex flex-wrap gap-2 mt-2">
      {technologies.map((tech) => (
        <p key={tech} className="rounded border border-portfolio-border bg-portfolio-background/40 px-2 py-1 text-[10px] leading-none text-portfolio-text">
          {tech}
        </p>
      ))}
    </div>
    <div className="mt-auto flex items-center gap-4 text-sm">
{githubUrl && (
      <Link
          to={githubUrl || "#"}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} Github repository (opens in a new tab)`}
          className="portfolio-focus inline-flex min-h-8 items-center gap-4 rounded text-xs text-portfolio-text transition-colors hover:text-white"
        >
          Github <ArrowRight />
        </Link> 
)}
    <Link
          to={liveUrl || "#"}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} live site (opens in a new tab)`}
          className="portfolio-focus inline-flex min-h-8 items-center gap-4 rounded text-xs text-portfolio-text transition-colors hover:text-white"
        >
          View project <ArrowRight />
        </Link> 
        </div> 
    </div>  
    </article>
  );
}














































/*
import { useNavigate } from "react-router-dom";
import type { Project } from "@/features/projects/types";

type Props = {
  project: Project;
};

function StatusBadge({ status }: { status?: "active" | "completed" }) {
  if (!status) return null;

  const isActive = status === "active";

  const base =
    "inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium tracking-tight";

  const styles = isActive
    ? "border-violet-500/30 bg-violet-500/10 text-violet-200"
    : "border-slate-700/60 bg-slate-950/30 text-slate-300";

  return (
    <span className={`${base} ${styles}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-violet-400" : "bg-slate-500"
        }`}
      />
      {isActive ? "Active" : "Completed"}
    </span>
  );
}

export function ProjectCard({ project }: Props) {
  const navigate = useNavigate();

  function goToProject() {
    navigate(`/projects/${project.slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToProject();
    }
  }

  function stopCardClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Open project: ${project.title}`}
      onClick={goToProject}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer rounded border border-slate-800/50 bg-slate-900/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:bg-slate-900/40 hover:shadow-[0_8px_40px_-5px_rgba(139,92,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
    >
      */{/* Image */} /*
      <div className="mb-4 aspect-[16/9] overflow-hidden border border-slate-800/50 bg-slate-900/40">
        {project.imageUrl ? (
          <img
            style={{ imageRendering: "auto" }} // Remove this line
            src={project.imageUrl}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-slate-900/40" />
        )}
      </div>

     */ {/* Title + Status */} /*
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-violet-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-300">{project.excerpt}</p>
        </div>

        <StatusBadge status={project.status} />
      </div>

     */ {/* Tags */} /*
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-slate-800 bg-slate-950/40 px-2.5 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

     */ {/* External Links */} /* 
      <div className="mt-5 flex items-center gap-4 text-sm">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={stopCardClick}
          className="text-slate-300 transition-colors hover:text-violet-400"
        >
          GitHub →
        </a>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={stopCardClick}
            className="text-slate-300 transition-colors hover:text-violet-400"
          >
            Live demo →
          </a>
        ) : (
          <span className="text-slate-600">Live demo</span>
        )}
      </div>
    </article>
  );
}
*/



