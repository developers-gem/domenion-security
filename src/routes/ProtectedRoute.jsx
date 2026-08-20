import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, Loader2 } from "lucide-react";

function ProtectedRoute({ roles }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="text-center">
          <Loader2 size={40} className="text-danger animate-spin mb-3" />
          <p className="lead">Verifying credentials & session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (roles && Array.isArray(roles) && !roles.includes(user?.role)) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white p-4">
        <div className="card bg-secondary text-white border-danger shadow-lg p-4 max-w-md text-center" style={{ maxWidth: "500px" }}>
          <div className="mb-3 text-danger">
            <ShieldAlert size={56} className="mx-auto" />
          </div>
          <h2 className="fw-bold text-danger mb-2">403 — Access Denied</h2>
          <p className="text-light mb-3">
            Your account role (<strong>{user?.role || "user"}</strong>) is not authorized to access the Admin Control Panel.
          </p>
          <p className="small text-warning mb-4">
            Only users with the <code>admin</code> role are permitted access to this dashboard.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-light" onClick={logout}>
              Log Out & Switch Account
            </button>
            <a href="/" className="btn btn-danger">
              Return to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
