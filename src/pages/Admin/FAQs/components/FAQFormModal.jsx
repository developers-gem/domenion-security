import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import { faqsAPI } from "../../../../services/api";

function FAQFormModal({ faq, onClose, onSaved }) {
  const isEditing = Boolean(faq && faq._id);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    order: 0,
    active: true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category || "General",
        order: faq.order || 0,
        active: faq.active !== undefined ? faq.active : true,
      });
    }
  }, [faq]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.question.trim() || !formData.answer.trim()) {
      setError("Please provide both Question and Answer.");
      return;
    }

    const payload = {
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      category: formData.category.trim() || "General",
      order: Number(formData.order) || 0,
      active: Boolean(formData.active),
    };

    try {
      setSaving(true);
      if (isEditing) {
        await faqsAPI.updateFAQ(faq._id, payload);
        setSuccess("FAQ updated successfully!");
      } else {
        await faqsAPI.createFAQ(payload);
        setSuccess("New FAQ created successfully!");
      }

      setTimeout(() => {
        onSaved();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to save FAQ.");
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
              <HelpCircle className="text-danger" size={20} />
              {isEditing ? "Edit FAQ Item" : "Create New FAQ Item"}
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
                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">QUESTION *</label>
                  <input
                    type="text"
                    name="question"
                    className="form-control bg-light fw-medium"
                    placeholder="e.g. What security licenses do your armed guards possess?"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-bold">ANSWER *</label>
                  <textarea
                    name="answer"
                    rows="5"
                    className="form-control bg-light"
                    placeholder="Detailed explanation..."
                    value={formData.answer}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fs-8 text-secondary fw-bold">CATEGORY</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control bg-light"
                    placeholder="e.g. General, Guard Services, Compliance"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fs-8 text-secondary fw-bold">SORT ORDER</label>
                  <input
                    type="number"
                    name="order"
                    className="form-control bg-light"
                    placeholder="0"
                    value={formData.order}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>

                <div className="col-md-3 d-flex align-items-end">
                  <div className="form-check form-switch mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="active"
                      id="faq-active-check"
                      checked={formData.active}
                      onChange={handleChange}
                      disabled={saving}
                    />
                    <label className="form-check-label fw-bold text-dark fs-7" htmlFor="faq-active-check">
                      Active (Visible)
                    </label>
                  </div>
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
                  "Update FAQ"
                ) : (
                  "Create FAQ"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FAQFormModal;
