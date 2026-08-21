import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, FolderKanban } from "lucide-react";
import { cmsAPI } from "../../../../services/api";

function CMSFormModal({ cmsItem, onClose, onSaved }) {
  const isEditing = Boolean(cmsItem && cmsItem._id);

  const [formData, setFormData] = useState({
    page: "",
    section: "",
    title: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    status: "published",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (cmsItem) {
      setFormData({
        page: cmsItem.page || "",
        section: cmsItem.section || "",
        title: cmsItem.title || "",
        content: typeof cmsItem.content === "string" ? cmsItem.content : JSON.stringify(cmsItem.content || "", null, 2),
        seoTitle: cmsItem.seoMetadata?.title || "",
        seoDescription: cmsItem.seoMetadata?.description || "",
        status: cmsItem.status || "published",
      });
    }
  }, [cmsItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.page.trim() || !formData.section.trim()) {
      setError("Please provide Page Key and Section Key.");
      return;
    }

    let parsedContent = formData.content;
    // Check if user entered valid JSON object or raw string
    if (formData.content.trim().startsWith("{") || formData.content.trim().startsWith("[")) {
      try {
        parsedContent = JSON.parse(formData.content.trim());
      } catch {
        // Fall back to raw string
      }
    }

    const payload = {
      page: formData.page.trim().toLowerCase(),
      section: formData.section.trim().toLowerCase(),
      title: formData.title.trim() || undefined,
      content: parsedContent,
      seoMetadata: {
        title: formData.seoTitle.trim() || undefined,
        description: formData.seoDescription.trim() || undefined,
      },
      status: formData.status,
    };

    try {
      setSaving(true);
      if (isEditing) {
        await cmsAPI.updatePageContent(cmsItem._id, payload);
        setSuccess("CMS Page content updated successfully!");
      } else {
        await cmsAPI.createPageContent(payload);
        setSuccess("CMS Page content section created/updated successfully!");
      }

      setTimeout(() => {
        onSaved();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to save CMS section.");
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
              <FolderKanban className="text-danger" size={20} />
              {isEditing ? "Edit CMS Page Section" : "Create / Upsert CMS Page Section"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={saving} aria-label="Close" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4 max-h-80vh overflow-auto">
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
                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">PAGE KEY *</label>
                  <input
                    type="text"
                    name="page"
                    className="form-control bg-light font-monospace"
                    placeholder="e.g. home, about, services"
                    value={formData.page}
                    onChange={handleChange}
                    required
                    disabled={saving || isEditing}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">SECTION KEY *</label>
                  <input
                    type="text"
                    name="section"
                    className="form-control bg-light font-monospace"
                    placeholder="e.g. hero, intro, footer"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    disabled={saving || isEditing}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">STATUS</label>
                  <select
                    name="status"
                    className="form-select bg-light fw-bold"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">SECTION TITLE</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control bg-light"
                    placeholder="e.g. Premier Physical Security Solutions"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">SECTION BODY / PAYLOAD (Text or JSON)</label>
                  <textarea
                    name="content"
                    rows="6"
                    className="form-control bg-light font-monospace fs-7"
                    placeholder="Enter section content or JSON payload..."
                    value={formData.content}
                    onChange={handleChange}
                    disabled={saving}
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">SEO TITLE</label>
                  <input
                    type="text"
                    name="seoTitle"
                    className="form-control bg-light"
                    placeholder="Page SEO Meta Title"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">SEO DESCRIPTION</label>
                  <input
                    type="text"
                    name="seoDescription"
                    className="form-control bg-light"
                    placeholder="Page SEO Meta Description"
                    value={formData.seoDescription}
                    onChange={handleChange}
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
                    Saving...
                  </>
                ) : isEditing ? (
                  "Update CMS Section"
                ) : (
                  "Create CMS Section"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CMSFormModal;
