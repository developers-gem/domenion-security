import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Industries from "../pages/Industries/Industries";
import Careers from "../pages/Careers/Careers";
import Contact from "../pages/Contact/Contact";
import ServiceAreas from "../pages/ServiceAreas/ServiceAreas";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import IndustryDetails from "../pages/Industries/IndustryDetails";

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCareers from "../pages/Admin/Careers/AdminCareers";
import AdminApplications from "../pages/Admin/Applications/AdminApplications";
import AdminContactRequests from "../pages/Admin/ContactRequests/AdminContactRequests";
import AdminQuoteRequests from "../pages/Admin/QuoteRequests/AdminQuoteRequests";
import AdminLeads from "../pages/Admin/Leads/AdminLeads";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service-areas" element={<ServiceAreas />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/industries/:slug" element={<IndustryDetails />} />

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes (Admin Role Only) */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/careers" element={<AdminCareers />} />
      </Route>

      {/* Protected Admin/Staff Routes (Admin, HR, Recruiter Roles) */}
      <Route element={<ProtectedRoute roles={["admin", "hr", "recruiter"]} />}>
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/contact-requests" element={<AdminContactRequests />} />
        <Route path="/admin/quote-requests" element={<AdminQuoteRequests />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
