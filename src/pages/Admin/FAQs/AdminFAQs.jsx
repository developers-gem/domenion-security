import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import FAQFormModal from "./components/FAQFormModal";
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Check,
  X,
} from "lucide-react";
import { faqsAPI } from "../../../services/api";

const CATEGORY_OPTIONS = ["all", "General", "Guard Services", "Billing", "Compliance"];

function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchFAQs = async () => {
    setLoading(true);
    setError("");
    try {
      // Admin gets active and inactive FAQs
      const params = {};
      if (activeFilter !== "all") params.active = activeFilter;
      if (categoryFilter !== "all") params.category = categoryFilter;

      const response = await faqsAPI.getFAQs(params);
      if (response && Array.isArray(response.data)) {
        setFaqs(response.data);
      } else if (Array.isArray(response)) {
        setFaqs(response);
      } else {
        setFaqs([]);
      }
    } catch {
      setError("Unable to load FAQs. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [categoryFilter, activeFilter]);

  const handleOpenCreateModal = () => {
    setSelectedFaq(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (faq) => {
    setSelectedFaq(faq);
    setShowModal(true);
  };

  const handleToggleActive = async (faq) => {
    try {
      setActionLoading(true);
      await faqsAPI.updateFAQ(faq._id, { active: !faq.active });
      setSuccess(`FAQ status updated to ${!faq.active ? "Active" : "Inactive"}.`);
      fetchFAQs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update FAQ status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteFAQ = async (id) => {
    try {
      setActionLoading(true);
      await faqsAPI.deleteFAQ(id);
      setSuccess("FAQ deleted successfully.");
      setDeleteConfirmId(null);
      fetchFAQs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete FAQ.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredFAQs = faqs.filter((f) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      f.question?.toLowerCase().includes(term) ||
      f.answer?.toLowerCase().includes(term) ||
      f.category?.toLowerCase().includes(term);

    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="admin-faqs-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
              KNOWLEDGE BASE
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <HelpCircle size={24} className="text-danger me-2" />
              Frequently Asked Questions (FAQs)
            </h2>
          </div>
          <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={handleOpenCreateModal}>
            <Plus size={18} />
            Create FAQ Item
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

        {/* Search & Filter Bar */}
        <div className="card bg-white border shadow-sm mb-4">
          <div className="card-body p-3">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light-subtle text-secondary">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-light-subtle text-dark"
                    placeholder="Search by question, answer, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light-subtle text-secondary">
                    <Filter size={18} />
                  </span>
                  <select
                    className="form-select bg-light border-light-subtle text-dark"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c === "all" ? "All Categories" : c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select bg-light border-light-subtle text-dark"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">All States (Active/Inactive)</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading FAQs...</p>
              </div>
            ) : filteredFAQs.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No FAQs found matching criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: "80px" }}>ORDER</th>
                      <th>QUESTION</th>
                      <th>CATEGORY</th>
                      <th>ACTIVE</th>
                      <th>UPDATED</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFAQs.map((item) => (
                      <tr key={item._id}>
                        <td className="fw-bold text-secondary text-center">{item.order || 0}</td>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.question}</div>
                          <div className="text-secondary small text-truncate max-w-400">{item.answer}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{item.category || "General"}</span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${
                              item.active
                                ? "btn-success bg-opacity-10 text-success border border-success border-opacity-25"
                                : "btn-secondary bg-opacity-10 text-secondary border"
                            } fw-bold d-inline-flex align-items-center gap-1`}
                            onClick={() => handleToggleActive(item)}
                            disabled={actionLoading}
                            title="Click to toggle active status"
                          >
                            {item.active ? <Check size={12} /> : <X size={12} />}
                            {item.active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="small text-secondary">
                          <Calendar size={12} className="me-1" />
                          {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleOpenEditModal(item)}
                              title="Edit FAQ"
                              disabled={actionLoading}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete FAQ"
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

        {/* Delete Modal */}
        {deleteConfirmId && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-white text-dark border-danger shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete FAQ</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to permanently delete this FAQ item?</p>
                </div>
                <div className="modal-footer border-top">
                  <button className="btn btn-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteFAQ(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <FAQFormModal
            faq={selectedFaq}
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchFAQs();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminFAQs;
