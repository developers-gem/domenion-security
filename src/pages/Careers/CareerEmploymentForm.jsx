import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  GraduationCap,
  Car,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Send,
} from "lucide-react";

export default function CareerEmploymentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    positionApplied: "",
    jobId: id || "",
    stateAgency: "",
    dateOfApplication: new Date().toISOString().split("T")[0],
    applicantNameTop: "",

    firstName: "",
    lastName: "",
    middleInitial: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    cellPhone: "",
    otherPhone: "",
    personalEmail: "",

    isOver18: "Yes",
    canVerifyWorkEligibility: "Yes",
    requiresVisaSponsorship: "No",

    workedForStateAZ: "No",
    lastStateAgency: "",
    ein: "",
    lastEmploymentDate: "",
    reasonLeavingState: "",

    dismissedOrResigned: "No",
    dismissedExplanation: "",

    otherNamesUsed: "",
    history: [
      {
        from: "",
        to: "",
        hoursPerWeek: "",
        companyName: "",
        positionTitle: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        startingSalary: "",
        endingSalary: "",
        duties: "",
        supervisorName: "",
        reasonForLeaving: "",
        mayContact: "Yes",
        contactExplanation: "",
      },
    ],

    education: [
      {
        institution: "",
        cityState: "",
        degree: "",
        yearAttained: "",
        hoursEarned: "",
        major: "",
      },
    ],
    licenses: [
      {
        name: "",
        institution: "",
        stateReceived: "",
        yearAttained: "",
        expirationDate: "",
      },
    ],
    otherTraining: [
      {
        topic: "",
        institution: "",
        stateReceived: "",
        level: "",
        yearAttained: "",
        cert: "",
      },
    ],

    driverFullName: "",
    hasDriverLicense: "Yes",
    driverLicenseState: "",
    driverLicenseNumber: "",
    hasCDL: "No",
    cdlState: "",
    cdlNumber: "",
    references: [
      { name: "", relationship: "", phone: "", email: "", fromToDates: "" },
      { name: "", relationship: "", phone: "", email: "", fromToDates: "" },
      { name: "", relationship: "", phone: "", email: "", fromToDates: "" },
    ],
    additionalInformation: "",

    printedName: "",
    applicantSignature: "",
    signDate: new Date().toISOString().split("T")[0],
    agreeTerms: false,
  });

  const steps = [
    { id: 1, label: "Applicant & Eligibility", icon: User },
    { id: 2, label: "Work History", icon: Briefcase },
    { id: 3, label: "Education & Licenses", icon: GraduationCap },
    { id: 4, label: "Driver & References", icon: Car },
    { id: 5, label: "Certification", icon: FileCheck },
  ];

  const handleSimpleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedListChange = (listKey, index, field, value) => {
    setFormData((prev) => {
      const updatedList = [...prev[listKey]];
      updatedList[index][field] = value;
      return { ...prev, [listKey]: updatedList };
    });
  };

  const addListItem = (listKey, emptyItem) => {
    setFormData((prev) => ({
      ...prev,
      [listKey]: [...prev[listKey], emptyItem],
    }));
  };

  const removeListItem = (listKey, index) => {
    setFormData((prev) => {
      if (prev[listKey].length <= 1) return prev;
      return {
        ...prev,
        [listKey]: prev[listKey].filter((_, i) => i !== index),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetJobId = id || formData.jobId.trim() || "general";
    const combinedName = `${formData.firstName} ${formData.lastName}`.trim();

    navigate(`/quiz/${targetJobId}`, {
      state: {
        applicantName: combinedName,
        email: formData.personalEmail,
        phone: formData.cellPhone,
        positionApplied: formData.positionApplied,
        jobId: targetJobId,
        employmentRecord: formData,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-100)] py-12 px-4 sm:px-6 lg:px-8 font-sans text-[var(--color-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="section-label mb-2 justify-center">
            Domenion Security Personnel
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-primary)]">
            Application For Employment
          </h1>
          {/* <p className="text-[var(--color-gray-500)] text-sm max-w-2xl mx-auto mt-2">
            Form ASPS/HRD FA3.01 (1) 4/19
          </p> */}
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-8 border border-[var(--color-gray-200)] shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-[var(--color-gold)] text-[var(--color-primary)] shadow-md font-bold scale-105"
                        : isCompleted
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-[var(--color-gray-100)] text-[var(--color-gray-400)]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[11px] sm:text-xs font-heading hidden sm:block ${
                      isActive
                        ? "font-extrabold text-[var(--color-primary)]"
                        : isCompleted
                          ? "font-semibold text-[var(--color-gray-700)]"
                          : "text-[var(--color-gray-400)]"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[var(--color-gray-200)] shadow-md p-6 sm:p-10 space-y-8"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[var(--color-gray-200)] pb-4">
                <h2 className="font-heading font-bold text-xl text-[var(--color-primary)]">
                  Position & Personal Information
                </h2>
              </div>

              <div className="border-l-4 border-[var(--color-gold)] bg-[var(--color-gray-50)] p-4 text-xs text-[var(--color-gray-700)] leading-relaxed text-justify">
                Completion of this application form in no way constitutes an
                offer of employment. The information is required to provide the
                agency with information necessary to consider you for the
                position for which you are applying. All information contained
                on this application is subject to verification. If applicable,
                the State of Arizona may conduct background checks, including,
                but not limited to, work references, driving records, and
                education attainment. If criminal record information is not
                required prior to or at the time of the initial interview, it
                may be requested later in the recruitment process. A criminal
                conviction(s) may or may not constitute an automatic
                disqualification from employment.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.positionApplied}
                    onChange={(e) =>
                      handleSimpleChange("positionApplied", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Job ID #
                  </label>
                  <input
                    type="text"
                    // value={formData.jobId}
                    onChange={(e) =>
                      handleSimpleChange("jobId", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    State Agency
                  </label>
                  <input
                    type="text"
                    value={formData.stateAgency}
                    onChange={(e) =>
                      handleSimpleChange("stateAgency", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleSimpleChange("firstName", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleSimpleChange("lastName", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    M.I.
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.middleInitial}
                    onChange={(e) =>
                      handleSimpleChange("middleInitial", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.personalEmail}
                    onChange={(e) =>
                      handleSimpleChange("personalEmail", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Cell Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.cellPhone}
                    onChange={(e) =>
                      handleSimpleChange("cellPhone", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Other Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.otherPhone}
                    onChange={(e) =>
                      handleSimpleChange("otherPhone", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) =>
                      handleSimpleChange("streetAddress", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleSimpleChange("city", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      handleSimpleChange("state", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleSimpleChange("zipCode", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-300)] focus:border-[var(--color-gold)] text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                  <span>Are you 18 years of age or older?</span>
                  <div className="flex gap-4">
                    {["Yes", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="isOver18"
                          value={opt}
                          checked={formData.isOver18 === opt}
                          onChange={(e) =>
                            handleSimpleChange("isOver18", e.target.value)
                          }
                          className="accent-[var(--color-gold)]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                  <span>
                    Can you provide verification of your eligibility to work in
                    the U.S.?
                  </span>
                  <div className="flex gap-4">
                    {["Yes", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="canVerifyWorkEligibility"
                          value={opt}
                          checked={formData.canVerifyWorkEligibility === opt}
                          onChange={(e) =>
                            handleSimpleChange(
                              "canVerifyWorkEligibility",
                              e.target.value,
                            )
                          }
                          className="accent-[var(--color-gold)]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                  <span>
                    Will you now or in the future require sponsorship for
                    employment visa status (e.g. H-1B visa status)?
                  </span>
                  <div className="flex gap-4">
                    {["Yes", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="requiresVisaSponsorship"
                          value={opt}
                          checked={formData.requiresVisaSponsorship === opt}
                          onChange={(e) =>
                            handleSimpleChange(
                              "requiresVisaSponsorship",
                              e.target.value,
                            )
                          }
                          className="accent-[var(--color-gold)]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-gray-200)] space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                    <span>
                      Do you currently or have you ever worked for the State of
                      Arizona?
                    </span>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="workedForStateAZ"
                            value={opt}
                            checked={formData.workedForStateAZ === opt}
                            onChange={(e) =>
                              handleSimpleChange(
                                "workedForStateAZ",
                                e.target.value,
                              )
                            }
                            className="accent-[var(--color-gold)]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.workedForStateAZ === "Yes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 bg-white rounded-lg border border-[var(--color-gray-200)]">
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--color-gray-700)] mb-1">
                          State Agency
                        </label>
                        <input
                          type="text"
                          value={formData.lastStateAgency}
                          onChange={(e) =>
                            handleSimpleChange(
                              "lastStateAgency",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--color-gray-700)] mb-1">
                          EIN
                        </label>
                        <input
                          type="text"
                          value={formData.ein}
                          onChange={(e) =>
                            handleSimpleChange("ein", e.target.value)
                          }
                          className="w-full p-2 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--color-gray-700)] mb-1">
                          Last Date
                        </label>
                        <input
                          type="date"
                          value={formData.lastEmploymentDate}
                          onChange={(e) =>
                            handleSimpleChange(
                              "lastEmploymentDate",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--color-gray-700)] mb-1">
                          Reason for Leaving
                        </label>
                        <input
                          type="text"
                          value={formData.reasonLeavingState}
                          onChange={(e) =>
                            handleSimpleChange(
                              "reasonLeavingState",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border rounded text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[var(--color-gray-200)] space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                    <span>
                      Have you ever been dismissed or allowed to resign from a
                      position in lieu of dismissal?
                    </span>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="dismissedOrResigned"
                            value={opt}
                            checked={formData.dismissedOrResigned === opt}
                            onChange={(e) =>
                              handleSimpleChange(
                                "dismissedOrResigned",
                                e.target.value,
                              )
                            }
                            className="accent-[var(--color-gold)]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.dismissedOrResigned === "Yes" && (
                    <div className="p-3 bg-white rounded-lg border border-[var(--color-gray-200)]">
                      <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                        If yes, provide employer name, dates, and circumstances:
                      </label>
                      <textarea
                        rows={3}
                        value={formData.dismissedExplanation}
                        onChange={(e) =>
                          handleSimpleChange(
                            "dismissedExplanation",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 border rounded text-xs focus:outline-none focus:border-[var(--color-gold)]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[var(--color-gray-200)] pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h2 className="font-heading font-bold text-xl text-[var(--color-primary)]">
                    Employment History (5 Years)
                  </h2>
                  <p className="text-xs text-[var(--color-gray-500)] mt-1">
                    Account for all time, including self-employment, gaps, or
                    unemployment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addListItem("history", {
                      from: "",
                      to: "",
                      hoursPerWeek: "",
                      companyName: "",
                      positionTitle: "",
                      streetAddress: "",
                      city: "",
                      state: "",
                      zipCode: "",
                      phone: "",
                      startingSalary: "",
                      endingSalary: "",
                      duties: "",
                      supervisorName: "",
                      reasonForLeaving: "",
                      mayContact: "Yes",
                      contactExplanation: "",
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--color-gold)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Plus size={14} /> Add Another Employer
                </button>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Please list any other names you have used while employed:
                </label>
                <input
                  type="text"
                  value={formData.otherNamesUsed}
                  onChange={(e) =>
                    handleSimpleChange("otherNamesUsed", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-xl border border-[var(--color-gray-300)] text-sm"
                />
              </div>

              <div className="space-y-6">
                {formData.history.map((job, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-[var(--color-gray-200)] bg-[var(--color-gray-50)] relative space-y-4"
                  >
                    {formData.history.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem("history", idx)}
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    <span className="text-xs font-heading font-bold text-[var(--color-gold)] uppercase tracking-wider">
                      Employer Entry #{idx + 1}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Dates (From - To)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={job.from}
                            onChange={(e) =>
                              handleNestedListChange(
                                "history",
                                idx,
                                "from",
                                e.target.value,
                              )
                            }
                            className="w-1/2 bg-white px-2 py-1.5 border rounded text-xs"
                          />
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={job.to}
                            onChange={(e) =>
                              handleNestedListChange(
                                "history",
                                idx,
                                "to",
                                e.target.value,
                              )
                            }
                            className="w-1/2 bg-white px-2 py-1.5 border rounded text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Hours/Week
                        </label>
                        <input
                          type="text"
                          value={job.hoursPerWeek}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "hoursPerWeek",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={job.positionTitle}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "positionTitle",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={job.companyName}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "companyName",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Company Phone #
                        </label>
                        <input
                          type="text"
                          value={job.phone}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "phone",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={job.streetAddress}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "streetAddress",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-2 py-1.5 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={job.city}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "city",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-2 py-1.5 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={job.state}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "state",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-2 py-1.5 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={job.zipCode}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "zipCode",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-2 py-1.5 border rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Starting / Ending Salary
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Starting"
                            value={job.startingSalary}
                            onChange={(e) =>
                              handleNestedListChange(
                                "history",
                                idx,
                                "startingSalary",
                                e.target.value,
                              )
                            }
                            className="w-1/2 bg-white px-2 py-1.5 border rounded text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Ending"
                            value={job.endingSalary}
                            onChange={(e) =>
                              handleNestedListChange(
                                "history",
                                idx,
                                "endingSalary",
                                e.target.value,
                              )
                            }
                            className="w-1/2 bg-white px-2 py-1.5 border rounded text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Supervisor's Name
                        </label>
                        <input
                          type="text"
                          value={job.supervisorName}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "supervisorName",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                          Reason for Leaving
                        </label>
                        <input
                          type="text"
                          value={job.reasonForLeaving}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "reasonForLeaving",
                              e.target.value,
                            )
                          }
                          className="w-full bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                        Duties
                      </label>
                      <textarea
                        rows={2}
                        value={job.duties}
                        onChange={(e) =>
                          handleNestedListChange(
                            "history",
                            idx,
                            "duties",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs focus:outline-none focus:border-[var(--color-gold)]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center text-xs">
                      <span>May we contact this employer?</span>
                      <div className="flex gap-4">
                        {["Yes", "No"].map((opt) => (
                          <label
                            key={opt}
                            className="inline-flex items-center gap-1 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`mayContact_${idx}`}
                              value={opt}
                              checked={job.mayContact === opt}
                              onChange={(e) =>
                                handleNestedListChange(
                                  "history",
                                  idx,
                                  "mayContact",
                                  e.target.value,
                                )
                              }
                              className="accent-[var(--color-gold)]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                      {job.mayContact === "No" && (
                        <input
                          type="text"
                          placeholder="If No, please explain"
                          value={job.contactExplanation}
                          onChange={(e) =>
                            handleNestedListChange(
                              "history",
                              idx,
                              "contactExplanation",
                              e.target.value,
                            )
                          }
                          className="flex-1 bg-white px-3 py-1.5 border rounded text-xs"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--color-gray-200)] pb-3">
                  <div>
                    <h2 className="font-heading font-bold text-lg text-[var(--color-primary)]">
                      Education and Training
                    </h2>
                    <span className="text-xs text-[var(--color-gray-500)] italic">
                      Proof of degree or license may be required upon hire
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addListItem("education", {
                        institution: "",
                        cityState: "",
                        degree: "",
                        yearAttained: "",
                        hoursEarned: "",
                        major: "",
                      })
                    }
                    className="text-xs font-bold text-[var(--color-gold)] flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Row
                  </button>
                </div>

                {formData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] grid grid-cols-1 sm:grid-cols-6 gap-3 relative"
                  >
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem("education", idx)}
                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        School / Campus
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleNestedListChange(
                            "education",
                            idx,
                            "institution",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        City/State
                      </label>
                      <input
                        type="text"
                        value={edu.cityState}
                        onChange={(e) =>
                          handleNestedListChange(
                            "education",
                            idx,
                            "cityState",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleNestedListChange(
                            "education",
                            idx,
                            "degree",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Hours
                      </label>
                      <input
                        type="text"
                        value={edu.hoursEarned}
                        onChange={(e) =>
                          handleNestedListChange(
                            "education",
                            idx,
                            "hoursEarned",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Major
                      </label>
                      <input
                        type="text"
                        value={edu.major}
                        onChange={(e) =>
                          handleNestedListChange(
                            "education",
                            idx,
                            "major",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--color-gray-200)] pb-3">
                  <h2 className="font-heading font-bold text-lg text-[var(--color-primary)]">
                    Current Licenses & Professional Registrations
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      addListItem("licenses", {
                        name: "",
                        institution: "",
                        stateReceived: "",
                        yearAttained: "",
                        expirationDate: "",
                      })
                    }
                    className="text-xs font-bold text-[var(--color-gold)] flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Row
                  </button>
                </div>

                {formData.licenses.map((lic, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] grid grid-cols-1 sm:grid-cols-5 gap-3 relative"
                  >
                    {formData.licenses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem("licenses", idx)}
                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        License Name
                      </label>
                      <input
                        type="text"
                        value={lic.name}
                        onChange={(e) =>
                          handleNestedListChange(
                            "licenses",
                            idx,
                            "name",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={lic.institution}
                        onChange={(e) =>
                          handleNestedListChange(
                            "licenses",
                            idx,
                            "institution",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={lic.stateReceived}
                        onChange={(e) =>
                          handleNestedListChange(
                            "licenses",
                            idx,
                            "stateReceived",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Year
                      </label>
                      <input
                        type="text"
                        value={lic.yearAttained}
                        onChange={(e) =>
                          handleNestedListChange(
                            "licenses",
                            idx,
                            "yearAttained",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Expires
                      </label>
                      <input
                        type="text"
                        value={lic.expirationDate}
                        onChange={(e) =>
                          handleNestedListChange(
                            "licenses",
                            idx,
                            "expirationDate",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--color-gray-200)] pb-3">
                  <h2 className="font-heading font-bold text-lg text-[var(--color-primary)]">
                    Other Training / Course Work
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      addListItem("otherTraining", {
                        topic: "",
                        institution: "",
                        stateReceived: "",
                        level: "",
                        yearAttained: "",
                        cert: "",
                      })
                    }
                    className="text-xs font-bold text-[var(--color-gold)] flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Row
                  </button>
                </div>

                {formData.otherTraining.map((tr, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] grid grid-cols-1 sm:grid-cols-6 gap-3 relative"
                  >
                    {formData.otherTraining.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem("otherTraining", idx)}
                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Topic
                      </label>
                      <input
                        type="text"
                        value={tr.topic}
                        onChange={(e) =>
                          handleNestedListChange(
                            "otherTraining",
                            idx,
                            "topic",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={tr.institution}
                        onChange={(e) =>
                          handleNestedListChange(
                            "otherTraining",
                            idx,
                            "institution",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={tr.stateReceived}
                        onChange={(e) =>
                          handleNestedListChange(
                            "otherTraining",
                            idx,
                            "stateReceived",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Level
                      </label>
                      <input
                        type="text"
                        value={tr.level}
                        onChange={(e) =>
                          handleNestedListChange(
                            "otherTraining",
                            idx,
                            "level",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Year
                      </label>
                      <input
                        type="text"
                        value={tr.yearAttained}
                        onChange={(e) =>
                          handleNestedListChange(
                            "otherTraining",
                            idx,
                            "yearAttained",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] uppercase mb-0.5">
                        Certificate
                      </label>
                      <input
                        type="text"
                        value={tr.cert}
                        onChange={(e) =>
                          handleNestedListChange(
                            "otherTraining",
                            idx,
                            "cert",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="p-5 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] space-y-4">
                <h2 className="font-heading font-bold text-lg text-[var(--color-primary)]">
                  State of Arizona Driver Form
                </h2>
                <div className="text-xs text-[var(--color-gray-700)] space-y-1 text-justify leading-relaxed">
                  <p>
                    Please complete this section if the position you are
                    applying will require you to drive a vehicle as part of your
                    job responsibilities.
                  </p>
                  <p>
                    I understand to operate a personally owned vehicle or fleet
                    motor vehicle for the furtherance of State business purposes
                    I must have an acceptable driving record and complete
                    applicable driver training as required by Arizona
                    Administrative Code R2-10-207(11).
                  </p>
                  <p>
                    I understand the Driver Protection Privacy Act of 1994,
                    amended September 1997, prohibits the release of my Motor
                    Vehicle Record for reasons other than matters of motor
                    vehicle or driver safety.
                  </p>
                  <p>
                    I understand I may be asked and would be responsible for
                    providing a copy of my thirty-nine (39) month motor vehicle
                    record history if I do not have a current Arizona driver
                    license.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                    Name (print as it appears on your driver license)
                  </label>
                  <input
                    type="text"
                    value={formData.driverFullName}
                    onChange={(e) =>
                      handleSimpleChange("driverFullName", e.target.value)
                    }
                    className="w-full bg-white px-3 py-2 border rounded text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                      Valid U.S. Driver License?
                    </label>
                    <select
                      value={formData.hasDriverLicense}
                      onChange={(e) =>
                        handleSimpleChange("hasDriverLicense", e.target.value)
                      }
                      className="w-full bg-white p-2 border rounded text-xs"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                      State of Issue
                    </label>
                    <input
                      type="text"
                      value={formData.driverLicenseState}
                      onChange={(e) =>
                        handleSimpleChange("driverLicenseState", e.target.value)
                      }
                      className="w-full bg-white p-2 border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={formData.driverLicenseNumber}
                      onChange={(e) =>
                        handleSimpleChange(
                          "driverLicenseNumber",
                          e.target.value,
                        )
                      }
                      className="w-full bg-white p-2 border rounded text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                      Valid U.S. CDL?
                    </label>
                    <select
                      value={formData.hasCDL}
                      onChange={(e) =>
                        handleSimpleChange("hasCDL", e.target.value)
                      }
                      className="w-full bg-white p-2 border rounded text-xs"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                      CDL State of Issue
                    </label>
                    <input
                      type="text"
                      value={formData.cdlState}
                      onChange={(e) =>
                        handleSimpleChange("cdlState", e.target.value)
                      }
                      className="w-full bg-white p-2 border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                      CDL Number
                    </label>
                    <input
                      type="text"
                      value={formData.cdlNumber}
                      onChange={(e) =>
                        handleSimpleChange("cdlNumber", e.target.value)
                      }
                      className="w-full bg-white p-2 border rounded text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-[var(--color-gray-200)] pb-2">
                  <h2 className="font-heading font-bold text-lg text-[var(--color-primary)]">
                    Professional References
                  </h2>
                  <p className="text-xs text-[var(--color-gray-500)]">
                    Required for applicants with no prior work history. List
                    names and contact information of references who may be
                    contacted.
                  </p>
                </div>

                {formData.references.map((ref, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)]"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] mb-0.5">
                        Name
                      </label>
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) =>
                          handleNestedListChange(
                            "references",
                            idx,
                            "name",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] mb-0.5">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={ref.relationship}
                        onChange={(e) =>
                          handleNestedListChange(
                            "references",
                            idx,
                            "relationship",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] mb-0.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={ref.phone}
                        onChange={(e) =>
                          handleNestedListChange(
                            "references",
                            idx,
                            "phone",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] mb-0.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={ref.email}
                        onChange={(e) =>
                          handleNestedListChange(
                            "references",
                            idx,
                            "email",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[var(--color-gray-700)] mb-0.5">
                        From - To (Mo/Yr)
                      </label>
                      <input
                        type="text"
                        value={ref.fromToDates}
                        onChange={(e) =>
                          handleNestedListChange(
                            "references",
                            idx,
                            "fromToDates",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white p-2 border rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Additional Information (from Page 4 of application)
                </label>
                <textarea
                  rows={4}
                  value={formData.additionalInformation}
                  onChange={(e) =>
                    handleSimpleChange("additionalInformation", e.target.value)
                  }
                  placeholder="Provide any additional explanation, certifications, gaps in history, or comments..."
                  className="w-full p-3 border rounded-xl text-xs focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-[var(--color-gray-200)] pb-4">
                <h2 className="font-heading font-bold text-xl text-[var(--color-primary)]">
                  Certification and Agreement
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-gray-50)] border-l-4 border-[var(--color-gold)] text-xs text-[var(--color-gray-700)] leading-relaxed space-y-3 text-justify">
                <p>
                  I certify that all the information provided in this
                  application and in support of this selection process (i.e.,
                  resume) herein is true and complete to the best of my
                  knowledge. I agree and understand that omissions,
                  misstatements and falsifications may cause forfeiture on my
                  part of all eligibility to any employment with the State of
                  Arizona and may be cause for rejection of this application,
                  removal of my name from eligibility lists, or dismissal from
                  State employment. In addition, I give the State of Arizona the
                  right to investigate and verify any information obtained
                  through the application process. Permission is granted and I
                  release from any and all liability any employer, agency,
                  individual or educational institution assisting the State of
                  Arizona in providing relevant, job-related information that
                  will assist in the process.
                </p>
                <p className="font-bold text-[var(--color-primary)]">
                  My signature below certifies that I have read and understand
                  this application and agree to the terms and conditions
                  outlined in the document.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    handleSimpleChange("agreeTerms", e.target.checked)
                  }
                  className="w-4 h-4 accent-[var(--color-gold)] cursor-pointer"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-xs font-semibold cursor-pointer"
                >
                  I certify that I have read, understand, and agree to these
                  terms.
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--color-gray-200)]">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                    Printed Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.printedName}
                    onChange={(e) =>
                      handleSimpleChange("printedName", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                    Applicant Signature *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="(Full name signature)"
                    value={formData.applicantSignature}
                    onChange={(e) =>
                      handleSimpleChange("applicantSignature", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-xl italic font-serif text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-gray-700)] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.signDate}
                    onChange={(e) =>
                      handleSimpleChange("signDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="text-center text-[11px] text-[var(--color-gray-500)] italic space-y-1">
                <p>
                  Arizona State Government is an AA/EOE/ADA Reasonable
                  Accommodation Employer.
                </p>
                <p>
                  Persons with a disability may request a reasonable
                  accommodation by contacting the agency Human Resources Office.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-[var(--color-gray-200)]">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="site-btn !bg-white !text-[var(--color-primary)] border border-[var(--color-gray-300)]"
              >
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="site-btn btn-primary shadow-gold"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.agreeTerms}
                className="site-btn btn-primary shadow-gold disabled:opacity-50"
              >
                Submit & Start Quiz <Send size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
