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
      <section className="relative overflow-hidden rounded border border-slate-800/50 bg-slate-950/60">
  {/* background glow layers */}
  <div className="pointer-events-none absolute -top-24 right-[-160px] h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-28 left-[-180px] h-[460px] w-[460px] rounded-full bg-sky-500/10 blur-3xl" />
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/60" />
      {/* Hero */}
        <div className="relative px-6 py-10 sm:px-10">
      <div className="space-y-4">
        <p className="text-sm text-slate-400">Front-End Developer</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Building modern web products with React + TypeScript.
        </h1>
        <p className="max-w-2xl text-slate-300">
          I focus on clean UX, maintainable code, and shipping features that users
          actually need.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/projects" className="btn-primary">
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
    </div>
  </section>
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
