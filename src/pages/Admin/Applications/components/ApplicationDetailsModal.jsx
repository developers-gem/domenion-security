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
  FileText,
  Download,
  HelpCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { applicationsAPI } from "../../../../services/api";

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted" },
  { value: "reviewing", label: "Reviewing" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview Scheduled" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
];

function ApplicationDetailsModal({
  application,
  onClose,
  onUpdated,
  onDelete,
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [currentStatus, setCurrentStatus] = useState(
    application?.status || "submitted",
  );
  const [updating, setUpdating] = useState(false);
  const [downloading, setDownloading] = useState(false);
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

  const handleDownloadResume = async () => {
    setError("");
    try {
      setDownloading(true);
      const response = await applicationsAPI.downloadResume(application._id);

      // Create blob URL for secure download
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Determine file extension
      const filenameHeader = response.headers["content-disposition"];
      let filename = `${application.fullName.replace(/[^a-zA-Z0-9]/g, "_")}_Resume.pdf`;
      if (filenameHeader && filenameHeader.includes("filename=")) {
        filename = filenameHeader.split("filename=")[1].replace(/["']/g, "");
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Failed to download candidate resume.");
    } finally {
      setDownloading(false);
    }
  };

  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl my-auto bg-slate-900 border border-domenion-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-white/10 bg-domenion-blue/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-domenion-gold/15 border border-domenion-gold/35 flex items-center justify-center text-domenion-gold flex-shrink-0">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                {application.fullName}
              </h3>
              <p className="text-xs text-domenion-gold/80 font-mono tracking-wide">
                Candidate Profile &amp; Application Details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - Scrollable Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-white/10">
          {/* Notifications */}
          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} className="flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Applicant Summary Header Bar */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Mail size={15} className="text-domenion-gold flex-shrink-0" />
                <a
                  href={`mailto:${application.email}`}
                  className="hover:text-domenion-gold hover:underline transition-colors truncate"
                >
                  {application.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Phone size={15} className="text-domenion-gold flex-shrink-0" />
                <a
                  href={`tel:${application.phone}`}
                  className="hover:text-domenion-gold hover:underline transition-colors"
                >
                  {application.phone}
                </a>
              </div>
            </div>

            <div className="sm:text-right">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Update Candidate Status
              </label>
              <div className="flex items-center sm:justify-end gap-2">
                {updating && (
                  <Loader2
                    size={15}
                    className="animate-spin text-domenion-gold"
                  />
                )}
                <select
                  value={currentStatus}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="bg-slate-900 border border-white/20 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-domenion-gold font-medium disabled:opacity-50"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-slate-900 text-white"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Position & Timing Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                Position Applied For
              </span>
              <div className="font-heading font-semibold text-sm text-white flex items-center gap-2">
                <Briefcase
                  size={15}
                  className="text-domenion-gold flex-shrink-0"
                />
                <span>
                  {application.careerId?.title || "General Application"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Department: {application.careerId?.department || "N/A"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                Location &amp; Date
              </span>
              <div className="text-xs text-slate-200 flex items-center gap-2">
                <MapPin
                  size={14}
                  className="text-domenion-gold flex-shrink-0"
                />
                <span>
                  {application.careerId?.location || "Unspecified Location"}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                <Calendar size={14} />
                <span>
                  Applied: {new Date(application.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Resume Attachment Row */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Resume / CV Attachment
              </span>
              {application.resumeUrl ? (
                <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                  <FileText size={16} className="text-domenion-gold" />
                  <span className="truncate max-w-[240px] sm:max-w-xs">
                    {application.resumeUrl.split("/").pop()}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic">
                  No document attached
                </span>
              )}
            </div>

            {application.resumeUrl && (
              <button
                type="button"
                onClick={handleDownloadResume}
                disabled={downloading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-domenion-gold/20 hover:bg-domenion-gold/30 border border-domenion-gold/40 text-domenion-gold text-xs font-semibold tracking-wide transition-all active:translate-y-0.5 disabled:opacity-50 flex-shrink-0"
              >
                {downloading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Download Resume</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Screening Questions Answers Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              <HelpCircle size={15} className="text-domenion-gold" />
              <span>Screening Questions &amp; Candidate Answers</span>
            </div>

            {Array.isArray(application.screeningAnswers) &&
            application.screeningAnswers.length > 0 ? (
              <div className="space-y-4">
                {(() => {
                  const globalAnswers = application.screeningAnswers.filter(
                    (item) => (item.scope || "global") === "global",
                  );
                  const jobAnswers = application.screeningAnswers.filter(
                    (item) => item.scope === "job",
                  );

                  const renderAnswerItem = (item, idx) => {
                    const isArrayAns = Array.isArray(item.answer);
                    return (
                      <div
                        key={item._id || idx}
                        className="p-3.5 rounded-xl bg-slate-800/40 border border-white/5 space-y-2 text-xs"
                      >
                        <div className="font-semibold text-slate-100 flex items-start gap-1.5">
                          <span className="text-domenion-gold font-mono font-bold">
                            Q{idx + 1}.
                          </span>
                          <span>{item.question}</span>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex-shrink-0">
                            Candidate Answer:
                          </span>
                          {isArrayAns ? (
                            <div className="flex flex-wrap gap-1.5">
                              {item.answer.map((ansOpt, aIdx) => (
                                <span
                                  key={aIdx}
                                  className="px-2 py-0.5 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold font-mono text-[11px]"
                                >
                                  {ansOpt}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold font-semibold font-mono text-[11px] w-fit">
                              {String(item.answer || "No response")}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  };

                  return (
                    <>
                      {globalAnswers.length > 0 && (
                        <div className="space-y-2">
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] font-mono uppercase font-bold text-slate-300">
                            Global Questions
                          </span>
                          <div className="space-y-2">
                            {globalAnswers.map((item, idx) =>
                              renderAnswerItem(item, idx),
                            )}
                          </div>
                        </div>
                      )}

                      {jobAnswers.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] font-mono uppercase font-bold text-domenion-gold">
                            Job-Specific Questions
                          </span>
                          <div className="space-y-2">
                            {jobAnswers.map((item, idx) =>
                              renderAnswerItem(item, idx),
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-800/20 border border-white/5 text-slate-400 text-xs italic text-center">
                No screening responses submitted for this application.
              </div>
            )}
          </div>

          {/* Cover Letter / Statement */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              <MessageSquare size={15} className="text-domenion-gold" />
              <span>Candidate Cover Letter / Statement</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {application.message ||
                "No additional notes or message provided by applicant."}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-white/10 bg-slate-900/90 flex items-center justify-between flex-shrink-0">
          <div>
            {isAdmin && (
              <button
                type="button"
                onClick={() => onDelete(application._id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-semibold transition-colors"
              >
                <Trash2 size={14} />
                <span>Delete Application</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetailsModal;
