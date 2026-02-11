export function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm text-slate-400">Front-End Developer</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          I build clean, user-friendly web apps.
        </h1>
        <p className="max-w-2xl text-slate-300">
          React, TypeScript og moderne UI. Currently I am working on improving my skill and understanding in React and TypeScript environments. 
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
          href="/projects"
        >
          View Projects
        </a>
        <a
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-slate-500"
          href="https://github.com/SteinGansmoe"
          target="_blank"
          rel="noreferrer"
        >
          My GitHub profile
        </a>
      </div>
    </section>
  );
}
