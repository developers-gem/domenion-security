import { useState, useEffect, useCallback } from "react";
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
  RefreshCw,
} from "lucide-react";
import API from "../../services/api";

export default function AdminDashboard() {
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

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [
        careersRes,
        contactsRes,
        quotesRes,
        leadsRes,
        employeesRes,
        auditRes,
      ] = await Promise.allSettled([
        API.get("/api/careers"),
        API.get("/api/contact"),
        API.get("/api/quotes"),
        API.get("/api/leads"),
        API.get("/api/employees"),
        API.get("/api/audit-logs"),
      ]);

      const getCount = (result) => {
        if (result.status !== "fulfilled" || !result.value?.data) return 0;
        const res = result.value.data;
        return res.count ?? (Array.isArray(res.data) ? res.data.length : 0);
      };

      const auditData =
        auditRes.status === "fulfilled" ? auditRes.value?.data : null;
      const auditCount =
        auditData?.count ??
        (Array.isArray(auditData?.data) ? auditData.data.length : 0);
      const logsList = Array.isArray(auditData?.data)
        ? auditData.data.slice(0, 5)
        : [];

      setStats({
        careers: getCount(careersRes),
        contacts: getCount(contactsRes),
        quotes: getCount(quotesRes),
        leads: getCount(leadsRes),
        employees: getCount(employeesRes),
        auditLogsCount: auditCount,
      });

      setRecentLogs(logsList);
    } catch {
      setError(
        "Some statistics could not be loaded. Please ensure the API service is reachable.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-white rounded-xl border-l-4 border-l-domenion-gold border border-slate-200/80 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-domenion-gold/15 border border-domenion-gold/40 text-domenion-gold font-mono text-[11px] font-bold uppercase tracking-wider">
                ROLE: {user?.role?.toUpperCase() || "ADMIN"}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Authenticated Session
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Welcome back, {user?.name || "Domenion Security Admin"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connected to Domenion Security API on{" "}
              <strong className="text-slate-800 font-semibold">
                Port 4000
              </strong>
              . Real-time telemetry and management active.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={fetchDashboardStats}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-domenion-blue hover:bg-domenion-blue/90 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2
                  size={15}
                  className="animate-spin text-domenion-gold"
                />
              ) : (
                <RefreshCw size={15} className="text-domenion-gold" />
              )}
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <Activity size={16} className="text-amber-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 6 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="Active Careers"
            value={stats.careers}
            icon={Briefcase}
            color="blue"
            badgeText="Recruitment"
          />
          <StatCard
            title="Contact Requests"
            value={stats.contacts}
            icon={MessageSquare}
            color="green"
            badgeText="Inquiries"
          />
          <StatCard
            title="Quote Requests"
            value={stats.quotes}
            icon={FileQuestion}
            color="amber"
            badgeText="Proposals"
          />
          <StatCard
            title="Total Leads"
            value={stats.leads}
            icon={TrendingUp}
            color="cyan"
            badgeText="Pipeline"
          />
          <StatCard
            title="Employee Profiles"
            value={stats.employees}
            icon={Users}
            color="purple"
            badgeText="Staffing"
          />
          <StatCard
            title="Audit Log Entries"
            value={stats.auditLogsCount}
            icon={ShieldCheck}
            color="red"
            badgeText="Append-Only"
          />
        </div>

        {/* Audit Activity Table & System Environment Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Audit Activity Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-slate-800">
                <Activity size={17} className="text-domenion-gold" />
                <h2>Recent Administrative Activity</h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                Append-Only
              </span>
            </div>

            <div className="flex-1 overflow-x-auto">
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <Loader2
                    size={24}
                    className="animate-spin text-domenion-gold mb-2"
                  />
                  <span className="text-xs">Fetching audit logs...</span>
                </div>
              ) : recentLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No recent audit logs available.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200/60">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Activity</th>
                      <th className="py-3 px-4 font-semibold">Entity</th>
                      <th className="py-3 px-4 font-semibold">Performed By</th>
                      <th className="py-3 px-4 font-semibold text-right">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {recentLogs.map((log, idx) => (
                      <tr
                        key={log._id || idx}
                        className="hover:bg-slate-50/75 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-800">
                            {log.action || "MUTATION"}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {log.resource || "Resource"}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {log.user?.name || log.user?.email || "System"}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400 font-mono">
                          <div className="inline-flex items-center gap-1">
                            <Clock size={11} />
                            <span>
                              {new Date(log.createdAt).toLocaleDateString()}{" "}
                              {new Date(log.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* System Environment Information */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-slate-800 pb-3 border-b border-slate-100">
                <Server size={17} className="text-domenion-gold" />
                <h2>System Environment</h2>
              </div>

              <ul className="divide-y divide-slate-100 mt-2 text-xs">
                <li className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Server size={14} className="text-slate-400" /> API Port
                  </span>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    4000
                  </span>
                </li>
                <li className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Key size={14} className="text-slate-400" /> Auth Strategy
                  </span>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    JWT Bearer
                  </span>
                </li>
                <li className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Shield size={14} className="text-slate-400" /> Access
                    Control
                  </span>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    Strict RBAC
                  </span>
                </li>
                <li className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Terminal size={14} className="text-slate-400" />{" "}
                    Environment
                  </span>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Development
                  </span>
                </li>
                <li className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Database size={14} className="text-slate-400" /> Database
                  </span>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    MongoDB Atlas
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-sm"
              >
                <span>Preview Public Website</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
