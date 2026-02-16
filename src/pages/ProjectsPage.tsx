import { useEffect, useState } from "react";
import { ProjectCard } from "../features/projects/ProjectCard";
import type { Project } from "../features/projects/types";
import { fetchProjects } from "../features/projects/api";

type Status = "idle" | "loading" | "success" | "error";

export function ProjectsPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [projects, setProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      try {
        setStatus("loading");
        setErrorMessage(null);

        const data = await fetchProjects();
        if (!isMounted) return;

        setProjects(data);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        if (!isMounted) return;

        setErrorMessage(message);
        setStatus("error");
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-slate-300">
          Selected projects I have made and is currently building.
        </p>
      </div>

      {status === "loading" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl border border-slate-800/70 bg-slate-900/30"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Could not fetch projects: <span className="text-red-100">{errorMessage}</span>
        </div>
      )}

      {status === "success" && projects.length === 0 && (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-4 text-sm text-slate-300">
          No projects yet. Add a new project to Supabase{" "}
          <code className="text-slate-100">projects</code>.
        </div>
      )}

      {status === "success" && projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
