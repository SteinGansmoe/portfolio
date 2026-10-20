import { Container } from "../components/layout/Container";
import { ProjectCard } from "../features/projects/ProjectCard";

const Project1 = {
  id: "lanestomp",
  title: "LaneStomp",
  description:
    "A League of Legends platform for matchup guides, counter picks and champion insights.",
  image: "/projects/lanestomp/homepage.jpg",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI", "Vercel"],
  githubUrl: "https://github.com/SteinGansmoe/lanestomp",
  liveUrl: "https://lanestomp.com",
};

const Project2 = {
  id: "holidaze",
  title: "Holidaze",
  description:
    "A responsive venue booking platform built with React and TypeScript, featuring bookings, user authentication and venue management.",
  image: "/projects/holidaze/hero.png",
  technologies: ["React", "TypeScript", "Tailwind CSS", "Noroff API", "Figma", "Vercel"],
  githubUrl: "https://github.com/SteinGansmoe/holidaze-retreats",
  liveUrl: "https://holidaze-retreats.vercel.app/",
};

const Project3 = {
  id: "packlinemalbok",
  title: "Packline Malbok",
  description:
    "An internal workplace tool for managing vehicle fitting information and tracking customization workflows, helping employees coordinate daily tasks.",
  image: "/projects/packlinemalbok/packline-carshowcase.png",
  technologies: ["JavaScript", "Tailwind CSS", "Supabase", "Netlify"],
  githubUrl: "https://github.com/SteinGansmoe/packlineMalbok",
  liveUrl: "https://packlinemalbok.netlify.app/",
};

const Project4 = {
  id: "portfolio",
  title: "Portfolio",
  description:
    "My personal developer portfolio, built to showcase my projects, technical skills and approach to development.",
  image: "/projects/portfolio/homepage.webp",
  technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
  githubUrl: "https://github.com/SteinGansmoe/portfolio",
  liveUrl: "https://steingansmoe.no/",
};

const projects = [Project1, Project2, Project3, Project4];

export function ProjectsPage() {
  return (
    <>
      <Container className="my-6 grid grid-cols-1 items-stretch gap-4 px-4 sm:my-8 sm:px-6 lg:auto-rows-fr lg:grid-cols-2 lg:px-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </Container>
    </>
  );
}
