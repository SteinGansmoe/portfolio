import { useNavigate, Link } from "react-router-dom";
import { ProjectForm, type ProjectFormValues } from "@/features/projects/ProjectForm";
import { uploadProjectImage } from "@/features/projects/storage";

import { createProject } from "@/features/projects/api";

function parseTags(tagsText: string): string[] {
  return tagsText
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function AdminProjectNewPage() {
  const navigate = useNavigate();

  async function handleSubmit(values: ProjectFormValues) {
    let imageUrl: string | null = null;
    if (values.imageFile) {
      imageUrl = await uploadProjectImage(values.imageFile);
    }

    await createProject({
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
      imageUrl,
    });

    navigate("/admin", { replace: true });
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link className="text-sm text-slate-300 hover:text-violet-400" to="/admin">
          ← Go back
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">New project</h1>
        <p className="text-slate-300">Add a new project.</p>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5">
        <ProjectForm submitLabel="Create project" onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
