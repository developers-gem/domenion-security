import { useState, useEffect } from "react";
import { X, Plus, Trash2, ArrowUp, ArrowDown, HelpCircle, Loader2 } from "lucide-react";
import { globalQuestionsAPI, assessmentsAPI } from "../../../../services/api";

export default function AssessmentFormModal({ assessment, onClose, onSaved }) {
  const [title, setTitle] = useState(assessment?.title || "");
  const [description, setDescription] = useState(assessment?.description || "");
  const [passingScore, setPassingScore] = useState(assessment?.passingScore || 8);
  const [attemptsAllowed, setAttemptsAllowed] = useState(assessment?.attemptsAllowed || 1);
  const [isActive, setIsActive] = useState(assessment ? Boolean(assessment.isActive) : true);

  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState(
    assessment?.questions ? assessment.questions.map((q) => (typeof q === "object" ? q._id : q)) : []
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);
        const res = await globalQuestionsAPI.getAdminGlobalQuestions();
        const data = res?.data || res || [];
        // Only questions marked as isQuizQuestion: true are eligible for assessments
        const quizEligible = data.filter((q) => q.isQuizQuestion && q.correctAnswer && q.correctAnswer.trim());
        setAvailableQuestions(quizEligible);
      } catch (err) {
        setError(err.message || "Failed to load question bank.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, []);

  const handleToggleQuestion = (qId) => {
    if (selectedQuestionIds.includes(qId)) {
      setSelectedQuestionIds(selectedQuestionIds.filter((id) => id !== qId));
    } else {
      setSelectedQuestionIds([...selectedQuestionIds, qId]);
    }
  };

  const handleMoveQuestion = (index, direction) => {
    const newOrder = [...selectedQuestionIds];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setSelectedQuestionIds(newOrder);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Assessment title is required.");
      return;
    }

    if (selectedQuestionIds.length === 0) {
      setError("Please select at least one question for the assessment.");
      return;
    }

    const pScore = Number(passingScore);
    if (!pScore || pScore < 1) {
      setError("Passing score must be at least 1.");
      return;
    }

    if (pScore > selectedQuestionIds.length) {
      setError(`Passing score (${pScore}) cannot be greater than selected questions (${selectedQuestionIds.length}).`);
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      questions: selectedQuestionIds,
      passingScore: pScore,
      attemptsAllowed: Number(attemptsAllowed) > 0 ? Number(attemptsAllowed) : 1,
      isActive,
    };

    try {
      setSaving(true);
      if (assessment?._id) {
        await assessmentsAPI.updateAssessment(assessment._id, payload);
      } else {
        await assessmentsAPI.createAssessment(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to save assessment.");
    } finally {
      setSaving(false);
    }
  };

  // Helper map for display
  const questionMap = new Map(availableQuestions.map((q) => [q._id, q]));

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content bg-dark text-white border-secondary shadow-lg">
          <div className="modal-header border-secondary">
            <h5 className="modal-title fw-bold text-white mb-0">
              {assessment ? "Edit Assessment" : "Create New Assessment"}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              <div className="row g-4">
                {/* Basic Settings */}
                <div className="col-lg-5">
                  <div className="card bg-secondary bg-opacity-10 border-secondary h-100">
                    <div className="card-header bg-dark border-secondary">
                      <h6 className="fw-bold mb-0 text-white">Assessment Configuration</h6>
                    </div>
                    <div className="card-body p-3">
                      <div className="mb-3">
                        <label className="form-label text-light small fw-bold">
                          Assessment Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          placeholder="e.g. Security Officer Training Assessment"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-light small fw-bold">Description</label>
                        <textarea
                          rows={3}
                          className="form-control bg-dark text-white border-secondary"
                          placeholder="Brief description of training material covered..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="row g-2 mb-3">
                        <div className="col-6">
                          <label className="form-label text-light small fw-bold">
                            Passing Score <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={selectedQuestionIds.length || 100}
                            className="form-control bg-dark text-white border-secondary"
                            value={passingScore}
                            onChange={(e) => setPassingScore(e.target.value)}
                          />
                          <span className="text-secondary fs-8">Correct answers required</span>
                        </div>

                        <div className="col-6">
                          <label className="form-label text-light small fw-bold">Attempts Allowed</label>
                          <input
                            type="number"
                            min={1}
                            className="form-control bg-dark text-white border-secondary"
                            value={attemptsAllowed}
                            onChange={(e) => setAttemptsAllowed(e.target.value)}
                          />
                          <span className="text-secondary fs-8">Default 1 attempt</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-light small fw-bold">Status</label>
                        <select
                          className="form-select bg-dark text-white border-secondary"
                          value={isActive ? "active" : "inactive"}
                          onChange={(e) => setIsActive(e.target.value === "active")}
                        >
                          <option value="active">Active (Visible to Employees)</option>
                          <option value="inactive">Inactive (Hidden)</option>
                        </select>
                      </div>

                      <div className="p-3 bg-dark border border-secondary rounded">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="small text-secondary fw-bold">Selected Questions:</span>
                          <span className="badge bg-danger fs-7">{selectedQuestionIds.length}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="small text-secondary fw-bold">Configured Passing Rule:</span>
                          <span className="badge bg-success fs-7">
                            {passingScore} / {selectedQuestionIds.length} Correct
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Picker */}
                <div className="col-lg-7">
                  <div className="card bg-secondary bg-opacity-10 border-secondary h-100">
                    <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0 text-white">Select & Order Quiz Questions</h6>
                      <span className="badge bg-light text-dark fs-8">
                        {availableQuestions.length} Eligible in Question Bank
                      </span>
                    </div>

                    <div className="card-body p-3 overflow-auto" style={{ maxHeight: "500px" }}>
                      {loading ? (
                        <div className="text-center py-5">
                          <Loader2 size={32} className="text-danger animate-spin mb-2 mx-auto" />
                          <p className="text-muted small">Loading Question Bank...</p>
                        </div>
                      ) : availableQuestions.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                          <HelpCircle size={36} className="text-secondary mb-2 mx-auto opacity-50" />
                          <p className="mb-1 text-light fw-bold">No eligible quiz questions found.</p>
                          <p className="small mb-0">
                            Create questions in the <strong>Question Bank</strong> tab and mark them as <em>Use in Employee Quiz: Yes</em> with a defined correct answer.
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-3">
                          {/* Selected Questions List with Ordering */}
                          {selectedQuestionIds.length > 0 && (
                            <div className="mb-3">
                              <span className="text-warning fs-8 uppercase fw-bold d-block mb-2">
                                Selected Questions Order:
                              </span>
                              <div className="d-flex flex-column gap-2">
                                {selectedQuestionIds.map((qId, idx) => {
                                  const qObj = questionMap.get(qId);
                                  return (
                                    <div
                                      key={qId}
                                      className="p-2 rounded bg-dark border border-danger border-opacity-50 d-flex align-items-center justify-content-between"
                                    >
                                      <div className="d-flex align-items-center gap-2 overflow-hidden">
                                        <span className="badge bg-danger fs-8">{idx + 1}</span>
                                        <span className="text-white text-truncate small">
                                          {qObj ? qObj.question : qId}
                                        </span>
                                      </div>

                                      <div className="d-flex align-items-center gap-1 flex-shrink-0">
                                        <button
                                          type="button"
                                          className="btn btn-outline-light btn-sm p-1"
                                          onClick={() => handleMoveQuestion(idx, "up")}
                                          disabled={idx === 0}
                                        >
                                          <ArrowUp size={12} />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-outline-light btn-sm p-1"
                                          onClick={() => handleMoveQuestion(idx, "down")}
                                          disabled={idx === selectedQuestionIds.length - 1}
                                        >
                                          <ArrowDown size={12} />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-outline-danger btn-sm p-1"
                                          onClick={() => handleToggleQuestion(qId)}
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* All Available Quiz Questions Pool */}
                          <span className="text-secondary fs-8 uppercase fw-bold d-block">
                            Available Quiz Questions Pool:
                          </span>

                          {availableQuestions.map((q) => {
                            const isSelected = selectedQuestionIds.includes(q._id);
                            return (
                              <div
                                key={q._id}
                                className={`p-3 rounded border cursor-pointer ${
                                  isSelected ? "border-danger bg-danger bg-opacity-10" : "border-secondary bg-dark"
                                }`}
                                onClick={() => handleToggleQuestion(q._id)}
                              >
                                <div className="d-flex align-items-start gap-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input mt-1 border-secondary"
                                    checked={isSelected}
                                    onChange={() => {}}
                                  />
                                  <div className="flex-grow-1">
                                    <span className="fw-bold text-white small d-block mb-1">{q.question}</span>
                                    <div className="d-flex flex-wrap gap-1 mb-2">
                                      {(q.options || []).map((opt, optIdx) => (
                                        <span
                                          key={optIdx}
                                          className={`badge fs-8 ${
                                            opt === q.correctAnswer
                                              ? "bg-success bg-opacity-20 text-success border border-success border-opacity-30"
                                              : "bg-secondary bg-opacity-30 text-light border border-secondary"
                                          }`}
                                        >
                                          {opt} {opt === q.correctAnswer ? "(Correct)" : ""}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-outline-light" onClick={onClose} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-danger fw-bold px-4" disabled={saving}>
                {saving ? "Saving Assessment..." : assessment ? "Update Assessment" : "Create Assessment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
