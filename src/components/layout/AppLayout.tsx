import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./Container";
import { HomeFooter } from "@/components/home/HomeFooter";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  const isHome = useLocation().pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className={`flex-1 ${isHome ? "bg-portfolio-background" : ""}`}>
        {isHome ? children : <Container>{children}</Container>}
      </main>

      {isHome ? <HomeFooter /> : <Footer />}
    </div>
  );
}
