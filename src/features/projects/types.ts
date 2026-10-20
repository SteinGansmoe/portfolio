export type Project = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string | null;
  imageUrl?: string | null;
  imageUrls?: string[];
  status?: "active" | "completed";
  isFeatured?: boolean;
  /** Lower values appear first; equal values retain their order in data.ts. */
  sortOrder?: number;
};
