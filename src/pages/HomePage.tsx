import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";

export function HomePage() {
  return (
    <div>
      <div className="bg-portfolio-background font-portfolio-sans text-portfolio-text">
        <div className="portfolio-container">
          <FeaturedProjects />
          <AboutSection />
        </div>
      </div>
    </div>
  );
}
