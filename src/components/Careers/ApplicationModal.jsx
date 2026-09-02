import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, AlertCircle, Upload, Send } from "lucide-react";
import { applicationsAPI } from "../../services/api";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-domenion-blue/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-white border border-neutral-border rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-domenion-blue" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-light border border-neutral-border text-gray-500 hover:text-domenion-blue hover:border-domenion-gold grid place-items-center transition-colors cursor-pointer"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close application modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-neutral-border pr-8">
          <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">CAREER APPLICATION</span>
          <h2 className="text-domenion-blue font-heading text-2xl font-extrabold mt-1">Apply for Position</h2>
          <p className="text-gray-600 text-xs mt-1">
            You are applying for <strong className="text-domenion-blue font-bold">{selectedJob?.title || "General Security Position"}</strong>
            {selectedJob?.location ? ` • ${selectedJob.location}` : ""}
          </p>
        </div>

        {/* Alerts */}
        {submitSuccess && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium">
            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            <div>{submitSuccess}</div>
          </div>
        )}

        {submitError && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm font-medium">
            <AlertCircle size={20} className="text-rose-600 flex-shrink-0" />
            <div>{submitError}</div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-name" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                Full Name *
              </label>
              <input
                id="modal-name"
                type="text"
                name="fullName"
                className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                Email Address *
              </label>
              <input
                id="modal-email"
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-phone" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                Phone Number *
              </label>
              <input
                id="modal-phone"
                type="tel"
                name="phone"
                className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
                placeholder="(602) 438-4445"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="modal-position" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
                Target Position
              </label>
              <input
                id="modal-position"
                type="text"
                className="w-full px-4 py-3 bg-neutral-100 border border-neutral-border rounded-xl text-gray-500 text-sm font-semibold cursor-not-allowed"
                value={selectedJob?.title || "Security Officer"}
                readOnly
                disabled
              />
            </div>
          </div>

          {/* Resume Upload File Box */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="modal-resume" className="text-xs font-heading font-extrabold text-domenion-blue uppercase">
                Resume / CV
              </label>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Optional</span>
            </div>

            <div className="relative border-2 border-dashed border-neutral-border hover:border-domenion-gold/60 rounded-xl p-4 text-center bg-neutral-light transition-colors">
              <input
                id="modal-resume"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={submitting}
              />
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-600 pointer-events-none">
                <Upload size={18} className="text-domenion-gold" />
                <span>
                  {resumeFile ? (
                    <strong className="text-domenion-blue font-bold">{resumeFile.name}</strong>
                  ) : (
                    "Click to upload resume (PDF, DOC, DOCX up to 5 MB)"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="modal-message" className="block text-xs font-heading font-extrabold text-domenion-blue uppercase mb-1">
              Cover Letter / Message
            </label>
            <textarea
              id="modal-message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 bg-neutral-light border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors"
              placeholder="Briefly describe your security experience and availability..."
              value={formData.message}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-domenion-gold text-domenion-blue rounded-xl font-heading text-sm font-extrabold tracking-wider uppercase hover:bg-domenion-gold/90 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
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
        </form>
      </div>
    </div>
  );
}

