import { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Building2,
  Clock3,
  Calendar,
  FileText,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Save,
  Plus,
  Pencil,
} from "lucide-react";
import { careersAPI } from "../../../../services/api";
import "../../admin-bootstrap-scoped.css";

function CareerFormModal({ career, onClose, onSaved }) {
  const isEditing = Boolean(career && career._id);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-Time",
    experience: "",
    description: "",
    requirements: "",
    status: "open",
    applicationDeadline: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (career) {
      setFormData({
        title: career.title || "",
        department: career.department || "",
        location: career.location || "",
        type: career.type || "Full-Time",
        experience: career.experience || "",
        description: career.description || "",
        requirements: Array.isArray(career.requirements)
          ? career.requirements.join(", ")
          : career.requirements || "",
        status: career.status || "open",
        applicationDeadline: career.applicationDeadline
          ? new Date(career.applicationDeadline)
              .toISOString()
              .substring(0, 10)
          : "",
      });
    }
  }, [career]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.title.trim() ||
      !formData.location.trim() ||
      !formData.description.trim()
    ) {
      setError(
        "Please fill in all required fields (Job Title, Location, and Description)."
      );
      return;
    }

    const payload = {
      title: formData.title.trim(),
      department: formData.department.trim(),
      location: formData.location.trim(),
      type: formData.type,
      experience: formData.experience.trim(),
      description: formData.description.trim(),
      requirements: formData.requirements
        ? formData.requirements
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean)
        : [],
      status: formData.status,
      applicationDeadline: formData.applicationDeadline || undefined,
    };

    try {
      setSaving(true);

      if (isEditing) {
        await careersAPI.updateCareer(career._id, payload);
        setSuccess("Career posting updated successfully!");
      } else {
        await careersAPI.createCareer(payload);
        setSuccess("Career posting created successfully!");
      }

      setTimeout(() => {
        onSaved();
      }, 1000);
    } catch (err) {
      setError(
        err.message ||
          "Failed to save career posting. Please check inputs and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/50 backdrop-blur-sm overflow-y-auto">
      {/* =========================================================
          MODAL
      ========================================================= */}
      <div className="relative w-full max-w-3xl my-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-gray-900 max-h-[92vh]">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="px-5 sm:px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-domenion-gold/10 border border-domenion-gold/30 flex items-center justify-center text-domenion-gold flex-shrink-0">
              {isEditing ? <Pencil size={20} /> : <Plus size={20} />}
            </div>

            <div className="min-w-0">
              <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 leading-tight truncate">
                {isEditing
                  ? "Edit Career Posting"
                  : "Create New Career Posting"}
              </h3>

              <p className="text-xs text-domenion-gold font-medium tracking-wide mt-0.5">
                {isEditing
                  ? "Update Career Position Details"
                  : "Create a New Career Opportunity"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50 flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* =========================================================
            BODY
        ========================================================= */}
        <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-gray-200">
            {/* =====================================================
                SUCCESS MESSAGE
            ===================================================== */}
            {success && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* =====================================================
                ERROR MESSAGE
            ===================================================== */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* =====================================================
                BASIC POSITION INFORMATION
            ===================================================== */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                <Briefcase size={15} className="text-domenion-gold" />
                <span>Position Information</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Job Title *
                    </label>

                    <div className="relative">
                      <Briefcase
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-domenion-gold pointer-events-none"
                      />

                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Armed Patrol Officer"
                        required
                        disabled={saving}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg pl-9 pr-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Department
                    </label>

                    <div className="relative">
                      <Building2
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-domenion-gold pointer-events-none"
                      />

                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. Field Operations"
                        disabled={saving}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg pl-9 pr-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Location *
                    </label>

                    <div className="relative">
                      <MapPin
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-domenion-gold pointer-events-none"
                      />

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Phoenix, AZ"
                        required
                        disabled={saving}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg pl-9 pr-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Employment Type
                    </label>

                    <div className="relative">
                      <Clock3
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-domenion-gold pointer-events-none z-10"
                      />

                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                JOB SETTINGS
            ===================================================== */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                <ClipboardList size={15} className="text-domenion-gold" />
                <span>Position Settings</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Experience */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Experience Required
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 2+ years"
                      disabled={saving}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                      Application Deadline
                    </label>

                    <div className="relative">
                      <Calendar
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-domenion-gold pointer-events-none"
                      />

                      <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                REQUIREMENTS
            ===================================================== */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                <FileText size={15} className="text-domenion-gold" />
                <span>Requirements</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                  Requirements (Comma-separated)
                </label>

                <input
                  type="text"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="e.g. Armed Guard License, Clean Driving Record, CPR Certified"
                  disabled={saving}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors"
                />

                <p className="mt-2 text-[10px] text-gray-500">
                  Separate multiple requirements using commas.
                </p>
              </div>
            </div>

            {/* =====================================================
                JOB DESCRIPTION
            ===================================================== */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                <FileText size={15} className="text-domenion-gold" />
                <span>Job Description</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                  Detailed Description *
                </label>

                <textarea
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of responsibilities and qualifications..."
                  required
                  disabled={saving}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:border-domenion-gold/60 focus:ring-2 focus:ring-domenion-gold/20 disabled:opacity-50 transition-colors resize-y"
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">
                    Provide clear responsibilities and qualifications.
                  </span>

                  <span className="text-[10px] font-medium text-gray-400">
                    {formData.description.length} characters
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              FOOTER
          ========================================================= */}
          <div className="px-5 sm:px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              <Briefcase size={13} />
              <span>
                {isEditing ? "Editing Career Position" : "New Career Position"}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Cancel */}
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-semibold transition-colors disabled:opacity-50"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-domenion-gold hover:bg-domenion-gold/90 border border-domenion-gold text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:translate-y-0.5 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    {isEditing ? <Save size={15} /> : <Plus size={15} />}

                    <span>
                      {isEditing
                        ? "Update Career Posting"
                        : "Create Career Posting"}
                    </span>
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

export default CareerFormModal;

