import { useNavigate, Link } from "react-router-dom";
import { ProjectForm, type ProjectFormValues } from "../features/projects/ProjectForm";
import { createProject } from "../features/projects/api";

function parseTags(tagsText: string): string[] {
  return tagsText
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function AdminProjectNewPage() {
  const navigate = useNavigate();

  async function handleSubmit(values: ProjectFormValues) {
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
    });

    navigate("/admin", { replace: true });
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link className="text-sm text-slate-300 hover:text-white" to="/admin">
          ← Tilbake
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Ny prosjekt</h1>
        <p className="text-slate-300">Legg inn et nytt prosjekt.</p>
      </div>

      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5">
        <ProjectForm submitLabel="Create project" onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
