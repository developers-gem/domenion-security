import { useState, useEffect } from "react";
import {
  X,
  Trash2,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  Loader2,
  Award,
  ListOrdered,
} from "lucide-react";
import { globalQuestionsAPI, assessmentsAPI } from "../../../../services/api";

export default function AssessmentFormModal({ assessment, onClose, onSaved }) {
  const [title, setTitle] = useState(assessment?.title || "");
  const [description, setDescription] = useState(assessment?.description || "");
  const [passingScore, setPassingScore] = useState(
    assessment?.passingScore || 8,
  );
  const [attemptsAllowed, setAttemptsAllowed] = useState(
    assessment?.attemptsAllowed || 1,
  );
  const [isActive, setIsActive] = useState(
    assessment ? Boolean(assessment.isActive) : true,
  );

  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState(
    assessment?.questions
      ? assessment.questions.map((q) => (typeof q === "object" ? q._id : q))
      : [],
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
        const quizEligible = data.filter(
          (q) => q.isQuizQuestion && q.correctAnswer && q.correctAnswer.trim(),
        );
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
      setError(
        `Passing score (${pScore}) cannot be greater than selected questions (${selectedQuestionIds.length}).`,
      );
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      questions: selectedQuestionIds,
      passingScore: pScore,
      attemptsAllowed:
        Number(attemptsAllowed) > 0 ? Number(attemptsAllowed) : 1,
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

  const questionMap = new Map(availableQuestions.map((q) => [q._id, q]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl my-auto bg-slate-900 border border-domenion-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-white/10 bg-domenion-blue/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-domenion-gold/15 border border-domenion-gold/35 flex items-center justify-center text-domenion-gold flex-shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                {assessment ? "Edit Assessment" : "Create New Assessment"}
              </h3>
              <p className="text-xs text-domenion-gold/80 font-mono tracking-wide">
                Configure evaluation thresholds and question sequence
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-white/10">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Assessment Configuration */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-domenion-gold">
                      Basic Parameters
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Step 1 of 2
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Assessment Title <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-domenion-gold transition-colors"
                      placeholder="e.g. Security Officer Safety & Compliance"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-domenion-gold transition-colors"
                      placeholder="Brief overview of the material covered..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Passing Score <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={selectedQuestionIds.length || 100}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-domenion-gold font-mono"
                        value={passingScore}
                        onChange={(e) => setPassingScore(e.target.value)}
                      />
                      <span className="text-[10px] font-mono text-slate-400 block mt-1">
                        Correct answers needed
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Attempts Allowed
                      </label>
                      <input
                        type="number"
                        min={1}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-domenion-gold font-mono"
                        value={attemptsAllowed}
                        onChange={(e) => setAttemptsAllowed(e.target.value)}
                      />
                      <span className="text-[10px] font-mono text-slate-400 block mt-1">
                        Per candidate
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Publication Status
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-domenion-gold cursor-pointer"
                      value={isActive ? "active" : "inactive"}
                      onChange={(e) => setIsActive(e.target.value === "active")}
                    >
                      <option value="active">
                        Active (Visible for Evaluation)
                      </option>
                      <option value="inactive">Inactive (Hidden Draft)</option>
                    </select>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-white/10 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Selected Questions:</span>
                      <span className="px-2 py-0.5 rounded bg-domenion-gold/20 text-domenion-gold font-bold">
                        {selectedQuestionIds.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Configured Threshold:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                        {passingScore} / {selectedQuestionIds.length} (
                        {selectedQuestionIds.length
                          ? Math.round(
                              (passingScore / selectedQuestionIds.length) * 100,
                            )
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Question Picker & Sequencer */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 flex flex-col h-full">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <ListOrdered size={16} className="text-domenion-gold" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-domenion-gold">
                        Select &amp; Order Quiz Questions
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      {availableQuestions.length} Available in Bank
                    </span>
                  </div>

                  <div className="mt-3 overflow-y-auto max-h-[460px] space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10">
                    {loading ? (
                      <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2
                          size={30}
                          className="animate-spin text-domenion-gold mb-2"
                        />
                        <span className="text-xs font-mono">
                          Loading Question Bank...
                        </span>
                      </div>
                    ) : availableQuestions.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                        <HelpCircle
                          size={36}
                          className="mx-auto text-slate-600"
                        />
                        <p className="font-semibold text-slate-300">
                          No eligible quiz questions found.
                        </p>
                        <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                          Create questions in the Question Bank tab and enable
                          &quot;Use in Employee Quiz&quot; with a designated
                          correct answer.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Selected Questions Order List */}
                        {selectedQuestionIds.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase font-bold text-domenion-gold tracking-wider block">
                              Active Assessment Sequence (
                              {selectedQuestionIds.length}):
                            </span>
                            <div className="space-y-1.5">
                              {selectedQuestionIds.map((qId, idx) => {
                                const qObj = questionMap.get(qId);
                                return (
                                  <div
                                    key={qId}
                                    className="p-2.5 rounded-lg bg-slate-950 border border-domenion-gold/40 flex items-center justify-between gap-3 text-xs"
                                  >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                      <span className="w-5 h-5 rounded flex items-center justify-center bg-domenion-gold/20 text-domenion-gold font-mono font-bold text-[11px] flex-shrink-0">
                                        {idx + 1}
                                      </span>
                                      <span className="text-slate-200 truncate font-medium">
                                        {qObj ? qObj.question : qId}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleMoveQuestion(idx, "up")
                                        }
                                        disabled={idx === 0}
                                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                                        title="Move up"
                                      >
                                        <ArrowUp size={12} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleMoveQuestion(idx, "down")
                                        }
                                        disabled={
                                          idx === selectedQuestionIds.length - 1
                                        }
                                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                                        title="Move down"
                                      >
                                        <ArrowDown size={12} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleQuestion(qId)
                                        }
                                        className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors ml-1"
                                        title="Remove question"
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

                        {/* Question Bank Pool */}
                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                            Eligible Question Bank Pool (Click to add/remove):
                          </span>

                          <div className="space-y-2">
                            {availableQuestions.map((q) => {
                              const isSelected = selectedQuestionIds.includes(
                                q._id,
                              );
                              return (
                                <div
                                  key={q._id}
                                  onClick={() => handleToggleQuestion(q._id)}
                                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                                    isSelected
                                      ? "bg-domenion-gold/10 border-domenion-gold/50 text-white"
                                      : "bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/20"
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => {}}
                                      className="mt-0.5 w-4 h-4 rounded border-white/20 text-domenion-gold focus:ring-0 cursor-pointer bg-slate-900"
                                    />
                                    <div className="flex-1 space-y-1.5">
                                      <p className="font-medium leading-snug">
                                        {q.question}
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {(q.options || []).map(
                                          (opt, optIdx) => {
                                            const isCorrect =
                                              opt === q.correctAnswer;
                                            return (
                                              <span
                                                key={optIdx}
                                                className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${
                                                  isCorrect
                                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                                                    : "bg-white/5 text-slate-400 border border-white/5"
                                                }`}
                                              >
                                                {opt} {isCorrect ? "✓" : ""}
                                              </span>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-white/10 bg-slate-900/90 flex items-center justify-end gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-domenion-gold hover:bg-domenion-gold/90 text-slate-950 text-xs font-bold shadow-md transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin text-slate-950" />
                  <span>Saving Assessment...</span>
                </>
              ) : (
                <span>
                  {assessment ? "Update Assessment" : "Create Assessment"}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
