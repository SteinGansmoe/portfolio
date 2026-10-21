import { ArrowRight } from "@/components/ui/ArrowRight";
import type { ProjectDesignComparisonData } from "./types";

export function ProjectDesignComparison({
  figmaUrl,
  designImage,
  implementationImage,
}: ProjectDesignComparisonData) {
  const images = [
    ...(designImage ? [{ label: "Original Figma design", image: designImage }] : []),
    { label: "Final application", image: implementationImage },
  ];

  return (
    <div className="space-y-6">
      <a
        href={figmaUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View original Figma design (opens in a new tab)"
        className="portfolio-button min-h-11 max-w-full motion-reduce:transition-none"
      >
        View original Figma design <ArrowRight className="h-4 w-4 shrink-0" />
      </a>

      <div className={designImage ? "grid min-w-0 gap-6 md:grid-cols-2" : "min-w-0"}>
        {images.map(({ label, image }) => (
          <figure key={label} className="min-w-0 space-y-3">
            <div className="overflow-hidden rounded-portfolio border border-portfolio-border bg-portfolio-surface p-2 sm:p-3">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="block h-auto w-full rounded-sm"
              />
            </div>
            <figcaption className="text-xs leading-6 text-portfolio-muted">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
