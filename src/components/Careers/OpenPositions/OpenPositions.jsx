"use client";

import { useState, useEffect } from "react";
import "./OpenPositions.css";
import {
  MapPin,
  Briefcase,
  Calendar,
  Award,
  ArrowRight,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { careersAPI, applicationsAPI } from "../../../services/api";

function formatDeadline(dateString) {
  if (!dateString) return "Deadline not specified";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Deadline not specified";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Deadline not specified";
  }
}

function OpenPositions() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

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
      setJobsError("Unable to load current career opportunities. Please try again later.");
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setSubmitError("");
    setSubmitSuccess("");
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  const closeModal = () => {
    if (submitting) return;
    setSelectedJob(null);
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    if (id === "applicant-name") setFormData((prev) => ({ ...prev, fullName: value }));
    if (id === "applicant-email") setFormData((prev) => ({ ...prev, email: value }));
    if (id === "applicant-phone") setFormData((prev) => ({ ...prev, phone: value }));
    if (id === "applicant-message") setFormData((prev) => ({ ...prev, message: value }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.fullName || !formData.email || !formData.phone) {
      setSubmitError("Please fill in all required fields (Full Name, Email, Phone Number).");
      return;
    }

    try {
      setSubmitting(true);
      await applicationsAPI.submitApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        careerId: selectedJob?._id,
      });

      setSubmitSuccess("Your application has been submitted successfully! Our recruitment team will review it shortly.");
      setFormData({ fullName: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setSelectedJob(null);
        setSubmitSuccess("");
      }, 2500);
    } catch (err) {
      setSubmitError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="career-jobs section">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-lg-6">
              <span className="section-label">OPEN POSITIONS</span>
              <h2 className="section-title">Current Career Opportunities</h2>
            </div>
            <div className="col-lg-6">
              <p className="section-description">
                Explore available positions and become part of a trusted security team serving clients nationwide.
              </p>
            </div>
          </div>

          {loadingJobs ? (
            <div className="text-center py-5">
              <Loader2 size={36} className="text-danger spinner-border-sm animate-spin mb-3" />
              <p className="text-muted">Loading open positions...</p>
            </div>
          ) : jobsError ? (
            <div className="alert alert-warning text-center" role="alert">
              <AlertCircle size={20} className="me-2" />
              {jobsError}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-5 border rounded bg-light">
              <Briefcase size={40} className="text-secondary mb-3" />
              <h4 className="fw-bold">No Open Positions Currently</h4>
              <p className="text-muted mb-0">
                We are not actively hiring for specific roles right now, but feel free to check back soon or contact our recruitment team.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {jobs.map((job) => (
                <div className="col-lg-6" key={job._id || job.title}>
                  <div className="job-card d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                        <div>
                          {job.department && (
                            <span className="job-department mb-2">{job.department}</span>
                          )}
                          <h3 className="mb-0">{job.title}</h3>
                        </div>
                        <span className="job-type">{job.type || "Full-Time"}</span>
                      </div>

                      {job.description && (
                        <p className="text-muted small mb-4 line-clamp-2">
                          {job.description}
                        </p>
                      )}

                      {/* Explicit 2-Column Labeled Information Grid */}
                      <div className="job-meta-grid">
                        <div className="meta-item">
                          <span className="meta-label">LOCATION</span>
                          <span className="meta-value">
                            <MapPin size={16} className="text-danger me-1" />
                            {job.location}
                          </span>
                        </div>

                        <div className="meta-item">
                          <span className="meta-label">EXPERIENCE</span>
                          <span className="meta-value">
                            <Award size={16} className="text-danger me-1" />
                            {job.experience || "Not specified"}
                          </span>
                        </div>

                        <div className="meta-item">
                          <span className="meta-label">STATUS</span>
                          <div className="meta-value">
                            <span
                              className={`status-pill ${
                                job.status === "closed" ? "status-pill-closed" : "status-pill-open"
                              }`}
                            >
                              <span className="status-dot"></span>
                              {(job.status || "open").toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="meta-item">
                          <span className="meta-label">APPLICATION DEADLINE</span>
                          <span className="meta-value">
                            <Calendar size={16} className="text-danger me-1" />
                            {formatDeadline(job.applicationDeadline)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-danger mt-3"
                      onClick={() => handleApply(job)}
                      disabled={job.status === "closed"}
                    >
                      {job.status === "closed" ? "Position Closed" : "Apply Now"}
                      <ArrowRight size={18} className="ms-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* APPLICATION MODAL */}
      {selectedJob && (
        <div className="application-modal-overlay" onClick={closeModal}>
          <div className="application-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="application-modal-close"
              onClick={closeModal}
              disabled={submitting}
              aria-label="Close application form"
            >
              <X size={24} />
            </button>

            <div className="application-modal-header">
              <span className="section-label">CAREER APPLICATION</span>
              <h2>Apply for this position</h2>
              <p>
                You are applying for <strong>{selectedJob.title}</strong>
                {selectedJob.department ? ` (${selectedJob.department})` : ""}.
              </p>
            </div>

            {submitSuccess && (
              <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                <CheckCircle2 size={20} className="me-2" />
                <div>{submitSuccess}</div>
              </div>
            )}

            {submitError && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <AlertCircle size={20} className="me-2" />
                <div>{submitError}</div>
              </div>
            )}

            <form className="application-form" onSubmit={handleSubmitApplication}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="applicant-name">Full Name *</label>
                  <input
                    id="applicant-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="applicant-email">Email Address *</label>
                  <input
                    id="applicant-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="applicant-phone">Phone Number *</label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="applicant-location">Location</label>
                  <input
                    id="applicant-location"
                    type="text"
                    value={selectedJob.location || ""}
                    readOnly
                    disabled
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="applicant-message">Cover Letter / Message</label>
                  <textarea
                    id="applicant-message"
                    rows={5}
                    placeholder="Tell us a little about yourself and your security experience..."
                    value={formData.message}
                    onChange={handleFormChange}
                    disabled={submitting}
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-danger application-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="me-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={18} className="ms-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default OpenPositions;