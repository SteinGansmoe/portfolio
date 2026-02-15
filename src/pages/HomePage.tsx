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
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Building modern web products with React + TypeScript.
        </h1>
        <p className="max-w-2xl text-slate-300">
          I focus on clean UX, maintainable code, and shipping features that users actually need.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="btn-primary"
          >
            View projects
          </Link>
          <a
            href="https://github.com/SteinGansmoe"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Featured */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Featured projects</h2>
          <Link className="text-sm text-slate-300 hover:text-violet-400" to="/projects">
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
