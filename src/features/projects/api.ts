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
    content: row.content,
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
