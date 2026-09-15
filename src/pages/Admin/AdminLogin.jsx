
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ShieldCheck,
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import "./admin-bootstrap-scoped.css";
import "./Admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        setError(
          `Access Denied: Account role (${loggedInUser.role}) is not authorized to access the Admin Panel.`
        );
        logout();
      }
    } catch (err) {
      setError(
        err.message || "Invalid credentials or unauthorized login attempt."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Background Decoration */}
      <div className="admin-login-bg-shape admin-login-bg-shape-one" />
      <div className="admin-login-bg-shape admin-login-bg-shape-two" />

      <div className="admin-login-wrapper">
        {/* Login Card */}
        <div className="admin-login-card">
          {/* Top Accent */}
          <div className="admin-login-accent" />

          {/* Header */}
          <div className="admin-login-header text-center">
            <div className="admin-brand-icon">
              <ShieldCheck size={38} strokeWidth={1.8} />
            </div>

            <div className="admin-brand-label">
              DOMENION SECURITY
            </div>

            <h1>Admin Portal</h1>

            <p>
              Secure access to the Domenion Security
              administrative control panel.
            </p>

            <div className="admin-security-status">
              <span className="status-dot" />
              <CheckCircle2 size={14} />
              Secure Administrative Access
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="admin-login-error"
              role="alert"
            >
              <div className="admin-login-error-icon">
                <AlertCircle size={19} />
              </div>

              <div>
                <strong>Authentication Failed</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Email */}
            <div className="admin-field">
              <label htmlFor="admin-email">
                ADMIN EMAIL ADDRESS
              </label>

              <div className="admin-input-wrapper">
                <Mail
                  className="admin-input-icon"
                  size={19}
                />

                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@domenionsecurity.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="admin-field">
              <div className="admin-password-label">
                <label htmlFor="admin-password">
                  PASSWORD
                </label>
              </div>

              <div className="admin-input-wrapper">
                <Lock
                  className="admin-input-icon"
                  size={19}
                />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="admin-spin"
                  />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="admin-login-security-note">
            <ShieldCheck size={17} />

            <div>
              <strong>Protected Area</strong>
              <span>
                This portal is restricted to authorized
                Domenion Security personnel.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="admin-login-footer">
            <a href="/">
              <ArrowLeft size={16} />
              <span>Return to Domenion Security Website</span>
            </a>

            <div className="admin-login-footer-divider" />

            <small>
              © {new Date().getFullYear()} Domenion Security
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;


