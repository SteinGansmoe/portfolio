import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { RequireAdmin } from "./features/auth/RequireAdmin";
import { AdminProjectNewPage } from "./pages/AdminProjectNewPage";
import { AdminProjectEditPage } from "./pages/AdminProjectEditPage";



function App() {
  return (
    <AppLayout>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />


      <Route element={<RequireAdmin />}>
    <Route path="/admin" element={<AdminDashboardPage />} />
    
   <Route path="/admin/projects/new" element={<AdminProjectNewPage />} /> 
  <Route path="/admin/projects/:id/edit" element={<AdminProjectEditPage />} /> 
  </Route>
</Routes>

    </AppLayout>
  );
}

export default App;