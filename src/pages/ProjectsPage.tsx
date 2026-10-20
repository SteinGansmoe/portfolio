import { Hero } from "../components/home/Hero";
import { Container } from "../components/layout/Container";
import { ProjectCard } from "../features/projects/ProjectCard";

const Project1 = {
  id: "lanestomp",
  title: "LaneStomp",
  description:
    "A League of Legends platform for matchup guides, counter picks and champion insights.",
  image: "/projects/lanestomp/homepage.jpg",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  githubUrl: "https://github.com/SteinGansmoe/lanestomp",
  liveUrl: "https://lanestomp.com",
};

const Project2 = {
  id: "holidaze",
  title: "Holidaze",
  description:
    "A venue booking site built as the final semester project at Noroff Vocational School.",
  image: "/projects/holidaze/hero.png",
  technologies: ["React", "Node.js", "PostgreSQL"],
  githubUrl: "https://github.com/SteinGansmoe/holidaze",
  liveUrl: "https://holidaze-retreats.vercel.app/",
};

const Project3 = {
  id: "holidaze1",
  title: "Holidaze",
  description:
    "A venue booking site built as the final semester project at Noroff Vocational School.",
  image: "/projects/holidaze/hero.png",
  technologies: ["React", "Node.js", "PostgreSQL"],
  githubUrl: "https://github.com/SteinGansmoe/holidaze",
  liveUrl: "https://holidaze-retreats.vercel.app/",
};

const Project4 = {
  id: "holidaze2",
  title: "Holidaze",
  description:
    "A venue booking site built as the final semester project at Noroff Vocational School.",
  image: "/projects/holidaze/hero.png",
  technologies: ["React", "Node.js", "PostgreSQL"],
  githubUrl: "https://github.com/SteinGansmoe/holidaze",
  liveUrl: "https://holidaze-retreats.vercel.app/",
};

const Project5 = {
  id: "holidaze3",
  title: "Holidaze",
  description:
    "A venue booking site built as the final semester project at Noroff Vocational School.",
  image: "/projects/holidaze/hero.png",
  technologies: ["React", "Node.js", "PostgreSQL"],
  githubUrl: "https://github.com/SteinGansmoe/holidaze",
  liveUrl: "https://holidaze-retreats.vercel.app/",
};

const Project6 = {
  id: "holidaze4",
  title: "Holidaze",
  description:
    "A venue booking site built as the final semester project at Noroff Vocational School.",
  image: "/projects/holidaze/hero.png",
  technologies: ["React", "Node.js", "PostgreSQL"],
  githubUrl: "https://github.com/SteinGansmoe/holidaze",
  liveUrl: "https://holidaze-retreats.vercel.app/",
};
const projects = [Project1, Project2, Project3, Project4, Project5, Project6];

export function ProjectsPage() {
  return (
    <>
      <Hero
        label="SELECTED WORK"
        title="Projects"
        description="A collection of projects I've built, highlighting my skills and experience with modern web technologies."
        hideCTA
      />

      <Container className="my-6 grid grid-cols-1 items-stretch gap-4 px-4 sm:my-8 sm:px-6 lg:auto-rows-fr lg:grid-cols-2 lg:px-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </Container>
    </>
  );
}
