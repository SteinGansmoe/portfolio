import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-portfolio-background focus:outline-none"
      >
        <span
          id="page-top"
          aria-hidden="true"
          className="pointer-events-none absolute h-px w-px"
        />
        {children}
      </main>

      <Footer />
      <BackToTop key={location.key} />
    </div>
  );
}
