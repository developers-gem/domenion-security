import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, AlertCircle, Upload, FileText, Send } from "lucide-react";
import { applicationsAPI } from "../../services/api";
import "./ApplicationModal.css";

export default function ApplicationModal({ selectedJob, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Keyboard Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, submitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmitError("");

    if (!file) {
      setResumeFile(null);
      return;
    }

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setSubmitError("Invalid file type. Only PDF, DOC, and DOCX files are allowed.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("File size exceeds 5 MB limit. Please upload a smaller file.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitError("Please fill in all required fields (Full Name, Email, Phone Number).");
      return;
    }

    try {
      setSubmitting(true);

      if (resumeFile) {
        const payload = new FormData();
        payload.append("fullName", formData.fullName.trim());
        payload.append("email", formData.email.trim());
        payload.append("phone", formData.phone.trim());
        if (formData.message) payload.append("message", formData.message.trim());
        if (selectedJob?._id) payload.append("careerId", selectedJob._id);
        payload.append("resume", resumeFile);

        await applicationsAPI.submitApplication(payload);
      } else {
        await applicationsAPI.submitApplication({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim() || undefined,
          careerId: selectedJob?._id,
        });
      }

      setSubmitSuccess("APPLICATION RECEIVED — Thank you for your interest in joining Dominion Security. Your application has been submitted successfully!");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setResumeFile(null);

      setTimeout(() => {
        onClose();
      }, 2400);
    } catch (err) {
      setSubmitError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ds-app-modal-overlay" onClick={onClose}>
      <div className="ds-app-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="ds-app-modal-close-btn"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close application modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="ds-app-modal-header">
          <span className="ds-app-modal-eyebrow">CAREER APPLICATION</span>
          <h2 className="ds-app-modal-title">Apply for Position</h2>
          <p className="ds-app-modal-subtitle">
            You are applying for <strong>{selectedJob?.title || "General Security Position"}</strong>
            {selectedJob?.location ? ` • ${selectedJob.location}` : ""}
          </p>
        </div>

        {/* Alerts */}
        {submitSuccess && (
          <div className="ds-app-alert ds-app-alert-success">
            <CheckCircle2 size={18} className="flex-shrink-0" />
            <span>{submitSuccess}</span>
          </div>
        )}

        {submitError && (
          <div className="ds-app-alert ds-app-alert-error">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="ds-app-form">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="modal-name" className="ds-input-label">
                Full Name <span className="ds-req">*</span>
              </label>
              <input
                id="modal-name"
                type="text"
                name="fullName"
                className="ds-form-input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="modal-email" className="ds-input-label">
                Email Address <span className="ds-req">*</span>
              </label>
              <input
                id="modal-email"
                type="email"
                name="email"
                className="ds-form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="modal-phone" className="ds-input-label">
                Phone Number <span className="ds-req">*</span>
              </label>
              <input
                id="modal-phone"
                type="tel"
                name="phone"
                className="ds-form-input"
                placeholder="(602) 555-0199"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="modal-position" className="ds-input-label">
                Target Position
              </label>
              <input
                id="modal-position"
                type="text"
                className="ds-form-input ds-readonly-input"
                value={selectedJob?.title || "Security Officer"}
                readOnly
                disabled
              />
            </div>

            {/* Resume Upload File Box */}
            <div className="col-12">
              <label htmlFor="modal-resume" className="ds-input-label d-flex justify-content-between">
                <span>Resume / CV</span>
                <span className="ds-opt-badge">Optional</span>
              </label>

              <div className="ds-file-upload-box">
                <input
                  id="modal-resume"
                  type="file"
                  className="ds-file-input-hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={submitting}
                />
                <label htmlFor="modal-resume" className="ds-file-upload-label">
                  <Upload size={18} className="ds-upload-icon" />
                  <span>
                    {resumeFile ? (
                      <strong className="text-gold">{resumeFile.name}</strong>
                    ) : (
                      "Click to upload resume (PDF, DOC, DOCX up to 5 MB)"
                    )}
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="modal-message" className="ds-input-label">
                Cover Letter / Message
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={4}
                className="ds-form-textarea"
                placeholder="Briefly describe your security experience and availability..."
                value={formData.message}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            <div className="col-12 mt-4">
              <button
                type="submit"
                className="ds-app-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT APPLICATION</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
