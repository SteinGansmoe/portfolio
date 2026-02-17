import { useMemo, useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export function ProjectImageGallery({ images, title }: Props) {
  const cleaned = useMemo(() => images.filter(Boolean), [images]);

  const [index, setIndex] = useState(0);

  if (cleaned.length === 0) {
    return (
      <div className="aspect-[16/9] w-full rounded border border-slate-800/50 bg-slate-900/30" />
    );
  }

  const active = cleaned[Math.min(index, cleaned.length - 1)];

  function prev() {
    setIndex((i) => (i - 1 + cleaned.length) % cleaned.length);
  }

  function next() {
    setIndex((i) => (i + 1) % cleaned.length);
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative overflow-hidden rounded border border-slate-800/50 bg-slate-900/30">
        <div className="aspect-[16/9]">
          <img
            src={active}
            alt={`${title} screenshot ${index + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {cleaned.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded bg-slate-950/60 px-3 py-2 text-sm text-white backdrop-blur hover:bg-slate-950/80"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-950/60 px-3 py-2 text-sm text-white backdrop-blur hover:bg-slate-950/80"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {cleaned.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {cleaned.map((src, i) => {
            const isActive = i === index;
            return (
              <button
                type="button"
                key={src}
                onClick={() => setIndex(i)}
                className={[
                  "shrink-0 overflow-hidden rounded border transition",
                  isActive
                    ? "border-violet-400/70"
                    : "border-slate-800/50 hover:border-slate-700",
                ].join(" ")}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" className="h-16 w-28 object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
