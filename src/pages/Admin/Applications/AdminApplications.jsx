import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import ApplicationDetailsModal from "./components/ApplicationDetailsModal";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Briefcase,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { applicationsAPI } from "../../../services/api";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "submitted", label: "Submitted" },
  { value: "reviewing", label: "Reviewing" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview Scheduled" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
];

function AdminApplications() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedApp, setSelectedApp] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await applicationsAPI.getApplications();
      if (response && Array.isArray(response.data)) {
        setApplications(response.data);
      } else if (Array.isArray(response)) {
        setApplications(response);
      } else {
        setApplications([]);
      }
    } catch {
      setError(
        "Unable to load applications. Please check network connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleInlineStatusChange = async (appId, newStatus) => {
    try {
      setActionLoading(true);
      await applicationsAPI.updateApplicationStatus(appId, newStatus);
      setSuccess(`Updated candidate status to '${newStatus}'.`);
      fetchApplications();
      if (selectedApp && selectedApp._id === appId) {
        setSelectedApp((prev) =>
          prev ? { ...prev, status: newStatus } : null,
        );
      }
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      setActionLoading(true);
      await applicationsAPI.deleteApplication(id);
      setSuccess("Application deleted successfully.");
      setDeleteConfirmId(null);
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(null);
      }
      fetchApplications();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete application. Permission denied or record not found.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const filteredApps = applications.filter((app) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      app.fullName?.toLowerCase().includes(term) ||
      app.email?.toLowerCase().includes(term) ||
      app.phone?.toLowerCase().includes(term) ||
      app.careerId?.title?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "reviewing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "shortlisted":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "interview":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "hired":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-domenion-gold/15 border border-domenion-gold/40 text-domenion-gold font-mono text-[11px] font-bold uppercase tracking-wider">
                Recruitment Portal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-domenion-blue/5 border border-domenion-blue/15 flex items-center justify-center text-domenion-blue">
                <FileText size={18} />
              </div>
              Job Applications Management
            </h1>
          </div>

          <span className="self-start sm:self-auto px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-sm text-xs font-mono text-slate-600">
            Role:{" "}
            <strong className="text-slate-900">
              {user?.role?.toUpperCase() || "ADMIN"}
            </strong>
          </span>
        </div>

        {/* Global Notifications */}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 shadow-sm">
            <CheckCircle2
              size={16}
              className="text-emerald-600 flex-shrink-0"
            />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 shadow-sm">
            <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors"
                placeholder="Search by applicant name, email, phone, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Filter size={16} />
              </div>
              <select
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:bg-white focus:border-domenion-gold appearance-none transition-colors cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400">
              <Loader2
                size={32}
                className="animate-spin text-domenion-gold mb-3"
              />
              <p className="text-xs font-medium text-slate-500">
                Loading candidate applications...
              </p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-xs">
              No applications found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200/70">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Applicant</th>
                    <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                    <th className="py-3.5 px-4 font-semibold">
                      Applied Position
                    </th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredApps.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-heading font-semibold text-sm text-slate-900 block">
                          {item.fullName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="text-slate-800 font-medium truncate max-w-[200px]">
                          {item.email}
                        </div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          {item.phone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          <Briefcase
                            size={13}
                            className="text-domenion-gold flex-shrink-0"
                          />
                          <span className="truncate max-w-[180px]">
                            {item.careerId?.title || "General Application"}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {item.careerId?.department || "General"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        <div className="inline-flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer focus:outline-none disabled:opacity-50 ${getStatusBadge(
                            item.status,
                          )}`}
                          value={item.status || "submitted"}
                          onChange={(e) =>
                            handleInlineStatusChange(item._id, e.target.value)
                          }
                          disabled={actionLoading}
                        >
                          <option
                            value="submitted"
                            className="bg-white text-slate-900"
                          >
                            Submitted
                          </option>
                          <option
                            value="reviewing"
                            className="bg-white text-slate-900"
                          >
                            Reviewing
                          </option>
                          <option
                            value="shortlisted"
                            className="bg-white text-slate-900"
                          >
                            Shortlisted
                          </option>
                          <option
                            value="interview"
                            className="bg-white text-slate-900"
                          >
                            Interview
                          </option>
                          <option
                            value="rejected"
                            className="bg-white text-slate-900"
                          >
                            Rejected
                          </option>
                          <option
                            value="hired"
                            className="bg-white text-slate-900"
                          >
                            Hired
                          </option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedApp(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-xs transition-colors"
                            title="View Application Details"
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </button>

                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(item._id)}
                              className="p-1.5 rounded-lg border border-rose-200/80 bg-rose-50/60 hover:bg-rose-500 hover:text-white text-rose-600 transition-colors shadow-xs disabled:opacity-50"
                              title="Delete Application"
                              disabled={actionLoading}
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Details View Modal */}
        {selectedApp && (
          <ApplicationDetailsModal
            application={selectedApp}
            onClose={() => setSelectedApp(null)}
            onUpdated={() => {
              fetchApplications();
            }}
            onDelete={(id) => {
              setDeleteConfirmId(id);
            }}
          />
        )}

        {/* Tailwind Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-rose-600 font-heading font-bold text-base">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <Trash2 size={18} />
                  </div>
                  <h3>Confirm Delete Application</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete this candidate
                application record? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteApplication(deleteConfirmId)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Deleting..." : "Permanently Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminApplications;
