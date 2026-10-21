export type ProjectDesignComparisonData = {
  figmaUrl: string;
  /** Add the original export only after its source and matching screen are verified. */
  designImage?: { src: string; alt: string };
  implementationImage: { src: string; alt: string };
};

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
  designComparison?: ProjectDesignComparisonData;
  status?: "active" | "completed";
  isFeatured?: boolean;
  /** Lower values appear first; equal values retain their order in data.ts. */
  sortOrder?: number;
};
