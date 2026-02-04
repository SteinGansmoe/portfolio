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
    tags: row.tags ?? [],
    githubUrl: row.github_url,
    demoUrl: row.demo_url,
    status: row.status,
    isFeatured: row.is_featured,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,slug,excerpt,tags,github_url,demo_url,is_featured,sort_order,status,created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;

  const rows = (data ?? []) as DbProjectRow[];
  return rows.map(mapDbToProject);
}
