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
      setError("Unable to load applications. Please check network connection and try again.");
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
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
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
      setError(err.message || "Unable to delete application. Permission denied or record not found.");
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

  const getBadgeClass = (status) => {
    switch (status) {
      case "reviewing":
        return "bg-info bg-opacity-10 text-info border border-info border-opacity-25";
      case "shortlisted":
        return "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25";
      case "interview":
        return "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25";
      case "rejected":
        return "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25";
      case "hired":
        return "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
      default:
        return "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25";
    }
  };

  return (
    <AdminLayout>
      <div className="admin-applications-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">RECRUITMENT PORTAL</span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <FileText size={24} className="text-danger me-2" />
              Job Applications Management
            </h2>
          </div>
          <span className="badge bg-light text-secondary border fs-7">
            Role: <strong>{user?.role?.toUpperCase()}</strong>
          </span>
        </div>

        {/* Global Notifications */}
        {success && (
          <div className="alert alert-success d-flex align-items-center mb-3" role="alert">
            <CheckCircle2 size={18} className="me-2" />
            <div>{success}</div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
            <AlertCircle size={18} className="me-2" />
            <div>{error}</div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="card bg-white border shadow-sm mb-4">
          <div className="card-body p-3">
            <div className="row g-3">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light-subtle text-secondary">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-light-subtle text-dark"
                    placeholder="Search by applicant name, email, phone, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light-subtle text-secondary">
                    <Filter size={18} />
                  </span>
                  <select
                    className="form-select bg-light border-light-subtle text-dark"
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
          </div>
        </div>

        {/* Applications List Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading candidate applications...</p>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No applications found matching your criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>APPLICANT</th>
                      <th>CONTACT INFO</th>
                      <th>APPLIED POSITION</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.fullName}</div>
                        </td>
                        <td className="small">
                          <div className="text-dark">{item.email}</div>
                          <div className="text-secondary">{item.phone}</div>
                        </td>
                        <td>
                          <div className="fw-bold text-dark small d-flex align-items-center">
                            <Briefcase size={14} className="text-danger me-1" />
                            {item.careerId?.title || "General Application"}
                          </div>
                          <div className="text-secondary fs-8">{item.careerId?.department || "General"}</div>
                        </td>
                        <td className="small text-secondary">
                          <Calendar size={12} className="me-1" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <select
                            className={`form-select form-select-sm ${getBadgeClass(item.status)} fw-bold`}
                            style={{ minWidth: "130px" }}
                            value={item.status || "submitted"}
                            onChange={(e) => handleInlineStatusChange(item._id, e.target.value)}
                            disabled={actionLoading}
                          >
                            <option value="submitted" className="bg-white text-dark">Submitted</option>
                            <option value="reviewing" className="bg-white text-dark">Reviewing</option>
                            <option value="shortlisted" className="bg-white text-dark">Shortlisted</option>
                            <option value="interview" className="bg-white text-dark">Interview</option>
                            <option value="rejected" className="bg-white text-dark">Rejected</option>
                            <option value="hired" className="bg-white text-dark">Hired</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary d-flex align-items-center gap-1"
                              onClick={() => setSelectedApp(item)}
                              title="View Application Details"
                            >
                              <Eye size={14} />
                              <span>Details</span>
                            </button>
                            {isAdmin && (
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => setDeleteConfirmId(item._id)}
                                title="Delete Application"
                                disabled={actionLoading}
                              >
                                <Trash2 size={14} />
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
        </div>

        {/* Details Modal */}
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

        {/* Delete Confirmation Modal (Admin Only) */}
        {deleteConfirmId && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-white border-danger shadow-lg">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Application</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to permanently delete this candidate application record?</p>
                </div>
                <div className="modal-footer border-secondary">
                  <button className="btn btn-outline-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteApplication(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminApplications;
