import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/60">
      <Container className="py-10">
        <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Stein Arild Gansmoe</p>
          <p className="text-slate-400">Built with React + TypeScript + Tailwind</p>
        </div>
      </Container>
    </footer>
  );
}
