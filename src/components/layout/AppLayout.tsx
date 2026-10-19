import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./Container";


type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 bg-portfolio-background">
        {children}
      </main>

      <Footer />
    </div>
  );
}