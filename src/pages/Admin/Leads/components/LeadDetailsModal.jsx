import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Tag,
} from "lucide-react";
import { leadsAPI, usersAPI } from "../../../../services/api";

const STATUS_OPTIONS = [
  { value: "new", label: "New Lead" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal Sent" },
  { value: "won", label: "Won / Deal Closed" },
  { value: "lost", label: "Lost" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
];

function LeadDetailsModal({ lead, onClose, onUpdated }) {
  const [currentStatus, setCurrentStatus] = useState(lead?.status || "new");
  const [currentPriority, setCurrentPriority] = useState(lead?.priority || "medium");
  const [assignedTo, setAssignedTo] = useState(lead?.assignedTo?._id || lead?.assignedTo || "");
  const [value, setValue] = useState(lead?.value || "");
  const [newNote, setNewNote] = useState("");
  const [staffUsers, setStaffUsers] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    usersAPI
      .getUsers()
      .then((res) => {
        const usersList = res.data || res || [];
        if (Array.isArray(usersList)) {
          setStaffUsers(usersList);
        }
      })
      .catch(() => {});
  }, []);

  if (!lead) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      setSaving(true);
      await leadsAPI.updateLead(lead._id, {
        status: currentStatus,
        priority: currentPriority,
        assignedTo: assignedTo || null,
        value: value ? Number(value) : undefined,
        note: newNote.trim() || undefined,
      });

      setSuccess("Sales lead updated successfully.");
      setNewNote("");
      onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update lead.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white text-dark border-0 shadow-lg">
          <div className="modal-header border-bottom py-3">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary bg-opacity-10 p-2 rounded text-primary">
                <TrendingUp size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-dark mb-0">{lead.name}</h5>
                <span className="text-secondary small">Sales Opportunity & Pipeline Details</span>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
          </div>

          <div className="modal-body p-4">
            {success && (
              <div className="alert alert-success d-flex align-items-center mb-3 small" role="alert">
                <CheckCircle2 size={16} className="me-2" />
                <div>{success}</div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-3 small" role="alert">
                <AlertCircle size={16} className="me-2" />
                <div>{error}</div>
              </div>
            )}

            {/* Header Contact Grid */}
            <div className="card bg-light border-light-subtle p-3 mb-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Mail size={16} className="text-danger" />
                    <a href={`mailto:${lead.email}`} className="text-dark text-decoration-none fw-medium">
                      {lead.email}
                    </a>
                  </div>
                  {lead.phone && (
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Phone size={16} className="text-danger" />
                      <a href={`tel:${lead.phone}`} className="text-dark text-decoration-none">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  {lead.company && (
                    <div className="d-flex align-items-center gap-2">
                      <Building size={16} className="text-secondary" />
                      <span className="text-secondary small">{lead.company}</span>
                    </div>
                  )}
                </div>

                <div className="col-md-6 border-start-md">
                  <div className="mb-2">
                    <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">
                      ASSIGNED ACCOUNT MANAGER
                    </label>
                    <select
                      className="form-select form-select-sm bg-white border"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                    >
                      <option value="">-- Unassigned --</option>
                      {staffUsers.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name} ({u.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Status & Priority Control Grid */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">PIPELINE STAGE</label>
                <select
                  className="form-select form-select-sm bg-white border fw-bold"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">PRIORITY</label>
                <select
                  className="form-select form-select-sm bg-white border fw-bold"
                  value={currentPriority}
                  onChange={(e) => setCurrentPriority(e.target.value)}
                >
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">ESTIMATED VALUE ($)</label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white">
                    <DollarSign size={14} className="text-success" />
                  </span>
                  <input
                    type="number"
                    className="form-control bg-white fw-bold text-success"
                    placeholder="Value in USD"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Lead Origin Metadata */}
            <div className="p-3 bg-light border rounded mb-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="text-secondary fs-8 fw-bold text-uppercase me-2">LEAD SOURCE:</span>
                <span className="badge bg-white text-dark border text-uppercase fs-8">
                  <Tag size={12} className="me-1 text-primary" />
                  {lead.sourceType || "Direct Prospect"}
                </span>
              </div>
              <div className="small text-muted d-flex align-items-center gap-1">
                <Calendar size={14} /> Created: {new Date(lead.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Activity Notes History */}
            {lead.notes && lead.notes.length > 0 && (
              <div className="mb-4">
                <span className="text-secondary small fw-bold text-uppercase d-block mb-2">SALES ACTIVITY LOG</span>
                <div className="d-flex flex-column gap-2 max-h-200 overflow-auto">
                  {lead.notes.map((n, i) => (
                    <div key={i} className="p-2 bg-light border-start border-3 border-primary rounded fs-8">
                      <div className="text-dark fw-medium">{n.text}</div>
                      <div className="text-muted fs-8 mt-1">
                        Added by {n.addedBy?.name || n.addedBy?.email || "Staff"} on{" "}
                        {new Date(n.createdAt || Date.now()).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Note */}
            <div className="mb-3">
              <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">ADD SALES NOTE</label>
              <input
                type="text"
                className="form-control form-control-sm bg-light"
                placeholder="Log activity, call notes, or next steps..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer border-top py-2">
            <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-danger btn-sm px-3" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 size={14} className="animate-spin me-1" /> : <Send size={14} className="me-1" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailsModal;
