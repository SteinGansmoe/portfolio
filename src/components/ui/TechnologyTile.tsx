import type { Technology } from "@/data/technologies";

export function TechnologyTile({
  technology,
  className = "text-[10px]",
}: {
  technology: Technology;
  className?: string;
}) {
  return (
    <li
      className={`flex min-h-[50px] min-w-0 items-center gap-2 rounded-lg border border-portfolio-border/70 bg-gradient-to-br from-portfolio-raised to-portfolio-surface px-2 py-3 sm:gap-3 sm:px-3 ${className}`}
    >
      {technology.icon && (
        <img
          src={technology.icon}
          alt=""
          width={25}
          height={25}
          loading="lazy"
          className={`h-6 w-6 shrink-0 ${technology.iconClassName ?? ""}`}
        />
      )}
      <span className="min-w-0 break-words leading-snug text-portfolio-text">
        {technology.name}
      </span>
    </li>
  );
}
