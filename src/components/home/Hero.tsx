import { Link } from "react-router-dom";
import type { HeroContent } from "@/data/heroes";
import { HeroBackground } from "./HeroBackground";

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1014]";

export function Hero({
  label,
  title,
  description,
  imageUrl,
  hideCTA = false,
  showDecorativeText = false,
}: HeroContent) {
  return (
    <section
      data-hero
      aria-labelledby="hero-heading"
      className="relative isolate -mt-[72px] overflow-hidden border-b border-white/[0.06] bg-[#0b1014] text-[#f5f5f3] md:-mt-16"
    >
      {/* Decorative photograph: the text supplies the section's meaning. */}
      <HeroBackground src={imageUrl} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b1014_0%,rgba(11,16,20,0.96)_35%,rgba(11,16,20,0.8)_60%,rgba(11,16,20,0.32)_100%)] max-md:bg-[linear-gradient(90deg,rgba(11,16,20,0.94),rgba(11,16,20,0.74))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1014]/30 via-transparent to-[#0b1014]/65" />

      <div className="relative mx-auto flex min-h-[530px] max-w-5xl items-start px-6 pb-20 pt-14 sm:px-8 md:min-h-[470px] md:pb-16 md:pt-10">
        <div className="w-full max-w-[520px]">
          <p className="mb-4 mt-12 pt-12 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b9bec3]">
            {label}
          </p>
          <h1
            id="hero-heading"
            className="font-serif text-[clamp(2.75rem,6vw,4.25rem)] font-normal leading-[1.08] tracking-[-0.035em] [font-family:Georgia,'Times_New_Roman',serif]"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-[490px] text-[15px] leading-[1.65] text-[#d5dbe1] sm:text-base">
            {description}
          </p>
          {!hideCTA && (
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className={`inline-flex min-h-11 items-center justify-center gap-4 rounded-lg border border-white bg-[#f5f5f3] px-5 py-3 text-xs font-medium text-[#10151a] transition-colors hover:bg-[#dfe3e6] motion-reduce:transition-none ${focusClass}`}
              >
                View my work
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M4 12h16m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </Link>
              <Link
                to="/contact"
                className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 bg-[#0b1014]/25 px-6 py-3 text-xs font-medium text-[#f5f5f3] transition-colors hover:border-white/60 hover:bg-white/10 motion-reduce:transition-none ${focusClass}`}
              >
                Get in touch
              </Link>
            </div>
          )}
        </div>
      </div>

      {showDecorativeText && (
        <div
          aria-hidden="true"
          className="absolute right-[6%] top-[58%] hidden items-start gap-5 lg:flex"
        >
          <span className="mt-1.5 h-px w-9 bg-white/45" />
          <p className="rounded-md bg-[#0b1014]/80 px-3 py-2 text-[11px] font-medium uppercase leading-[1.9] tracking-[0.2em] text-[#e2e8f0]">
            Clean code
            <br />
            Better experiences
            <br />
            Brighter ideas
          </p>
        </div>
      )}
    </section>
  );
}
