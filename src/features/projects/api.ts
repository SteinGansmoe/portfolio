import { supabase } from "../../lib/supabaseClient";
import type { Project } from "./types";

type DbProjectRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  github_url: string;
  demo_url: string | null;
  image_url: string | null;
  image_urls: string[] | null;
  is_featured: boolean;
  sort_order: number;
  status: "active" | "completed";
  created_at: string;
};

function normalizeImageUrls(row: DbProjectRow): string[] {
  const raw = row.image_urls;
  if (Array.isArray(raw)) return raw.filter(Boolean);
  return row.image_url ? [row.image_url] : [];
}

function mapDbToProject(row: DbProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content ?? "",
    tags: row.tags ?? [],
    githubUrl: row.github_url,
    demoUrl: row.demo_url,
    imageUrl: row.image_url ?? null,
    imageUrls: normalizeImageUrls(row),
    status: row.status,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
  };
}

const SELECT_FIELDS =
  "id,title,slug,excerpt,content,tags,github_url,demo_url,image_url,image_urls,is_featured,sort_order,status,created_at";

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_FIELDS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as DbProjectRow[];
  return rows.map(mapDbToProject);
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_FIELDS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NOT_FOUND");

  return mapDbToProject(data as DbProjectRow);
}

type ProjectInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string | null;
  imageUrls?: string[];
  imageUrl?: string | null;
  status: "active" | "completed";
  isFeatured: boolean;
  sortOrder: number;
};

function toDbInput(input: ProjectInput) {
  const imageUrls = input.imageUrls ?? [];

  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    tags: input.tags,
    github_url: input.githubUrl,
    demo_url: input.demoUrl ?? null,

    // ✅ store both: array + legacy cover
    image_urls: imageUrls,
    image_url: input.imageUrl ?? imageUrls[0] ?? null,

    status: input.status,
    is_featured: input.isFeatured,
    sort_order: input.sortOrder,
  };
}

export async function createProject(input: ProjectInput) {
  const { error } = await supabase.from("projects").insert(toDbInput(input));
  if (error) throw new Error(error.message);
}

export async function updateProject(id: string, input: ProjectInput) {
  const { error } = await supabase.from("projects").update(toDbInput(input)).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function fetchFeaturedProjects(limit = 3) {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id,title,slug,excerpt,content,tags,github_url,demo_url,image_url,image_urls,is_featured,sort_order,status,created_at",
    )
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as DbProjectRow[];
  return rows.map(mapDbToProject);
}

export async function fetchProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_FIELDS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NOT_FOUND");

  return mapDbToProject(data as DbProjectRow);
}
