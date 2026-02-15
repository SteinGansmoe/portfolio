export function AboutPage() {
  return (
    <section className="space-y-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">

 <div className="relative mx-auto w-full max-w-sm">
  <div className="absolute -inset-2 rounded-xl bg-violet-500/20 blur-2xl" />

  <div className="relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/30 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
>
    <img
      src="/crestauction.jpg"
      alt="Stein Gansmoe"
      className="h-full w-full object-cover"
    />
  </div>
</div> 
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, I’m Stein Arild.
          </h1>
          <p className="text-slate-300">
            Front-end developer focused on building modern, clean and
            maintainable web applications using React and TypeScript.
          </p>
          <p className="text-slate-400">
            I enjoy turning complex problems into intuitive user experiences,
            and I care deeply about structure, scalability and good developer
            experience.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          What I do
        </h2>

        <p className="text-slate-300 max-w-3xl">
          I build full front-end systems with authentication, dashboards,
          storage, API integration and thoughtful UI design. My focus is not
          just writing code, but building products that feel polished and
          reliable.
        </p>

        <ul className="grid gap-3 sm:grid-cols-2 text-slate-400">
          <li>• React + TypeScript applications</li>
          <li>• Supabase integration (auth, storage, RLS)</li>
          <li>• Clean component architecture</li>
          <li>• UX-focused interface design</li>
          <li>• Performance & maintainability</li>
        </ul>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Beyond code
        </h2>
        <p className="text-slate-300 max-w-3xl">
          Outside development, I’m passionate about gaming, technology,
          performance optimization and continuously improving both technically
          and personally. I enjoy deep-diving into systems and understanding how
          things work — whether it's software architecture or game mechanics.
        </p>
      </div>

    </section>
  );
}
