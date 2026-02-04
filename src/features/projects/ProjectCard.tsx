import { Link } from "react-router-dom";
import type { Project } from "./types";

type Props = {
  project: Project;
};

function StatusBadge({ status }: { status?: Project["status"] }) {
  if (!status) return null;

  const styles =
    status === "active"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
      : "border-slate-700 bg-slate-900/60 text-slate-200";

  const label = status === "active" ? "Active" : "Completed";

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${styles}`}>
      {label}
    </span>
  );
}

export function ProjectCard({ project }: Props) {
  return (
    <article className="group relative rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5 transition hover:border-slate-700 hover:bg-slate-900/40">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight text-white">
            <Link to={`/projects/${project.slug}`} className="outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
              {project.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-300">{project.excerpt}</p>
        </div>

        <StatusBadge status={project.status} />
      </div>

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

      <div className="mt-5 flex items-center gap-3 text-sm">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-slate-300 hover:text-white"
        >
          GitHub →
        </a>

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white"
          >
            Live demo →
          </a>
        ) : (
          <span className="text-slate-600">Live demo</span>
        )}
      </div>

      {/* “clickable card” feel */}
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 rounded-2xl"
        aria-label={`Open project: ${project.title}`}
      />
      {/* But keep links clickable */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl" />
      <div className="pointer-events-auto relative" />
    </article>
  );
}
