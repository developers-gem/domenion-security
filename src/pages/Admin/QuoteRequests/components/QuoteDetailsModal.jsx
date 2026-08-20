import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  MapPin,
  DollarSign,
  Calendar,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import { quotesAPI, leadsAPI, usersAPI } from "../../../../services/api";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "under_review", label: "Under Review" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

function QuoteDetailsModal({ quote, onClose, onUpdated }) {
  const [currentStatus, setCurrentStatus] = useState(quote?.status || "new");
  const [assignedTo, setAssignedTo] = useState(quote?.assignedTo?._id || quote?.assignedTo || "");
  const [newNote, setNewNote] = useState("");
  const [staffUsers, setStaffUsers] = useState([]);

  const [saving, setSaving] = useState(false);
  const [convertingLead, setConvertingLead] = useState(false);
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

  if (!quote) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      setSaving(true);
      await quotesAPI.updateQuote(quote._id, {
        status: currentStatus,
        assignedTo: assignedTo || null,
        note: newNote.trim() || undefined,
      });

      setSuccess("Quote request updated successfully.");
      setNewNote("");
      onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update quote request.");
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToLead = async () => {
    setError("");
    setSuccess("");
    try {
      setConvertingLead(true);
      await leadsAPI.createLead({
        name: quote.name,
        email: quote.email,
        phone: quote.phone,
        company: quote.company,
        sourceType: "quote",
        sourceId: quote._id,
        sourceTypeModel: "QuoteRequest",
        status: "new",
        priority: "high",
        assignedTo: assignedTo || undefined,
        note: `Converted from Quote Request for service: ${quote.service || "Security Service"} (${quote.estimatedBudget || "Budget TBD"})`,
      });

      setSuccess("Successfully converted quote request into a High Priority Sales Lead!");
      onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Could not convert to Lead. Lead record may already exist.");
    } finally {
      setConvertingLead(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white text-dark border-0 shadow-lg">
          <div className="modal-header border-bottom py-3">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-warning bg-opacity-10 p-2 rounded text-warning">
                <Shield size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-dark mb-0">{quote.name}</h5>
                <span className="text-secondary small">Security Proposal & Quote Request</span>
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

            {/* Header Info Grid */}
            <div className="card bg-light border-light-subtle p-3 mb-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Mail size={16} className="text-danger" />
                    <a href={`mailto:${quote.email}`} className="text-dark text-decoration-none fw-medium">
                      {quote.email}
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Phone size={16} className="text-danger" />
                    <a href={`tel:${quote.phone}`} className="text-dark text-decoration-none">
                      {quote.phone}
                    </a>
                  </div>
                  {quote.company && (
                    <div className="d-flex align-items-center gap-2">
                      <Building size={16} className="text-secondary" />
                      <span className="text-secondary small">{quote.company}</span>
                    </div>
                  )}
                </div>

                <div className="col-md-6 border-start-md">
                  <div className="mb-2">
                    <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">
                      ASSIGN TO SALES STAFF
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

                  <div>
                    <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">PROPOSAL STATUS</label>
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
                </div>
              </div>
            </div>

            {/* Proposal Parameters Grid */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="p-3 bg-light border rounded">
                  <span className="text-secondary fs-8 fw-bold text-uppercase d-block mb-1">REQUIRED SERVICE</span>
                  <div className="fw-bold text-dark fs-6 d-flex align-items-center gap-1">
                    <Shield size={16} className="text-danger" />
                    {quote.service}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-light border rounded">
                  <span className="text-secondary fs-8 fw-bold text-uppercase d-block mb-1">INDUSTRY / LOCATION</span>
                  <div className="small text-dark fw-medium d-flex align-items-center gap-1 mb-1">
                    <Building size={14} className="text-secondary" />
                    {quote.industry || "General Commercial"}
                  </div>
                  <div className="small text-secondary d-flex align-items-center gap-1">
                    <MapPin size={14} className="text-danger" />
                    {quote.location || "Unspecified Location"}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-light border rounded">
                  <span className="text-secondary fs-8 fw-bold text-uppercase d-block mb-1">ESTIMATED BUDGET</span>
                  <div className="fw-bold text-success fs-6 d-flex align-items-center gap-1">
                    <DollarSign size={16} />
                    {quote.estimatedBudget || "Custom Proposal"}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Details */}
            {quote.message && (
              <div className="mb-4">
                <span className="text-secondary small fw-bold text-uppercase d-block mb-1">PROPOSAL REQUIREMENTS & NOTES</span>
                <div className="p-3 bg-light border rounded text-secondary fs-7 white-space-pre-wrap">
                  {quote.message}
                </div>
              </div>
            )}

            {/* Internal Notes */}
            {quote.notes && quote.notes.length > 0 && (
              <div className="mb-4">
                <span className="text-secondary small fw-bold text-uppercase d-block mb-2">INTERNAL SALES NOTES</span>
                <div className="d-flex flex-column gap-2">
                  {quote.notes.map((n, i) => (
                    <div key={i} className="p-2 bg-light border-start border-3 border-warning rounded fs-8 text-dark">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Note */}
            <div className="mb-3">
              <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">ADD INTERNAL NOTE</label>
              <input
                type="text"
                className="form-control form-control-sm bg-light"
                placeholder="Type proposal note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                onClick={handleConvertToLead}
                disabled={convertingLead}
              >
                {convertingLead ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
                Convert to Lead Pipeline
              </button>

              <div className="d-flex align-items-center gap-1 text-muted fs-8">
                <Calendar size={13} /> Submitted: {new Date(quote.createdAt).toLocaleString()}
              </div>
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

export default QuoteDetailsModal;
