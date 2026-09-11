import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, CheckCircle2, XCircle, Clock, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { assessmentsAPI } from "../../services/api";

export default function EmployeeAssessments() {
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [myAttempts, setMyAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const [availRes, attemptsRes] = await Promise.all([
          assessmentsAPI.getAvailableAssessments(),
          assessmentsAPI.getMyAttempts(),
        ]);

        setAvailableAssessments(availRes?.data || availRes || []);
        setMyAttempts(attemptsRes?.data || attemptsRes || []);
      } catch (err) {
        setError(err.message || "Failed to load employee assessments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        {/* Banner Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 pb-3 border-bottom border-secondary border-opacity-30">
          <div>
            <span className="badge bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30 text-uppercase mb-2">
              EMPLOYEE PORTAL
            </span>
            <h1 className="fw-bold text-white mb-1 d-flex align-items-center gap-2">
              <Award className="text-danger" size={32} />
              Employee Training Assessments
            </h1>
            <p className="text-secondary mb-0">
              Complete required security officer training modules and view your assessment scores.
            </p>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
            <AlertCircle size={18} className="me-2" />
            <div>{error}</div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Loader2 size={40} className="text-danger animate-spin mb-3 mx-auto" />
            <p className="text-secondary lead">Loading available assessments...</p>
          </div>
        ) : (
          <div className="row g-4">
            {/* Available Assessments Section */}
            <div className="col-12">
              <h4 className="fw-bold text-white mb-3">Available Assessments</h4>

              {availableAssessments.length === 0 ? (
                <div className="card bg-secondary bg-opacity-10 border-secondary text-center py-5">
                  <div className="card-body">
                    <Award size={48} className="text-secondary mb-2 mx-auto opacity-50" />
                    <h5 className="fw-bold text-light">No Active Assessments</h5>
                    <p className="text-secondary mb-0 small">
                      There are currently no active assessments assigned. Check back later!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  {availableAssessments.map((ass) => {
                    const isMaxAttempts = ass.attemptsUsed >= ass.attemptsAllowed;
                    const latest = ass.latestAttempt;

                    return (
                      <div key={ass._id} className="col-md-6">
                        <div className="card bg-secondary bg-opacity-10 border-secondary h-100 shadow-sm hover-border-danger transition-all">
                          <div className="card-body p-4 d-flex flex-column justify-content-between">
                            <div>
                              <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                <h5 className="fw-bold text-white mb-0">{ass.title}</h5>
                                {latest && (
                                  <span
                                    className={`badge ${
                                      latest.result === "PASS"
                                        ? "bg-success bg-opacity-20 text-success border border-success border-opacity-30"
                                        : "bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30"
                                    } text-uppercase fw-bold fs-8`}
                                  >
                                    {latest.result} ({latest.score}/{latest.totalQuestions || ass.totalQuestions})
                                  </span>
                                )}
                              </div>

                              {ass.description && (
                                <p className="text-secondary small mb-3">{ass.description}</p>
                              )}

                              <div className="d-flex flex-wrap gap-3 text-secondary small mb-4">
                                <div>
                                  <strong className="text-light">Questions:</strong> {ass.totalQuestions}
                                </div>
                                <div>
                                  <strong className="text-light">Passing Score:</strong> {ass.passingScore} Correct
                                </div>
                                <div>
                                  <strong className="text-light">Attempts:</strong> {ass.attemptsUsed} / {ass.attemptsAllowed} Used
                                </div>
                              </div>
                            </div>

                            <div>
                              {isMaxAttempts ? (
                                <button className="btn btn-secondary w-100 fw-bold py-2 disabled" disabled>
                                  Maximum Attempts Reached ({ass.attemptsUsed}/{ass.attemptsAllowed})
                                </button>
                              ) : (
                                <Link
                                  to={`/employee/assessments/${ass._id}`}
                                  className="btn btn-danger w-100 fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
                                >
                                  <span>{ass.attemptsUsed > 0 ? "Retake Assessment" : "Start Assessment"}</span>
                                  <ChevronRight size={18} />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Assessment History Section */}
            <div className="col-12 pt-3">
              <h4 className="fw-bold text-white mb-3">My Assessment History</h4>

              <div className="card bg-secondary bg-opacity-10 border-secondary shadow-sm">
                <div className="card-body p-0">
                  {myAttempts.length === 0 ? (
                    <div className="text-center py-4 text-secondary">
                      <p className="mb-0 small">No completed assessment attempts recorded yet.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="table-secondary bg-dark text-uppercase fs-8 border-bottom border-secondary">
                          <tr>
                            <th className="ps-4">ASSESSMENT</th>
                            <th>SCORE</th>
                            <th>PERCENTAGE</th>
                            <th>RESULT</th>
                            <th className="pe-4 text-end">SUBMITTED DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myAttempts.map((item) => {
                            const isPass = item.result === "PASS";
                            return (
                              <tr key={item._id} className="border-bottom border-secondary border-opacity-25">
                                <td className="ps-4">
                                  <div className="fw-bold text-white">{item.assessmentTitle}</div>
                                </td>
                                <td>
                                  <span className="fw-bold text-white fs-6">
                                    {item.score} / {item.totalQuestions}
                                  </span>
                                  <span className="text-secondary small ms-1">(Req: {item.passingScore})</span>
                                </td>
                                <td>
                                  <span className="text-light">{item.percentage}%</span>
                                </td>
                                <td>
                                  <span
                                    className={`badge ${
                                      isPass
                                        ? "bg-success bg-opacity-20 text-success border border-success border-opacity-30"
                                        : "bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30"
                                    } text-uppercase fw-bold d-inline-flex align-items-center gap-1 py-1 px-2`}
                                  >
                                    {isPass ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                                    {item.result}
                                  </span>
                                </td>
                                <td className="pe-4 text-end text-secondary small">
                                  <div className="d-inline-flex align-items-center gap-1">
                                    <Clock size={12} />
                                    {new Date(item.submittedAt).toLocaleDateString()}{" "}
                                    {new Date(item.submittedAt).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
