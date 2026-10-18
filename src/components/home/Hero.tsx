import { Link } from "react-router-dom";
import { contactHref } from "@/lib/contact";


type HeroProps = {
  label: string;
  title: string;
  description: string;
  imageUrl?: string;
  hideCTA?: boolean;
}

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1014]";

export function Hero({ label, title, description, imageUrl = "/images/valley-background.jpg", hideCTA = false }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-white/[0.06] bg-[#0b1014] text-[#f5f5f3]"
    >
      {/* Decorative photograph: the text supplies the section's meaning. */}
      <img
        src={imageUrl}
        alt=""
        fetchPriority="high"
        width={1536}
        height={2048}
        className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[center_42%] md:w-[min(100%,96rem)] md:[mask-image:linear-gradient(to_right,transparent,black_32%)]"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b1014_0%,rgba(11,16,20,0.96)_35%,rgba(11,16,20,0.64)_60%,rgba(11,16,20,0.32)_100%)] max-md:bg-[linear-gradient(90deg,rgba(11,16,20,0.94),rgba(11,16,20,0.74))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1014]/30 via-transparent to-[#0b1014]/65" />

      <div className="relative mx-auto flex min-h-[480px] max-w-5xl items-center px-6 pb-20 pt-14 sm:px-8 md:min-h-[380px] md:pb-16 md:pt-10">
        <div className="w-full max-w-[520px]">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b9bec3]">
            {label}
          </p>
          <h1
            id="hero-heading"
            className="font-serif text-[clamp(2.75rem,6vw,4.25rem)] font-normal leading-[1.08] tracking-[-0.035em] [font-family:Georgia,'Times_New_Roman',serif]"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-[490px] text-[15px] leading-[1.65] text-[#c2c7cc] sm:text-base">
            {description}
          </p>
          {!hideCTA && (
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/projects"
              
              className={`inline-flex min-h-11 items-center justify-center gap-4 rounded-lg border border-white bg-[#f5f5f3] px-5 py-3 text-xs font-medium text-[#10151a] transition-colors hover:bg-[#dfe3e6] ${focusClass}`}
            >
              View my work
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
            <a
              href={contactHref}
              
              className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 bg-[#0b1014]/25 px-6 py-3 text-xs font-medium text-[#f5f5f3] transition-colors hover:border-white/60 hover:bg-white/10 ${focusClass}`}
            >
              Get in touch
            </a>
          </div>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[6%] top-[58%] hidden items-start gap-5 lg:flex"
      >
        <span className="mt-1.5 h-px w-9 bg-white/45" />
        <p className="text-[9px] uppercase leading-[1.9] tracking-[0.24em] text-[#b1b9c0]">
          Clean code
          <br />
          Better experiences
          <br />
          Brighter ideas
        </p>
      </div>

      <a
        href="#featured-projects"
        aria-label="Scroll to featured projects"
        className={`absolute bottom-5 left-6 inline-flex h-11 w-11 items-center justify-center rounded text-[#c2c7cc] transition-colors hover:text-white sm:left-8 lg:left-[max(2rem,calc((100%_-_76rem)_/_2))] ${focusClass}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M12 2v19m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1" />
        </svg>
      </a>
    </section>
  );
}
