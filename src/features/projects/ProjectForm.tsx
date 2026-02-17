import { useEffect, useMemo, useState } from "react";
import { slugify } from "@/features/projects/slug";

export type ProjectFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tagsText: string;
  githubUrl: string;
  demoUrl: string;
  imageFiles?: File[];
  removeImage?: boolean; // MVP: remove ALL existing images
  status: "active" | "completed";
  isFeatured: boolean;
  sortOrder: number;
};

type Props = {
  initialValues?: Partial<ProjectFormValues>;
  initialImageUrls?: string[]; // ✅ array
  submitLabel: string;
  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
};

function filePreview(file: File) {
  return URL.createObjectURL(file);
}

function toInt(value: string, fallback = 0) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function ProjectForm({
  initialValues,
  initialImageUrls = [],
  submitLabel,
  onSubmit,
}: Props) {
  const defaults: ProjectFormValues = useMemo(
    () => ({
      title: initialValues?.title ?? "",
      slug: initialValues?.slug ?? "",
      excerpt: initialValues?.excerpt ?? "",
      content: initialValues?.content ?? "",
      tagsText: initialValues?.tagsText ?? "",
      githubUrl: initialValues?.githubUrl ?? "",
      demoUrl: initialValues?.demoUrl ?? "",
      imageFiles: [],
      removeImage: false,
      status: initialValues?.status ?? "completed",
      isFeatured: initialValues?.isFeatured ?? false,
      sortOrder: initialValues?.sortOrder ?? 0,
    }),
    [initialValues],
  );

  const [values, setValues] = useState<ProjectFormValues>(defaults);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState<boolean>(!!defaults.slug);

  const [previews, setPreviews] = useState<string[]>([]);

  function update<K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(nextTitle: string) {
    update("title", nextTitle);
    if (!slugTouched) {
      update("slug", slugify(nextTitle));
    }
  }

  useEffect(() => {
    const files = values.imageFiles ?? [];
    const next = files.map(filePreview);
    setPreviews(next);

    return () => {
      next.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [values.imageFiles]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMessage(null);

    try {
      await onSubmit(values);
      setStatus("idle");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  const canSubmit =
    values.title.trim().length > 1 &&
    values.slug.trim().length > 1 &&
    values.excerpt.trim().length > 5 &&
    values.content.trim().length > 10 &&
    values.githubUrl.trim().startsWith("http");

  const hasExistingImages = initialImageUrls.length > 0;
  const showExisting = hasExistingImages && !values.removeImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-200">Title</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            value={values.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Project name..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-200">Slug</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            placeholder="holidaze-retreats"
            required
          />
          <p className="text-xs text-slate-500">URL: /projects/{values.slug || "..."}</p>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm text-slate-200">Project images</label>
            <p className="text-xs text-slate-500">
              Recommended: 1600×900 (16:9). Upload multiple images for the gallery.
            </p>
          </div>

          {hasExistingImages && (
            <button
              type="button"
              className={values.removeImage ? "btn-primary" : "btn-secondary"}
              onClick={() => update("removeImage", !values.removeImage)}
            >
              {values.removeImage ? "Undo remove all" : "Remove all existing"}
            </button>
          )}
        </div>

        {/* Existing images grid (edit mode) */}
        {showExisting && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {initialImageUrls.map((url) => (
              <div
                key={url}
                className="overflow-hidden rounded border border-slate-800/60 bg-slate-900/30"
              >
                <img src={url} alt="" className="aspect-[16/9] w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* File picker */}
        <input
          type="file"
          accept="image/*"
          multiple
          className="block w-full text-sm text-slate-300 file:mr-3 file:rounded file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-100 hover:file:bg-slate-700"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            update("imageFiles", files);
            update("removeImage", false);
          }}
        />

        {/* Selected previews */}
        {previews.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">Selected images</p>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => update("imageFiles", [])}
              >
                Clear selected
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {previews.map((src, i) => (
                <div
                  key={src}
                  className="group relative overflow-hidden rounded border border-slate-800/60 bg-slate-900/30"
                >
                  <img src={src} alt="" className="aspect-[16/9] w-full object-cover" />

                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded bg-slate-950/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => {
                      const files = values.imageFiles ?? [];
                      update(
                        "imageFiles",
                        files.filter((_, idx) => idx !== i),
                      );
                    }}
                    aria-label="Remove selected image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-200">Excerpt</label>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          placeholder="Short description for cards"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-200">Case study content</label>
        <textarea
          className="min-h-44 w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
          value={values.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="Write about problem, solution, tech, highlights…"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-200">Tags (comma separated)</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            value={values.tagsText}
            onChange={(e) => update("tagsText", e.target.value)}
            placeholder="React, TypeScript, Tailwind"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-200">Status</label>
            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
              value={values.status}
              onChange={(e) =>
                update("status", e.target.value as ProjectFormValues["status"])
              }
            >
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-200">Sort order</label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
              type="number"
              value={values.sortOrder}
              onChange={(e) => update("sortOrder", toInt(e.target.value, 0))}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-200">GitHub URL</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            value={values.githubUrl}
            onChange={(e) => update("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-200">Live demo URL (optional)</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            value={values.demoUrl}
            onChange={(e) => update("demoUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={values.isFeatured}
            onChange={(e) => update("isFeatured", e.target.checked)}
          />
          Featured
        </label>

        <button
          disabled={!canSubmit || status === "saving"}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
          type="submit"
        >
          {status === "saving" ? "Saving…" : submitLabel}
        </button>
      </div>

      {status === "error" && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      )}
    </form>
  );
}
