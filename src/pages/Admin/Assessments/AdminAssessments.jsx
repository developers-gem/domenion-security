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
  X,
} from "lucide-react";
import { assessmentsAPI, globalQuestionsAPI } from "../../../services/api";

export default function AdminAssessments() {
  const [activeTab, setActiveTab] = useState("assessments");
  const [assessments, setAssessments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [selectedResult, setSelectedResult] = useState(null);

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
      setSuccess(
        `Assessment status changed to '${!ass.isActive ? "Active" : "Inactive"}'.`,
      );
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
    setQuestionOptions(
      Array.isArray(q.options) && q.options.length >= 2
        ? [...q.options]
        : ["", ""],
    );
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
        await globalQuestionsAPI.updateGlobalQuestion(
          editingQuestionId,
          payload,
        );
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
      setSuccess(
        `Question status changed to '${!q.isActive ? "Active" : "Disabled"}'.`,
      );
      fetchQuestions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to toggle question status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this question from the Question Bank?",
      )
    )
      return;
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

  const filteredAssessments = assessments.filter((a) =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredQuestions = questions.filter(
    (q) =>
      q.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.options || []).some((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const filteredResults = results.filter(
    (r) =>
      r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.assessmentTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-domenion-gold/15 border border-domenion-gold/40 text-domenion-gold font-mono text-[11px] font-bold uppercase tracking-wider">
                Employee Portal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-domenion-blue/5 border border-domenion-blue/15 flex items-center justify-center text-domenion-blue">
                <Award size={18} />
              </div>
              Employee Quiz &amp; Assessments Management
            </h1>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateAssessment}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-domenion-blue hover:bg-domenion-blue/90 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={16} className="text-domenion-gold" />
            <span>Create Assessment</span>
          </button>
        </div>

        {/* Global Notifications */}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 shadow-sm">
            <CheckCircle2
              size={16}
              className="text-emerald-600 flex-shrink-0"
            />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 shadow-sm">
            <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Navigation Tabs Bar & Search */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab("assessments")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "assessments"
                  ? "bg-domenion-blue text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FileCheck
                size={16}
                className={
                  activeTab === "assessments"
                    ? "text-domenion-gold"
                    : "text-slate-400"
                }
              />
              <span>Assessments ({assessments.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("questions")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "questions"
                  ? "bg-domenion-blue text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HelpCircle
                size={16}
                className={
                  activeTab === "questions"
                    ? "text-domenion-gold"
                    : "text-slate-400"
                }
              />
              <span>
                Question Bank (
                {questions.filter((q) => q.isQuizQuestion).length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("results")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "results"
                  ? "bg-domenion-blue text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Award
                size={16}
                className={
                  activeTab === "results"
                    ? "text-domenion-gold"
                    : "text-slate-400"
                }
              />
              <span>Employee Results ({results.length})</span>
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TAB 1: ASSESSMENTS */}
        {activeTab === "assessments" && (
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                <Loader2
                  size={32}
                  className="animate-spin text-domenion-gold mb-3"
                />
                <p className="text-xs font-medium text-slate-500">
                  Loading assessments...
                </p>
              </div>
            ) : filteredAssessments.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs space-y-3">
                <FileCheck size={36} className="mx-auto text-slate-300" />
                <p className="font-medium text-slate-700">
                  No assessments configured.
                </p>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Create your first employee training assessment to begin
                  tracking qualifications.
                </p>
                <button
                  type="button"
                  onClick={handleOpenCreateAssessment}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-domenion-blue text-white text-xs font-semibold shadow-xs"
                >
                  <Plus size={14} />
                  <span>Create Assessment</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200/70">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">
                        Assessment Title
                      </th>
                      <th className="py-3.5 px-4 font-semibold">Questions</th>
                      <th className="py-3.5 px-4 font-semibold">
                        Passing Threshold
                      </th>
                      <th className="py-3.5 px-4 font-semibold">Attempts</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAssessments.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-heading font-semibold text-sm text-slate-900">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-slate-400 text-[11px] truncate max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                            {item.questions ? item.questions.length : 0} Items
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono font-semibold">
                            {item.passingScore} /{" "}
                            {item.questions ? item.questions.length : 0} Correct
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                            {item.attemptsAllowed || 1} Attempt(s)
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                              item.isActive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}
                          >
                            {item.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditAssessment(item)}
                              disabled={actionLoading}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition-colors"
                              title="Edit Assessment"
                            >
                              <Edit size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleAssessmentStatus(item)}
                              disabled={actionLoading}
                              className={`p-1.5 rounded-lg border shadow-xs transition-colors ${
                                item.isActive
                                  ? "border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-700"
                                  : "border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-700"
                              }`}
                              title={
                                item.isActive
                                  ? "Deactivate Assessment"
                                  : "Activate Assessment"
                              }
                            >
                              {item.isActive ? (
                                <Lock size={13} />
                              ) : (
                                <Unlock size={13} />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(item._id)}
                              disabled={actionLoading}
                              className="p-1.5 rounded-lg border border-rose-200/80 bg-rose-50/60 hover:bg-rose-500 hover:text-white text-rose-600 shadow-xs transition-colors"
                              title="Delete Assessment"
                            >
                              <Trash2 size={13} />
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
        )}

        {/* TAB 2: QUESTION BANK */}
        {activeTab === "questions" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Questions List */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-heading font-bold text-sm text-slate-800">
                  Quiz Question Bank (
                  {filteredQuestions.filter((q) => q.isQuizQuestion).length})
                </h2>
                <button
                  type="button"
                  onClick={resetQuestionForm}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  + New Question
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[620px] space-y-3">
                {loading ? (
                  <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                    <Loader2
                      size={30}
                      className="animate-spin text-domenion-gold mb-2"
                    />
                    <span className="text-xs">Loading questions...</span>
                  </div>
                ) : filteredQuestions.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No questions found matching your search.
                  </div>
                ) : (
                  filteredQuestions.map((q, idx) => (
                    <div
                      key={q._id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        editingQuestionId === q._id
                          ? "border-domenion-gold/60 bg-domenion-gold/5 shadow-xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-xs font-semibold text-slate-900 leading-snug">
                          <span className="text-domenion-gold font-mono font-bold mr-1.5">
                            {idx + 1}.
                          </span>
                          {q.question}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              q.isQuizQuestion
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {q.isQuizQuestion
                              ? "Quiz Enabled"
                              : "Screening Only"}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                              q.isActive
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-400 text-white"
                            }`}
                          >
                            {q.isActive ? "Active" : "Disabled"}
                          </span>
                        </div>
                      </div>

                      {/* Options listing */}
                      <div className="pl-3 border-l-2 border-slate-200 my-2 space-y-1">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                          Answer Options:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(q.options || []).map((opt, optIdx) => {
                            const isCorrect = opt === q.correctAnswer;
                            return (
                              <span
                                key={optIdx}
                                className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                                  isCorrect
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                                    : "bg-slate-50 text-slate-600 border-slate-200"
                                }`}
                              >
                                {opt} {isCorrect ? "(Correct)" : ""}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card actions */}
                      <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleStartEditQuestion(q)}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-medium transition-colors"
                        >
                          <Edit size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleQuestionStatus(q)}
                          disabled={actionLoading}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                            q.isActive
                              ? "border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-amber-800"
                              : "border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {q.isActive ? (
                            <ToggleRight size={13} />
                          ) : (
                            <ToggleLeft size={13} />
                          )}
                          <span>{q.isActive ? "Disable" : "Enable"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q._id)}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-500 hover:text-white text-rose-600 text-[11px] font-medium transition-colors"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Add / Edit Question Form */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 self-start">
              <h2 className="font-heading font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
                {editingQuestionId
                  ? "Edit Quiz Question"
                  : "Add Quiz Question to Bank"}
              </h2>

              <form
                onSubmit={handleSaveQuestionBankItem}
                className="space-y-4 mt-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Question Text <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors"
                    placeholder="e.g. What should a security officer do when they notice an unauthorized person?"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-domenion-blue focus:ring-domenion-gold"
                      checked={isQuizQuestion}
                      onChange={(e) => setIsQuizQuestion(e.target.checked)}
                    />
                    <span className="text-xs font-bold text-slate-800">
                      Use in Employee Quiz / Assessment
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6.5">
                    When enabled, this question becomes eligible for selection
                    in assessments.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Options <span className="text-rose-500">* (Min 2)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-[11px] font-mono font-bold text-domenion-blue hover:text-domenion-gold transition-colors"
                    >
                      + Add Option
                    </button>
                  </div>

                  <div className="space-y-2">
                    {questionOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-6 text-center text-xs font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded py-1.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <input
                          type="text"
                          className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors"
                          placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(idx, e.target.value)
                          }
                        />
                        {questionOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {isQuizQuestion && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Correct Answer{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors cursor-pointer"
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:bg-white focus:border-domenion-gold transition-colors cursor-pointer"
                    value={isActive ? "active" : "inactive"}
                    onChange={(e) => setIsActive(e.target.value === "active")}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive / Disabled</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  {editingQuestionId && (
                    <button
                      type="button"
                      onClick={resetQuestionForm}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-4 py-2 rounded-lg bg-domenion-blue hover:bg-domenion-blue/90 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
                  >
                    {actionLoading
                      ? "Saving..."
                      : editingQuestionId
                        ? "Update Question"
                        : "Save Question"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: EMPLOYEE RESULTS */}
        {activeTab === "results" && (
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                <Loader2
                  size={32}
                  className="animate-spin text-domenion-gold mb-3"
                />
                <p className="text-xs font-medium text-slate-500">
                  Loading employee results...
                </p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs">
                No employee assessment attempts recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[11px] border-b border-slate-200/70">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Employee</th>
                      <th className="py-3.5 px-4 font-semibold">Assessment</th>
                      <th className="py-3.5 px-4 font-semibold">Score</th>
                      <th className="py-3.5 px-4 font-semibold">Result</th>
                      <th className="py-3.5 px-4 font-semibold">
                        Submitted Date
                      </th>
                      <th className="py-3.5 px-4 font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredResults.map((item) => {
                      const isPass = item.result === "PASS";
                      return (
                        <tr
                          key={item._id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-heading font-semibold text-sm text-slate-900">
                              {item.user?.name || "Employee"}
                            </div>
                            <div className="text-slate-400 font-mono text-[11px]">
                              {item.user?.email || "N/A"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-800">
                            {item.assessmentTitle}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-slate-900 text-xs">
                              {item.score} / {item.totalQuestions}
                            </span>
                            <span className="text-slate-400 text-[11px] ml-1">
                              ({item.percentage}%)
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                                isPass
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-rose-50 text-rose-700 border-rose-200"
                              }`}
                            >
                              {item.result}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500">
                            {new Date(item.submittedAt).toLocaleDateString()}{" "}
                            {new Date(item.submittedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedResult(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-xs transition-colors"
                            >
                              <Eye size={13} />
                              <span>View Details</span>
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
        )}

        {/* Tailwind Delete Assessment Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-rose-600 font-heading font-bold text-base">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <Trash2 size={18} />
                  </div>
                  <h3>Confirm Delete Assessment</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to delete this assessment? Historical
                candidate and employee attempt logs will be preserved.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAssessment(deleteConfirmId)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Deleting..." : "Permanently Delete"}
                </button>
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
          <ResultDetailsModal
            attempt={selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
