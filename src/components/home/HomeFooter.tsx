import { Link } from "react-router-dom";
import { profile } from "@/data/profile";
import { contactHref } from "@/lib/contact";

export function HomeFooter() {
  return (
    <footer className="bg-portfolio-background font-portfolio-sans text-portfolio-muted">
      <div className="portfolio-container">
        <div className="flex flex-col gap-6 border-t border-portfolio-border py-5 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <Link
            to="/"
            className="portfolio-focus inline-flex items-center gap-5 self-start rounded text-portfolio-text"
            aria-label="Stein Gansmoe — Home"
          >
            <span aria-hidden="true" className="text-2xl font-light tracking-[-0.06em]">
              SG
            </span>
            <span>
              <span className="block font-portfolio-serif text-base">{profile.name}</span>
              <span className="mt-1 block text-[10px] text-portfolio-muted">
                Frontend Developer · Based in Norway
              </span>
            </span>
          </Link>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-6 text-[11px]"
          >
            <Link
              to="/"
              className="portfolio-focus rounded transition-colors hover:text-portfolio-text"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="portfolio-focus rounded transition-colors hover:text-portfolio-text"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="portfolio-focus rounded transition-colors hover:text-portfolio-text"
            >
              About
            </Link>
            <a
              href={contactHref}
              className="portfolio-focus rounded transition-colors hover:text-portfolio-text"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {[
              { name: "GitHub", href: profile.githubUrl, icon: "/icons/github.svg" },
              {
                name: "LinkedIn",
                href: profile.linkedinUrl,
                icon: "/icons/linkedin.svg",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.name} (opens in a new tab)`}
                className="portfolio-focus inline-flex h-9 w-9 items-center justify-center rounded opacity-70 transition-opacity hover:opacity-100"
              >
                <img
                  src={social.icon}
                  alt=""
                  width={17}
                  height={17}
                  loading="lazy"
                  className={
                    social.name === "LinkedIn" ? "grayscale" : "brightness-0 invert"
                  }
                />
              </a>
            ))}
            <a
              href={contactHref}
              aria-label="Email Stein Gansmoe"
              className="portfolio-focus inline-flex h-9 w-9 items-center justify-center rounded transition-colors hover:text-portfolio-text"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px]"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="m3 6 9 7 9-7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
