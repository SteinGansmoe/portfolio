import { projects } from "./data";
import type { Project } from "./types";

// Keep the public read interface so the existing pages need no data-loading rewrite.
export async function fetchProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function fetchFeaturedProjects(limit = 3): Promise<Project[]> {
  return (await fetchProjects()).filter((project) => project.isFeatured).slice(0, limit);
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const project = projects.find((project) => project.slug === slug);
  if (!project) throw new Error("NOT_FOUND");
  return project;
}
