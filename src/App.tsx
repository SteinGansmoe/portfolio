import { Routes, Route } from "react-router-dom";
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;