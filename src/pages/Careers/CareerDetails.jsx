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
      <main className="w-full min-h-screen bg-white py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <Loader2 size={36} className="animate-spin text-domenion-gold mb-3 mx-auto" />
          <p className="text-gray-500 text-sm font-medium">Loading position details...</p>
        </div>
      </main>
    );
  }

  if (error || !career) {
    return (
      <main className="w-full min-h-screen bg-white py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="bg-neutral-light border border-neutral-border rounded-2xl p-10 max-w-xl mx-auto shadow-sm">
            <AlertCircle size={48} className="text-domenion-gold mb-3 mx-auto" />
            <h2 className="text-domenion-blue font-heading text-2xl font-extrabold mb-2">POSITION NOT FOUND</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {error || "The career position you are looking for does not exist or may have been removed."}
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/careers" className="inline-flex items-center gap-2 px-5 py-2.5 bg-domenion-blue text-white rounded-lg text-xs font-heading font-bold hover:bg-domenion-gold hover:text-domenion-blue transition-colors text-decoration-none">
                <ArrowLeft size={16} />
                <span>Back to Careers</span>
              </Link>
              <button type="button" onClick={fetchCareer} className="px-5 py-2.5 bg-neutral-light border border-neutral-border text-domenion-blue rounded-lg text-xs font-heading font-bold hover:border-domenion-gold transition-colors cursor-pointer">
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
    <main className="w-full min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <Link to="/careers" className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold hover:underline mb-6 text-decoration-none">
              <ArrowLeft size={16} />
              <span>Back to Open Positions</span>
            </Link>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                CAREER OPPORTUNITY
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-heading font-extrabold ${
                isClosed ? "bg-gray-200 text-gray-700" : "bg-emerald-100 text-emerald-800"
              }`}>
                {isClosed ? "CLOSED" : "OPEN"}
              </span>
              <span className="px-2.5 py-0.5 bg-white/10 border border-white/20 rounded-full text-xs font-heading font-bold text-white">
                {career.type || "Full-Time"}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <h1 className="text-white font-heading text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">{career.title}</h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center gap-6 text-xs font-heading font-semibold text-white/80">
              {career.department && (
                <span className="flex items-center gap-2">
                  <Building2 size={16} className="text-domenion-gold" />
                  {career.department}
                </span>
              )}
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-domenion-gold" />
                {career.location || "Location Not Specified"}
              </span>
              {career.experience && (
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-domenion-gold" />
                  {career.experience}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-domenion-gold" />
                Deadline: {formatDeadline(career.applicationDeadline)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 sm:py-28 bg-white text-domenion-blue">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Job Description & Requirements */}
            <div className="lg:col-span-8 space-y-8">
              {/* Job Description */}
              <Reveal direction="up">
                <div className="bg-neutral-light border border-neutral-border rounded-2xl p-8 shadow-sm">
                  <h2 className="text-domenion-blue font-heading text-xl font-extrabold mb-4 flex items-center gap-3">
                    <Briefcase size={22} className="text-domenion-gold" />
                    JOB DESCRIPTION
                  </h2>
                  <p className="text-gray-700 font-sans text-base leading-relaxed whitespace-pre-line">{career.description}</p>
                </div>
              </Reveal>

              {/* Requirements */}
              {career.requirements &&
                (Array.isArray(career.requirements)
                  ? career.requirements.length > 0
                  : String(career.requirements).trim().length > 0) && (
                  <Reveal direction="up" delay={0.1}>
                    <div className="bg-neutral-light border border-neutral-border rounded-2xl p-8 shadow-sm">
                      <h2 className="text-domenion-blue font-heading text-xl font-extrabold mb-4 flex items-center gap-3">
                        <ShieldCheck size={22} className="text-domenion-gold" />
                        REQUIREMENTS & QUALIFICATIONS
                      </h2>
                      {Array.isArray(career.requirements) ? (
                        <ul className="space-y-3">
                          {career.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                              <CheckCircle2 size={18} className="text-domenion-gold flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 font-sans text-base leading-relaxed whitespace-pre-line">{career.requirements}</p>
                      )}
                    </div>
                  </Reveal>
                )}
            </div>

            {/* Right Column: Position Information Sidebar & Apply CTA */}
            <div className="lg:col-span-4">
              <Reveal direction="up" delay={0.15}>
                <div className="bg-white border border-neutral-border p-6 rounded-2xl shadow-xl sticky top-28">
                  <h3 className="text-domenion-blue font-heading text-lg font-extrabold pb-4 mb-4 border-b border-neutral-border">POSITION INFORMATION</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-neutral-border">
                      <span className="text-gray-500 font-medium">Department</span>
                      <span className="text-domenion-blue font-bold">{career.department || "General Security"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-border">
                      <span className="text-gray-500 font-medium">Location</span>
                      <span className="text-domenion-blue font-bold">{career.location || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-border">
                      <span className="text-gray-500 font-medium">Employment Type</span>
                      <span className="text-domenion-blue font-bold">{career.type || "Full-Time"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-border">
                      <span className="text-gray-500 font-medium">Experience</span>
                      <span className="text-domenion-blue font-bold">{career.experience || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-border">
                      <span className="text-gray-500 font-medium">Status</span>
                      <span className={`font-bold ${isClosed ? "text-rose-600" : "text-emerald-600"}`}>
                        {isClosed ? "Closed" : "Open"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-border">
                      <span className="text-gray-500 font-medium">Deadline</span>
                      <span className="text-domenion-blue font-bold">{formatDeadline(career.applicationDeadline)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-border">
                    <button
                      type="button"
                      className={`w-full py-4 rounded-xl font-heading text-sm font-extrabold tracking-wider uppercase transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                        isClosed
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-domenion-gold text-domenion-blue hover:bg-domenion-gold/90"
                      }`}
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

