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
  is_featured: boolean;
  sort_order: number;
  status: "active" | "completed";
  created_at: string;
};

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
    status: row.status,
    isFeatured: row.is_featured,
  };
}

const SELECT_FIELDS =
  "id,title,slug,excerpt,content,tags,github_url,demo_url,is_featured,sort_order,status,created_at";

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
  status: "active" | "completed";
  isFeatured: boolean;
  sortOrder: number;
};

function toDbInput(input: ProjectInput) {
  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    tags: input.tags,
    github_url: input.githubUrl,
    demo_url: input.demoUrl ?? null,
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
