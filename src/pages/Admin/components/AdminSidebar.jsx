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
  FileCheck,
  Compass,
} from "lucide-react";

const sidebarModules = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Careers", path: "/admin/careers", icon: Briefcase },
  { title: "Applications", path: "/admin/applications", icon: FileText },
  {
    title: "Contact Requests",
    path: "/admin/contact-requests",
    icon: MessageSquare,
  },
  { title: "Assessments", path: "/admin/assessments", icon: FileCheck },
  // {
  //   title: "Quote Requests",
  //   path: "/admin/quote-requests",
  //   icon: FileQuestion,
  // },
  // { title: "Leads", path: "/admin/leads", icon: TrendingUp },
  // { title: "Blogs", path: "/admin/blogs", icon: FileCode },
  // { title: "FAQs", path: "/admin/faqs", icon: HelpCircle },
  // { title: "CMS", path: "/admin/cms", icon: FolderKanban },
  // { title: "Media Gallery", path: "/admin/media", icon: Image },
];

export default function AdminSidebar({ isOpen, closeSidebar }) {
  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 w-64 bg-domenion-blue/95 border-r border-domenion-gold/15 flex flex-col z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Navigator Label */}
      <div className="h-12 px-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Compass size={14} className="text-domenion-gold" />
          <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-300">
            Navigation
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
          v2.0
        </span>
      </div>

      {/* Navigation Links - Scrollable on Overflow */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {sidebarModules.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-domenion-gold/20 text-domenion-gold font-semibold border-l-4 border-domenion-gold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    className={`flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-domenion-gold"
                        : "text-slate-400 group-hover:text-domenion-gold"
                    }`}
                  />
                  <span className="truncate">{item.title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
