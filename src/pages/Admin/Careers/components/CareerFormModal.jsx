import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { careersAPI } from "../../../../services/api";

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
        requirements: Array.isArray(career.requirements) ? career.requirements.join(", ") : career.requirements || "",
        status: career.status || "open",
        applicationDeadline: career.applicationDeadline ? new Date(career.applicationDeadline).toISOString().substring(0, 10) : "",
      });
    }
  }, [career]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title.trim() || !formData.location.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields (Job Title, Location, and Description).");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      department: formData.department.trim(),
      location: formData.location.trim(),
      type: formData.type,
      experience: formData.experience.trim(),
      description: formData.description.trim(),
      requirements: formData.requirements ? formData.requirements.split(",").map((r) => r.trim()).filter(Boolean) : [],
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
      setError(err.message || "Failed to save career posting. Please check inputs and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white text-black border-secondary shadow-lg">
          <div className="modal-header border-secondary">
            <h5 className="modal-title fw-bold text-black">
              {isEditing ? "Edit Career Posting" : "Create New Career Posting"}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} disabled={saving} aria-label="Close modal" />
          </div>

          <form onSubmit={handleSubmit}>
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

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small text-secondary fw-bold">JOB TITLE *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    placeholder="e.g. Armed Patrol Officer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-secondary fw-bold">DEPARTMENT</label>
                  <input
                    type="text"
                    name="department"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    placeholder="e.g. Field Operations"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-secondary fw-bold">LOCATION *</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    placeholder="e.g. Phoenix, AZ"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-secondary fw-bold">EMPLOYMENT TYPE</label>
                  <select
                    name="type"
                    className="form-select bg-secondary bg-opacity-25 text-black border-secondary"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-secondary fw-bold">EXPERIENCE REQUIRED</label>
                  <input
                    type="text"
                    name="experience"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    placeholder="e.g. 2+ years security experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small text-secondary fw-bold">STATUS</label>
                  <select
                    name="status"
                    className="form-select bg-secondary bg-opacity-25 text-black border-secondary"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label small text-secondary fw-bold">DEADLINE</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small text-secondary fw-bold">REQUIREMENTS (Comma-separated)</label>
                  <input
                    type="text"
                    name="requirements"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    placeholder="e.g. Armed Guard License, Clean Driving Record, CPR Certified"
                    value={formData.requirements}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small text-secondary fw-bold">JOB DESCRIPTION *</label>
                  <textarea
                    name="description"
                    rows="4"
                    className="form-control bg-secondary bg-opacity-25 text-black border-secondary"
                    placeholder="Detailed description of responsibilities and qualifications..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-danger px-4" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={16} className="me-2 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  "Update Career Posting"
                ) : (
                  "Create Career Posting"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CareerFormModal;
