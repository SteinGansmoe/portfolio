import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";

export function HomePage() {
  return (
    <div>
      <Hero
        label="Frontend Developer"
        title="Stein Gansmoe"
        showDecorativeText
        description="I build thoughtful, accessible and high-quality web experiences with modern frontend technologies. Focused on clean code, great user experiences and real-world impact."
      />
      <div className="bg-portfolio-background font-portfolio-sans text-portfolio-text">
        <div className="portfolio-container">
          <FeaturedProjects />
          <AboutSection />
        </div>
      </div>
    </div>
  );
}
