import { Routes, Route, Link } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="*"
          element={
            <div className="space-y-4">
              <p className="text-slate-300">Page not found.</p>
              <Link className="text-sm text-slate-300 hover:text-white" to="/">
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
