import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import AssessmentFormModal from "./components/AssessmentFormModal";
import ResultDetailsModal from "./components/ResultDetailsModal";
import {
  Award,
  Plus,
  Search,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ToggleLeft,
  ToggleRight,
  Eye,
  Check,
} from "lucide-react";
import { assessmentsAPI, globalQuestionsAPI } from "../../../services/api";

export default function AdminAssessments() {
  const [activeTab, setActiveTab] = useState("assessments"); // 'assessments' | 'questions' | 'results'
  const [assessments, setAssessments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [selectedResult, setSelectedResult] = useState(null);

  // Question Form State (for Question Bank tab)
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isQuizQuestion, setIsQuizQuestion] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const fetchAssessments = useCallback(async () => {
    try {
      const res = await assessmentsAPI.getAssessments();
      setAssessments(res?.data || res || []);
    } catch (err) {
      setError(err.message || "Failed to load assessments.");
    }
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await globalQuestionsAPI.getAdminGlobalQuestions();
      setQuestions(res?.data || res || []);
    } catch (err) {
      setError(err.message || "Failed to load question bank.");
    }
  }, []);

  const fetchResults = useCallback(async () => {
    try {
      const res = await assessmentsAPI.getAdminResults();
      setResults(res?.data || res || []);
    } catch (err) {
      setError(err.message || "Failed to load employee results.");
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    await Promise.all([fetchAssessments(), fetchQuestions(), fetchResults()]);
    setLoading(false);
  }, [fetchAssessments, fetchQuestions, fetchResults]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Assessment Handlers
  const handleOpenCreateAssessment = () => {
    setSelectedAssessment(null);
    setShowAssessmentModal(true);
  };

  const handleOpenEditAssessment = (ass) => {
    setSelectedAssessment(ass);
    setShowAssessmentModal(true);
  };

  const handleToggleAssessmentStatus = async (ass) => {
    try {
      setActionLoading(true);
      await assessmentsAPI.toggleAssessmentStatus(ass._id);
      setSuccess(`Assessment status changed to '${!ass.isActive ? "Active" : "Inactive"}'.`);
      fetchAssessments();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to toggle status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAssessment = async (id) => {
    try {
      setActionLoading(true);
      await assessmentsAPI.deleteAssessment(id);
      setSuccess("Assessment removed successfully.");
      setDeleteConfirmId(null);
      fetchAssessments();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete assessment.");
    } finally {
      setActionLoading(false);
    }
  };

  // Question Bank Handlers
  const resetQuestionForm = () => {
    setEditingQuestionId(null);
    setQuestionText("");
    setQuestionOptions(["", ""]);
    setCorrectAnswer("");
    setIsQuizQuestion(true);
    setIsActive(true);
  };

  const handleStartEditQuestion = (q) => {
    setEditingQuestionId(q._id);
    setQuestionText(q.question);
    setQuestionOptions(Array.isArray(q.options) && q.options.length >= 2 ? [...q.options] : ["", ""]);
    setCorrectAnswer(q.correctAnswer || "");
    setIsQuizQuestion(Boolean(q.isQuizQuestion));
    setIsActive(q.isActive !== false);
  };

  const handleOptionChange = (index, val) => {
    const updated = [...questionOptions];
    updated[index] = val;
    setQuestionOptions(updated);
  };

  const handleAddOption = () => {
    setQuestionOptions([...questionOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    if (questionOptions.length <= 2) {
      setError("Quiz questions must have at least 2 options.");
      return;
    }
    setQuestionOptions(questionOptions.filter((_, i) => i !== index));
  };

  const handleSaveQuestionBankItem = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!questionText.trim()) {
      setError("Question text is required.");
      return;
    }

    const cleanOpts = questionOptions.map((o) => o.trim()).filter(Boolean);
    if (cleanOpts.length < 2) {
      setError("Please provide at least 2 non-empty options.");
      return;
    }

    if (isQuizQuestion && (!correctAnswer || !correctAnswer.trim())) {
      setError("Please define the correct answer for quiz questions.");
      return;
    }

    const payload = {
      question: questionText.trim(),
      type: "single_choice",
      options: cleanOpts,
      isQuizQuestion: Boolean(isQuizQuestion),
      correctAnswer: isQuizQuestion ? correctAnswer.trim() : "",
      points: 1,
      isActive: Boolean(isActive),
    };

    try {
      setActionLoading(true);
      if (editingQuestionId) {
        await globalQuestionsAPI.updateGlobalQuestion(editingQuestionId, payload);
        setSuccess("Question updated successfully.");
      } else {
        await globalQuestionsAPI.addGlobalQuestion(payload);
        setSuccess("New quiz question created in Question Bank.");
      }
      resetQuestionForm();
      fetchQuestions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save question.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleQuestionStatus = async (q) => {
    try {
      setActionLoading(true);
      await globalQuestionsAPI.toggleGlobalQuestionStatus(q._id);
      setSuccess(`Question status changed to '${!q.isActive ? "Active" : "Disabled"}'.`);
      fetchQuestions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to toggle question status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question from the Question Bank?")) return;
    try {
      setActionLoading(true);
      await globalQuestionsAPI.deleteGlobalQuestion(id);
      setSuccess("Question deleted successfully.");
      if (editingQuestionId === id) resetQuestionForm();
      fetchQuestions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete question.");
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered lists
  const filteredAssessments = assessments.filter((a) =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuestions = questions.filter(
    (q) =>
      q.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.options || []).some((opt) => opt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredResults = results.filter(
    (r) =>
      r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.assessmentTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-assessments-page">
        {/* Title Header Banner */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <span className="badge bg-red-600 bg-opacity-10 text-white border border-danger border-opacity-25 text-uppercase me-2">
              EMPLOYEE PORTAL
            </span>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center">
              <Award size={26} className="text-danger me-2" />
              Employee Quiz & Assessments Management
            </h2>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={handleOpenCreateAssessment}>
              <Plus size={18} />
              Create Assessment
            </button>
          </div>
        </div>

        {/* Global Notifications */}
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

        {/* Navigation Tabs Bar */}
        <div className="card bg-white border shadow-sm mb-4">
          <div className="card-body p-2 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <ul className="nav nav-pills gap-2 border-0">
              <li className="nav-item">
                <button
                  className={`nav-link fw-bold px-3 py-2 d-flex align-items-center gap-2 ${
                    activeTab === "assessments" ? "active bg-danger text-white" : "text-dark bg-light"
                  }`}
                  onClick={() => setActiveTab("assessments")}
                >
                  <FileCheck size={18} />
                  Assessments ({assessments.length})
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link fw-bold px-3 py-2 d-flex align-items-center gap-2 ${
                    activeTab === "questions" ? "active bg-danger text-white" : "text-dark bg-light"
                  }`}
                  onClick={() => setActiveTab("questions")}
                >
                  <HelpCircle size={18} />
                  Question Bank ({questions.filter((q) => q.isQuizQuestion).length})
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link fw-bold px-3 py-2 d-flex align-items-center gap-2 ${
                    activeTab === "results" ? "active bg-danger text-white" : "text-dark bg-light"
                  }`}
                  onClick={() => setActiveTab("results")}
                >
                  <Award size={18} />
                  Employee Results ({results.length})
                </button>
              </li>
            </ul>

            {/* Search input */}
            <div className="input-group" style={{ maxWidth: "320px" }}>
              <span className="input-group-text bg-light border-light-subtle text-secondary">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control bg-light border-light-subtle text-dark form-control-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TAB 1: ASSESSMENTS */}
        {activeTab === "assessments" && (
          <div className="card bg-white border shadow-sm">
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Loader2 size={36} className="text-danger animate-spin mb-2 mx-auto" />
                  <p className="text-muted small">Loading assessments...</p>
                </div>
              ) : filteredAssessments.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <FileCheck size={40} className="text-secondary mb-2 mx-auto opacity-50" />
                  <p className="mb-1 fs-6">No assessments configured.</p>
                  <p className="small mb-3">Create your first employee training assessment above.</p>
                  <button className="btn btn-danger btn-sm" onClick={handleOpenCreateAssessment}>
                    + Create Assessment
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-light-custom mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>ASSESSMENT TITLE</th>
                        <th>QUESTIONS COUNT</th>
                        <th>PASSING THRESHOLD</th>
                        <th>ATTEMPTS ALLOWED</th>
                        <th>STATUS</th>
                        <th className="text-end">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssessments.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="fw-bold text-dark fs-6">{item.title}</div>
                            {item.description && <div className="text-secondary small">{item.description}</div>}
                          </td>
                          <td>
                            <span className="badge bg-light text-secondary border fs-7">
                              {item.questions ? item.questions.length : 0} Questions
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 fs-7">
                              {item.passingScore} / {item.questions ? item.questions.length : 0} Correct
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border fs-7">
                              {item.attemptsAllowed || 1} Attempt(s)
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                item.isActive
                                  ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                                  : "bg-secondary bg-opacity-10 text-secondary border border-secondary"
                              } text-uppercase fs-8`}
                            >
                              {item.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => handleOpenEditAssessment(item)}
                                title="Edit Assessment"
                                disabled={actionLoading}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                className={`btn ${item.isActive ? "btn-outline-warning" : "btn-outline-success"}`}
                                onClick={() => handleToggleAssessmentStatus(item)}
                                title={item.isActive ? "Deactivate Assessment" : "Activate Assessment"}
                                disabled={actionLoading}
                              >
                                {item.isActive ? <Lock size={14} /> : <Unlock size={14} />}
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => setDeleteConfirmId(item._id)}
                                title="Delete Assessment"
                                disabled={actionLoading}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: QUESTION BANK */}
        {activeTab === "questions" && (
          <div className="row g-4">
            {/* Left Column: Questions List */}
            <div className="col-lg-7">
              <div className="card bg-white border shadow-sm h-100">
                <div className="card-header bg-light border-bottom d-flex justify-content-between align-items-center py-3">
                  <h6 className="fw-bold mb-0 text-dark">
                    Quiz Question Bank ({filteredQuestions.filter((q) => q.isQuizQuestion).length})
                  </h6>
                  <button className="btn btn-outline-danger btn-sm fw-bold" onClick={resetQuestionForm}>
                    + New Question
                  </button>
                </div>
                <div className="card-body p-3 overflow-auto" style={{ maxHeight: "600px" }}>
                  {loading ? (
                    <div className="text-center py-5">
                      <Loader2 size={32} className="text-danger animate-spin mb-2 mx-auto" />
                      <p className="text-muted small">Loading questions...</p>
                    </div>
                  ) : filteredQuestions.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                      <HelpCircle size={40} className="text-secondary mb-2 mx-auto opacity-50" />
                      <p className="mb-0 fs-6">No questions found matching search.</p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {filteredQuestions.map((q, idx) => (
                        <div
                          key={q._id}
                          className={`p-3 rounded border ${
                            editingQuestionId === q._id ? "border-danger bg-danger bg-opacity-10" : "border-light-subtle bg-white"
                          }`}
                        >
                          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                            <span className="fw-bold text-dark fs-6">
                              <span className="text-danger me-1">{idx + 1}.</span>
                              {q.question}
                            </span>
                            <div className="d-flex gap-1 flex-shrink-0 flex-wrap justify-content-end">
                              <span
                                className={`badge ${
                                  q.isQuizQuestion ? "bg-success bg-opacity-10 text-success border border-success" : "bg-white bg-opacity-10 text-secondary border"
                                }`}
                              >
                                {q.isQuizQuestion ? "Quiz Enabled" : "Career Screening Only"}
                              </span>
                              <span className={`badge ${q.isActive ? "bg-success" : "bg-danger"}`}>
                                {q.isActive ? "Active" : "Disabled"}
                              </span>
                            </div>
                          </div>

                          {/* Options */}
                          <div className="mb-3 ps-3 border-start border-secondary border-opacity-25">
                            <span className="text-muted fs-8 uppercase fw-bold d-block mb-1">Answer Options:</span>
                            <div className="d-flex flex-wrap gap-1">
                              {(q.options || []).map((opt, optIdx) => {
                                const isCorrect = opt === q.correctAnswer;
                                return (
                                  <span
                                    key={optIdx}
                                    className={`badge ${
                                      isCorrect
                                        ? "bg-success bg-opacity-20 text-success border border-success"
                                        : "bg-light text-secondary border"
                                    }`}
                                  >
                                    {opt} {isCorrect ? "(Correct)" : ""}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="d-flex justify-content-end gap-2 pt-2 border-top border-light-subtle">
                            <button
                              className="btn btn-outline-secondary btn-sm py-1 px-2 d-flex align-items-center gap-1"
                              onClick={() => handleStartEditQuestion(q)}
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
              <div className="card bg-white border shadow-sm">
                <div className="card-header bg-light border-bottom py-3">
                  <h6 className="fw-bold mb-0 text-dark">
                    {editingQuestionId ? "Edit Quiz Question" : "Add Quiz Question to Bank"}
                  </h6>
                </div>
                <div className="card-body p-3">
                  <form onSubmit={handleSaveQuestionBankItem}>
                    {/* Question Text */}
                    <div className="mb-3">
                      <label className="form-label text-dark small fw-bold">
                        Question Text <span className="text-danger">*</span>
                      </label>
                      <textarea
                        rows={2}
                        className="form-control bg-light border-light-subtle text-dark"
                        placeholder="e.g. What should a security officer do when they notice an unauthorized person?"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                      />
                    </div>

                    {/* Use in Employee Quiz Check */}
                    <div className="mb-3 p-3 bg-light border border-light-subtle rounded">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isQuizCheck"
                          checked={isQuizQuestion}
                          onChange={(e) => setIsQuizQuestion(e.target.checked)}
                        />
                        <label className="form-check-label fw-bold text-dark small" htmlFor="isQuizCheck">
                          Use in Employee Quiz / Assessment
                        </label>
                      </div>
                      <span className="text-secondary fs-8 d-block mt-1">
                        When enabled, this question becomes eligible for inclusion in employee assessments.
                      </span>
                    </div>

                    {/* Answer Options */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="form-label text-dark small fw-bold mb-0">
                          Options <span className="text-danger">* (Min 2)</span>
                        </label>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm py-0 px-2 fs-8 fw-bold"
                          onClick={handleAddOption}
                        >
                          + Add Option
                        </button>
                      </div>

                      <div className="d-flex flex-column gap-2 mt-2">
                        {questionOptions.map((opt, idx) => (
                          <div key={idx} className="input-group input-group-sm">
                            <span className="input-group-text bg-light border-light-subtle text-secondary fw-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <input
                              type="text"
                              className="form-control bg-light border-light-subtle text-dark"
                              placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                              value={opt}
                              onChange={(e) => handleOptionChange(idx, e.target.value)}
                            />
                            {questionOptions.length > 2 && (
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleRemoveOption(idx)}
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Correct Answer Selection */}
                    {isQuizQuestion && (
                      <div className="mb-3">
                        <label className="form-label text-dark small fw-bold">
                          Select Correct Answer <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select bg-light border-light-subtle text-dark"
                          value={correctAnswer}
                          onChange={(e) => setCorrectAnswer(e.target.value)}
                        >
                          <option value="">-- Choose Correct Option --</option>
                          {questionOptions
                            .filter((o) => o.trim().length > 0)
                            .map((opt, idx) => (
                              <option key={idx} value={opt}>
                                {String.fromCharCode(65 + idx)}. {opt}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    {/* Active Status */}
                    <div className="mb-3">
                      <label className="form-label text-dark small fw-bold">Status</label>
                      <select
                        className="form-select bg-light border-light-subtle text-dark form-select-sm"
                        value={isActive ? "active" : "inactive"}
                        onChange={(e) => setIsActive(e.target.value === "active")}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive / Disabled</option>
                      </select>
                    </div>

                    <div className="d-flex justify-content-end gap-2 pt-2 border-top border-light-subtle">
                      {editingQuestionId && (
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={resetQuestionForm}>
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
        )}

        {/* TAB 3: EMPLOYEE RESULTS */}
        {activeTab === "results" && (
          <div className="card bg-white border shadow-sm">
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Loader2 size={36} className="text-danger animate-spin mb-2 mx-auto" />
                  <p className="text-muted small">Loading employee results...</p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <Award size={40} className="text-secondary mb-2 mx-auto opacity-50" />
                  <p className="mb-0 fs-6">No employee assessment attempts recorded yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-light-custom mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>EMPLOYEE</th>
                        <th>ASSESSMENT</th>
                        <th>SCORE</th>
                        <th>RESULT</th>
                        <th>SUBMITTED DATE</th>
                        <th className="text-end">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((item) => {
                        const isPass = item.result === "PASS";
                        return (
                          <tr key={item._id}>
                            <td>
                              <div className="fw-bold text-dark fs-6">{item.user?.name || "Employee"}</div>
                              <div className="text-secondary small">{item.user?.email || "N/A"}</div>
                            </td>
                            <td>
                              <div className="fw-bold text-dark">{item.assessmentTitle}</div>
                            </td>
                            <td>
                              <span className="fw-bold text-dark fs-6">
                                {item.score} / {item.totalQuestions}
                              </span>
                              <span className="text-secondary small ms-1">({item.percentage}%)</span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  isPass
                                    ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                                    : "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25"
                                } text-uppercase fw-bold fs-7`}
                              >
                                {item.result}
                              </span>
                            </td>
                            <td className="small text-secondary">
                              {new Date(item.submittedAt).toLocaleDateString()} {new Date(item.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="text-end">
                              <button
                                className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                                onClick={() => setSelectedResult(item)}
                              >
                                <Eye size={14} />
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteConfirmId && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-white border-danger shadow-lg">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-danger fw-bold">Confirm Delete Assessment</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setDeleteConfirmId(null)} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to delete this assessment? Historical attempt logs will be preserved.</p>
                </div>
                <div className="modal-footer border-secondary">
                  <button className="btn btn-outline-light" onClick={() => setDeleteConfirmId(null)} disabled={actionLoading}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteAssessment(deleteConfirmId)} disabled={actionLoading}>
                    {actionLoading ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create / Edit Assessment Modal */}
        {showAssessmentModal && (
          <AssessmentFormModal
            assessment={selectedAssessment}
            onClose={() => setShowAssessmentModal(false)}
            onSaved={() => {
              setShowAssessmentModal(false);
              fetchAssessments();
            }}
          />
        )}

        {/* View Employee Result Details Modal */}
        {selectedResult && (
          <ResultDetailsModal attempt={selectedResult} onClose={() => setSelectedResult(null)} />
        )}
      </div>
    </AdminLayout>
  );
}
