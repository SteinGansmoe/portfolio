import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import { useAuth } from "../../features/auth/useAuth";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "text-sm font-medium transition-colors",
    isActive ? "text-violet-400" : "text-slate-300 hover:text-violet-300",
  ].join(" ");
}

export function Navbar() {
  const auth = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <NavLink
          to="/"
          className="text-sm font-semibold tracking-tight text-white hover:text-violet-300"
        >
          SteinGansmoe<span className="text-slate-400">.no</span>
        </NavLink>

        <nav className="flex items-center gap-5">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {auth.status === "loading" && <span className="text-xs text-slate-500">…</span>}

          {auth.status === "guest" && (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}

          {auth.status === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>
      </Container>
    </header>
  );
}
