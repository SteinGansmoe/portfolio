import { Container } from "@/components/layout/Container";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { profile } from "@/data/profile";
import { contactEmail, contactHref } from "@/lib/contact";

const contactMethods = [
  { name: "Email", detail: contactEmail, href: contactHref, icon: null, external: false },
  {
    name: "LinkedIn",
    detail: "Connect on LinkedIn",
    href: profile.linkedinUrl,
    icon: "/icons/linkedin.svg",
    external: true,
  },
  {
    name: "GitHub",
    detail: "View my GitHub profile",
    href: profile.githubUrl,
    icon: "/icons/github.svg",
    external: true,
  },
];

export function ContactPage() {
  return (
    <Container className="px-4 py-12 font-portfolio-sans text-portfolio-text sm:px-6 sm:py-16 lg:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <section aria-labelledby="contact-introduction-heading" className="max-w-[60ch]">
          <p className="portfolio-eyebrow mb-3">Say hello</p>
          <h2
            id="contact-introduction-heading"
            className="portfolio-heading text-3xl sm:text-4xl"
          >
            Let's start a conversation.
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-[1.85] text-portfolio-muted">
            <p>
              I'm a frontend developer based in Norway, currently looking for my first
              professional opportunity in software development.
            </p>
            <p>
              I'm always happy to connect with other developers, discuss interesting
              projects, or hear about potential opportunities.
            </p>
          </div>
        </section>

        <section aria-labelledby="contact-methods-heading" className="min-w-0">
          <p className="portfolio-eyebrow mb-3">Get in touch</p>
          <h2 id="contact-methods-heading" className="portfolio-heading mb-7 text-2xl">
            Choose a way to connect
          </h2>
          <ul className="space-y-4">
            {contactMethods.map((method) => (
              <li key={method.name}>
                <a
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="portfolio-focus flex min-h-24 items-center gap-4 rounded-portfolio border border-portfolio-border bg-portfolio-surface/60 p-5 transition-colors hover:border-portfolio-muted hover:bg-portfolio-raised motion-reduce:transition-none sm:p-6"
                >
                  {method.icon ? (
                    <img
                      src={method.icon}
                      alt=""
                      width={24}
                      height={24}
                      className={`h-6 w-6 shrink-0 ${method.name === "LinkedIn" ? "grayscale" : "brightness-0 invert"}`}
                    />
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6 shrink-0"
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
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{method.name}</span>
                    <span className="mt-1 block break-words text-sm leading-relaxed text-portfolio-muted [overflow-wrap:anywhere]">
                      {method.detail}
                    </span>
                    {method.external && (
                      <span className="sr-only"> (opens in a new tab)</span>
                    )}
                  </span>
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
