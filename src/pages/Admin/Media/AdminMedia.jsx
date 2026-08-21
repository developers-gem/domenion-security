import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import MediaRecordModal from "./components/MediaRecordModal";
import {
  Image,
  Plus,
  Search,
  Filter,
  Trash2,
  Calendar,
  User,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
  Video,
  File,
} from "lucide-react";
import { mediaAPI } from "../../../services/api";

const CATEGORY_OPTIONS = ["all", "image", "video", "pdf", "document", "general"];

function AdminMedia() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (categoryFilter !== "all") params.category = categoryFilter;

      const response = await mediaAPI.getMedia(params);
      if (response && Array.isArray(response.data)) {
        setMediaList(response.data);
      } else if (Array.isArray(response)) {
        setMediaList(response);
      } else {
        setMediaList([]);
      }
    } catch {
      setError("Unable to load media records. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [categoryFilter]);

  const handleDeleteMedia = async (id) => {
    try {
      setActionLoading(true);
      await mediaAPI.deleteMediaRecord(id);
      setSuccess("Media asset record deleted successfully.");
      setDeleteConfirmId(null);
      fetchMedia();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete media record.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredMedia = mediaList.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.filename?.toLowerCase().includes(term) ||
      item.originalName?.toLowerCase().includes(term) ||
      item.mimeType?.toLowerCase().includes(term);

    return matchesSearch;
  });

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderTypeIcon = (category) => {
    switch (category) {
      case "image":
        return <Image size={18} className="text-primary" />;
      case "video":
        return <Video size={18} className="text-danger" />;
      case "pdf":
        return <FileText size={18} className="text-warning" />;
      case "document":
        return <FileText size={18} className="text-info" />;
      default:
        return <File size={18} className="text-secondary" />;
    }
  };

  return (
    <AdminLayout>
      <div className="admin-media-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
              ASSET REGISTRY
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <Image size={24} className="text-danger me-2" />
              Media Metadata Library
            </h2>
          </div>
          <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Register Media Asset
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
                    placeholder="Search by filename, display name, or MIME type..."
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
            </div>
          </div>
        </div>

        {/* Media Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading media library records...</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No media records found in registry.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>PREVIEW</th>
                      <th>FILENAME & DISPLAY NAME</th>
                      <th>TYPE / CATEGORY</th>
                      <th>SIZE</th>
                      <th>UPLOADED BY</th>
                      <th>DATE</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedia.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.category === "image" && item.url ? (
                            <img
                              src={item.url}
                              alt={item.filename}
                              className="rounded border"
                              style={{ width: "40px", height: "40px", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="bg-light rounded p-2 d-inline-flex align-items-center justify-content-center">
                              {renderTypeIcon(item.category)}
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.filename}</div>
                          <div className="text-secondary small">{item.originalName}</div>
                          <div className="text-muted fs-8 font-monospace">{item.url}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border text-uppercase me-1">{item.category}</span>
                          <span className="text-muted fs-8 font-monospace">{item.mimeType}</span>
                        </td>
                        <td className="small fw-bold text-secondary">{formatFileSize(item.size)}</td>
                        <td className="small text-secondary">
                          <User size={12} className="me-1" />
                          {item.uploadedBy?.name || item.uploadedBy?.email || "Staff"}
                        </td>
                        <td className="small text-secondary">
                          <Calendar size={12} className="me-1" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setDeleteConfirmId(item._id)}
                            title="Delete Record"
                            disabled={actionLoading}
                          >
                            <Trash2 size={14} />
                          </button>
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
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Media Record</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to delete this media metadata registry record?</p>
                </div>
                <div className="modal-footer border-top">
                  <button className="btn btn-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteMedia(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Register Modal */}
        {showModal && (
          <MediaRecordModal
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchMedia();
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminMedia;
