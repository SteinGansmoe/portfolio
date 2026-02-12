import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../features/auth/auth";
import { deleteProject, fetchProjects } from "../features/projects/api";
import type { Project } from "../features/projects/types";

type Status = "idle" | "loading" | "success" | "error";

export function AdminDashboardPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [projects, setProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function load() {
    try {
      setStatus("loading");
      setErrorMessage(null);
      const data = await fetchProjects();
      setProjects(data);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleLogout() {
    await signOut();
    window.location.href = "/";
  }

  async function handleDelete(id: string, title: string) {
    const ok = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!ok) return;

    try {
      await deleteProject(id);
      // reload (enkelt og robust)
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert(message);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="text-slate-300">Add, Edit or Delete Projects.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="btn-primary"
          >
            + New Project
          </Link>

          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Log out
          </button>
        </div>
      </div>

      {status === "loading" && (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5 text-slate-300">
          Loading projects…
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {status === "success" && (
        <div className="overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/30">
          <div className="grid grid-cols-12 gap-3 border-b border-slate-800/70 px-4 py-3 text-xs text-slate-400">
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-2">Featured</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {projects.map((p) => (
            <div key={p.id} className="grid grid-cols-12 items-center gap-3 px-4 py-3">
              <div className="col-span-5">
                <p className="text-sm font-medium text-slate-100">{p.title}</p>
                <p className="text-xs text-slate-400">/{p.slug}</p>
              </div>

              <div className="col-span-3 text-sm text-slate-300">
                {p.status ?? "-"}
              </div>

              <div className="col-span-2 text-sm text-slate-300">
                {p.isFeatured ? "Yes" : "No"}
              </div>

              <div className="col-span-2 flex justify-end gap-3 text-sm">
                <Link
                  to={`/admin/projects/${p.id}/edit`}
                  className="text-slate-300 hover:text-violet-400"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="px-4 py-6 text-sm text-slate-300">
              No projects yet. Click <b>New Project</b> to add a project.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
