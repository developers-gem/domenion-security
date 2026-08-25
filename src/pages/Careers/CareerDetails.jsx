import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  ShieldCheck,
  Building2,
  Loader2,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { careersAPI } from "../../services/api";
import ApplicationModal from "../../components/Careers/ApplicationModal";
import Reveal from "../../components/common/Reveal";
import "./CareerDetails.css";

function formatDeadline(dateString) {
  if (!dateString) return "Rolling Recruitment";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Rolling Recruitment";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Rolling Recruitment";
  }
}

export default function CareerDetails() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);

  const fetchCareer = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await careersAPI.getCareerById(id);
      const data = response?.data || response;
      if (!data || !data._id) {
        setError("Position Not Found");
        setCareer(null);
      } else {
        setCareer(data);
      }
    } catch (err) {
      setError(err.message || "Failed to load position details.");
      setCareer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCareer = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await careersAPI.getCareerById(id);
        const data = response?.data || response;
        if (!isMounted) return;
        if (!data || !data._id) {
          setError("Position Not Found");
          setCareer(null);
        } else {
          setCareer(data);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load position details.");
        setCareer(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadCareer();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="ds-career-details-page">
        <div className="container py-5">
          <div className="ds-career-details-loading text-center py-5">
            <Loader2 size={36} className="ds-spinner text-gold mb-3 mx-auto" />
            <p className="text-muted">Loading position details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !career) {
    return (
      <main className="ds-career-details-page">
        <div className="container py-5">
          <div className="ds-career-details-error-card text-center py-5">
            <AlertCircle size={48} className="text-gold mb-3 mx-auto" />
            <h2 className="ds-error-title">POSITION NOT FOUND</h2>
            <p className="ds-error-desc text-muted mb-4">
              {error || "The career position you are looking for does not exist or may have been removed."}
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/careers" className="ds-career-back-btn">
                <ArrowLeft size={16} />
                <span>Back to Careers</span>
              </Link>
              <button type="button" onClick={fetchCareer} className="ds-career-retry-btn">
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const isClosed = career.status === "closed";

  return (
    <main className="ds-career-details-page">
      {/* Header Banner */}
      <section className="ds-career-details-header">
        <div className="container">
          <Reveal direction="up">
            <Link to="/careers" className="ds-career-back-link mb-4">
              <ArrowLeft size={16} />
              <span>Back to Open Positions</span>
            </Link>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="ds-career-header-tags">
              <span className="ds-open-positions-boxed-tag">
                <span className="ds-gold-accent-square" />
                CAREER OPPORTUNITY
              </span>
              <span className={`ds-career-status-pill ${isClosed ? "closed" : "open"}`}>
                {isClosed ? "CLOSED" : "OPEN"}
              </span>
              <span className="ds-career-type-pill">{career.type || "Full-Time"}</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <h1 className="ds-career-details-title">{career.title}</h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="ds-career-header-meta">
              {career.department && (
                <span className="ds-meta-pill">
                  <Building2 size={15} className="text-gold" />
                  {career.department}
                </span>
              )}
              <span className="ds-meta-pill">
                <MapPin size={15} className="text-gold" />
                {career.location || "Location Not Specified"}
              </span>
              {career.experience && (
                <span className="ds-meta-pill">
                  <Award size={15} className="text-gold" />
                  {career.experience}
                </span>
              )}
              <span className="ds-meta-pill">
                <Calendar size={15} className="text-gold" />
                Deadline: {formatDeadline(career.applicationDeadline)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section ds-career-details-body">
        <div className="container">
          <div className="row g-5">
            {/* Left Column: Job Description & Requirements */}
            <div className="col-lg-8">
              {/* Job Description */}
              <Reveal direction="up">
                <div className="ds-details-card mb-4">
                  <h2 className="ds-details-card-title">
                    <Briefcase size={20} className="text-gold" />
                    JOB DESCRIPTION
                  </h2>
                  <div className="ds-details-card-content">
                    <p className="ds-description-text">{career.description}</p>
                  </div>
                </div>
              </Reveal>

              {/* Requirements */}
              {career.requirements &&
                (Array.isArray(career.requirements)
                  ? career.requirements.length > 0
                  : String(career.requirements).trim().length > 0) && (
                  <Reveal direction="up" delay={0.1}>
                    <div className="ds-details-card mb-4">
                      <h2 className="ds-details-card-title">
                        <ShieldCheck size={20} className="text-gold" />
                        REQUIREMENTS & QUALIFICATIONS
                      </h2>
                      <div className="ds-details-card-content">
                        {Array.isArray(career.requirements) ? (
                          <ul className="ds-requirements-list">
                            {career.requirements.map((req, idx) => (
                              <li key={idx} className="ds-requirement-item">
                                <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="ds-description-text">{career.requirements}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                )}
            </div>

            {/* Right Column: Position Information Sidebar & Apply CTA */}
            <div className="col-lg-4">
              <Reveal direction="up" delay={0.15}>
                <div className="ds-sidebar-card">
                  <h3 className="ds-sidebar-title">POSITION INFORMATION</h3>
                  <div className="ds-info-grid">
                    <div className="ds-info-row">
                      <span className="ds-info-label">Department</span>
                      <span className="ds-info-val">{career.department || "General Security"}</span>
                    </div>
                    <div className="ds-info-row">
                      <span className="ds-info-label">Location</span>
                      <span className="ds-info-val">{career.location || "Not Specified"}</span>
                    </div>
                    <div className="ds-info-row">
                      <span className="ds-info-label">Employment Type</span>
                      <span className="ds-info-val">{career.type || "Full-Time"}</span>
                    </div>
                    <div className="ds-info-row">
                      <span className="ds-info-label">Experience</span>
                      <span className="ds-info-val">{career.experience || "Not Specified"}</span>
                    </div>
                    <div className="ds-info-row">
                      <span className="ds-info-label">Status</span>
                      <span className={`ds-info-val ${isClosed ? "text-danger" : "text-success"}`}>
                        {isClosed ? "Closed" : "Open"}
                      </span>
                    </div>
                    <div className="ds-info-row">
                      <span className="ds-info-label">Application Deadline</span>
                      <span className="ds-info-val">{formatDeadline(career.applicationDeadline)}</span>
                    </div>
                  </div>

                  <div className="ds-sidebar-action mt-4">
                    <button
                      type="button"
                      className="ds-detail-apply-btn"
                      disabled={isClosed}
                      onClick={() => setShowApplyModal(true)}
                    >
                      <span>{isClosed ? "Position Closed" : "Apply Now"}</span>
                      {!isClosed && <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplyModal && (
        <ApplicationModal
          selectedJob={career}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </main>
  );
}
