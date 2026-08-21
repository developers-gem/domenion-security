import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, FileText } from "lucide-react";
import { blogsAPI } from "../../../../services/api";

function BlogFormModal({ blog, onClose, onSaved }) {
  const isEditing = Boolean(blog && blog._id);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
    featuredImage: "",
    seoTitle: "",
    seoDescription: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
        status: blog.status || "draft",
        featuredImage: blog.featuredImage || "",
        seoTitle: blog.seoTitle || "",
        seoDescription: blog.seoDescription || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim() || !formData.category.trim()) {
      setError("Please fill in all required fields (Title, Excerpt, Content, Category).");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      category: formData.category.trim(),
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      status: formData.status,
      featuredImage: formData.featuredImage.trim() || undefined,
      seoTitle: formData.seoTitle.trim() || undefined,
      seoDescription: formData.seoDescription.trim() || undefined,
    };

    try {
      setSaving(true);
      if (isEditing) {
        await blogsAPI.updateBlog(blog._id, payload);
        setSuccess("Blog post updated successfully!");
      } else {
        await blogsAPI.createBlog(payload);
        setSuccess("Blog post created successfully!");
      }

      setTimeout(() => {
        onSaved();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to save blog post. Check for duplicate slug or invalid input.");
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
              <FileText className="text-danger" size={20} />
              {isEditing ? "Edit Blog Article" : "Create New Blog Article"}
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
                <div className="col-md-8">
                  <label className="form-label fs-8 text-secondary fw-bold">ARTICLE TITLE *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control bg-light"
                    placeholder="e.g. 10 Essential Security Protocols for Commercial Buildings"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">CATEGORY *</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control bg-light"
                    placeholder="e.g. Commercial Security"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label fs-8 text-secondary fw-bold">SLUG (Optional - Auto-generated from title if blank)</label>
                  <input
                    type="text"
                    name="slug"
                    className="form-control bg-light"
                    placeholder="e.g. 10-essential-security-protocols"
                    value={formData.slug}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fs-8 text-secondary fw-bold">PUBLICATION STATUS</label>
                  <select
                    name="status"
                    className="form-select bg-light fw-bold"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">EXCERPT (SHORT SUMMARY) *</label>
                  <textarea
                    name="excerpt"
                    rows="2"
                    className="form-control bg-light"
                    placeholder="Brief 2-3 sentence overview for blog listings..."
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">MAIN CONTENT *</label>
                  <textarea
                    name="content"
                    rows="8"
                    className="form-control bg-light font-monospace fs-7"
                    placeholder="Write article content here..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">FEATURED IMAGE URL</label>
                  <input
                    type="text"
                    name="featuredImage"
                    className="form-control bg-light"
                    placeholder="e.g. /images/blog/security-audit.jpg"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">TAGS (Comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    className="form-control bg-light"
                    placeholder="e.g. Security, Audits, Commercial"
                    value={formData.tags}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">SEO TITLE</label>
                  <input
                    type="text"
                    name="seoTitle"
                    className="form-control bg-light"
                    placeholder="Meta title for search engines"
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
                    placeholder="Meta description for search engines"
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
                  "Update Article"
                ) : (
                  "Publish / Save Article"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogFormModal;
