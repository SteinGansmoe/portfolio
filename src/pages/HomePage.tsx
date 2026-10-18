import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";

export function HomePage() {
  return (
    <div>
      <Hero />
      <div className="bg-portfolio-background font-portfolio-sans text-portfolio-text">
        <div className="portfolio-container">
          <FeaturedProjects />
          <AboutSection />
        </div>
      </div>
    </div>
  );
}
