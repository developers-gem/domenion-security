import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-domenion-gold/30 selection:text-domenion-blue">
      {/* Top Fixed Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      {/* Main Viewport Container */}
      <div className="flex flex-1 relative pt-16">
        {/* Fixed Scrollable Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Independently Scrollable Main Panel */}
        <main className="flex-1 lg:pl-64 min-w-0 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
