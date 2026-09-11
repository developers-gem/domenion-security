import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Award, CheckCircle2, XCircle, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { assessmentsAPI } from "../../services/api";

export default function EmployeeQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: answerString }

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [quizResult, setQuizResult] = useState(null); // Result payload after submission

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await assessmentsAPI.getEmployeeAssessmentForTaking(id);
        const data = res?.data || res;
        setAssessment(data);
      } catch (err) {
        setError(err.message || "Failed to load assessment questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSelectOption = (questionId, optionValue) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    setError("");

    if (!assessment || !assessment.questions) return;

    // Verify all questions have been answered
    const unanswered = assessment.questions.filter((q) => !selectedAnswers[q._id] || !selectedAnswers[q._id].trim());
    if (unanswered.length > 0) {
      setError(`Please answer all questions before submitting. Unanswered questions remaining: ${unanswered.length}`);
      return;
    }

    const payloadAnswers = Object.entries(selectedAnswers).map(([qId, ans]) => ({
      questionId: qId,
      answer: ans,
    }));

    try {
      setSubmitting(true);
      const res = await assessmentsAPI.submitAssessment(id, payloadAnswers);
      const resultData = res?.data || res;
      setQuizResult(resultData);
    } catch (err) {
      setError(err.message || "Failed to submit assessment answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <Loader2 size={44} className="text-danger animate-spin mb-3 mx-auto" />
          <p className="lead">Loading quiz assessment...</p>
        </div>
      </div>
    );
  }

  // --- IMMEDIATE RESULT DISPLAY SCREEN ---
  if (quizResult) {
    const isPass = quizResult.result === "PASS";

    return (
      <div className="bg-dark text-white min-vh-100 py-5 d-flex align-items-center">
        <div className="container py-4" style={{ maxWidth: "650px" }}>
          <div
            className={`card bg-secondary bg-opacity-10 border-${
              isPass ? "success" : "danger"
            } border-2 shadow-lg text-center p-4 p-md-5`}
          >
            <div className="mb-3">
              {isPass ? (
                <div className="bg-success bg-opacity-20 text-success p-3 rounded-circle d-inline-block border border-success border-opacity-30">
                  <CheckCircle2 size={64} />
                </div>
              ) : (
                <div className="bg-danger bg-opacity-20 text-danger p-3 rounded-circle d-inline-block border border-danger border-opacity-30">
                  <XCircle size={64} />
                </div>
              )}
            </div>

            <span className="text-secondary uppercase fw-bold fs-7 tracking-wider mb-1">Assessment Complete</span>
            <h2 className="fw-bold text-white mb-3">{quizResult.assessmentTitle}</h2>

            <div className="py-3 px-4 bg-dark rounded border border-secondary border-opacity-30 mb-4 d-inline-block mx-auto">
              <span className="text-secondary small fw-bold uppercase d-block mb-1">Your Score</span>
              <div className={`fs-1 fw-bold ${isPass ? "text-success" : "text-danger"}`}>
                {quizResult.score} / {quizResult.totalQuestions}
              </div>
              <span className="badge bg-secondary bg-opacity-40 text-light mt-1 fs-7">
                Percentage: {quizResult.percentage}%
              </span>
            </div>

            <div className="mb-4">
              <span
                className={`badge ${
                  isPass ? "bg-success text-white" : "bg-danger text-white"
                } fs-4 px-4 py-2 text-uppercase fw-bold tracking-wider rounded-pill`}
              >
                {quizResult.result}
              </span>
            </div>

            <p className="lead text-light mb-4">
              {isPass
                ? "You achieved the required passing score. Great job!"
                : `Passing Score: ${quizResult.passingScore} / ${quizResult.totalQuestions}. Please review the training material and try again if another attempt is allowed.`}
            </p>

            <div className="d-flex justify-content-center gap-3">
              <Link to="/employee/assessments" className="btn btn-danger btn-lg fw-bold px-4">
                Back to My Assessments
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE QUIZ TAKING PAGE ---
  if (!assessment) {
    return (
      <div className="bg-dark text-white min-vh-100 py-5">
        <div className="container py-4 text-center" style={{ maxWidth: "600px" }}>
          <AlertCircle size={48} className="text-danger mb-3 mx-auto" />
          <h3 className="fw-bold text-white mb-2">Assessment Unavailable</h3>
          <p className="text-secondary mb-4">{error || "The requested assessment could not be loaded."}</p>
          <Link to="/employee/assessments" className="btn btn-outline-light">
            Back to Assessments
          </Link>
        </div>
      </div>
    );
  }

  const totalQ = assessment.questions?.length || 0;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container py-3" style={{ maxWidth: "800px" }}>
        {/* Header navigation bar */}
        <div className="mb-4">
          <Link to="/employee/assessments" className="text-secondary text-decoration-none d-inline-flex align-items-center gap-1 small mb-3 hover-text-white">
            <ArrowLeft size={16} />
            Back to Assessments
          </Link>

          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <h2 className="fw-bold text-white mb-1">{assessment.title}</h2>
              {assessment.description && <p className="text-secondary small mb-0">{assessment.description}</p>}
            </div>

            <div className="badge bg-secondary bg-opacity-20 text-light border border-secondary px-3 py-2 fs-7">
              Passing threshold: {assessment.passingScore} / {totalQ} Correct
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
            <AlertCircle size={18} className="me-2" />
            <div>{error}</div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="card bg-secondary bg-opacity-10 border-secondary mb-4">
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-center small text-secondary mb-2">
              <span>Progress: {answeredCount} of {totalQ} Answered</span>
              <span>{Math.round((answeredCount / totalQ) * 100)}% Completed</span>
            </div>
            <div className="progress bg-dark" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${(answeredCount / totalQ) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Form */}
        <form onSubmit={handleSubmitQuiz}>
          <div className="d-flex flex-column gap-4 mb-4">
            {(assessment.questions || []).map((q, idx) => {
              const selectedValue = selectedAnswers[q._id];

              return (
                <div
                  key={q._id}
                  className={`card bg-secondary bg-opacity-10 border-${
                    selectedValue ? "danger border-opacity-50" : "secondary"
                  } shadow-sm`}
                >
                  <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center py-3">
                    <span className="fw-bold text-white fs-6">
                      Question {idx + 1} of {totalQ}
                    </span>
                    <span className="badge bg-secondary fs-8">1 Point</span>
                  </div>

                  <div className="card-body p-4">
                    <h5 className="fw-bold text-white mb-4">{q.question}</h5>

                    {/* Radio Options */}
                    <div className="d-flex flex-column gap-3">
                      {(q.options || []).map((opt, optIdx) => {
                        const isChecked = selectedValue === opt;
                        const optionId = `q_${q._id}_opt_${optIdx}`;

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded border cursor-pointer transition-all ${
                              isChecked
                                ? "bg-danger bg-opacity-20 border-danger text-white"
                                : "bg-dark border-secondary text-light hover-border-light"
                            }`}
                            onClick={() => handleSelectOption(q._id, opt)}
                          >
                            <div className="form-check d-flex align-items-center gap-2 mb-0 cursor-pointer">
                              <input
                                className="form-check-input mt-0 border-secondary cursor-pointer"
                                type="radio"
                                name={`q_${q._id}`}
                                id={optionId}
                                value={opt}
                                checked={isChecked}
                                onChange={() => handleSelectOption(q._id, opt)}
                              />
                              <label className="form-check-label text-white fw-medium cursor-pointer flex-grow-1" htmlFor={optionId}>
                                {opt}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="card bg-secondary bg-opacity-10 border-secondary p-3">
            <button
              type="submit"
              className="btn btn-danger btn-lg w-100 fw-bold py-3 text-uppercase tracking-wider"
              disabled={submitting}
            >
              {submitting ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <Loader2 size={22} className="animate-spin" />
                  Submitting & Scoring Assessment...
                </span>
              ) : (
                "Submit Quiz"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
