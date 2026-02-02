import { NavLink } from 'react-router-dom';
import { Container } from './Container';

function navLinkClass({ isActive }: { isActive: boolean }) {
    return [
        "text-sm font-medium transition-colors",
        isActive ? "text-white" : "text-slate-300 hover:text-white",
    ].join(" ");
}


export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <NavLink to="/" className="text-sm font-semibold tracking-tight text-white">
          Stein<span className="text-slate-400">.dev</span>
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
        </nav>
      </Container>
    </header>
  );
}