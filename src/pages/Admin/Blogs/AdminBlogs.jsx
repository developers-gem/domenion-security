import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import BlogFormModal from "./components/BlogFormModal";
import {
  FileCode,
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
import { blogsAPI } from "../../../services/api";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      // Pass status filter if staff member wants draft/archived
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await blogsAPI.getBlogs(params);
      if (response && Array.isArray(response.data)) {
        setBlogs(response.data);
      } else if (Array.isArray(response)) {
        setBlogs(response);
      } else {
        setBlogs([]);
      }
    } catch {
      setError("Unable to load blog posts. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const handleOpenCreateModal = () => {
    setSelectedBlog(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleDeleteBlog = async (id) => {
    try {
      setActionLoading(true);
      await blogsAPI.deleteBlog(id);
      setSuccess("Blog article deleted successfully.");
      setDeleteConfirmId(null);
      fetchBlogs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete blog article.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      b.title?.toLowerCase().includes(term) ||
      b.category?.toLowerCase().includes(term) ||
      b.excerpt?.toLowerCase().includes(term);

    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
      case "draft":
        return "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25";
      case "archived":
        return "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25";
      default:
        return "bg-light text-secondary border";
    }
  };

  return (
    <AdminLayout>
      <div className="admin-blogs-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
              CONTENT MANAGEMENT
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <FileCode size={24} className="text-danger me-2" />
              Blog Articles Management
            </h2>
          </div>
          <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={handleOpenCreateModal}>
            <Plus size={18} />
            Create Blog Article
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
                    placeholder="Search by article title, category, or excerpt..."
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

        {/* Blog Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading blog articles...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No blog articles found matching criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>ARTICLE TITLE & SLUG</th>
                      <th>CATEGORY</th>
                      <th>AUTHOR</th>
                      <th>PUBLISHED DATE</th>
                      <th>STATUS</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.title}</div>
                          <div className="text-secondary small font-monospace">/{item.slug}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{item.category}</span>
                        </td>
                        <td className="small text-secondary">
                          <User size={12} className="me-1" />
                          {item.author?.name || item.author?.email || "Admin"}
                        </td>
                        <td className="small text-secondary">
                          <Calendar size={12} className="me-1" />
                          {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Not published"}
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadge(item.status)} text-uppercase fs-8 fw-bold`}>
                            {item.status || "draft"}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleOpenEditModal(item)}
                              title="Edit Article"
                              disabled={actionLoading}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete Article"
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
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Blog Article</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to permanently delete this blog post?</p>
                </div>
                <div className="modal-footer border-top">
                  <button className="btn btn-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteBlog(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <BlogFormModal
            blog={selectedBlog}
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchBlogs();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminBlogs;
