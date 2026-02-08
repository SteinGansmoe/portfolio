import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithPassword } from "../features/auth/auth";

type Status = "idle" | "loading" | "error";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      await signInWithPassword(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
        <p className="text-slate-300 text-sm">Kun for admin.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5"
      >
        <div className="space-y-2">
          <label className="text-sm text-slate-200">E-post</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-200">Passord</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {status === "error" && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        <button
          disabled={status === "loading"}
          className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
          type="submit"
        >
          {status === "loading" ? "Logger inn…" : "Logg inn"}
        </button>
      </form>
    </section>
  );
}
