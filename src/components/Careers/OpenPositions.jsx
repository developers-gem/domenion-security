import { useState, useEffect } from "react";
import { MapPin, Briefcase, Calendar, Award, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { careersAPI } from "../../services/api";
import Reveal from "../common/Reveal";
import ApplicationModal from "./ApplicationModal";
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
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">OPEN POSITIONS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Find your next
                <br />
                <span>opportunity with Dominion.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Explore current opportunities with Dominion Security. Select any role to view post requirements and submit your application.
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
            <Loader2 size={32} className="ds-spinner text-gold mb-3" />
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
            <Briefcase size={36} className="ds-empty-icon" />
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
          /* Clean Horizontal Job Rows */
          <div className="ds-jobs-list-wrap">
            {filteredJobs.map((job, idx) => {
              const isClosed = job.status === "closed";
              return (
                <Reveal key={job._id || idx} direction="up" delay={0.05 * idx}>
                  <div
                    className={`ds-job-horizontal-row ${isClosed ? "closed" : ""}`}
                    onClick={() => !isClosed && setSelectedJob(job)}
                  >
                    <div className="ds-job-row-main">
                      <div className="ds-job-row-tags">
                        {job.department && (
                          <span className="ds-job-dept-tag">{job.department}</span>
                        )}
                        <span className="ds-job-type-pill">{job.type || "Full-Time"}</span>
                      </div>

                      <h3 className="ds-job-title">{job.title}</h3>

                      <div className="ds-job-meta-flex">
                        <span className="ds-job-meta-item">
                          <MapPin size={14} className="ds-meta-icon" />
                          {job.location || "Phoenix, AZ"}
                        </span>
                        {job.experience && (
                          <span className="ds-job-meta-item">
                            <Award size={14} className="ds-meta-icon" />
                            {job.experience}
                          </span>
                        )}
                        <span className="ds-job-meta-item">
                          <Calendar size={14} className="ds-meta-icon" />
                          {formatDeadline(job.applicationDeadline)}
                        </span>
                      </div>
                    </div>

                    <div className="ds-job-row-action">
                      <button
                        type="button"
                        className="ds-job-apply-btn"
                        disabled={isClosed}
                      >
                        <span>{isClosed ? "Position Closed" : "Apply Now"}</span>
                        <ArrowRight size={15} className="ds-job-arrow" />
                      </button>
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
