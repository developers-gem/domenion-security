import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Calendar, Award, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { careersAPI } from "../../services/api";
import Reveal from "../common/Reveal";

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
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border" id="open-positions">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OPEN POSITIONS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Find your next <span className="text-domenion-gold">opportunity with Domenion.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Explore current opportunities with Domenion Security. Select any role to view position details and submit your application.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Category Filters (Only if categories exist) */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`px-4 py-2 rounded-lg text-xs font-heading font-extrabold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-domenion-blue text-white shadow-md"
                    : "bg-neutral-light border border-neutral-border text-domenion-blue hover:border-domenion-gold"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Jobs Loading State */}
        {loadingJobs ? (
          <div className="text-center py-16">
            <Loader2 size={32} className="animate-spin text-domenion-gold mb-3 mx-auto" />
            <p className="text-gray-500 text-sm font-medium">Loading open career opportunities...</p>
          </div>
        ) : jobsError ? (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm font-medium">
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
            <span>{jobsError}</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Premium Empty State */
          <div className="bg-neutral-light border border-neutral-border rounded-2xl p-10 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center mx-auto mb-4">
              <Briefcase size={28} />
            </div>
            <h3 className="text-domenion-blue font-heading text-xl font-extrabold mb-2">NO CURRENT OPENINGS</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              We don't have any open positions listed right now. Please check back soon or submit a general inquiry to our recruitment team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-domenion-gold text-domenion-blue rounded-xl font-heading text-xs font-extrabold tracking-wider uppercase hover:bg-domenion-gold/90 transition-colors shadow-md text-decoration-none mx-auto"
            >
              <span>Submit General Inquiry</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          /* 3-Column Responsive Job Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => {
              const isClosed = job.status === "closed";
              const deptText = job.department ? job.department.toUpperCase() : "GENERAL SECURITY";
              const descText = job.shortDescription || job.description || "";

              return (
                <Reveal key={job._id || idx} direction="up" delay={0.05 * idx}>
                  <div className={`bg-neutral-light border border-neutral-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group ${isClosed ? "opacity-60" : ""}`}>
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">{deptText}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold ${
                          isClosed ? "bg-gray-200 text-gray-700" : "bg-emerald-100 text-emerald-800"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? "bg-gray-500" : "bg-emerald-500"}`} />
                          {isClosed ? "CLOSED" : "OPEN"}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-domenion-blue font-heading text-xl font-bold mb-2 group-hover:text-domenion-gold transition-colors">
                        <Link to={`/careers/${job._id}`} className="text-domenion-blue hover:text-domenion-gold text-decoration-none">
                          {job.title}
                        </Link>
                      </h3>

                      {/* Description Preview */}
                      {descText && (
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4">
                          {descText}
                        </p>
                      )}

                      <div className="border-t border-neutral-border my-4" />

                      {/* Metadata */}
                      <div className="space-y-2 text-xs text-gray-500 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-medium">
                            <MapPin size={14} className="text-domenion-gold" />
                            <span>{job.location || "Location Not Specified"}</span>
                          </span>
                          {job.experience && (
                            <span className="flex items-center gap-1.5 font-medium">
                              <Award size={14} className="text-domenion-gold" />
                              <span>{job.experience}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Briefcase size={14} className="text-domenion-gold" />
                            <span>{job.type || "Full-Time"}</span>
                          </span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <Calendar size={14} className="text-domenion-gold" />
                            <span>{formatDeadline(job.applicationDeadline)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-border">
                      <Link
                        to={`/careers/${job._id}`}
                        className="inline-flex items-center justify-center gap-1 py-2.5 bg-white border border-neutral-border rounded-lg text-domenion-blue text-xs font-heading font-bold hover:bg-neutral-light transition-colors text-decoration-none"
                      >
                        <span>Details</span>
                        <ArrowRight size={13} />
                      </Link>

                      {isClosed ? (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-heading font-bold bg-gray-200 text-gray-500 cursor-not-allowed"
                          disabled
                        >
                          <span>Closed</span>
                        </button>
                      ) : (
                        <Link
                          to={`/careers/${job._id}/apply`}
                          className="inline-flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-heading font-bold transition-colors bg-domenion-gold text-domenion-blue hover:bg-domenion-gold/90 shadow-sm text-decoration-none"
                        >
                          <span>Apply</span>
                          <ArrowRight size={13} />
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
    </section>
  );
}

