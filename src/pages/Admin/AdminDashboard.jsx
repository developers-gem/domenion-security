import { useState, useEffect } from "react";
import AdminLayout from "./components/AdminLayout";
import StatCard from "./components/StatCard";
import { useAuth } from "../../context/AuthContext";
import {
  Briefcase,
  MessageSquare,
  FileQuestion,
  TrendingUp,
  Users,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Clock,
  Loader2,
  Server,
  Key,
  Shield,
  Database,
  Terminal,
} from "lucide-react";
import API from "../../services/api";

function AdminDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    careers: null,
    contacts: null,
    quotes: null,
    leads: null,
    employees: null,
    auditLogsCount: null,
  });

  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Fetch Careers
      const careersRes = await API.get("/api/careers").catch(() => null);
      const careersCount = careersRes?.data?.count ?? careersRes?.data?.data?.length ?? 0;

      // 2. Fetch Contact Requests (Protected)
      const contactsRes = await API.get("/api/contact").catch(() => null);
      const contactsCount = contactsRes?.data?.count ?? contactsRes?.data?.data?.length ?? 0;

      // 3. Fetch Quote Requests (Protected)
      const quotesRes = await API.get("/api/quotes").catch(() => null);
      const quotesCount = quotesRes?.data?.count ?? quotesRes?.data?.data?.length ?? 0;

      // 4. Fetch Leads (Protected)
      const leadsRes = await API.get("/api/leads").catch(() => null);
      const leadsCount = leadsRes?.data?.count ?? leadsRes?.data?.data?.length ?? 0;

      // 5. Fetch Employees (Protected)
      const employeesRes = await API.get("/api/employees").catch(() => null);
      const employeesCount = employeesRes?.data?.count ?? employeesRes?.data?.data?.length ?? 0;

      // 6. Fetch Audit Logs (Admin Only)
      const auditRes = await API.get("/api/audit-logs").catch(() => null);
      const auditLogsCount = auditRes?.data?.count ?? auditRes?.data?.data?.length ?? 0;
      const logsList = auditRes?.data?.data ? auditRes.data.data.slice(0, 5) : [];

      setStats({
        careers: careersCount,
        contacts: contactsCount,
        quotes: quotesCount,
        leads: leadsCount,
        employees: employeesCount,
        auditLogsCount: auditLogsCount,
      });

      setRecentLogs(logsList);
    } catch {
      setError("Some statistics could not be loaded. Please ensure API service is reachable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-wrapper">
        {/* Welcome Header Banner */}
        <div className="card bg-white border-start border-4 border-danger shadow-sm mb-4 p-4 admin-card-light">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="d-flex align-items-center mb-1">
                <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
                  ROLE: {user?.role?.toUpperCase() || "ADMIN"}
                </span>
                <span className="text-secondary small fw-medium">AUTHENTICATED SESSION</span>
              </div>
              <h2 className="fw-bold text-dark mb-1">Welcome back, {user?.name || "Domenion Security Admin"}!</h2>
              <p className="text-muted mb-0 small">
                Connected to Domenion Security API on <strong>Port 4000</strong>. Real-time system monitoring active.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm bg-white text-dark d-flex align-items-center shadow-xs"
                onClick={fetchDashboardStats}
                disabled={loading}
              >
                {loading ? <Loader2 size={16} className="animate-spin text-danger me-1" /> : <Activity size={16} className="text-danger me-1" />}
                Refresh Metrics
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-warning mb-4 small border" role="alert">
            {error}
          </div>
        )}

        {/* Statistic Cards Grid (3 col Desktop, 2 col Tablet, 1 col Mobile) */}
        <div className="row g-4 mb-4">
          <div className="col-xl-4 col-md-6">
            <StatCard title="Active Careers" value={stats.careers} icon={Briefcase} color="blue" badgeText="Phase 1 API" />
          </div>
          <div className="col-xl-4 col-md-6">
            <StatCard title="Contact Requests" value={stats.contacts} icon={MessageSquare} color="green" badgeText="Phase 2 API" />
          </div>
          <div className="col-xl-4 col-md-6">
            <StatCard title="Quote Requests" value={stats.quotes} icon={FileQuestion} color="amber" badgeText="Phase 2 API" />
          </div>
          <div className="col-xl-4 col-md-6">
            <StatCard title="Total Leads" value={stats.leads} icon={TrendingUp} color="cyan" badgeText="Phase 2 API" />
          </div>
          <div className="col-xl-4 col-md-6">
            <StatCard title="Employee Profiles" value={stats.employees} icon={Users} color="purple" badgeText="Phase 2 API" />
          </div>
          <div className="col-xl-4 col-md-6">
            <StatCard title="Audit Log Entries" value={stats.auditLogsCount} icon={ShieldCheck} color="red" badgeText="Append-Only API" />
          </div>
        </div>

        {/* Audit Log Activity Table & System Environment Summary */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card bg-white border shadow-sm h-100 admin-card-light">
              <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0 text-dark d-flex align-items-center fs-6">
                  <Activity size={18} className="text-danger me-2" />
                  Recent Administrative Audit Activity
                </h5>
                <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">
                  Append-Only
                </span>
              </div>
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <Loader2 size={32} className="text-danger animate-spin mb-2" />
                    <p className="text-muted small">Fetching audit activity...</p>
                  </div>
                ) : recentLogs.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <p className="mb-0">No recent administrative activity.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-light-custom mb-0 text-start align-middle">
                      <thead>
                        <tr>
                          <th>ACTIVITY</th>
                          <th>ENTITY</th>
                          <th>PERFORMED BY</th>
                          <th>TIMESTAMP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentLogs.map((log, idx) => (
                          <tr key={log._id || idx}>
                            <td>
                              <span className="badge bg-light text-dark border font-monospace fs-8 me-1">
                                {log.action}
                              </span>
                            </td>
                            <td className="fw-bold text-dark">{log.resource}</td>
                            <td className="small text-secondary">{log.user?.name || log.user?.email || "System"}</td>
                            <td className="small text-muted">
                              <Clock size={12} className="me-1 text-secondary" />
                              {new Date(log.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card bg-white border shadow-sm h-100 admin-card-light">
              <div className="card-header bg-white border-bottom py-3">
                <h5 className="fw-bold mb-0 text-dark fs-6">System Environment</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent text-dark border-bottom px-0 py-2 d-flex justify-content-between align-items-center">
                    <span className="text-secondary small d-flex align-items-center gap-1">
                      <Server size={14} className="text-muted" /> Backend API Port:
                    </span>
                    <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">4000</span>
                  </li>
                  <li className="list-group-item bg-transparent text-dark border-bottom px-0 py-2 d-flex justify-content-between align-items-center">
                    <span className="text-secondary small d-flex align-items-center gap-1">
                      <Key size={14} className="text-muted" /> Auth Strategy:
                    </span>
                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">JWT Bearer</span>
                  </li>
                  <li className="list-group-item bg-transparent text-dark border-bottom px-0 py-2 d-flex justify-content-between align-items-center">
                    <span className="text-secondary small d-flex align-items-center gap-1">
                      <Shield size={14} className="text-muted" /> Admin Role Enforced:
                    </span>
                    <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">Strict RBAC</span>
                  </li>
                  <li className="list-group-item bg-transparent text-dark border-bottom px-0 py-2 d-flex justify-content-between align-items-center">
                    <span className="text-secondary small d-flex align-items-center gap-1">
                      <Terminal size={14} className="text-muted" /> Environment:
                    </span>
                    <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">Development</span>
                  </li>
                  <li className="list-group-item bg-transparent text-dark border-bottom px-0 py-2 d-flex justify-content-between align-items-center">
                    <span className="text-secondary small d-flex align-items-center gap-1">
                      <Database size={14} className="text-muted" /> Database:
                    </span>
                    <span className="badge bg-light text-secondary border">MongoDB Atlas</span>
                  </li>
                </ul>

                <div className="mt-4 pt-3 border-top text-center">
                  <span className="small text-muted d-block mb-2">Module management views (CRUD) integrated for Phase 4B.</span>
                  <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm w-100 fw-medium">
                    Preview Public Website <ArrowUpRight size={14} className="ms-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
