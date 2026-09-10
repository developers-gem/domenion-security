import { CheckCircle2, XCircle, User, Calendar, Award } from "lucide-react";

export default function ResultDetailsModal({ attempt, onClose }) {
  if (!attempt) return null;

  const isPass = attempt.result === "PASS";

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-dark text-white border-secondary shadow-lg">
          {/* Header */}
          <div className="modal-header border-secondary">
            <div className="d-flex align-items-center gap-2">
              <Award className={isPass ? "text-success" : "text-danger"} size={24} />
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">Assessment Result Details</h5>
                <span className="text-secondary small">{attempt.assessmentTitle}</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close" />
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* Overview Banner */}
            <div className="card bg-secondary bg-opacity-10 border-secondary mb-4">
              <div className="card-body p-3">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <User size={16} className="text-danger" />
                      <span className="fw-bold text-white fs-6">
                        {attempt.user?.name || "Employee"} ({attempt.user?.email || "N/A"})
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2 text-secondary small">
                      <Calendar size={14} />
                      <span>Submitted: {new Date(attempt.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="col-md-6 text-md-end">
                    <div className="d-flex justify-content-md-end align-items-center gap-3">
                      <div>
                        <div className="fs-4 fw-bold text-white">
                          {attempt.score} / {attempt.totalQuestions}
                        </div>
                        <div className="text-secondary fs-8">
                          Passing threshold: {attempt.passingScore} correct ({attempt.percentage}%)
                        </div>
                      </div>
                      <span
                        className={`badge ${
                          isPass
                            ? "bg-success bg-opacity-20 text-success border border-success border-opacity-30 fs-5 px-3 py-2"
                            : "bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30 fs-5 px-3 py-2"
                        } text-uppercase fw-bold`}
                      >
                        {attempt.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Snapshot Breakdown */}
            <h6 className="fw-bold text-white mb-3">Question Snapshot & Answer Analysis</h6>

            <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: "400px" }}>
              {(attempt.answers || []).map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded border ${
                    ans.isCorrect
                      ? "border-success border-opacity-30 bg-success bg-opacity-10"
                      : "border-danger border-opacity-30 bg-danger bg-opacity-10"
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <div className="fw-bold text-white small">
                      <span className="text-danger me-1">{idx + 1}.</span>
                      {ans.question}
                    </div>
                    <span
                      className={`badge ${
                        ans.isCorrect ? "bg-success" : "bg-danger"
                      } d-flex align-items-center gap-1 flex-shrink-0`}
                    >
                      {ans.isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {ans.isCorrect ? "Correct (+1)" : "Incorrect (0)"}
                    </span>
                  </div>

                  <div className="row g-2 pt-2 border-top border-secondary border-opacity-30">
                    <div className="col-md-6">
                      <span className="text-secondary fs-8 uppercase fw-bold d-block">Employee Selected Answer:</span>
                      <span className={`fw-bold small ${ans.isCorrect ? "text-success" : "text-danger"}`}>
                        {ans.selectedAnswer || "None"}
                      </span>
                    </div>

                    <div className="col-md-6">
                      <span className="text-secondary fs-8 uppercase fw-bold d-block">Correct Answer:</span>
                      <span className="fw-bold small text-success">{ans.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer border-secondary">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
