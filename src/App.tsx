import { Routes, Route, Link } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={
            <div className="space-y-4">
              <h1 className="text-slate-300">Page not found.</h1>
              <Link
                className="portfolio-focus rounded text-sm text-slate-300 hover:text-white"
                to="/"
              >
                ← Go back home
              </Link>
            </div>
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default App;
