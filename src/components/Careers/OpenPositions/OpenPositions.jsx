"use client";

import { useState } from "react";
import "./OpenPositions.css";
import {
  MapPin,
  Briefcase,
  Clock3,
  DollarSign,
  ArrowRight,
  X,
} from "lucide-react";

const jobs = [
  {
    title: "Security Officer",
    department: "Operations",
    location: "California",
    type: "Full Time",
    salary: "$22 - $28/hr",
  },
  {
    title: "Mobile Patrol Officer",
    department: "Field Services",
    location: "Arizona",
    type: "Full Time",
    salary: "$24 - $30/hr",
  },
  {
    title: "Executive Protection Agent",
    department: "Executive Protection",
    location: "Texas",
    type: "Contract",
    salary: "$35 - $50/hr",
  },
  {
    title: "Control Room Operator",
    department: "Monitoring",
    location: "Remote",
    type: "Night Shift",
    salary: "$25 - $32/hr",
  },
];

function OpenPositions() {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <section className="career-jobs section">
        <div className="container">

          <div className="row mb-5 align-items-end">
            <div className="col-lg-6">
              <span className="section-label">
                OPEN POSITIONS
              </span>

              <h2 className="section-title">
                Current Career Opportunities
              </h2>
            </div>

            <div className="col-lg-6">
              <p className="section-description">
                Explore available positions and become part of a trusted
                security team serving clients nationwide.
              </p>
            </div>
          </div>

          <div className="row g-4">

            {jobs.map((job, index) => (
              <div className="col-lg-6" key={index}>

                <div className="job-card">

                  <div className="d-flex justify-content-between align-items-start flex-wrap">

                    <div>
                      <span className="job-department">
                        {job.department}
                      </span>

                      <h3>{job.title}</h3>
                    </div>

                    <span className="job-type">
                      {job.type}
                    </span>

                  </div>

                  <div className="job-meta">

                    <span>
                      <MapPin size={18} />
                      {job.location}
                    </span>

                    <span>
                      <DollarSign size={18} />
                      {job.salary}
                    </span>

                    <span>
                      <Briefcase size={18} />
                      Security
                    </span>

                    <span>
                      <Clock3 size={18} />
                      Immediate
                    </span>

                  </div>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleApply(job)}
                  >
                    Apply Now
                    <ArrowRight size={18} className="ms-2" />
                  </button>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}

      {selectedJob && (
        <div
          className="application-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="application-modal-close"
              onClick={closeModal}
              aria-label="Close application form"
            >
              <X size={24} />
            </button>

            <div className="application-modal-header">

              <span className="section-label">
                CAREER APPLICATION
              </span>

              <h2>
                Apply for this position
              </h2>

              <p>
                You are applying for{" "}
                <strong>{selectedJob.title}</strong>.
              </p>

            </div>

            <form className="application-form">

              <div className="row g-3">

                <div className="col-md-6">
                  <label htmlFor="applicant-name">
                    Full Name
                  </label>

                  <input
                    id="applicant-name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="applicant-email">
                    Email Address
                  </label>

                  <input
                    id="applicant-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="applicant-phone">
                    Phone Number
                  </label>

                  <input
                    id="applicant-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="applicant-resume">
                    Resume
                  </label>

                  <input
                    id="applicant-resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="applicant-message">
                    Cover Letter / Message
                  </label>

                  <textarea
                    id="applicant-message"
                    rows={5}
                    placeholder="Tell us a little about yourself..."
                  />
                </div>

                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-danger application-submit"
                  >
                    Submit Application
                    <ArrowRight size={18} className="ms-2" />
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