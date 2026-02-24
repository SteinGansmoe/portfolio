export function AboutPage() {
  return (
    <section className="space-y-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative mx-auto w-full max-w-sm">
          {/* Glow layer */}
          <div className="absolute -inset-4 rounded bg-gradient-to-tr from-violet-600/30 via-indigo-500/20 to-transparent blur-2xl" />

          {/* Image container */}
          <div className="relative overflow-hidden rounded border border-slate-800/60 bg-slate-900/40 shadow-xl">
            <img
              src="/steinarild.jpg"
              alt="Stein Gansmoe"
              className="aspect-[4/5] w-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, I’m Stein Arild.
          </h1>
          <p className="text-slate-300">
            Front-end developer focused on building modern, clean and maintainable web
            applications using React and TypeScript.
          </p>
          <p className="text-slate-400">
            I enjoy turning complex problems into intuitive user experiences, and I care
            deeply about structure, scalability and good developer experience.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">What I do</h2>

        <p className="max-w-3xl text-slate-300">
          I build full front-end systems with authentication, dashboards, storage, API
          integration and thoughtful UI design. My focus is not just writing code, but
          building products that feel polished and reliable.
        </p>

        <ul className="grid gap-3 text-slate-400 sm:grid-cols-2">
          <li>• React + TypeScript applications</li>
          <li>• Supabase integration (auth, storage, RLS)</li>
          <li>• Clean component architecture</li>
          <li>• UX-focused interface design</li>
          <li>• Performance & maintainability</li>
        </ul>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Beyond code</h2>
        <p className="max-w-3xl text-slate-300">
          Outside of development, I spend most of my time with my girlfriend and our two
          daughters. Family is a big part of my life, and I value the balance between
          focused work and being present at home. In the evenings, I enjoy playing games
          like League of Legends, World of Warcraft, and Total War: Warhammer III with
          friends, it’s both a way to unwind and a space for strategy, teamwork, and good
          conversations. After a long day, nothing beats relaxing on the couch with my
          girlfriend, something good to drink, some snacks, and a great TV series or
          movie.
        </p>
      </div>
    </section>
  );
}
