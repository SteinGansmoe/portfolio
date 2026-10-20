export type HeroContent = {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  hideCTA?: boolean;
  showDecorativeText: boolean;
};

// AppLayout keeps a single Hero mounted across these routes, so its images can crossfade.
export const heroes: Partial<Record<string, HeroContent>> = {
  "/": {
    label: "Frontend Developer",
    title: "Stein Gansmoe",
    description:
      "I build thoughtful, accessible and high-quality web experiences with modern frontend technologies. Focused on clean code, great user experiences and real-world impact.",
    imageUrl: "/images/valley-background.jpg",
    showDecorativeText: true,
  },
  "/projects": {
    label: "SELECTED WORK",
    title: "Projects",
    description:
      "A collection of projects I've built, highlighting my skills and experience with modern web technologies.",
    imageUrl: "/images/projects-background.webp",
    hideCTA: true,
    showDecorativeText: false,
  },
  "/contact": {
    label: "GET IN TOUCH",
    title: "Let's Connect",
    description:
      "Have an opportunity, an idea, or just want to say hello? I'd love to hear from you.",
    imageUrl: "/images/contact-background.webp",
    hideCTA: true,
    showDecorativeText: false,
  },
  "/about": {
    label: "BEHIND THE CODE",
    title: "About Me",
    description:
      "A little about who I am, what drives me, and why I love building things for the web.",
    imageUrl: "/images/about-background.webp",
    hideCTA: true,
    showDecorativeText: false,
  },
};
