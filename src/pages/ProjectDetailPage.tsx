import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Project } from "../features/projects/types";
import { fetchProjectBySlug } from "../features/projects/api";
import { ProjectImageGallery } from "@/features/projects/ProjectImageGallery";
import ReactMarkdown from "react-markdown";

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
    <article className="space-y-6">
      <div className="space-y-2">
        <Link className="text-sm text-slate-300 hover:text-violet-400" to="/projects">
          ← Go back
        </Link>

        <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left: gallery */}
          <ProjectImageGallery title={project.title} images={images} />

          {/* Right: info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded border border-slate-800 bg-slate-950/30 px-2.5 py-1 text-xs text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-slate-300">{project.excerpt}</p>

            <div className="flex flex-wrap gap-3">
              <a
                className="btn-secondary"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              {project.demoUrl ? (
                <a
                  className="btn-primary"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo
                </a>
              ) : (
                <span className="text-sm text-slate-500">Live demo unavailable</span>
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="rounded border border-slate-800/70 bg-slate-900/30 p-5">
        <h2 className="mb-5 text-3xl font-semibold text-white">Case study</h2>
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
