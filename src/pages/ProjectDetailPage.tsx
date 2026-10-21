import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Project } from "../features/projects/types";
import { fetchProjectBySlug } from "../features/projects/api";
import { ProjectImageGallery } from "@/features/projects/ProjectImageGallery";
import { ProjectCaseStudy } from "@/features/projects/ProjectCaseStudy";
import { LaneStompArchitecture } from "@/features/projects/LaneStompArchitecture";
import { ProjectDesignComparison } from "@/features/projects/ProjectDesignComparison";
import { Container } from "@/components/layout/Container";
import { ArrowRight } from "@/components/ui/ArrowRight";

type Status = "idle" | "loading" | "success" | "error" | "not_found";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [status, setStatus] = useState<Status>("idle");
  const [project, setProject] = useState<Project | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      if (!slug) return;

      try {
        setStatus("loading");
        setErrorMessage(null);

        const data = await fetchProjectBySlug(slug);
        if (!isMounted) return;

        setProject(data);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        if (!isMounted) return;

        if (message === "NOT_FOUND") {
          setStatus("not_found");
          return;
        }

        setErrorMessage(message);
        setStatus("error");
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!slug) {
    return (
      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-4 text-slate-300">
        Invalid URL.
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded bg-slate-900/40" />
        <div className="h-5 w-full animate-pulse rounded bg-slate-900/40" />
        <div className="h-5 w-5/6 animate-pulse rounded bg-slate-900/40" />
        <div className="h-40 w-full animate-pulse rounded-2xl border border-slate-800/70 bg-slate-900/30" />
      </div>
    );
  }

  if (status === "not_found") {
    return (
      <div className="space-y-4">
        <h1 className="text-slate-300">Could not locate project.</h1>
        <Link
          className="portfolio-focus rounded text-sm text-slate-300 hover:text-white"
          to="/projects"
        >
          ← Go back to projects
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        Could not fetch project: <span className="text-red-100">{errorMessage}</span>
      </div>
    );
  }

  if (!project) return null;
  const images =
    project.imageUrls && project.imageUrls.length > 0
      ? project.imageUrls
      : project.imageUrl
        ? [project.imageUrl]
        : [];

  return (
    <Container className="px-4 py-8 font-portfolio-sans text-portfolio-text sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <article className="space-y-12 lg:space-y-16">
        <Link
          className="portfolio-focus inline-flex min-h-11 items-center gap-3 rounded text-xs text-portfolio-muted transition-colors hover:text-portfolio-text motion-reduce:transition-none"
          to="/projects"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to projects
        </Link>

        <section
          aria-labelledby="project-title"
          className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12"
        >
          <header className="min-w-0 space-y-6 lg:py-2">
            <p className="portfolio-eyebrow">Project</p>
            <h1
              id="project-title"
              className="portfolio-heading break-words text-4xl sm:text-5xl"
            >
              {project.title}
            </h1>

            <p className="max-w-xl break-words text-sm leading-7 text-portfolio-muted sm:text-base sm:leading-8">
              {project.excerpt}
            </p>

            <ul
              aria-label={`${project.title} technologies`}
              className="flex min-w-0 flex-wrap gap-2"
            >
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="max-w-full break-words rounded-full border border-portfolio-border bg-portfolio-background/40 px-3 py-1.5 text-[11px] leading-snug text-portfolio-text"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                className="portfolio-button min-h-11 motion-reduce:transition-none"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} GitHub repository (opens in a new tab)`}
              >
                GitHub <ArrowRight className="h-3.5 w-3.5" />
              </a>
              {project.demoUrl ? (
                <a
                  className="portfolio-button min-h-11 motion-reduce:transition-none"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                >
                  Live demo <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="self-center text-sm text-portfolio-muted">
                  Live demo unavailable
                </span>
              )}
            </div>
          </header>

          <ProjectImageGallery key={project.id} title={project.title} images={images} />
        </section>

        <ProjectCaseStudy content={project.content}>
          {project.designComparison && (
            <ProjectDesignComparison {...project.designComparison} />
          )}
        </ProjectCaseStudy>
        {project.slug === "lanestomp" && <LaneStompArchitecture />}
      </article>
    </Container>
  );
}
