import { useEffect, useState } from "react";

type BackToTopProps = {
  /** Extra distance past the hero before the button appears, in pixels. */
  offset?: number;
};

export function BackToTop({ offset = 48 }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const [footerClearance, setFooterClearance] = useState(0);

  useEffect(() => {
    // Non-hero routes use the beginning of the main content instead.
    const boundary =
      document.querySelector("[data-hero]") ?? document.getElementById("page-top");
    if (!boundary) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < -offset);
      },
      { rootMargin: `${offset}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(boundary);
    return () => observer.disconnect();
  }, [offset]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Lift the fixed button above footer links without changing the footer layout.
    const updateClearance = () => {
      const rect = footer.getBoundingClientRect();
      setFooterClearance(
        rect.top < window.innerHeight + 24 && rect.bottom > 0 ? rect.height : 0,
      );
    };
    const observer = new IntersectionObserver(updateClearance, {
      rootMargin: "0px 0px 24px 0px",
    });
    const resizeObserver = new ResizeObserver(updateClearance);
    observer.observe(footer);
    resizeObserver.observe(footer);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  function scrollToTop() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Move focus before the button becomes hidden, so disabling it cannot
    // interrupt the smooth scroll and keyboard navigation resumes at the content.
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      disabled={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      style={{ marginBottom: footerClearance }}
      className={`portfolio-focus fixed bottom-[calc(1rem_+_env(safe-area-inset-bottom,0px))] right-[calc(1rem_+_env(safe-area-inset-right,0px))] z-40 inline-flex h-11 w-11 items-center justify-center rounded-portfolio border border-portfolio-border bg-portfolio-surface/90 text-portfolio-text shadow-lg backdrop-blur-sm transition-[opacity,transform,background-color,border-color] duration-[250ms] ease-out hover:border-portfolio-muted hover:bg-portfolio-raised motion-reduce:transition-none sm:bottom-[calc(1.5rem_+_env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem_+_env(safe-area-inset-right,0px))] ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 20V4m-6 6 6-6 6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
