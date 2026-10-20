export type Technology = {
  name: string;
  icon?: string;
  iconClassName?: string;
};

// All nine technologies were confirmed by the user for the homepage.
export const technologies: Technology[] = [
  { name: "React", icon: "/icons/react.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "Supabase", icon: "/icons/supabase.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "Vite", icon: "/icons/vitejs.svg" },
  { name: "VS Code", icon: "/icons/vscode.svg" },
];

// Reuse the same labels and local assets across Home and About.
// Skills without an existing icon deliberately fall back to their text label.
export const technologyCatalog = new Map<string, Technology>(
  [
    ...technologies,
    { name: "HTML", icon: "/icons/html5.svg" },
    { name: "CSS", icon: "/icons/css3.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg", iconClassName: "invert" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
    { name: "Vercel", icon: "/icons/vercel.svg", iconClassName: "brightness-0 invert" },
    { name: "REST APIs", icon: "/icons/rest-api.svg" },
    { name: "AI-assisted development", icon: "/icons/ai-development.svg" },
    { name: "GitHub", icon: "/icons/github.svg", iconClassName: "brightness-0 invert" },
  ].map((technology) => [technology.name, technology]),
);
