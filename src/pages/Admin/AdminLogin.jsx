import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import "./Admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError(`Access Denied: Account role (${loggedInUser.role}) is not authorized to access the Admin Panel.`);
        logout();
      }
    } catch (err) {
      setError(err.message || "Invalid credentials or unauthorized login attempt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card shadow-lg">
        <div className="admin-login-header text-center">
          <div className="admin-brand-icon mb-3">
            <ShieldCheck size={48} className="text-danger" />
          </div>
          <h2 className="fw-bold mb-1">DOMENION SECURITY</h2>
          <span className="badge bg-danger text-uppercase px-3 py-2 fs-7 letter-spacing mb-3">
            ADMINISTRATIVE CONTROL PANEL
          </span>
          <p className="text-muted small">
            Authorized personnel only. Please sign in with your administrative credentials.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4 small" role="alert">
            <AlertCircle size={18} className="me-2 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="mb-3">
            <label className="form-label text-light small fw-bold">ADMIN EMAIL ADDRESS</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control bg-dark text-white border-secondary"
                placeholder="admin@domenionsecurity.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-bold">PASSWORD</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="form-control bg-dark text-white border-secondary"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-danger w-100 py-2 fw-bold" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="me-2 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In to Admin Panel"
            )}
          </button>
        </form>

        <div className="admin-login-footer text-center mt-4 pt-3 border-top border-secondary">
          <a href="/" className="text-secondary small text-decoration-none hover-white">
            ← Return to Domenion Security Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
