
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { SpeakersPage } from "./pages/SpeakersPage";
import { CommitteesPage } from "./pages/CommitteesPage";
import { ContactPage } from "./pages/ContactPage";
import { VenuePage } from "./pages/VenuePage";
import { AdminDashboard } from './pages/AdminDashboard';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map path to currentPage for Layout highlighting
  const pathToPage: Record<string, string> = {
    "/": "home",
    "/registration": "registration",
    "/speakers": "speakers",
    "/committees": "committees",
    "/contact": "contact",
    "/venue": "venue",
  };
  const currentPage = pathToPage[location.pathname] || "home";

  // onNavigate handler for Layout and children
  const handleNavigate = (page: string) => {
    const pageToPath: Record<string, string> = {
      home: "/",
      registration: "/registration",
      speakers: "/speakers",
      committees: "/committees",
      contact: "/contact",
      venue: "/venue",
    };
    const path = pageToPath[page] || "/";
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      <Routes>
        <Route path="/secure-portal" element={<AdminDashboard />} />
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        
        <Route path="/registration" element={<RegistrationPage onNavigate={handleNavigate} />} />
        <Route path="/speakers" element={<SpeakersPage onNavigate={handleNavigate} />} />
        <Route path="/committees" element={<CommitteesPage onNavigate={handleNavigate} />} />
        <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
        <Route path="/venue" element={<VenuePage onNavigate={handleNavigate} />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
