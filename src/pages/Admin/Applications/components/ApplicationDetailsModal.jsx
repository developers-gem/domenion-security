import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  MessageSquare,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { applicationsAPI } from "../../../../services/api";

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted", color: "secondary" },
  { value: "reviewing", label: "Reviewing", color: "info" },
  { value: "shortlisted", label: "Shortlisted", color: "primary" },
  { value: "interview", label: "Interview Scheduled", color: "warning" },
  { value: "rejected", label: "Rejected", color: "danger" },
  { value: "hired", label: "Hired", color: "success" },
];

function ApplicationDetailsModal({ application, onClose, onUpdated, onDelete }) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [currentStatus, setCurrentStatus] = useState(application?.status || "submitted");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setError("");
    setSuccess("");
    try {
      setUpdating(true);
      await applicationsAPI.updateApplicationStatus(application._id, newStatus);
      setCurrentStatus(newStatus);
      setSuccess(`Application status changed to '${newStatus}'.`);
      onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update application status.");
    } finally {
      setUpdating(false);
    }
  };

  if (!application) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-dark text-white border-secondary shadow-lg">
          <div className="modal-header border-secondary">
            <div className="d-flex align-items-center gap-2">
              <User className="text-danger" size={24} />
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">{application.fullName}</h5>
                <span className="text-secondary small">Candidate Profile & Application Details</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close modal" />
          </div>

          <div className="modal-body p-4">
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

            {/* Applicant Summary Header Bar */}
            <div className="card bg-secondary bg-opacity-25 border-secondary p-3 mb-4">
              <div className="row g-3 align-items-center">
                <div className="col-md-7">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Mail size={16} className="text-danger" />
                    <a href={`mailto:${application.email}`} className="text-white text-decoration-none hover-underline">
                      {application.email}
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Phone size={16} className="text-danger" />
                    <a href={`tel:${application.phone}`} className="text-white text-decoration-none hover-underline">
                      {application.phone}
                    </a>
                  </div>
                </div>

                <div className="col-md-5 text-md-end">
                  <label className="form-label fs-8 text-secondary text-uppercase fw-bold mb-1 d-block">
                    UPDATE CANDIDATE STATUS
                  </label>
                  <div className="d-flex align-items-center justify-content-md-end gap-2">
                    {updating && <Loader2 size={16} className="animate-spin text-danger" />}
                    <select
                      className="form-select bg-dark text-white border-secondary form-select-sm"
                      style={{ maxWidth: "200px" }}
                      value={currentStatus}
                      onChange={handleStatusChange}
                      disabled={updating}
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

            {/* Position Details Section */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="p-3 bg-secondary bg-opacity-10 border border-secondary rounded">
                  <span className="text-secondary small fw-bold text-uppercase d-block mb-1">POSITION APPLIED FOR</span>
                  <div className="fw-bold text-white fs-6 d-flex align-items-center gap-2">
                    <Briefcase size={16} className="text-danger" />
                    {application.careerId?.title || "General Application"}
                  </div>
                  <div className="small text-muted mt-1">
                    Department: {application.careerId?.department || "N/A"}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-secondary bg-opacity-10 border border-secondary rounded">
                  <span className="text-secondary small fw-bold text-uppercase d-block mb-1">LOCATION & DATE</span>
                  <div className="small text-white d-flex align-items-center gap-2 mb-1">
                    <MapPin size={14} className="text-danger" />
                    {application.careerId?.location || "Unspecified Location"}
                  </div>
                  <div className="small text-secondary d-flex align-items-center gap-2">
                    <Calendar size={14} />
                    Applied on: {new Date(application.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter / Message */}
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-1">
                <MessageSquare size={16} className="text-danger" />
                CANDIDATE COVER LETTER / STATEMENT
              </label>
              <div className="p-3 bg-secondary bg-opacity-25 border border-secondary rounded text-light white-space-pre-wrap">
                {application.message || "No additional notes or message provided by applicant."}
              </div>
            </div>
          </div>

          <div className="modal-footer border-secondary justify-content-between">
            <div>
              {isAdmin && (
                <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={() => onDelete(application._id)}>
                  <Trash2 size={16} />
                  Delete Application
                </button>
              )}
            </div>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetailsModal;
