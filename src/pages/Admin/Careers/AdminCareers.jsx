import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import CareerFormModal from "./components/CareerFormModal";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Lock,
  Unlock,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { careersAPI } from "../../../services/api";

function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCareers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await careersAPI.getCareers();
      if (response && Array.isArray(response.data)) {
        setCareers(response.data);
      } else if (Array.isArray(response)) {
        setCareers(response);
      } else {
        setCareers([]);
      }
    } catch {
      setError("Unable to load careers. Please check network connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleOpenCreateModal = () => {
    setSelectedCareer(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (career) => {
    setSelectedCareer(career);
    setShowModal(true);
  };

  const handleToggleStatus = async (career) => {
    const newStatus = career.status === "open" ? "closed" : "open";
    try {
      setActionLoading(true);
      await careersAPI.updateCareer(career._id, { status: newStatus });
      setSuccess(`Career status updated to '${newStatus}'.`);
      fetchCareers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update career status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCareer = async (id) => {
    try {
      setActionLoading(true);
      await careersAPI.deleteCareer(id);
      setSuccess("Career posting removed successfully.");
      setDeleteConfirmId(null);
      fetchCareers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete career posting.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="admin-careers-page">
        {/* Header Title Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">MODULE MANAGEMENT</span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <Briefcase size={24} className="text-danger me-2" />
              Career Postings Management
            </h2>
          </div>
          <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={handleOpenCreateModal}>
            <Plus size={18} />
            Create Career Posting
          </button>
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

        {/* Search & Filter Control Bar */}
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
                    placeholder="Search by position title, department, or location..."
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
                    <option value="all">All Statuses (Open & Closed)</option>
                    <option value="open">Open Only</option>
                    <option value="closed">Closed Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Table / Loading / Empty State */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading careers from backend...</p>
              </div>
            ) : filteredCareers.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No careers found matching your query.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>JOB TITLE & DEPARTMENT</th>
                      <th>LOCATION</th>
                      <th>TYPE</th>
                      <th>STATUS</th>
                      <th>DEADLINE</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCareers.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.title}</div>
                          <div className="text-secondary small">{item.department || "General"}</div>
                        </td>
                        <td className="small text-dark">
                          <MapPin size={14} className="text-danger me-1" />
                          {item.location}
                        </td>
                        <td>
                          <span className="badge bg-light text-secondary border">
                            {item.type || "Full-Time"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.status === "closed" ? "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25" : "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                            } text-uppercase fs-8`}
                          >
                            {item.status || "open"}
                          </span>
                        </td>
                        <td className="small text-secondary">
                          <Clock size={12} className="me-1" />
                          {item.applicationDeadline ? new Date(item.applicationDeadline).toLocaleDateString() : "Open until filled"}
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleOpenEditModal(item)}
                              title="Edit Career Posting"
                              disabled={actionLoading}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className={`btn ${item.status === "open" ? "btn-outline-warning" : "btn-outline-success"}`}
                              onClick={() => handleToggleStatus(item)}
                              title={item.status === "open" ? "Close Career Posting" : "Reopen Career Posting"}
                              disabled={actionLoading}
                            >
                              {item.status === "open" ? <Lock size={14} /> : <Unlock size={14} />}
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete Career Posting"
                              disabled={actionLoading}
                            >
                              <Trash2 size={14} />
                            </button>
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

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-white border-danger shadow-lg">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Career Posting</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-2">Are you sure you want to permanently delete this career posting?</p>
                  <p className="small text-warning mb-0">
                    Tip: If candidates have already applied for this role, consider setting the status to <strong>Closed</strong> instead of deleting.
                  </p>
                </div>
                <div className="modal-footer border-secondary">
                  <button className="btn btn-outline-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteCareer(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <CareerFormModal
            career={selectedCareer}
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchCareers();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCareers;
