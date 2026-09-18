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
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  globalQuestionsAPI,
  assessmentsAPI,
} from "../../../../services/api";

export default function AssessmentFormModal({
  assessment,
  onClose,
  onSaved,
}) {
  const [title, setTitle] = useState(assessment?.title || "");
  const [description, setDescription] = useState(
    assessment?.description || ""
  
  );

  const [passingScore, setPassingScore] = useState(
    assessment?.passingScore || 8
  );

  const [attemptsAllowed, setAttemptsAllowed] = useState(
    assessment?.attemptsAllowed || 1
  );

  const [isActive, setIsActive] = useState(
    assessment ? Boolean(assessment.isActive) : true
  );

  const [availableQuestions, setAvailableQuestions] = useState([]);

  const [selectedQuestionIds, setSelectedQuestionIds] = useState(
    assessment?.questions
      ? assessment.questions.map((q) =>
          typeof q === "object" ? q._id : q
        )
      : []
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);

        const res =
          await globalQuestionsAPI.getAdminGlobalQuestions();

        const data = res?.data || res || [];

        const quizEligible = data.filter(
          (q) =>
            q.isQuizQuestion &&
            q.correctAnswer &&
            q.correctAnswer.trim()
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
      setSelectedQuestionIds(
        selectedQuestionIds.filter((id) => id !== qId)
      );
    } else {
      setSelectedQuestionIds([
        ...selectedQuestionIds,
        qId,
      ]);
    }
  };

  const handleMoveQuestion = (index, direction) => {
    const newOrder = [...selectedQuestionIds];

    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= newOrder.length
    ) {
      return;
    }

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
      setError(
        "Please select at least one question for the assessment."
      );
      return;
    }

    const pScore = Number(passingScore);

    if (!pScore || pScore < 1) {
      setError("Passing score must be at least 1.");
      return;
    }

    if (pScore > selectedQuestionIds.length) {
      setError(
        `Passing score (${pScore}) cannot be greater than selected questions (${selectedQuestionIds.length}).`
      );
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      questions: selectedQuestionIds,
      passingScore: pScore,
      attemptsAllowed:
        Number(attemptsAllowed) > 0
          ? Number(attemptsAllowed)
          : 1,
      isActive,
    };

    try {
      setSaving(true);

      if (assessment?._id) {
        await assessmentsAPI.updateAssessment(
          assessment._id,
          payload
        );
      } else {
        await assessmentsAPI.createAssessment(payload);
      }

      onSaved();
    } catch (err) {
      setError(
        err.message || "Failed to save assessment."
      );
    } finally {
      setSaving(false);
    }
  };

  const questionMap = new Map(
    availableQuestions.map((q) => [q._id, q])
  );

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-3 sm:p-4 md:p-6
        bg-slate-950/50
        backdrop-blur-sm
        overflow-y-auto
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* =========================================================
          MODAL
      ========================================================== */}
      <div
        className="
          relative w-full max-w-5xl my-auto
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex flex-col
          text-gray-900
          max-h-[92vh]
        "
      >
        {/* =========================================================
            HEADER
        ========================================================== */}
        <div
          className="
            px-5 sm:px-6 py-4
            border-b border-gray-200
            bg-white
            flex items-center justify-between
            flex-shrink-0
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-domenion-gold/10
                border border-domenion-gold/30
                flex items-center justify-center
                text-domenion-gold
                flex-shrink-0
              "
            >
              <Award size={20} />
            </div>

            <div className="min-w-0">
              <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 leading-tight truncate">
                {assessment
                  ? "Edit Assessment"
                  : "Create New Assessment"}
              </h3>

              <p className="text-xs text-domenion-gold font-medium tracking-wide truncate">
                Configure evaluation thresholds and question sequence
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9 h-9
              rounded-lg
              border border-gray-200
              bg-gray-50
              text-gray-400
              flex items-center justify-center
              hover:bg-gray-100
              hover:text-gray-800
              transition
              flex-shrink-0
            "
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* =========================================================
            FORM
        ========================================================== */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          {/* =======================================================
              BODY
          ======================================================== */}
          <div
            className="
              p-5 sm:p-6
              overflow-y-auto
              space-y-5
              scrollbar-thin
              scrollbar-thumb-gray-200
            "
          >
            {/* ERROR */}
            {error && (
              <div
                className="
                  p-3.5
                  rounded-xl
                  bg-rose-50
                  border border-rose-200
                  text-rose-700
                  text-xs
                  flex items-center gap-2
                "
              >
                <AlertCircle
                  size={16}
                  className="flex-shrink-0"
                />

                <span className="font-semibold">
                  {error}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* =================================================
                  LEFT COLUMN
              ================================================== */}
              <div className="lg:col-span-5 space-y-4">
                <div
                  className="
                    p-4
                    rounded-xl
                    bg-gray-50
                    border border-gray-200
                    space-y-4
                  "
                >
                  {/* SECTION HEADER */}
                  <div
                    className="
                      flex items-center justify-between
                      pb-3
                      border-b border-gray-200
                    "
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-domenion-gold">
                      Basic Parameters
                    </span>

                    <span className="text-[10px] text-gray-400 font-medium">
                      Step 1 of 2
                    </span>
                  </div>

                  {/* TITLE */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Assessment Title{" "}
                      <span className="text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      className="
                        w-full
                        px-3 py-2.5
                        bg-white
                        border border-gray-300
                        rounded-lg
                        text-xs sm:text-sm
                        text-gray-900
                        placeholder-gray-400
                        focus:outline-none
                        focus:border-domenion-gold
                        focus:ring-2
                        focus:ring-domenion-gold/20
                        transition
                      "
                      placeholder="e.g. Security Officer Safety & Compliance"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Description
                    </label>

                    <textarea
                      rows={3}
                      className="
                        w-full
                        px-3 py-2.5
                        bg-white
                        border border-gray-300
                        rounded-lg
                        text-xs sm:text-sm
                        text-gray-900
                        placeholder-gray-400
                        focus:outline-none
                        focus:border-domenion-gold
                        focus:ring-2
                        focus:ring-domenion-gold/20
                        transition
                        resize-none
                      "
                      placeholder="Brief overview of the material covered..."
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                    />
                  </div>

                  {/* SCORES */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Passing Score{" "}
                        <span className="text-rose-500">
                          *
                        </span>
                      </label>

                      <input
                        type="number"
                        min={1}
                        max={
                          selectedQuestionIds.length ||
                          100
                        }
                        className="
                          w-full
                          px-3 py-2.5
                          bg-white
                          border border-gray-300
                          rounded-lg
                          text-xs
                          text-gray-900
                          focus:outline-none
                          focus:border-domenion-gold
                          focus:ring-2
                          focus:ring-domenion-gold/20
                          font-medium
                        "
                        value={passingScore}
                        onChange={(e) =>
                          setPassingScore(e.target.value)
                        }
                      />

                      <span className="text-[10px] text-gray-400 block mt-1">
                        Correct answers needed
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Attempts Allowed
                      </label>

                      <input
                        type="number"
                        min={1}
                        className="
                          w-full
                          px-3 py-2.5
                          bg-white
                          border border-gray-300
                          rounded-lg
                          text-xs
                          text-gray-900
                          focus:outline-none
                          focus:border-domenion-gold
                          focus:ring-2
                          focus:ring-domenion-gold/20
                          font-medium
                        "
                        value={attemptsAllowed}
                        onChange={(e) =>
                          setAttemptsAllowed(
                            e.target.value
                          )
                        }
                      />

                      <span className="text-[10px] text-gray-400 block mt-1">
                        Per candidate
                      </span>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Publication Status
                    </label>

                    <select
                      className="
                        w-full
                        px-3 py-2.5
                        bg-white
                        border border-gray-300
                        rounded-lg
                        text-xs
                        text-gray-900
                        focus:outline-none
                        focus:border-domenion-gold
                        focus:ring-2
                        focus:ring-domenion-gold/20
                        cursor-pointer
                      "
                      value={
                        isActive
                          ? "active"
                          : "inactive"
                      }
                      onChange={(e) =>
                        setIsActive(
                          e.target.value === "active"
                        )
                      }
                    >
                      <option value="active">
                        Active (Visible for Evaluation)
                      </option>

                      <option value="inactive">
                        Inactive (Hidden Draft)
                      </option>
                    </select>
                  </div>

                  {/* SUMMARY */}
                  <div
                    className="
                      p-3
                      rounded-lg
                      bg-white
                      border border-gray-200
                      space-y-2
                      text-xs
                    "
                  >
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Selected Questions:</span>

                      <span
                        className="
                          px-2 py-0.5
                          rounded
                          bg-domenion-gold/10
                          border border-domenion-gold/30
                          text-domenion-gold
                          font-bold
                        "
                      >
                        {selectedQuestionIds.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>Configured Threshold:</span>

                      <span
                        className="
                          px-2 py-0.5
                          rounded
                          bg-emerald-50
                          border border-emerald-200
                          text-emerald-700
                          font-semibold
                        "
                      >
                        {passingScore} /{" "}
                        {selectedQuestionIds.length} (
                        {selectedQuestionIds.length
                          ? Math.round(
                              (passingScore /
                                selectedQuestionIds.length) *
                                100
                            )
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}
              <div className="lg:col-span-7 space-y-4">
                <div
                  className="
                    p-4
                    rounded-xl
                    bg-gray-50
                    border border-gray-200
                    flex flex-col
                    h-full
                  "
                >
                  {/* QUESTION HEADER */}
                  <div
                    className="
                      flex items-center justify-between
                      pb-3
                      border-b border-gray-200
                      gap-3
                    "
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ListOrdered
                        size={16}
                        className="text-domenion-gold flex-shrink-0"
                      />

                      <span className="text-xs font-bold uppercase tracking-wider text-domenion-gold truncate">
                        Select &amp; Order Quiz Questions
                      </span>
                    </div>

                    <span
                      className="
                        text-[10px]
                        px-2 py-0.5
                        rounded
                        bg-white
                        border border-gray-200
                        text-gray-500
                        whitespace-nowrap
                      "
                    >
                      {availableQuestions.length} Available
                    </span>
                  </div>

                  {/* QUESTION CONTENT */}
                  <div
                    className="
                      mt-3
                      overflow-y-auto
                      max-h-[460px]
                      space-y-4
                      pr-1
                      scrollbar-thin
                      scrollbar-thumb-gray-200
                    "
                  >
                    {loading ? (
                      <div className="py-16 flex flex-col items-center justify-center text-gray-400">
                        <Loader2
                          size={30}
                          className="animate-spin text-domenion-gold mb-2"
                        />

                        <span className="text-xs">
                          Loading Question Bank...
                        </span>
                      </div>
                    ) : availableQuestions.length ===
                      0 ? (
                      <div className="py-12 text-center text-gray-400 text-xs space-y-2">
                        <HelpCircle
                          size={36}
                          className="mx-auto text-gray-300"
                        />

                        <p className="font-semibold text-gray-700">
                          No eligible quiz questions found.
                        </p>

                        <p className="text-[11px] text-gray-500 max-w-sm mx-auto leading-relaxed">
                          Create questions in the Question
                          Bank tab and enable
                          &quot;Use in Employee Quiz&quot;
                          with a designated correct answer.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* =================================================
                            SELECTED QUESTIONS
                        ================================================== */}
                        {selectedQuestionIds.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] uppercase font-bold text-domenion-gold tracking-wider block">
                              Active Assessment Sequence (
                              {selectedQuestionIds.length}
                              ):
                            </span>

                            <div className="space-y-1.5">
                              {selectedQuestionIds.map(
                                (qId, idx) => {
                                  const qObj =
                                    questionMap.get(qId);

                                  return (
                                    <div
                                      key={qId}
                                      className="
                                        p-2.5
                                        rounded-lg
                                        bg-white
                                        border border-domenion-gold/40
                                        flex items-center
                                        justify-between
                                        gap-3
                                        text-xs
                                      "
                                    >
                                      <div className="flex items-center gap-2 overflow-hidden min-w-0">
                                        <span
                                          className="
                                            w-5 h-5
                                            rounded
                                            flex items-center justify-center
                                            bg-domenion-gold/10
                                            border border-domenion-gold/20
                                            text-domenion-gold
                                            font-bold
                                            text-[11px]
                                            flex-shrink-0
                                          "
                                        >
                                          {idx + 1}
                                        </span>

                                        <span className="text-gray-700 truncate font-medium">
                                          {qObj
                                            ? qObj.question
                                            : qId}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {/* MOVE UP */}
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleMoveQuestion(
                                              idx,
                                              "up"
                                            )
                                          }
                                          disabled={idx === 0}
                                          className="
                                            p-1.5
                                            rounded
                                            bg-gray-100
                                            hover:bg-gray-200
                                            text-gray-500
                                            hover:text-gray-900
                                            disabled:opacity-20
                                            transition-colors
                                          "
                                          title="Move up"
                                        >
                                          <ArrowUp size={12} />
                                        </button>

                                        {/* MOVE DOWN */}
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleMoveQuestion(
                                              idx,
                                              "down"
                                            )
                                          }
                                          disabled={
                                            idx ===
                                            selectedQuestionIds.length -
                                              1
                                          }
                                          className="
                                            p-1.5
                                            rounded
                                            bg-gray-100
                                            hover:bg-gray-200
                                            text-gray-500
                                            hover:text-gray-900
                                            disabled:opacity-20
                                            transition-colors
                                          "
                                          title="Move down"
                                        >
                                          <ArrowDown size={12} />
                                        </button>

                                        {/* REMOVE */}
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleToggleQuestion(
                                              qId
                                            )
                                          }
                                          className="
                                            p-1.5
                                            rounded
                                            bg-rose-50
                                            hover:bg-rose-100
                                            text-rose-500
                                            transition-colors
                                            ml-1
                                          "
                                          title="Remove question"
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}

                        {/* =================================================
                            QUESTION BANK
                        ================================================== */}
                        <div className="space-y-2 pt-2 border-t border-gray-200">
                          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
                            Eligible Question Bank Pool
                            (Click to add/remove):
                          </span>

                          <div className="space-y-2">
                            {availableQuestions.map((q) => {
                              const isSelected =
                                selectedQuestionIds.includes(
                                  q._id
                                );

                              return (
                                <div
                                  key={q._id}
                                  onClick={() =>
                                    handleToggleQuestion(
                                      q._id
                                    )
                                  }
                                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                                    isSelected
                                      ? "bg-domenion-gold/10 border-domenion-gold/50 text-gray-900"
                                      : "bg-white border-gray-200 text-gray-700 hover:border-domenion-gold/30 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => {}}
                                      className="
                                        mt-0.5
                                        w-4 h-4
                                        rounded
                                        border-gray-300
                                        text-domenion-gold
                                        focus:ring-0
                                        cursor-pointer
                                        bg-white
                                      "
                                    />

                                    <div className="flex-1 space-y-1.5 min-w-0">
                                      <p className="font-medium leading-snug text-gray-800">
                                        {q.question}
                                      </p>

                                      <div className="flex flex-wrap gap-1">
                                        {(q.options || []).map(
                                          (opt, optIdx) => {
                                            const isCorrect =
                                              opt ===
                                              q.correctAnswer;

                                            return (
                                              <span
                                                key={optIdx}
                                                className={`px-1.5 py-0.5 rounded text-[10px] ${
                                                  isCorrect
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                                                    : "bg-gray-100 text-gray-500 border border-gray-200"
                                                }`}
                                              >
                                                {opt}{" "}
                                                {isCorrect
                                                  ? "✓"
                                                  : ""}
                                              </span>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>

                                    {isSelected && (
                                      <CheckCircle2
                                        size={16}
                                        className="text-domenion-gold flex-shrink-0"
                                      />
                                    )}
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

          {/* =========================================================
              FOOTER
          ========================================================== */}
          <div
            className="
              px-5 sm:px-6 py-4
              border-t border-gray-200
              bg-white
              flex flex-col-reverse
              sm:flex-row
              items-stretch
              sm:items-center
              justify-end
              gap-3
              flex-shrink-0
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                h-10
                px-4
                rounded-xl
                border border-gray-200
                bg-white
                text-gray-700
                text-sm
                font-semibold
                hover:bg-gray-100
                hover:text-gray-900
                transition-colors
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                h-10
                px-5
                rounded-xl
                bg-domenion-gold
                border border-domenion-gold
                text-white
                text-sm
                font-semibold
                shadow-sm
                hover:bg-domenion-gold/90
                transition-colors
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {saving ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  <span>Saving Assessment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  <span>
                    {assessment
                      ? "Update Assessment"
                      : "Create Assessment"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
