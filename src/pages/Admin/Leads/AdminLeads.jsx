import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import LeadDetailsModal from "./components/LeadDetailsModal";
import LeadFormModal from "./components/LeadFormModal";
import {
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  Tag,
  DollarSign,
} from "lucide-react";
import { leadsAPI } from "../../../services/api";

const STATUS_OPTIONS = [
  { value: "all", label: "All Stages" },
  { value: "new", label: "New Lead" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal Sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
];

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await leadsAPI.getLeads();
      if (response && Array.isArray(response.data)) {
        setLeads(response.data);
      } else if (Array.isArray(response)) {
        setLeads(response);
      } else {
        setLeads([]);
      }
    } catch {
      setError("Unable to load sales leads. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleInlineStatusChange = async (leadId, newStatus) => {
    try {
      setActionLoading(true);
      await leadsAPI.updateLead(leadId, { status: newStatus });
      setSuccess(`Updated lead stage to '${newStatus}'.`);
      fetchLeads();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update lead status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      setActionLoading(true);
      await leadsAPI.deleteLead(id);
      setSuccess("Lead deleted successfully.");
      setDeleteConfirmId(null);
      if (selectedLead && selectedLead._id === id) {
        setSelectedLead(null);
      }
      fetchLeads();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete lead.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredLeads = leads.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.company?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25";
      case "contacted":
        return "bg-info bg-opacity-10 text-info border border-info border-opacity-25";
      case "qualified":
        return "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25";
      case "proposal":
        return "bg-purple bg-opacity-10 text-purple border border-purple border-opacity-25";
      case "won":
        return "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
      case "lost":
        return "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25";
      default:
        return "bg-light text-secondary border";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-danger text-white";
      case "high":
        return "bg-warning bg-opacity-25 text-dark border border-warning";
      case "medium":
        return "bg-info bg-opacity-10 text-info border border-info border-opacity-25";
      default:
        return "bg-light text-secondary border";
    }
  };

  return (
    <AdminLayout>
      <div className="admin-leads-page">
        {/* Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-uppercase me-2">
              SALES PIPELINE CRM
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <TrendingUp size={24} className="text-danger me-2" />
              Lead Management
            </h2>
          </div>

          <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Sales Lead
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
                    placeholder="Search leads by name, email, or company..."
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

              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light-subtle text-secondary">
                    <Tag size={18} />
                  </span>
                  <select
                    className="form-select bg-light border-light-subtle text-dark"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    {PRIORITY_OPTIONS.map((opt) => (
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

        {/* Lead List Table */}
        <div className="card bg-white border shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <Loader2 size={36} className="text-danger animate-spin mb-2" />
                <p className="text-muted small mb-0">Loading sales leads...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="mb-0 fs-6">No sales leads found matching criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-light-custom mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>LEAD NAME & COMPANY</th>
                      <th>SOURCE</th>
                      <th>VALUE</th>
                      <th>PRIORITY</th>
                      <th>ASSIGNED ACCOUNT MANAGER</th>
                      <th>STAGE</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold text-dark fs-6">{item.name}</div>
                          <div className="text-secondary small">{item.email}</div>
                          {item.company && <div className="text-muted fs-8">{item.company}</div>}
                        </td>
                        <td className="small">
                          <span className="badge bg-light text-dark border text-uppercase fs-8">
                            {item.sourceType || "Direct"}
                          </span>
                        </td>
                        <td className="small fw-bold text-success">
                          {item.value ? `$${item.value.toLocaleString()}` : "TBD"}
                        </td>
                        <td>
                          <span className={`badge ${getPriorityBadge(item.priority)} text-uppercase fs-8`}>
                            {item.priority || "medium"}
                          </span>
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
                        <td>
                          <select
                            className={`form-select form-select-sm ${getStatusBadge(item.status)} fw-bold`}
                            style={{ minWidth: "130px" }}
                            value={item.status || "new"}
                            onChange={(e) => handleInlineStatusChange(item._id, e.target.value)}
                            disabled={actionLoading}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="proposal">Proposal</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-secondary d-flex align-items-center gap-1"
                              onClick={() => setSelectedLead(item)}
                              title="View Lead Details"
                            >
                              <Eye size={14} />
                              <span>Details</span>
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => setEditingLead(item)}
                              title="Edit Lead"
                              disabled={actionLoading}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setDeleteConfirmId(item._id)}
                              title="Delete Lead"
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
        {selectedLead && (
          <LeadDetailsModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdated={() => {
              fetchLeads();
            }}
          />
        )}

        {/* Create/Edit Modal */}
        {(showCreateModal || editingLead) && (
          <LeadFormModal
            lead={editingLead}
            onClose={() => {
              setShowCreateModal(false);
              setEditingLead(null);
            }}
            onSaved={() => {
              setShowCreateModal(false);
              setEditingLead(null);
              fetchLeads();
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-white text-dark border-danger shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Sales Lead</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to permanently delete this lead from the pipeline?</p>
                </div>
                <div className="modal-footer border-top">
                  <button className="btn btn-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteLead(deleteConfirmId)} disabled={actionLoading}>
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

export default AdminLeads;
