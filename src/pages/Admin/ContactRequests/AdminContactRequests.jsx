import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import ContactDetailsModal from "./components/ContactDetailsModal";
import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { contactAPI } from "../../../services/api";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
  { value: "archived", label: "Archived" },
];

function AdminContactRequests() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await contactAPI.getContacts();
      if (response && Array.isArray(response.data)) {
        setContacts(response.data);
      } else if (Array.isArray(response)) {
        setContacts(response);
      } else {
        setContacts([]);
      }
    } catch {
      setError("Unable to load contact requests. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInlineStatusChange = async (contactId, newStatus) => {
    try {
      setActionLoading(true);
      await contactAPI.updateContact(contactId, { status: newStatus });
      setSuccess(`Updated status to '${newStatus}'.`);
      fetchContacts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      setActionLoading(true);
      await contactAPI.deleteContact(id);
      setSuccess("Contact request deleted successfully.");
      setDeleteConfirmId(null);
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(null);
      }
      fetchContacts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete contact request.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredContacts = contacts.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.company?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25";
      case "contacted":
        return "bg-info bg-opacity-10 text-info border border-info border-opacity-25";
      case "qualified":
        return "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
      case "closed":
        return "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25";
      case "archived":
        return "bg-dark bg-opacity-10 text-dark border border-dark border-opacity-25";
      default:
        return "bg-light text-secondary border";
    }
  };

  return (
    <AdminLayout>
      <div className="admin-contacts-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
              INQUIRY MANAGEMENT
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <MessageSquare size={24} className="text-danger me-2" />
              Contact Requests Management
            </h2>
          </div>
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
                    placeholder="Search by name, email, company, or subject..."
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

        {/* Contact List Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading contact requests...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No contact requests found matching criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>CONTACT NAME</th>
                      <th>SUBJECT / COMPANY</th>
                      <th>ASSIGNED TO</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.name}</div>
                          <div className="text-secondary small">{item.email}</div>
                        </td>
                        <td>
                          <div className="fw-bold text-dark small">{item.subject || "General Inquiry"}</div>
                          <div className="text-muted fs-8">{item.company || "Individual"}</div>
                        </td>
                        <td className="small">
                          {item.assignedTo ? (
                            <span className="badge bg-light text-dark border d-inline-flex align-items-center gap-1">
                              <UserCheck size={12} className="text-success" />
                              {item.assignedTo.name || item.assignedTo.email}
                            </span>
                          ) : (
                            <span className="text-muted italic fs-8">Unassigned</span>
                          )}
                        </td>
                        <td className="small text-secondary">
                          <Calendar size={12} className="me-1" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <select
                            className={`form-select form-select-sm ${getStatusBadge(item.status)} fw-bold`}
                            style={{ minWidth: "120px" }}
                            value={item.status || "new"}
                            onChange={(e) => handleInlineStatusChange(item._id, e.target.value)}
                            disabled={actionLoading}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary d-flex align-items-center gap-1"
                              onClick={() => setSelectedContact(item)}
                              title="View Request Details"
                            >
                              <Eye size={14} />
                              <span>Details</span>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete Request"
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

        {/* Details Modal */}
        {selectedContact && (
          <ContactDetailsModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onUpdated={() => {
              fetchContacts();
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-white text-dark border-danger shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Contact Request</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to permanently delete this contact request?</p>
                </div>
                <div className="modal-footer border-top">
                  <button className="btn btn-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteContact(deleteConfirmId)} disabled={actionLoading}>
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

export default AdminContactRequests;
