import { useMemo, useState } from "react";
import { ArrowRight } from "@/components/ui/ArrowRight";

type Props = {
  images: string[];
  title: string;
};

export function ProjectImageGallery({ images, title }: Props) {
  const cleaned = useMemo(() => images.filter(Boolean), [images]);

  const [index, setIndex] = useState(0);

  if (cleaned.length === 0) {
    return (
      <p className="rounded-portfolio border border-portfolio-border bg-portfolio-surface p-6 text-sm text-portfolio-muted">
        Project images unavailable.
      </p>
    );
  }

  const activeIndex = Math.min(index, cleaned.length - 1);
  const active = cleaned[activeIndex];

  function prev() {
    setIndex((i) => (i - 1 + cleaned.length) % cleaned.length);
  }

  function next() {
    setIndex((i) => (i + 1) % cleaned.length);
  }

  return (
    <div
      role="region"
      aria-label={`${title} project images`}
      className="min-w-0 space-y-4"
    >
      {/* Main image */}
      <div className="overflow-hidden rounded-portfolio border border-portfolio-border bg-portfolio-surface p-2 sm:p-3">
        <div className="aspect-[16/10] sm:aspect-video">
          <img
            src={active}
            alt={`${title} project image ${activeIndex + 1} of ${cleaned.length}`}
            className="h-full w-full rounded-sm object-contain"
          />
        </div>
      </div>

      {cleaned.length > 1 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-xs text-portfolio-muted"
            >
              Image {activeIndex + 1} of {cleaned.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="portfolio-button min-h-11 min-w-11 px-3 motion-reduce:transition-none"
                aria-label="Previous image"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={next}
                className="portfolio-button min-h-11 min-w-11 px-3 motion-reduce:transition-none"
                aria-label="Next image"
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div
            className="flex flex-wrap gap-3"
            role="group"
            aria-label="Choose project image"
          >
            {cleaned.map((src, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  type="button"
                  key={src}
                  onClick={() => setIndex(i)}
                  className={[
                    "portfolio-focus min-h-11 w-20 max-w-full rounded-md border bg-portfolio-surface p-1 transition-colors motion-reduce:transition-none sm:w-24",
                    isActive
                      ? "border-portfolio-text"
                      : "border-portfolio-border hover:border-portfolio-muted",
                  ].join(" ")}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={isActive}
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-[16/10] w-full rounded-sm object-contain"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
