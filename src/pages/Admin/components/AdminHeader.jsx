import { useAuth } from "../../../context/AuthContext";
import { LogOut, User, Menu, Shield } from "lucide-react";

function AdminHeader({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="admin-header bg-white border-bottom border-light-subtle px-4 py-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-sm btn-outline-secondary d-md-none me-3 p-1"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="d-flex align-items-center">
          <Shield size={22} className="text-danger me-2" />
          <span className="fw-bold text-dark fs-5 letter-spacing me-2">DOMENION SECURITY</span>
          <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase px-2 py-1 fs-8">
            ADMIN
          </span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center me-2">
          <div
            className="bg-light p-2 rounded-circle me-2 text-secondary d-flex justify-content-center align-items-center border"
            style={{ width: 38, height: 38 }}
          >
            <User size={18} />
          </div>
          <div className="d-none d-sm-block text-start">
            <div className="fw-bold fs-7 text-dark leading-tight">{user?.name || "Domenion Security Admin"}</div>
            <div className="text-muted fs-8 leading-tight">{user?.email || "admin@domenionsecurity.com"}</div>
          </div>
        </div>

        <button
          className="btn admin-logout-btn btn-sm d-flex align-items-center gap-1 px-3 py-1"
          onClick={logout}
          title="Sign out of Admin Panel"
        >
          <LogOut size={15} />
          <span className="d-none d-sm-inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
