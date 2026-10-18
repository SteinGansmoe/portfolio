export type Technology = {
  name: string;
  icon: string;
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
