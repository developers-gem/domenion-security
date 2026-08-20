import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  FileQuestion,
  TrendingUp,
  FileCode,
  HelpCircle,
  FolderKanban,
  Image,
  Users,
  FileCheck,
  UserCheck,
  Settings,
} from "lucide-react";

const sidebarModules = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, active: true },
  { title: "Careers", path: "/admin/careers", icon: Briefcase, active: true },
  { title: "Applications", path: "/admin/applications", icon: FileText, active: true },
  { title: "Contact Requests", path: "/admin/contact-requests", icon: MessageSquare, active: true },
  { title: "Quote Requests", path: "/admin/quote-requests", icon: FileQuestion, active: true },
  { title: "Leads", path: "/admin/leads", icon: TrendingUp, active: true },
  { title: "Blogs", path: "/admin/dashboard", icon: FileCode, active: false, badge: "Phase 4B" },
  { title: "FAQs", path: "/admin/dashboard", icon: HelpCircle, active: false, badge: "Phase 4B" },
  { title: "CMS", path: "/admin/dashboard", icon: FolderKanban, active: false, badge: "Phase 4B" },
  { title: "Media", path: "/admin/dashboard", icon: Image, active: false, badge: "Phase 4B" },
  { title: "Employees", path: "/admin/dashboard", icon: Users, active: false, badge: "Phase 4B" },
  { title: "Documents", path: "/admin/dashboard", icon: FileCheck, active: false, badge: "Phase 4B" },
  { title: "Users", path: "/admin/dashboard", icon: UserCheck, active: false, badge: "Phase 4B" },
  { title: "Settings", path: "/admin/dashboard", icon: Settings, active: false, badge: "Phase 4B" },
];

function AdminSidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`admin-sidebar bg-white border-end border-light-subtle ${isOpen ? "open" : ""}`}>
      <div className="sidebar-brand px-4 py-3 border-bottom border-light-subtle d-flex justify-content-between align-items-center">
        <span className="fw-bold fs-7 text-dark text-uppercase letter-spacing">NAVIGATOR</span>
        <span className="badge bg-light text-secondary border fs-8">v2.0</span>
      </div>

      <nav className="sidebar-menu p-3">
        <ul className="nav flex-column gap-1">
          {sidebarModules.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="nav-item">
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `nav-link sidebar-nav-link d-flex align-items-center justify-content-between px-3 py-2 text-decoration-none ${
                      item.active && isActive ? "active" : ""
                    }`
                  }
                >
                  <div className="d-flex align-items-center gap-2">
                    <Icon size={18} className="sidebar-icon" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="badge bg-light text-muted fs-8 border">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
