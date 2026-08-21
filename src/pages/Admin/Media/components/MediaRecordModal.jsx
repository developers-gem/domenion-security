import { useState } from "react";
import { Loader2, AlertCircle, CheckCircle2, Image } from "lucide-react";
import { mediaAPI } from "../../../../services/api";

function MediaRecordModal({ onClose, onSaved }) {
  const [formData, setFormData] = useState({
    filename: "",
    originalName: "",
    mimeType: "image/jpeg",
    size: "",
    url: "",
    category: "image",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.filename.trim() || !formData.originalName.trim() || !formData.url.trim() || !formData.size) {
      setError("Please fill in all required fields (Filename, Original Name, URL, File Size).");
      return;
    }

    const payload = {
      filename: formData.filename.trim(),
      originalName: formData.originalName.trim(),
      mimeType: formData.mimeType.trim(),
      size: Number(formData.size),
      url: formData.url.trim(),
      category: formData.category,
    };

    try {
      setSaving(true);
      await mediaAPI.createMediaRecord(payload);
      setSuccess("Media asset registered successfully!");

      setTimeout(() => {
        onSaved();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to register media asset.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-white text-dark border-0 shadow-lg">
          <div className="modal-header border-bottom py-3">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <Image className="text-danger" size={20} />
              Register Media Asset Metadata
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={saving} aria-label="Close" />
          </div>

          <form onSubmit={handleSubmit}>
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

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">FILENAME *</label>
                  <input
                    type="text"
                    name="filename"
                    className="form-control bg-light"
                    placeholder="e.g. hero-guard-banner.jpg"
                    value={formData.filename}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">ORIGINAL DISPLAY NAME *</label>
                  <input
                    type="text"
                    name="originalName"
                    className="form-control bg-light"
                    placeholder="e.g. Hero Security Guard Banner Photo"
                    value={formData.originalName}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">ASSET PUBLIC URL / PATH *</label>
                  <input
                    type="text"
                    name="url"
                    className="form-control bg-light"
                    placeholder="e.g. /images/home/hero.jpg"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fs-8 text-secondary fw-bold">MIME TYPE *</label>
                  <select
                    name="mimeType"
                    className="form-select bg-light"
                    value={formData.mimeType}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="image/jpeg">image/jpeg</option>
                    <option value="image/png">image/png</option>
                    <option value="image/webp">image/webp</option>
                    <option value="video/mp4">video/mp4</option>
                    <option value="application/pdf">application/pdf</option>
                    <option value="application/msword">application/msword</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fs-8 text-secondary fw-bold">CATEGORY</label>
                  <select
                    name="category"
                    className="form-select bg-light fw-bold"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="image">image</option>
                    <option value="video">video</option>
                    <option value="pdf">pdf</option>
                    <option value="document">document</option>
                    <option value="general">general</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">FILE SIZE (IN BYTES) *</label>
                  <input
                    type="number"
                    name="size"
                    className="form-control bg-light"
                    placeholder="e.g. 245000 (approx 245 KB)"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-top py-2">
              <button type="button" className="btn btn-light btn-sm" onClick={onClose} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-danger btn-sm px-4" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={14} className="me-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register Asset"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MediaRecordModal;
