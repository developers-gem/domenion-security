import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Calendar, Award, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { careersAPI } from "../../../services/api";
import Reveal from "../../common/Reveal";
import ApplicationModal from "../ApplicationModal";
import "./OpenPositions.css";

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

export default function OpenPositions() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      setJobsError("");
      const response = await careersAPI.getCareers();

      let rawJobs = [];
      if (response && Array.isArray(response.data)) {
        rawJobs = response.data;
      } else if (Array.isArray(response)) {
        rawJobs = response;
      }

      setJobs(rawJobs);
    } catch {
      setJobsError("Unable to load current career opportunities. Please check back soon.");
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs if department categories exist
  const categories = ["All", ...new Set(jobs.map((j) => j.department).filter(Boolean))];

  const filteredJobs = activeCategory === "All"
    ? jobs
    : jobs.filter((j) => j.department === activeCategory);

  return (
    <section className="section ds-open-positions-section" id="open-positions">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-4">
          <div className="col-lg-7">
            <Reveal direction="up">
              <div className="ds-open-positions-boxed-tag">
                <span className="ds-gold-accent-square" />
                OPEN POSITIONS
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Find your next
                <br />
                <span>opportunity with Domenion.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-3 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Explore current opportunities with Domenion Security. Select any role to view position details and submit your application.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Category Filters (Only if categories exist) */}
        {categories.length > 2 && (
          <div className="ds-job-categories-bar mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`ds-cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Jobs Loading State */}
        {loadingJobs ? (
          <div className="text-center py-5">
            <Loader2 size={32} className="ds-spinner text-gold mb-3 mx-auto" />
            <p className="text-muted small">Loading open career opportunities...</p>
          </div>
        ) : jobsError ? (
          <div className="ds-jobs-alert-box">
            <AlertCircle size={20} className="text-gold flex-shrink-0" />
            <span>{jobsError}</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Premium Empty State */
          <div className="ds-empty-jobs-card">
            <Briefcase size={36} className="ds-empty-icon mx-auto" />
            <h3 className="ds-empty-title">NO CURRENT OPENINGS</h3>
            <p className="ds-empty-desc">
              We don't have any open positions listed right now. Please check back soon or submit a general inquiry to our recruitment team.
            </p>
            <button
              type="button"
              className="ds-general-app-btn"
              onClick={() => setSelectedJob({ title: "General Security Application" })}
            >
              <span>Submit General Application</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          /* 3-Column Responsive Job Card Grid */
          <div className="ds-jobs-card-grid">
            {filteredJobs.map((job, idx) => {
              const isClosed = job.status === "closed";
              const deptText = job.department ? job.department.toUpperCase() : "GENERAL SECURITY";
              const descText = job.shortDescription || job.description || "";

              return (
                <Reveal key={job._id || idx} direction="up" delay={0.05 * idx}>
                  <div className={`ds-job-card ${isClosed ? "closed" : ""}`}>
                    {/* Card Header: Dept Badge Left, Status Badge Right */}
                    <div className="ds-job-card-header">
                      <span className="ds-job-dept-badge">{deptText}</span>
                      <span className={`ds-job-status-badge ${isClosed ? "closed" : "open"}`}>
                        <span className="ds-status-dot" />
                        {isClosed ? "CLOSED" : "OPEN"}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="ds-job-card-title">
                      <Link to={`/careers/${job._id}`} className="ds-job-title-link">
                        {job.title}
                      </Link>
                    </h3>

                    {/* Description Preview */}
                    {descText && (
                      <p className="ds-job-card-desc">
                        {descText}
                      </p>
                    )}

                    <div className="ds-job-card-divider" />

                    {/* Metadata Grid */}
                    <div className="ds-job-card-meta">
                      <div className="ds-job-meta-row">
                        <span className="ds-meta-item">
                          <MapPin size={15} className="ds-meta-icon" />
                          <span className="ds-meta-text">{job.location || "Location Not Specified"}</span>
                        </span>
                        {job.experience && (
                          <span className="ds-meta-item">
                            <Award size={15} className="ds-meta-icon" />
                            <span className="ds-meta-text">{job.experience}</span>
                          </span>
                        )}
                      </div>

                      <div className="ds-job-meta-row">
                        <span className="ds-meta-item">
                          <Briefcase size={15} className="ds-meta-icon" />
                          <span className="ds-meta-text">{job.type || "Full-Time"}</span>
                        </span>
                        <span className="ds-meta-item">
                          <Calendar size={15} className="ds-meta-icon" />
                          <span className="ds-meta-text">{formatDeadline(job.applicationDeadline)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="ds-job-card-divider" />

                    {/* Card Footer Buttons */}
                    <div className="ds-job-card-footer">
                      <Link
                        to={`/careers/${job._id}`}
                        className="ds-card-btn-view"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} className="ds-btn-arrow" />
                      </Link>

                      {isClosed ? (
                        <button
                          type="button"
                          className="ds-card-btn-apply opacity-50 cursor-not-allowed"
                          disabled
                        >
                          <span>Closed</span>
                        </button>
                      ) : (
                        <Link
                          to={`/careers/${job._id}/apply`}
                          className="ds-card-btn-apply text-decoration-none"
                        >
                          <span>Apply Now</span>
                          <ArrowRight size={14} className="ds-btn-arrow" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
}