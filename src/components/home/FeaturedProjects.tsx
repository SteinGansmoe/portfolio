import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/features/projects/types";
import { fetchFeaturedProjects } from "@/features/projects/api";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ArrowRight } from "@/components/ui/ArrowRight";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let mounted = true;
    fetchFeaturedProjects(2)
      .then((data) => {
        if (mounted) {
          setProjects(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (mounted) setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="featured-projects"
      tabIndex={-1}
      aria-labelledby="featured-heading"
      className="portfolio-section scroll-mt-24"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="portfolio-eyebrow mb-2">Featured projects</p>
          <h2 id="featured-heading" className="portfolio-heading text-[32px]">
            Selected work
          </h2>
        </div>
        <Link
          to="/projects"
          className="portfolio-focus inline-flex min-h-8 items-center gap-5 rounded text-xs text-portfolio-muted underline decoration-portfolio-border underline-offset-4 transition-colors hover:text-portfolio-text"
        >
          View all projects <ArrowRight />
        </Link>
      </div>
      {status === "loading" && (
        <p role="status" className="text-sm text-portfolio-muted">
          Loading projects…
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-portfolio-muted">
          Projects could not be loaded. Please try again.
        </p>
      )}
      {status === "ready" && projects.length === 0 && (
        <p className="text-sm text-portfolio-muted">No projects published yet.</p>
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
