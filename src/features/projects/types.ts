export type Project = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string | null;
  status?: "active" | "completed";
  isFeatured?: boolean;
};
