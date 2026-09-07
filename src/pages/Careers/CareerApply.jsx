import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Building2,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Globe,
} from "lucide-react";
import { careersAPI, applicationsAPI, globalQuestionsAPI } from "../../services/api";
import Reveal from "../../components/common/Reveal";

export default function CareerApply() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [globalQuestions, setGlobalQuestions] = useState([]);
  const [jobQuestions, setJobQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Applicant form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [answers, setAnswers] = useState({});

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    let isMounted = true;

    const loadJobAndQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const [jobRes, globalQuestRes, jobQuestRes] = await Promise.all([
          careersAPI.getCareerById(id),
          globalQuestionsAPI.getPublicGlobalQuestions().catch(() => ({ data: [] })),
          careersAPI.getPublicQuestions(id).catch(() => ({ data: [] })),
        ]);

        const jobData = jobRes?.data || jobRes;
        const globalData = globalQuestRes?.data || globalQuestRes || [];
        const jobDataQuestions = jobQuestRes?.data || jobQuestRes || [];

        if (!isMounted) return;

        if (!jobData || !jobData._id) {
          setError("The requested career position could not be found.");
          setJob(null);
        } else {
          setJob(jobData);
          const sortedGlobal = Array.isArray(globalData)
            ? [...globalData].map((q) => ({ ...q, scope: "global" })).sort((a, b) => (a.order || 0) - (b.order || 0))
            : [];
          const sortedJob = Array.isArray(jobDataQuestions)
            ? [...jobDataQuestions].map((q) => ({ ...q, scope: "job" })).sort((a, b) => (a.order || 0) - (b.order || 0))
            : [];

          setGlobalQuestions(sortedGlobal);
          setJobQuestions(sortedJob);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load application details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      loadJobAndQuestions();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSingleChoiceChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  const handleTextChange = (questionId, textVal) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: textVal,
    }));
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  const handleMultipleChoiceToggle = (questionId, option) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return {
        ...prev,
        [questionId]: updated,
      };
    });
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      return;
    }

    // 5 MB size limit validation
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("File size exceeds 5 MB. Please upload a smaller document.");
      e.target.value = "";
      return;
    }

    // Allowed file extension validation
    const allowedExts = [".pdf", ".doc", ".docx"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExts.includes(ext)) {
      setSubmitError("Invalid file format. Please upload a PDF, DOC, or DOCX document.");
      e.target.value = "";
      return;
    }

    setSubmitError("");
    setResumeFile(file);
  };

  const validateForm = () => {
    const errors = {};

    if (!fullName.trim()) errors.fullName = "Full name is required.";
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) errors.phone = "Phone number is required.";

    const allQuestions = [...globalQuestions, ...jobQuestions];
    allQuestions.forEach((q) => {
      if (q.required && q.isActive) {
        const val = answers[q._id];
        const qType = q.type || "single_choice";

        if (qType === "multiple_choice") {
          if (!Array.isArray(val) || val.length === 0) {
            errors[q._id] = "Please select at least one answer.";
          }
        } else if (qType === "text") {
          if (!val || String(val).trim() === "") {
            errors[q._id] = "This field is required.";
          }
        } else {
          if (!val || String(val).trim() === "") {
            errors[q._id] = "Please select an answer.";
          }
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      setSubmitError("Please fill in all required fields and screening questions.");
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    try {
      setSubmitting(true);

      const allQuestions = [...globalQuestions, ...jobQuestions];
      const formattedAnswers = allQuestions
        .filter((q) => {
          if (!q.isActive) return false;
          const val = answers[q._id];
          if (q.type === "multiple_choice") {
            return Array.isArray(val) && val.length > 0;
          }
          return val !== undefined && val !== null && String(val).trim() !== "";
        })
        .map((q) => {
          const qType = q.type || "single_choice";
          let finalAns = answers[q._id];
          if (qType === "text") {
            finalAns = String(finalAns).trim();
          }
          return {
            questionId: q._id,
            question: q.question,
            type: qType,
            scope: q.scope || "global",
            answer: finalAns,
          };
        });

      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("careerId", id);
      if (message.trim()) {
        formData.append("message", message.trim());
      }
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
      formData.append("screeningAnswers", JSON.stringify(formattedAnswers));

      await applicationsAPI.submitApplication(formData);

      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-white py-24">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <Loader2 size={36} className="animate-spin text-domenion-gold mb-3 mx-auto" />
          <p className="text-gray-500 text-sm font-medium">Loading position & screening details...</p>
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="w-full min-h-screen bg-white py-24">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="bg-neutral-light border border-neutral-border rounded-2xl p-10 max-w-xl mx-auto shadow-sm">
            <AlertCircle size={48} className="text-domenion-gold mb-3 mx-auto" />
            <h2 className="text-domenion-blue font-heading text-2xl font-extrabold mb-2">POSITION NOT FOUND</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{error || "This role is unavailable."}</p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-domenion-blue text-white rounded-xl text-xs font-heading font-bold hover:bg-domenion-gold hover:text-domenion-blue transition-colors text-decoration-none"
            >
              <ArrowLeft size={16} />
              <span>Back to Open Careers</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isClosed = job.status === "closed";

  if (submitSuccess) {
    return (
      <main className="w-full min-h-screen bg-white py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto bg-neutral-light border border-neutral-border rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase mb-2 block">
              APPLICATION SUBMITTED
            </span>
            <h1 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold mb-4">
              Thank you, {fullName}!
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Your application for <strong>{job.title}</strong> has been received by the Domenion Security recruitment team. We will review your profile and contact you if your qualifications match our operational needs.
            </p>

            <div className="p-4 bg-white border border-neutral-border rounded-xl mb-8 text-left text-xs space-y-2 text-gray-600">
              <div className="flex justify-between border-b border-neutral-border pb-2">
                <span className="font-bold text-domenion-blue">Target Position:</span>
                <span>{job.title}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-border pb-2">
                <span className="font-bold text-domenion-blue">Location:</span>
                <span>{job.location}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-border pb-2">
                <span className="font-bold text-domenion-blue">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-domenion-blue">Screening Questions Answered:</span>
                <span>{globalQuestions.length + jobQuestions.length} questions submitted</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/careers"
                className="px-6 py-3 bg-domenion-gold text-domenion-blue rounded-xl font-heading text-xs font-extrabold tracking-wider uppercase hover:bg-domenion-gold/90 transition-colors shadow-md text-decoration-none"
              >
                Explore More Open Roles
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-white border border-neutral-border text-domenion-blue rounded-xl font-heading text-xs font-extrabold tracking-wider uppercase hover:bg-neutral-light transition-colors text-decoration-none"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const renderQuestionItem = (q, idx, prefix = "") => {
    const hasError = Boolean(validationErrors[q._id]);
    const qType = q.type || "single_choice";
    const currentAnswer = answers[q._id];

    return (
      <div
        key={q._id}
        className={`p-6 rounded-xl bg-white border ${
          hasError ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-border"
        } transition-all`}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-domenion-blue font-heading text-base font-bold leading-snug">
            <span className="text-domenion-gold me-2">{prefix}{idx + 1}.</span>
            {q.question}
            {q.required && <span className="text-rose-500 ms-1">*</span>}
          </h3>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold uppercase flex-shrink-0 ${
              q.required ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"
            }`}
          >
            {q.required ? "Required" : "Optional"}
          </span>
        </div>

        {/* TYPE: MULTIPLE CHOICE (CHECKBOXES) */}
        {qType === "multiple_choice" && (
          <div className="space-y-2.5">
            {(q.options || []).map((option, optIdx) => {
              const selectedList = Array.isArray(currentAnswer) ? currentAnswer : [];
              const isChecked = selectedList.includes(option);

              return (
                <label
                  key={optIdx}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? "bg-domenion-blue/5 border-domenion-gold shadow-xs"
                      : "bg-neutral-light/50 border-neutral-border hover:border-domenion-gold/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={isChecked}
                    onChange={() => handleMultipleChoiceToggle(q._id, option)}
                    className="w-4 h-4 text-domenion-gold focus:ring-domenion-gold accent-domenion-gold rounded cursor-pointer"
                  />
                  <span className={`text-sm ${isChecked ? "font-bold text-domenion-blue" : "text-gray-700"}`}>
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {/* TYPE: TEXT ANSWER (INPUT OR TEXTAREA) */}
        {qType === "text" && (
          <div>
            <textarea
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-neutral-light/50 border border-neutral-border focus:border-domenion-gold text-domenion-blue text-sm focus:outline-none transition-colors"
              placeholder="Type your answer here..."
              value={typeof currentAnswer === "string" ? currentAnswer : ""}
              onChange={(e) => handleTextChange(q._id, e.target.value)}
            />
          </div>
        )}

        {/* TYPE: SINGLE CHOICE (RADIO BUTTONS) */}
        {qType === "single_choice" && (
          <div className="space-y-2.5">
            {(q.options || []).map((option, optIdx) => {
              const isChecked = currentAnswer === option;

              return (
                <label
                  key={optIdx}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? "bg-domenion-blue/5 border-domenion-gold shadow-xs"
                      : "bg-neutral-light/50 border-neutral-border hover:border-domenion-gold/50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${q._id}`}
                    value={option}
                    checked={isChecked}
                    onChange={() => handleSingleChoiceChange(q._id, option)}
                    className="w-4 h-4 text-domenion-gold focus:ring-domenion-gold accent-domenion-gold cursor-pointer"
                  />
                  <span className={`text-sm ${isChecked ? "font-bold text-domenion-blue" : "text-gray-700"}`}>
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {hasError && (
          <span className="text-rose-600 text-xs font-medium mt-2.5 block flex items-center gap-1">
            <AlertCircle size={14} />
            <span>{validationErrors[q._id]}</span>
          </span>
        )}
      </div>
    );
  };

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header Banner */}
      <section className="relative py-14 sm:py-20 bg-domenion-blue text-white border-b border-domenion-gold/20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <Link
              to={`/careers/${job._id}`}
              className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold hover:underline mb-4 text-decoration-none"
            >
              <ArrowLeft size={16} />
              <span>Back to Position Details</span>
            </Link>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase mb-3">
              CAREER APPLICATION FORM
            </span>
            <h1 className="text-white font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Apply for <span className="text-domenion-gold">{job.title}</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="flex flex-wrap items-center gap-6 text-xs font-heading font-semibold text-white/80">
              {job.department && (
                <span className="flex items-center gap-2">
                  <Building2 size={16} className="text-domenion-gold" />
                  {job.department}
                </span>
              )}
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-domenion-gold" />
                {job.location || "Location Not Specified"}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase size={16} className="text-domenion-gold" />
                {job.type || "Full-Time"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 sm:py-24 bg-white text-domenion-blue">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          {isClosed ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center text-amber-900 shadow-sm mb-8">
              <AlertCircle size={36} className="text-amber-600 mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2">This Position is Closed</h3>
              <p className="text-xs text-amber-800 mb-4">
                Applications are no longer being accepted for this role.
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-domenion-blue text-white rounded-xl text-xs font-heading font-bold text-decoration-none hover:bg-domenion-gold hover:text-domenion-blue transition-colors"
              >
                <ArrowLeft size={16} />
                <span>View Open Positions</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Submission Error Banner */}
              {submitError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm font-medium flex items-start gap-3">
                  <AlertCircle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-heading font-bold text-rose-900">Submission Error</strong>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}

              {/* 1. PERSONAL INFORMATION */}
              <div className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-neutral-border">
                  <div className="w-9 h-9 rounded-lg bg-domenion-gold/20 text-domenion-gold font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h2 className="text-domenion-blue font-heading text-xl font-extrabold">PERSONAL INFORMATION</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Please provide your contact details so our recruiters can reach you.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-heading font-bold text-domenion-blue uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        validationErrors.fullName ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-border focus:border-domenion-gold"
                      } text-domenion-blue text-sm focus:outline-none transition-colors`}
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (validationErrors.fullName) {
                          setValidationErrors((prev) => ({ ...prev, fullName: "" }));
                        }
                      }}
                    />
                    {validationErrors.fullName && (
                      <span className="text-rose-600 text-xs font-medium mt-1 block">{validationErrors.fullName}</span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-heading font-bold text-domenion-blue uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        validationErrors.email ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-border focus:border-domenion-gold"
                      } text-domenion-blue text-sm focus:outline-none transition-colors`}
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (validationErrors.email) {
                          setValidationErrors((prev) => ({ ...prev, email: "" }));
                        }
                      }}
                    />
                    {validationErrors.email && (
                      <span className="text-rose-600 text-xs font-medium mt-1 block">{validationErrors.email}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-heading font-bold text-domenion-blue uppercase tracking-wider mb-2">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        validationErrors.phone ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-border focus:border-domenion-gold"
                      } text-domenion-blue text-sm focus:outline-none transition-colors`}
                      placeholder="(602) 555-0199"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (validationErrors.phone) {
                          setValidationErrors((prev) => ({ ...prev, phone: "" }));
                        }
                      }}
                    />
                    {validationErrors.phone && (
                      <span className="text-rose-600 text-xs font-medium mt-1 block">{validationErrors.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. GLOBAL SCREENING QUESTIONS */}
              {globalQuestions.length > 0 && (
                <div className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 pb-4 mb-6 border-b border-neutral-border">
                    <div className="w-9 h-9 rounded-lg bg-domenion-gold/20 text-domenion-gold font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                      02
                    </div>
                    <div>
                      <h2 className="text-domenion-blue font-heading text-xl font-extrabold flex items-center gap-2">
                        <span>GLOBAL CAREER QUESTIONS</span>
                      </h2>
                      <p className="text-gray-500 text-xs mt-0.5">General security applicant background and consent questions.</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {globalQuestions.map((q, idx) => renderQuestionItem(q, idx, "G"))}
                  </div>
                </div>
              )}

              {/* 3. JOB-SPECIFIC SCREENING QUESTIONS */}
              {jobQuestions.length > 0 && (
                <div className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 pb-4 mb-6 border-b border-neutral-border">
                    <div className="w-9 h-9 rounded-lg bg-domenion-gold/20 text-domenion-gold font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                      03
                    </div>
                    <div>
                      <h2 className="text-domenion-blue font-heading text-xl font-extrabold flex items-center gap-2">
                        <span>JOB-SPECIFIC QUESTIONS</span>
                      </h2>
                      <p className="text-gray-500 text-xs mt-0.5">Questions specific to the {job.title} role.</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {jobQuestions.map((q, idx) => renderQuestionItem(q, idx, "J"))}
                  </div>
                </div>
              )}

              {/* 4. RESUME / CV UPLOAD */}
              <div className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-neutral-border">
                  <div className="w-9 h-9 rounded-lg bg-domenion-gold/20 text-domenion-gold font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {globalQuestions.length > 0 && jobQuestions.length > 0 ? "04" : (globalQuestions.length > 0 || jobQuestions.length > 0 ? "03" : "02")}
                  </div>
                  <div>
                    <h2 className="text-domenion-blue font-heading text-xl font-extrabold">RESUME / CV ATTACHMENT</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Upload your resume in PDF, DOC, or DOCX format (Max 5 MB).</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-dashed border-neutral-border hover:border-domenion-gold transition-colors rounded-2xl p-6 text-center">
                  <Upload size={32} className="text-domenion-gold mx-auto mb-2" />
                  <p className="text-domenion-blue text-sm font-bold mb-1">
                    {resumeFile ? resumeFile.name : "Click or drag your resume file here"}
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    {resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : "Supported Formats: PDF, DOC, DOCX up to 5 MB"}
                  </p>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-domenion-blue text-white rounded-xl text-xs font-heading font-bold cursor-pointer hover:bg-domenion-gold hover:text-domenion-blue transition-colors">
                    <FileText size={15} />
                    <span>{resumeFile ? "Change File" : "Browse Computer"}</span>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>

              {/* 5. COVER LETTER / STATEMENT (OPTIONAL) */}
              <div className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-neutral-border">
                  <div className="w-9 h-9 rounded-lg bg-domenion-gold/20 text-domenion-gold font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {globalQuestions.length > 0 && jobQuestions.length > 0 ? "05" : "04"}
                  </div>
                  <div>
                    <h2 className="text-domenion-blue font-heading text-xl font-extrabold">ADDITIONAL NOTES / COVER LETTER</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Optional cover letter or comments for our recruitment team.</p>
                  </div>
                </div>

                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-border focus:border-domenion-gold text-domenion-blue text-sm focus:outline-none transition-colors"
                  placeholder="Share any relevant details regarding your experience, availability, or certifications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-border">
                <Link
                  to={`/careers/${job._id}`}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white border border-neutral-border text-domenion-blue rounded-xl font-heading text-xs font-bold hover:bg-neutral-light transition-colors text-center text-decoration-none"
                >
                  Cancel & Return
                </Link>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-domenion-gold text-domenion-blue rounded-xl font-heading text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-domenion-gold/90 transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Official Application</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
