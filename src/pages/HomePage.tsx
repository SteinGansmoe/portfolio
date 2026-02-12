import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../features/projects/ProjectCard";
import type { Project } from "../features/projects/types";
import { fetchFeaturedProjects } from "../features/projects/api";

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const data = await fetchFeaturedProjects(3);
        if (!mounted) return;
        setProjects(data);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="space-y-10">
      {/* Hero */}
      <div className="space-y-4">
        <p className="text-sm text-slate-400">Front-End Developer</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Building modern web products with React + TypeScript.
        </h1>
        <p className="max-w-2xl text-slate-300">
          I focus on clean UX, maintainable code, and shipping features that users actually need.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
          >
            View projects
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-slate-500"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Featured */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Featured projects</h2>
          <Link className="text-sm text-slate-300 hover:text-white" to="/projects">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-slate-800/70 bg-slate-900/30"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
