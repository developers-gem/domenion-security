import { useState, useEffect, useCallback } from "react";
import {
  HelpCircle,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { careersAPI } from "../../../../services/api";
import "../../admin-bootstrap-scoped.css";

export default function ScreeningQuestionsModal({ career, onClose, onUpdated }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Form State for Add / Edit Question
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isRequired, setIsRequired] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  const fetchQuestions = useCallback(async () => {
    if (!career || !career._id) return;
    try {
      setLoading(true);
      setError("");
      const res = await careersAPI.getAdminQuestions(career._id);
      const data = res?.data || res || [];
      const sorted = Array.isArray(data)
        ? [...data].sort((a, b) => (a.order || 0) - (b.order || 0))
        : [];
      setQuestions(sorted);
    } catch (err) {
      setError(err.message || "Failed to load screening questions.");
    } finally {
      setLoading(false);
    }
  }, [career]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const resetForm = () => {
    setEditingQuestionId(null);
    setQuestionText("");
    setOptions(["", ""]);
    setIsRequired(true);
    setIsActive(true);
    setDisplayOrder(questions.length);
  };

  const handleStartEdit = (q) => {
    setEditingQuestionId(q._id);
    setQuestionText(q.question);
    setOptions(Array.isArray(q.options) && q.options.length >= 2 ? [...q.options] : ["", ""]);
    setIsRequired(Boolean(q.required));
    setIsActive(q.isActive !== false);
    setDisplayOrder(q.order || 0);
  };

  const handleAddOptionField = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleOptionChange = (index, value) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveOptionField = (index) => {
    if (options.length <= 2) {
      setError("A multiple-choice question must have at least 2 options.");
      return;
    }
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!questionText.trim()) {
      setError("Question text is required.");
      return;
    }

    const cleanOptions = options.map((opt) => opt.trim()).filter(Boolean);
    if (cleanOptions.length < 2) {
      setError("Please provide at least 2 non-empty multiple-choice options.");
      return;
    }

    const payload = {
      question: questionText.trim(),
      options: cleanOptions,
      required: isRequired,
      isActive: isActive,
      order: Number(displayOrder) || 0,
    };

    try {
      setActionLoading(true);
      if (editingQuestionId) {
        await careersAPI.updateQuestion(career._id, editingQuestionId, payload);
        setSuccess("Screening question updated successfully.");
      } else {
        await careersAPI.addQuestion(career._id, payload);
        setSuccess("Screening question added successfully.");
      }

      resetForm();
      fetchQuestions();
      if (onUpdated) onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save screening question.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleQuestionStatus = async (q) => {
    try {
      setActionLoading(true);
      await careersAPI.toggleQuestionStatus(career._id, q._id);
      setSuccess(`Question status changed to '${!q.isActive ? "Active" : "Disabled"}'.`);
      fetchQuestions();
      if (onUpdated) onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to toggle status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this screening question?")) return;
    try {
      setActionLoading(true);
      await careersAPI.deleteQuestion(career._id, questionId);
      setSuccess("Screening question deleted successfully.");
      if (editingQuestionId === questionId) {
        resetForm();
      }
      fetchQuestions();
      if (onUpdated) onUpdated();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete question.");
    } finally {
      setActionLoading(false);
    }
  };

  if (!career) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content bg-dark text-white border-secondary shadow-lg">
          {/* Modal Header */}
          <div className="modal-header border-secondary">
            <div className="d-flex align-items-center gap-2">
              <HelpCircle className="text-danger" size={24} />
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Screening Questions Management</h5>
                <span className="text-secondary small">Position: {career.title} ({career.location})</span>
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

            <div className="row g-4">
              {/* Left Column: Configured Questions List */}
              <div className="col-lg-7">
                <div className="card bg-secondary bg-opacity-10 border-secondary h-100">
                  <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0 text-white">Configured Questions ({questions.length})</h6>
                    <button className="btn btn-outline-light btn-sm fw-bold" onClick={resetForm}>
                      + New Question
                    </button>
                  </div>
                  <div className="card-body p-3 overflow-auto" style={{ maxHeight: "550px" }}>
                    {loading ? (
                      <div className="text-center py-5">
                        <Loader2 size={32} className="text-danger animate-spin mb-2 mx-auto" />
                        <p className="text-muted small mb-0">Loading screening questions...</p>
                      </div>
                    ) : questions.length === 0 ? (
                      <div className="text-center py-5 text-muted">
                        <HelpCircle size={40} className="text-secondary mb-2 mx-auto opacity-50" />
                        <p className="mb-1 fw-bold text-light">No screening questions configured.</p>
                        <p className="small mb-0">Applicants will only fill standard contact info and resume upload.</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-3">
                        {questions.map((q, idx) => (
                          <div
                            key={q._id}
                            className={`p-3 rounded border ${
                              editingQuestionId === q._id ? "border-danger bg-danger bg-opacity-10" : "border-secondary bg-dark"
                            }`}
                          >
                            <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                              <span className="fw-bold text-white fs-6">
                                <span className="text-danger me-1">{idx + 1}.</span>
                                {q.question}
                              </span>
                              <div className="d-flex gap-1 flex-shrink-0">
                                <span className={`badge ${q.required ? "bg-warning text-dark" : "bg-secondary"}`}>
                                  {q.required ? "Required" : "Optional"}
                                </span>
                                <span className={`badge ${q.isActive ? "bg-success" : "bg-danger"}`}>
                                  {q.isActive ? "Active" : "Disabled"}
                                </span>
                              </div>
                            </div>

                            {/* Options List */}
                            <div className="mb-3 ps-3 border-start border-secondary">
                              <span className="text-secondary fs-8 uppercase fw-bold d-block mb-1">Multiple Choice Options:</span>
                              <div className="d-flex flex-wrap gap-1">
                                {q.options.map((opt, optIdx) => (
                                  <span key={optIdx} className="badge bg-secondary bg-opacity-50 text-light border border-secondary">
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Question Actions */}
                            <div className="d-flex justify-content-end gap-2 pt-2 border-top border-secondary">
                              <button
                                className="btn btn-outline-light btn-sm py-1 px-2 text-decoration-none d-flex align-items-center gap-1"
                                onClick={() => handleStartEdit(q)}
                                disabled={actionLoading}
                              >
                                <Edit size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                className={`btn btn-sm py-1 px-2 d-flex align-items-center gap-1 ${
                                  q.isActive ? "btn-outline-warning" : "btn-outline-success"
                                }`}
                                onClick={() => handleToggleQuestionStatus(q)}
                                disabled={actionLoading}
                              >
                                {q.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                                <span>{q.isActive ? "Disable" : "Enable"}</span>
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm py-1 px-2 d-flex align-items-center gap-1"
                                onClick={() => handleDeleteQuestion(q._id)}
                                disabled={actionLoading}
                              >
                                <Trash2 size={13} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Add / Edit Question Form */}
              <div className="col-lg-5">
                <div className="card bg-secondary bg-opacity-10 border-secondary">
                  <div className="card-header bg-dark border-secondary">
                    <h6 className="fw-bold mb-0 text-white">
                      {editingQuestionId ? "Edit Screening Question" : "Add New Screening Question"}
                    </h6>
                  </div>
                  <div className="card-body p-3">
                    <form onSubmit={handleSaveQuestion}>
                      {/* Question Text */}
                      <div className="mb-3">
                        <label className="form-label text-light small fw-bold">
                          Question Text <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          placeholder="e.g. Do you have previous security experience?"
                          value={questionText}
                          onChange={(e) => setQuestionText(e.target.value)}
                        />
                      </div>

                      {/* Options List */}
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <label className="form-label text-light small fw-bold mb-0">
                            Multiple-Choice Options <span className="text-danger">* (Min 2)</span>
                          </label>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm py-0 px-2 fs-8 fw-bold"
                            onClick={handleAddOptionField}
                          >
                            + Add Option
                          </button>
                        </div>
                        <div className="d-flex flex-column gap-2 mt-2">
                          {options.map((opt, idx) => (
                            <div key={idx} className="input-group input-group-sm">
                              <span className="input-group-text bg-dark border-secondary text-secondary">{idx + 1}</span>
                              <input
                                type="text"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder={`Option ${idx + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                              />
                              {options.length > 2 && (
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={() => handleRemoveOptionField(idx)}
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Controls: Required, Active, Display Order */}
                      <div className="row g-2 mb-3">
                        <div className="col-6">
                          <label className="form-label text-light small fw-bold">Required?</label>
                          <select
                            className="form-select bg-dark text-white border-secondary form-select-sm"
                            value={isRequired ? "yes" : "no"}
                            onChange={(e) => setIsRequired(e.target.value === "yes")}
                          >
                            <option value="yes">Yes (Required)</option>
                            <option value="no">No (Optional)</option>
                          </select>
                        </div>

                        <div className="col-6">
                          <label className="form-label text-light small fw-bold">Active Status</label>
                          <select
                            className="form-select bg-dark text-white border-secondary form-select-sm"
                            value={isActive ? "yes" : "no"}
                            onChange={(e) => setIsActive(e.target.value === "yes")}
                          >
                            <option value="yes">Active (Enabled)</option>
                            <option value="no">Inactive (Disabled)</option>
                          </select>
                        </div>
                      </div>

                      {/* Display Order */}
                      <div className="mb-3">
                        <label className="form-label text-light small fw-bold">Display Order</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-white border-secondary form-control-sm"
                          value={displayOrder}
                          onChange={(e) => setDisplayOrder(e.target.value)}
                        />
                      </div>

                      <div className="d-flex justify-content-end gap-2 pt-2 border-top border-secondary">
                        {editingQuestionId && (
                          <button type="button" className="btn btn-outline-light btn-sm" onClick={resetForm}>
                            Cancel Edit
                          </button>
                        )}
                        <button type="submit" className="btn btn-danger btn-sm fw-bold px-3" disabled={actionLoading}>
                          {actionLoading ? "Saving..." : editingQuestionId ? "Update Question" : "Save Question"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-secondary">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close & Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
