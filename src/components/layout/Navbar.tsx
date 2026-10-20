import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { contactHref } from "@/lib/contact";

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1014]";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    `rounded-sm py-2 text-xs transition-colors hover:text-white ${focusClass}`,
    isActive
      ? "text-white underline decoration-white/50 underline-offset-4"
      : "text-[#c2c7cc]",
  ].join(" ");
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className="relative top-0 z-50 bg-transparent text-[#f5f5f3]"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          closeMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] flex-wrap  items-center justify-between gap-x-4 px-6 sm:px-8 md:min-h-[64px]">
        <NavLink
          to="/"
          onClick={closeMenu}
          aria-label="Stein Gansmoe — Home"
          className={`inline-flex items-center gap-5 rounded-sm transition-colors hover:text-white ${focusClass}`}
        >
          <span
            aria-hidden="true"
            className="text-[27px] font-light leading-none tracking-[-0.06em]"
          >
            SG
          </span>
          <span className="text-lg [font-family:Georgia,'Times_New_Roman',serif]">
            Stein Gansmoe
          </span>
        </NavLink>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded border border-white/20 transition-colors hover:bg-white/10 md:hidden ${focusClass}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"}
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        </button>

        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`${menuOpen ? "flex" : "hidden"} absolute items-center text-center md:static top-full left-0 w-full flex-col gap-3 border-t md:bg-transparent bg-[#0b1014] border-white/10 pb-6 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:border-0 md:py-0`}
        >
          <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass} onClick={closeMenu}>
            Projects
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
            About
          </NavLink>
          <a
            href={contactHref}
            onClick={closeMenu}
            className={`rounded-sm py-2 text-xs text-[#c2c7cc] transition-colors hover:text-white ${focusClass}`}
          >
            Contact
          </a>
          <a
            href={contactHref}
            onClick={closeMenu}
            className={`inline-flex min-h-9 items-center justify-center self-center gap-4 rounded-lg border border-white/20 px-4 py-2 text-xs transition-colors hover:border-white/50 hover:bg-white/5 md:ml-4 ${focusClass}`}
          >
            Let’s talk
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
