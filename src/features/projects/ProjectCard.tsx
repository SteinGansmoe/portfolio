import { useNavigate } from "react-router-dom";
import type { Project } from "@/features/projects/types";

type Props = {
  project: Project;
};

function StatusBadge({ status }: { status?: "active" | "completed" }) {
  if (!status) return null;

  const isActive = status === "active";

  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-tight";

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
      className="group cursor-pointer rounded-xl border border-slate-800/60 bg-slate-900/30 p-5 transition-all duration-300 hover:border-violet-400 hover:bg-slate-900/40 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_5px_rgba(139,92,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
    >
      {/* Image */}
      <div className="mb-4 overflow-hidden rounded-lg border border-slate-800/60">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} preview`}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-40 w-full bg-slate-900/40" />
        )}
      </div>

      {/* Title + Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight text-white group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-300">{project.excerpt}</p>
        </div>

        <StatusBadge status={project.status} />
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-800 bg-slate-950/40 px-2.5 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* External Links */}
      <div className="mt-5 flex items-center gap-4 text-sm">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={stopCardClick}
          className="text-slate-300 hover:text-violet-400 transition-colors"
        >
          GitHub →
        </a>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={stopCardClick}
            className="text-slate-300 hover:text-violet-400 transition-colors"
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
