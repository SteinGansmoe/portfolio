import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectForm, type ProjectFormValues } from "../features/projects/ProjectForm";
import { fetchProjectById, updateProject } from "../features/projects/api";
import type { Project } from "../features/projects/types";
import { uploadProjectImages } from "@/features/projects/storage";

type Status = "loading" | "ready" | "error" | "not_found";

function tagsToText(tags: string[]) {
  return (tags ?? []).join(", ");
}

function parseTags(tagsText: string): string[] {
  return tagsText
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function AdminProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>("loading");
  const [project, setProject] = useState<Project | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      if (!id) return;

      try {
        setStatus("loading");
        const data = await fetchProjectById(id);
        if (!isMounted) return;

        setProject(data);
        setStatus("ready");
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
  }, [id]);

  const initialValues: Partial<ProjectFormValues> = useMemo(() => {
    if (!project) return {};
    return {
      title: project.title,
      slug: project.slug,
      excerpt: project.excerpt,
      content: project.content,
      tagsText: tagsToText(project.tags),
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl ?? "",
      status: project.status ?? "completed",
      isFeatured: !!project.isFeatured,
      sortOrder: 0,
    };
  }, [project]);

  async function handleSubmit(values: ProjectFormValues) {
    if (!id || !project) return;

    let imageUrls = project.imageUrls ?? [];

    if (values.removeImage) imageUrls = [];

    if (values.imageFiles?.length) {
      imageUrls = await uploadProjectImages(values.imageFiles);
    }

    await updateProject(id, {
      title: values.title.trim(),
      slug: values.slug.trim(),
      excerpt: values.excerpt.trim(),
      content: values.content.trim(),
      tags: parseTags(values.tagsText),
      githubUrl: values.githubUrl.trim(),
      demoUrl: values.demoUrl.trim() || null,
      status: values.status,
      isFeatured: values.isFeatured,
      sortOrder: values.sortOrder,

      imageUrls,
      imageUrl: imageUrls[0] ?? null,
    });

    navigate("/admin", { replace: true });
  }

  if (!id) {
    return (
      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-4 text-slate-300">
        Invalid URL.
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-4 text-slate-300">
        Loading project…
      </div>
    );
  }

  if (status === "not_found") {
    return (
      <div className="space-y-4">
        <p className="text-slate-300">Could not locate project.</p>
        <Link className="text-sm text-slate-300 hover:text-white" to="/admin">
          ← Go Back
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

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link className="text-sm text-slate-300 hover:text-violet-400" to="/admin">
          ← Go back
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Edit project</h1>
        <p className="text-slate-300">Update content and save.</p>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5">
        <ProjectForm
          initialValues={initialValues}
          initialImageUrls={
            project?.imageUrls ?? (project?.imageUrl ? [project.imageUrl] : [])
          }
          submitLabel="Save changes"
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
