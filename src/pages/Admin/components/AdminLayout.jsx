import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./AdminComponent.css";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout min-vh-100 d-flex flex-column">
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="d-flex flex-grow-1 position-relative">
        <AdminSidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

        {sidebarOpen && (
          <div className="sidebar-backdrop d-md-none" onClick={closeSidebar} />
        )}

        <main className="admin-main-content flex-grow-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
