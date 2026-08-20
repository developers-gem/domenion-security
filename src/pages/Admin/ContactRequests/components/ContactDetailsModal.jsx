import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Calendar,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import { contactAPI, leadsAPI, usersAPI } from "../../../../services/api";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "primary" },
  { value: "contacted", label: "Contacted", color: "info" },
  { value: "qualified", label: "Qualified", color: "success" },
  { value: "closed", label: "Closed", color: "secondary" },
  { value: "archived", label: "Archived", color: "dark" },
];

function ContactDetailsModal({ contact, onClose, onUpdated }) {
  const [currentStatus, setCurrentStatus] = useState(contact?.status || "new");
  const [assignedTo, setAssignedTo] = useState(contact?.assignedTo?._id || contact?.assignedTo || "");
  const [newNote, setNewNote] = useState("");
  const [staffUsers, setStaffUsers] = useState([]);

  const [saving, setSaving] = useState(false);
  const [convertingLead, setConvertingLead] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Load staff users for assignment dropdown
    usersAPI
      .getUsers()
      .then((res) => {
        const usersList = res.data || res || [];
        if (Array.isArray(usersList)) {
          setStaffUsers(usersList);
        }
      })
      .catch(() => {
        // Non-admin or failover
      });
  }, []);

  if (!contact) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      setSaving(true);
      await contactAPI.updateContact(contact._id, {
        status: currentStatus,
        assignedTo: assignedTo || null,
        note: newNote.trim() || undefined,
      });

      setSuccess("Contact request updated successfully.");
      setNewNote("");
      onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update contact request.");
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
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        sourceType: "contact",
        sourceId: contact._id,
        sourceTypeModel: "ContactRequest",
        status: "new",
        priority: "medium",
        assignedTo: assignedTo || undefined,
        note: `Converted from Contact Request: ${contact.subject || "General Inquire"}`,
      });

      setSuccess("Successfully converted contact request to a new Sales Lead!");
      onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Could not convert to Lead. Lead may already exist.");
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
              <div className="bg-danger bg-opacity-10 p-2 rounded text-danger">
                <MessageSquare size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-dark mb-0">{contact.name}</h5>
                <span className="text-secondary small">Contact Request Details</span>
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

            {/* Contact Info Header Card */}
            <div className="card bg-light border-light-subtle p-3 mb-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Mail size={16} className="text-danger" />
                    <a href={`mailto:${contact.email}`} className="text-dark text-decoration-none fw-medium">
                      {contact.email}
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Phone size={16} className="text-danger" />
                    <a href={`tel:${contact.phone}`} className="text-dark text-decoration-none">
                      {contact.phone}
                    </a>
                  </div>
                  {contact.company && (
                    <div className="d-flex align-items-center gap-2">
                      <Building size={16} className="text-secondary" />
                      <span className="text-secondary small">{contact.company}</span>
                    </div>
                  )}
                </div>

                <div className="col-md-6 border-start-md">
                  <div className="mb-2">
                    <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">
                      ASSIGN TO STAFF MEMBER
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
                    <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">STATUS</label>
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

            {/* Subject & Message Content */}
            <div className="mb-4">
              <span className="text-secondary small fw-bold text-uppercase d-block mb-1">SUBJECT</span>
              <h6 className="fw-bold text-dark">{contact.subject || "General Inquiry"}</h6>
              <div className="p-3 bg-light border rounded text-secondary mt-2 white-space-pre-wrap small">
                {contact.message}
              </div>
            </div>

            {/* Existing Notes */}
            {contact.notes && contact.notes.length > 0 && (
              <div className="mb-4">
                <span className="text-secondary small fw-bold text-uppercase d-block mb-2">INTERNAL NOTES</span>
                <div className="d-flex flex-column gap-2">
                  {contact.notes.map((n, i) => (
                    <div key={i} className="p-2 bg-light border-start border-3 border-danger rounded fs-8 text-dark">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Note */}
            <div className="mb-3">
              <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1">ADD INTERNAL NOTE</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  placeholder="Type administrative note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>
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
                <Calendar size={13} /> Received: {new Date(contact.createdAt).toLocaleString()}
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

export default ContactDetailsModal;
