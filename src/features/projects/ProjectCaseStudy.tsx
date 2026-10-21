import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";

/** Approved Markdown headings define the sections, including future optional ones.
 * No empty challenges, learning or architecture sections are published.
 */
export function ProjectCaseStudy({
  content,
  children,
}: {
  content: string;
  children?: ReactNode;
}) {
  if (!content.trim()) return null;

  return (
    <section
      aria-label="Case study"
      className="border-t border-portfolio-border pt-10 sm:pt-12"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-12">
        <p className="portfolio-eyebrow">Case study</p>
        <div className="min-w-0 max-w-3xl space-y-5 break-words text-sm leading-7 text-portfolio-muted sm:text-base sm:leading-8">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="portfolio-heading !mt-10 border-t border-portfolio-border pt-8 text-2xl first:!mt-0 first:border-0 first:pt-0 sm:text-3xl">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="portfolio-heading !mt-8 text-xl">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc space-y-3 pl-5 marker:text-portfolio-muted">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal space-y-3 pl-5">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong className="font-medium text-portfolio-text">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="portfolio-focus rounded-sm text-portfolio-text underline decoration-portfolio-muted underline-offset-4 hover:decoration-portfolio-text"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          {children}
        </div>
      </div>
    </section>
  );
}
