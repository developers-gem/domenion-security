import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import CMSFormModal from "./components/CMSFormModal";
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Calendar,
  User,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cmsAPI } from "../../../services/api";

function AdminCMS() {
  const [cmsList, setCmsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [pageFilter, setPageFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedCms, setSelectedCms] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCMSPages = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (pageFilter !== "all") params.page = pageFilter;

      const response = await cmsAPI.getPageContents(params);
      if (response && Array.isArray(response.data)) {
        setCmsList(response.data);
      } else if (Array.isArray(response)) {
        setCmsList(response);
      } else {
        setCmsList([]);
      }
    } catch {
      setError("Unable to load CMS content pages. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCMSPages();
  }, [pageFilter]);

  const handleOpenCreateModal = () => {
    setSelectedCms(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setSelectedCms(item);
    setShowModal(true);
  };

  const handleDeleteCMS = async (id) => {
    try {
      setActionLoading(true);
      await cmsAPI.deletePageContent(id);
      setSuccess("CMS section deleted successfully.");
      setDeleteConfirmId(null);
      fetchCMSPages();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete CMS section.");
    } finally {
      setActionLoading(false);
    }
  };

  const uniquePages = Array.from(new Set(cmsList.map((item) => item.page))).filter(Boolean);

  const filteredCMS = cmsList.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.page?.toLowerCase().includes(term) ||
      item.section?.toLowerCase().includes(term) ||
      item.title?.toLowerCase().includes(term);

    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="admin-cms-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
              PAGE INFRASTRUCTURE
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <FolderKanban size={24} className="text-danger me-2" />
              CMS Page Content Management
            </h2>
          </div>
          <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={handleOpenCreateModal}>
            <Plus size={18} />
            Create CMS Section
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
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light-subtle text-secondary">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-light-subtle text-dark"
                    placeholder="Search by page key, section key, or title..."
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
                    className="form-select bg-light border-light-subtle text-dark font-monospace"
                    value={pageFilter}
                    onChange={(e) => setPageFilter(e.target.value)}
                  >
                    <option value="all">All Pages</option>
                    {uniquePages.map((p) => (
                      <option key={p} value={p}>
                        page: {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CMS Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading CMS page sections...</p>
              </div>
            ) : filteredCMS.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No CMS page content sections found.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>PAGE & SECTION</th>
                      <th>TITLE / HEADLINE</th>
                      <th>UPDATED BY</th>
                      <th>LAST UPDATED</th>
                      <th>STATUS</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCMS.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold text-danger font-monospace fs-6">
                            {item.page} / <span className="text-dark">{item.section}</span>
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold text-dark fs-7">{item.title || "(Untitled Section)"}</div>
                        </td>
                        <td className="small text-secondary">
                          <User size={12} className="me-1" />
                          {item.updatedBy?.name || item.updatedBy?.email || "Admin"}
                        </td>
                        <td className="small text-secondary">
                          <Calendar size={12} className="me-1" />
                          {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.status === "published"
                                ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                                : "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25"
                            } text-uppercase fs-8 fw-bold`}
                          >
                            {item.status || "published"}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleOpenEditModal(item)}
                              title="Edit Section"
                              disabled={actionLoading}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete Section"
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
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete CMS Section</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to permanently delete this page content section?</p>
                </div>
                <div className="modal-footer border-top">
                  <button className="btn btn-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteCMS(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <CMSFormModal
            cmsItem={selectedCms}
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchCMSPages();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCMS;
