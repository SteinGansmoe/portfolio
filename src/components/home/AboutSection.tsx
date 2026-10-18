import { Link } from "react-router-dom";
import { profile } from "@/data/profile";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { TechStack } from "./TechStack";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="portfolio-section grid items-start gap-8 pt-0 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,1.6fr)]"
    >
      <div>
        <p className="portfolio-eyebrow mb-2">About</p>
        <h2 id="about-heading" className="portfolio-heading max-w-sm text-[30px]">
          A developer with
          <br className="hidden lg:block" /> a passion for the web
        </h2>
        <p className="mb-4 mt-4 max-w-md text-[13px] leading-relaxed text-portfolio-muted">
          {profile.introduction}
        </p>
        <Link to="/about" className="portfolio-button">
          More about me <ArrowRight />
        </Link>
      </div>
      <div className="aspect-[1.05/1] w-full max-w-sm justify-self-center overflow-hidden rounded-portfolio border border-portfolio-border md:max-w-none">
        <img
          src={profile.portrait}
          alt={profile.name}
          loading="lazy"
          width={1536}
          height={2048}
          className="h-full w-full origin-[50%_65%] scale-125 object-cover object-[50%_45%] grayscale"
        />
      </div>
      <div className="md:col-span-2 lg:col-span-1">
        <TechStack />
      </div>
    </section>
  );
}
