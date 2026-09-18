import React, { useState } from "react";

export default function EmploymentForm() {
  const [formData, setFormData] = useState({
    // Page 1: Top Bar & Basic Info
    applicantNameTop: "",
    dateOfApplication: "",
    positionApplied: "",
    jobId: "",
    stateAgency: "",

    // Personal Info
    lastName: "",
    firstName: "",
    middleInitial: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    cellPhone: "",
    otherPhone: "",
    personalEmail: "",

    // Eligibility Options
    isOver18: "",
    canVerifyWorkEligibility: "",
    requiresVisaSponsorship: "",
    workedForStateAZ: "",
    lastStateAgency: "",
    ein: "",
    lastEmploymentDate: "",
    reasonLeavingState: "",
    dismissedOrResigned: "",
    dismissedExplanation: "",

    // Page 2 & 3: Employment History
    otherNamesUsed: "",
    history1: {
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
      mayContact: "",
      contactExplanation: "",
    },
    history2: {
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
      mayContact: "",
      contactExplanation: "",
    },
    history3: {
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
      mayContact: "",
      contactExplanation: "",
    },

    // Page 3: Education & Training
    education: [
      {
        institution: "",
        cityState: "",
        degree: "",
        yearAttained: "",
        hoursEarned: "",
        major: "",
      },
      {
        institution: "",
        cityState: "",
        degree: "",
        yearAttained: "",
        hoursEarned: "",
        major: "",
      },
      {
        institution: "",
        cityState: "",
        degree: "",
        yearAttained: "",
        hoursEarned: "",
        major: "",
      },
    ],

    // Licenses & Certifications
    licenses: [
      {
        name: "",
        institution: "",
        stateReceived: "",
        yearAttained: "",
        expirationDate: "",
      },
      {
        name: "",
        institution: "",
        stateReceived: "",
        yearAttained: "",
        expirationDate: "",
      },
    ],

    // Other Training
    otherTraining: [
      {
        topic: "",
        institution: "",
        stateReceived: "",
        level: "",
        yearAttained: "",
        cert: "",
      },
      {
        topic: "",
        institution: "",
        stateReceived: "",
        level: "",
        yearAttained: "",
        cert: "",
      },
    ],

    // Page 4: Professional References
    references: [
      { name: "", relationship: "", phone: "", email: "", fromToDates: "" },
      { name: "", relationship: "", phone: "", email: "", fromToDates: "" },
      { name: "", relationship: "", phone: "", email: "", fromToDates: "" },
    ],
    additionalInformation: "",

    // Page 5: Driver Form
    driverFullName: "",
    hasDriverLicense: "",
    driverLicenseState: "",
    driverLicenseNumber: "",
    hasCDL: "",
    cdlState: "",
    cdlNumber: "",

    // Certification
    printedName: "",
    applicantSignature: "",
    signDate: "",
  });

  const handleSimpleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedHistoryChange = (historyKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [historyKey]: { ...prev[historyKey], [field]: value },
    }));
  };

  const handleDynamicListChange = (listName, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[listName]];
      updated[index][field] = value;
      return { ...prev, [listName]: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Form Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-100)] py-10 px-4 sm:px-6 font-sans text-[var(--color-primary)] text-sm md:text-base leading-relaxed">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-12">
        {/* PAGE 1 */}
        <div className="bg-white border-2 border-[var(--color-primary)] p-6 md:p-10 shadow-md">
          <div className="text-center pb-4 border-b-2 border-[var(--color-primary)] mb-6">
            <span className="section-label mb-2 justify-center">
              Arizona State Personnel System
            </span>
            <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight uppercase text-[var(--color-primary)] mt-1">
              APPLICATION FOR EMPLOYMENT
            </h1>
          </div>

          <div className="border border-[var(--color-primary)] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)] mb-6">
            <div className="md:col-span-8 p-3">
              <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                Applicant Name (Last, First, MI)
              </label>
              <input
                type="text"
                value={formData.applicantNameTop}
                onChange={(e) =>
                  handleSimpleChange("applicantNameTop", e.target.value)
                }
                className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] text-base py-1"
              />
            </div>
            <div className="md:col-span-4 p-3">
              <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                Date of Application
              </label>
              <input
                type="date"
                value={formData.dateOfApplication}
                onChange={(e) =>
                  handleSimpleChange("dateOfApplication", e.target.value)
                }
                className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] text-base py-1"
              />
            </div>
          </div>

          <div className="border border-[var(--color-primary)] mb-6">
            <div className="bg-[var(--color-primary)] text-white px-3 py-2 font-heading font-bold text-sm uppercase tracking-wide">
              State of Arizona Position for Which You Are Applying:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="md:col-span-6 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.positionApplied}
                  onChange={(e) =>
                    handleSimpleChange("positionApplied", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] text-base py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Job ID #
                </label>
                <input
                  type="text"
                  value={formData.jobId}
                  onChange={(e) => handleSimpleChange("jobId", e.target.value)}
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] text-base py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  State Agency
                </label>
                <input
                  type="text"
                  value={formData.stateAgency}
                  onChange={(e) =>
                    handleSimpleChange("stateAgency", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] text-base py-1"
                />
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[var(--color-gold)] bg-[var(--color-gray-50)] p-4 text-xs md:text-sm leading-relaxed text-[var(--color-gray-700)] mb-6 text-justify">
            Completion of this application form in no way constitutes an offer
            of employment. The information is required to provide the agency
            with information necessary to consider you for the position for
            which you are applying. All information contained on this
            application is subject to verification. If applicable, the State of
            Arizona may conduct background checks, including, but not limited
            to, work references, driving records, and education attainment. If
            criminal record information is not required prior to or at the time
            of the initial interview, it may be requested later in the
            recruitment process. A criminal conviction(s) may or may not
            constitute an automatic disqualification from employment.
          </div>

          <div className="text-center font-heading font-bold text-xs md:text-sm uppercase tracking-wider py-2 border-y border-[var(--color-primary)] mb-6 bg-[var(--color-gray-100)] text-[var(--color-primary)]">
            PLEASE PRINT LEGIBLY OR TYPE ALL REQUESTED INFORMATION
          </div>

          <div className="border border-[var(--color-primary)] divide-y divide-[var(--color-primary)] mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="md:col-span-5 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleSimpleChange("lastName", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-5 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleSimpleChange("firstName", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-2 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  M.I.
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.middleInitial}
                  onChange={(e) =>
                    handleSimpleChange("middleInitial", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="md:col-span-5 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    handleSimpleChange("streetAddress", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-4 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleSimpleChange("city", e.target.value)}
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-1 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleSimpleChange("state", e.target.value)}
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-2 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) =>
                    handleSimpleChange("zipCode", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="md:col-span-4 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Cell Phone (include area codes)
                </label>
                <input
                  type="tel"
                  value={formData.cellPhone}
                  onChange={(e) =>
                    handleSimpleChange("cellPhone", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-4 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Other Phone
                </label>
                <input
                  type="tel"
                  value={formData.otherPhone}
                  onChange={(e) =>
                    handleSimpleChange("otherPhone", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
              <div className="md:col-span-4 p-3">
                <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
                  Personal E-mail Address
                </label>
                <input
                  type="email"
                  value={formData.personalEmail}
                  onChange={(e) =>
                    handleSimpleChange("personalEmail", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
                />
              </div>
            </div>
          </div>

          <div className="border border-[var(--color-primary)] divide-y divide-[var(--color-primary)] text-sm md:text-base">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-2">
              <span className="font-medium">
                Are you 18 years of age or older?
              </span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isOver18"
                    value="Yes"
                    checked={formData.isOver18 === "Yes"}
                    onChange={(e) =>
                      handleSimpleChange("isOver18", e.target.value)
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isOver18"
                    value="No"
                    checked={formData.isOver18 === "No"}
                    onChange={(e) =>
                      handleSimpleChange("isOver18", e.target.value)
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-2">
              <span className="font-medium">
                Can you provide verification of your eligibility to work in the
                U.S.?
              </span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="canVerifyWorkEligibility"
                    value="Yes"
                    checked={formData.canVerifyWorkEligibility === "Yes"}
                    onChange={(e) =>
                      handleSimpleChange(
                        "canVerifyWorkEligibility",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="canVerifyWorkEligibility"
                    value="No"
                    checked={formData.canVerifyWorkEligibility === "No"}
                    onChange={(e) =>
                      handleSimpleChange(
                        "canVerifyWorkEligibility",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-2">
              <span className="font-medium">
                Will you now or in the future require sponsorship for employment
                visa status (e.g. H-1B visa status)?
              </span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="requiresVisaSponsorship"
                    value="Yes"
                    checked={formData.requiresVisaSponsorship === "Yes"}
                    onChange={(e) =>
                      handleSimpleChange(
                        "requiresVisaSponsorship",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="requiresVisaSponsorship"
                    value="No"
                    checked={formData.requiresVisaSponsorship === "No"}
                    onChange={(e) =>
                      handleSimpleChange(
                        "requiresVisaSponsorship",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="p-3 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="font-medium">
                  Do you currently or have you ever worked for the State of
                  Arizona?
                </span>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workedForStateAZ"
                      value="Yes"
                      checked={formData.workedForStateAZ === "Yes"}
                      onChange={(e) =>
                        handleSimpleChange("workedForStateAZ", e.target.value)
                      }
                      className="w-4 h-4 accent-[var(--color-gold)]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workedForStateAZ"
                      value="No"
                      checked={formData.workedForStateAZ === "No"}
                      onChange={(e) =>
                        handleSimpleChange("workedForStateAZ", e.target.value)
                      }
                      className="w-4 h-4 accent-[var(--color-gold)]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.workedForStateAZ === "Yes" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-dotted border-[var(--color-gray-300)]">
                  <div>
                    <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                      If yes, State Agency
                    </label>
                    <input
                      type="text"
                      value={formData.lastStateAgency}
                      onChange={(e) =>
                        handleSimpleChange("lastStateAgency", e.target.value)
                      }
                      className="w-full border border-[var(--color-gray-300)] p-1.5 text-sm focus:border-[var(--color-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                      EIN
                    </label>
                    <input
                      type="text"
                      value={formData.ein}
                      onChange={(e) =>
                        handleSimpleChange("ein", e.target.value)
                      }
                      className="w-full border border-[var(--color-gray-300)] p-1.5 text-sm focus:border-[var(--color-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                      Last employment date
                    </label>
                    <input
                      type="date"
                      value={formData.lastEmploymentDate}
                      onChange={(e) =>
                        handleSimpleChange("lastEmploymentDate", e.target.value)
                      }
                      className="w-full border border-[var(--color-gray-300)] p-1.5 text-sm focus:border-[var(--color-gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                      Reason for leaving
                    </label>
                    <input
                      type="text"
                      value={formData.reasonLeavingState}
                      onChange={(e) =>
                        handleSimpleChange("reasonLeavingState", e.target.value)
                      }
                      className="w-full border border-[var(--color-gray-300)] p-1.5 text-sm focus:border-[var(--color-gold)]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="font-medium">
                  Have you ever been dismissed or allowed to resign from a
                  position in lieu of dismissal?
                </span>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dismissedOrResigned"
                      value="Yes"
                      checked={formData.dismissedOrResigned === "Yes"}
                      onChange={(e) =>
                        handleSimpleChange(
                          "dismissedOrResigned",
                          e.target.value,
                        )
                      }
                      className="w-4 h-4 accent-[var(--color-gold)]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dismissedOrResigned"
                      value="No"
                      checked={formData.dismissedOrResigned === "No"}
                      onChange={(e) =>
                        handleSimpleChange(
                          "dismissedOrResigned",
                          e.target.value,
                        )
                      }
                      className="w-4 h-4 accent-[var(--color-gold)]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.dismissedOrResigned === "Yes" && (
                <div className="pt-3 border-t border-dotted border-[var(--color-gray-300)]">
                  <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-2">
                    If yes, provide the name of the employer, the dates of
                    employment, and describe the circumstances:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.dismissedExplanation}
                    onChange={(e) =>
                      handleSimpleChange("dismissedExplanation", e.target.value)
                    }
                    className="w-full border border-[var(--color-gray-300)] p-2 text-sm focus:border-[var(--color-gold)]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs text-[var(--color-gray-500)] font-mono">
            <span>ASPS/HRD FA3.01 (1) 4/19</span>
            <span>Page 1 of 5</span>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="bg-white border-2 border-[var(--color-primary)] p-6 md:p-10 shadow-md">
          <div className="flex justify-between items-center border-b border-[var(--color-primary)] pb-3 mb-6">
            <span className="font-heading font-bold text-sm md:text-base">
              Applicant Name:{" "}
              <span className="underline">
                {formData.applicantNameTop || "__________________________"}
              </span>
            </span>
            <span className="font-heading font-bold text-base md:text-lg uppercase text-[var(--color-primary)]">
              EMPLOYMENT HISTORY
            </span>
          </div>

          <p className="text-xs md:text-sm text-[var(--color-gray-700)] mb-6 bg-[var(--color-gray-50)] p-3 border-l-4 border-[var(--color-gold)]">
            The State's policy is to verify the most recent five (5) years of
            employment history by contacting current and prior employers.
            Account for all time, including self-employment, gaps in employment,
            or periods of unemployment.
          </p>

          <div className="mb-6 border border-[var(--color-primary)] p-3">
            <label className="block text-xs font-heading font-bold uppercase text-[var(--color-gray-700)] mb-1">
              Please list any other names you have used while employed:
            </label>
            <input
              type="text"
              value={formData.otherNamesUsed}
              onChange={(e) =>
                handleSimpleChange("otherNamesUsed", e.target.value)
              }
              className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] text-base py-1"
            />
          </div>

          {/* History Block 1 */}
          <div className="border border-[var(--color-primary)] mb-8 divide-y divide-[var(--color-primary)]">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)] bg-[var(--color-gray-50)]">
              <div className="md:col-span-3 p-3 font-heading font-bold text-xs uppercase flex items-center">
                DATES OF EMPLOYMENT
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  From (Mo/Yr)
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.history1.from}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "from",
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  To (Mo/Yr)
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.history1.to}
                  onChange={(e) =>
                    handleNestedHistoryChange("history1", "to", e.target.value)
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Hours per week
                </label>
                <input
                  type="text"
                  value={formData.history1.hoursPerWeek}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "hoursPerWeek",
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.history1.companyName}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "companyName",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.history1.positionTitle}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "positionTitle",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.history1.streetAddress}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "streetAddress",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.history1.city}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "city",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  State / ZIP Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ST"
                    value={formData.history1.state}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "state",
                        e.target.value,
                      )
                    }
                    className="w-12 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={formData.history1.zipCode}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "zipCode",
                        e.target.value,
                      )
                    }
                    className="flex-1 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Company Phone #
                </label>
                <input
                  type="text"
                  value={formData.history1.phone}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "phone",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="p-3">
              <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                Duties
              </label>
              <textarea
                rows={2}
                value={formData.history1.duties}
                onChange={(e) =>
                  handleNestedHistoryChange(
                    "history1",
                    "duties",
                    e.target.value,
                  )
                }
                className="w-full border border-[var(--color-gray-300)] p-2 text-sm focus:border-[var(--color-gold)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Starting Salary / Ending Salary
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start"
                    value={formData.history1.startingSalary}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "startingSalary",
                        e.target.value,
                      )
                    }
                    className="w-1/2 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                  <input
                    type="text"
                    placeholder="End"
                    value={formData.history1.endingSalary}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "endingSalary",
                        e.target.value,
                      )
                    }
                    className="w-1/2 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Supervisor's Name
                </label>
                <input
                  type="text"
                  value={formData.history1.supervisorName}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "supervisorName",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Reason for Leaving
                </label>
                <input
                  type="text"
                  value={formData.history1.reasonForLeaving}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history1",
                      "reasonForLeaving",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="p-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[var(--color-gray-50)] text-sm">
              <span className="font-medium">May we contact this employer?</span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact1"
                    value="Yes"
                    checked={formData.history1.mayContact === "Yes"}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "mayContact",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact1"
                    value="No"
                    checked={formData.history1.mayContact === "No"}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "mayContact",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>
              {formData.history1.mayContact === "No" && (
                <div className="flex-1 w-full flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-xs text-[var(--color-gray-500)]">
                    If "No", explain:
                  </span>
                  <input
                    type="text"
                    value={formData.history1.contactExplanation}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history1",
                        "contactExplanation",
                        e.target.value,
                      )
                    }
                    className="flex-1 border-b border-[var(--color-gray-400)] text-sm py-0.5"
                  />
                </div>
              )}
            </div>
          </div>

          {/* History Block 2 */}
          <div className="border border-[var(--color-primary)] mb-6 divide-y divide-[var(--color-primary)]">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)] bg-[var(--color-gray-50)]">
              <div className="md:col-span-3 p-3 font-heading font-bold text-xs uppercase flex items-center">
                DATES OF EMPLOYMENT
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  From (Mo/Yr)
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.history2.from}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "from",
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  To (Mo/Yr)
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.history2.to}
                  onChange={(e) =>
                    handleNestedHistoryChange("history2", "to", e.target.value)
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Hours per week
                </label>
                <input
                  type="text"
                  value={formData.history2.hoursPerWeek}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "hoursPerWeek",
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.history2.companyName}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "companyName",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.history2.positionTitle}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "positionTitle",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.history2.streetAddress}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "streetAddress",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.history2.city}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "city",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  State / ZIP Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ST"
                    value={formData.history2.state}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "state",
                        e.target.value,
                      )
                    }
                    className="w-12 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={formData.history2.zipCode}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "zipCode",
                        e.target.value,
                      )
                    }
                    className="flex-1 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Company Phone #
                </label>
                <input
                  type="text"
                  value={formData.history2.phone}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "phone",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="p-3">
              <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                Duties
              </label>
              <textarea
                rows={2}
                value={formData.history2.duties}
                onChange={(e) =>
                  handleNestedHistoryChange(
                    "history2",
                    "duties",
                    e.target.value,
                  )
                }
                className="w-full border border-[var(--color-gray-300)] p-2 text-sm focus:border-[var(--color-gold)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Starting Salary / Ending Salary
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start"
                    value={formData.history2.startingSalary}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "startingSalary",
                        e.target.value,
                      )
                    }
                    className="w-1/2 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                  <input
                    type="text"
                    placeholder="End"
                    value={formData.history2.endingSalary}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "endingSalary",
                        e.target.value,
                      )
                    }
                    className="w-1/2 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Supervisor's Name
                </label>
                <input
                  type="text"
                  value={formData.history2.supervisorName}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "supervisorName",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Reason for Leaving
                </label>
                <input
                  type="text"
                  value={formData.history2.reasonForLeaving}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history2",
                      "reasonForLeaving",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="p-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[var(--color-gray-50)] text-sm">
              <span className="font-medium">May we contact this employer?</span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact2"
                    value="Yes"
                    checked={formData.history2.mayContact === "Yes"}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "mayContact",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact2"
                    value="No"
                    checked={formData.history2.mayContact === "No"}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "mayContact",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>
              {formData.history2.mayContact === "No" && (
                <div className="flex-1 w-full flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-xs text-[var(--color-gray-500)]">
                    If "No", explain:
                  </span>
                  <input
                    type="text"
                    value={formData.history2.contactExplanation}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history2",
                        "contactExplanation",
                        e.target.value,
                      )
                    }
                    className="flex-1 border-b border-[var(--color-gray-400)] text-sm py-0.5"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs text-[var(--color-gray-500)] font-mono">
            <span>ASPS/HRD FA3.01 (1) 4/19</span>
            <span>Page 2 of 5</span>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="bg-white border-2 border-[var(--color-primary)] p-6 md:p-10 shadow-md">
          <div className="flex justify-between items-center border-b border-[var(--color-primary)] pb-3 mb-6">
            <span className="font-heading font-bold text-sm md:text-base">
              Applicant Name:{" "}
              <span className="underline">
                {formData.applicantNameTop || "__________________________"}
              </span>
            </span>
            <span className="font-heading font-bold text-base md:text-lg uppercase text-[var(--color-primary)]">
              EMPLOYMENT HISTORY (continued)
            </span>
          </div>

          {/* History Block 3 */}
          <div className="border border-[var(--color-primary)] mb-8 divide-y divide-[var(--color-primary)]">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)] bg-[var(--color-gray-50)]">
              <div className="md:col-span-3 p-3 font-heading font-bold text-xs uppercase flex items-center">
                DATES OF EMPLOYMENT
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  From (Mo/Yr)
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.history3.from}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "from",
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  To (Mo/Yr)
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.history3.to}
                  onChange={(e) =>
                    handleNestedHistoryChange("history3", "to", e.target.value)
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="md:col-span-3 p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Hours per week
                </label>
                <input
                  type="text"
                  value={formData.history3.hoursPerWeek}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "hoursPerWeek",
                      e.target.value,
                    )
                  }
                  className="w-full bg-transparent border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.history3.companyName}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "companyName",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.history3.positionTitle}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "positionTitle",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.history3.streetAddress}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "streetAddress",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.history3.city}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "city",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  State / ZIP Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ST"
                    value={formData.history3.state}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "state",
                        e.target.value,
                      )
                    }
                    className="w-12 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={formData.history3.zipCode}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "zipCode",
                        e.target.value,
                      )
                    }
                    className="flex-1 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Company Phone #
                </label>
                <input
                  type="text"
                  value={formData.history3.phone}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "phone",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="p-3">
              <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] mb-1">
                Duties
              </label>
              <textarea
                rows={2}
                value={formData.history3.duties}
                onChange={(e) =>
                  handleNestedHistoryChange(
                    "history3",
                    "duties",
                    e.target.value,
                  )
                }
                className="w-full border border-[var(--color-gray-300)] p-2 text-sm focus:border-[var(--color-gold)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]">
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Starting Salary / Ending Salary
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start"
                    value={formData.history3.startingSalary}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "startingSalary",
                        e.target.value,
                      )
                    }
                    className="w-1/2 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                  <input
                    type="text"
                    placeholder="End"
                    value={formData.history3.endingSalary}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "endingSalary",
                        e.target.value,
                      )
                    }
                    className="w-1/2 border-b border-[var(--color-gray-300)] text-sm py-1"
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Supervisor's Name
                </label>
                <input
                  type="text"
                  value={formData.history3.supervisorName}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "supervisorName",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
              <div className="p-3">
                <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                  Reason for Leaving
                </label>
                <input
                  type="text"
                  value={formData.history3.reasonForLeaving}
                  onChange={(e) =>
                    handleNestedHistoryChange(
                      "history3",
                      "reasonForLeaving",
                      e.target.value,
                    )
                  }
                  className="w-full border-b border-[var(--color-gray-300)] text-sm py-1"
                />
              </div>
            </div>

            <div className="p-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[var(--color-gray-50)] text-sm">
              <span className="font-medium">May we contact this employer?</span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact3"
                    value="Yes"
                    checked={formData.history3.mayContact === "Yes"}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "mayContact",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contact3"
                    value="No"
                    checked={formData.history3.mayContact === "No"}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "mayContact",
                        e.target.value,
                      )
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>
              {formData.history3.mayContact === "No" && (
                <div className="flex-1 w-full flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-xs text-[var(--color-gray-500)]">
                    If "No", explain:
                  </span>
                  <input
                    type="text"
                    value={formData.history3.contactExplanation}
                    onChange={(e) =>
                      handleNestedHistoryChange(
                        "history3",
                        "contactExplanation",
                        e.target.value,
                      )
                    }
                    className="flex-1 border-b border-[var(--color-gray-400)] text-sm py-0.5"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Education Table */}
          <div className="mb-8">
            <div className="bg-[var(--color-primary)] text-white px-3 py-2 font-heading font-bold text-xs md:text-sm uppercase flex justify-between items-center">
              <span>EDUCATION AND TRAINING</span>
              <span className="font-sans font-normal text-xs lowercase italic text-[var(--color-gold)]">
                (proof of degree may be required upon hire)
              </span>
            </div>
            <div className="border border-[var(--color-primary)] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[var(--color-gray-100)] border-b border-[var(--color-primary)] divide-x divide-[var(--color-primary)] uppercase font-heading font-bold text-[var(--color-primary)] text-xs">
                    <th className="p-3">
                      College, University, Trade or Business School
                    </th>
                    <th className="p-3">City/State</th>
                    <th className="p-3">Degree/Diploma</th>
                    <th className="p-3">Year Attained</th>
                    <th className="p-3">Hours Earned</th>
                    <th className="p-3">Major Area of Study</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-primary)]">
                  {formData.education.map((item, idx) => (
                    <tr
                      key={idx}
                      className="divide-x divide-[var(--color-primary)]"
                    >
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "education",
                              idx,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.cityState}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "education",
                              idx,
                              "cityState",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.degree}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "education",
                              idx,
                              "degree",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.yearAttained}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "education",
                              idx,
                              "yearAttained",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.hoursEarned}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "education",
                              idx,
                              "hoursEarned",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.major}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "education",
                              idx,
                              "major",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Licenses & Registrations */}
          <div className="mb-8">
            <div className="bg-[var(--color-primary)] text-white px-3 py-2 font-heading font-bold text-xs md:text-sm uppercase">
              CURRENT LICENSES, PROFESSIONAL REGISTRATIONS/CERTIFICATIONS
            </div>
            <div className="border border-[var(--color-primary)] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[var(--color-gray-100)] border-b border-[var(--color-primary)] divide-x divide-[var(--color-primary)] uppercase font-heading font-bold text-[var(--color-primary)] text-xs">
                    <th className="p-3">Name of License / Certification</th>
                    <th className="p-3">Accreditation / Institution</th>
                    <th className="p-3">State Received</th>
                    <th className="p-3">Year Attained</th>
                    <th className="p-3">Expiration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-primary)]">
                  {formData.licenses.map((item, idx) => (
                    <tr
                      key={idx}
                      className="divide-x divide-[var(--color-primary)]"
                    >
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "licenses",
                              idx,
                              "name",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "licenses",
                              idx,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.stateReceived}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "licenses",
                              idx,
                              "stateReceived",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.yearAttained}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "licenses",
                              idx,
                              "yearAttained",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.expirationDate}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "licenses",
                              idx,
                              "expirationDate",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Training */}
          <div className="mb-6">
            <div className="bg-[var(--color-primary)] text-white px-3 py-2 font-heading font-bold text-xs md:text-sm uppercase">
              OTHER TRAINING / COURSE WORK
            </div>
            <div className="border border-[var(--color-primary)] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[var(--color-gray-100)] border-b border-[var(--color-primary)] divide-x divide-[var(--color-primary)] uppercase font-heading font-bold text-[var(--color-primary)] text-xs">
                    <th className="p-3">Type / Topic of Training</th>
                    <th className="p-3">Accreditation / Institution</th>
                    <th className="p-3">State Received</th>
                    <th className="p-3">Level</th>
                    <th className="p-3">Year Attained</th>
                    <th className="p-3">Diploma / Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-primary)]">
                  {formData.otherTraining.map((item, idx) => (
                    <tr
                      key={idx}
                      className="divide-x divide-[var(--color-primary)]"
                    >
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.topic}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "otherTraining",
                              idx,
                              "topic",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "otherTraining",
                              idx,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.stateReceived}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "otherTraining",
                              idx,
                              "stateReceived",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.level}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "otherTraining",
                              idx,
                              "level",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.yearAttained}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "otherTraining",
                              idx,
                              "yearAttained",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.cert}
                          onChange={(e) =>
                            handleDynamicListChange(
                              "otherTraining",
                              idx,
                              "cert",
                              e.target.value,
                            )
                          }
                          className="w-full p-1 border-none focus:outline-none text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs text-[var(--color-gray-500)] font-mono">
            <span>ASPS/HRD FA3.01 (1) 4/19</span>
            <span>Page 3 of 5</span>
          </div>
        </div>

        {/* PAGE 4 */}
        <div className="bg-white border-2 border-[var(--color-primary)] p-6 md:p-10 shadow-md">
          <div className="flex justify-between items-center border-b border-[var(--color-primary)] pb-3 mb-6">
            <span className="font-heading font-bold text-sm md:text-base">
              Applicant Name:{" "}
              <span className="underline">
                {formData.applicantNameTop || "__________________________"}
              </span>
            </span>
            <span className="font-heading font-bold text-base md:text-lg uppercase text-[var(--color-primary)]">
              PROFESSIONAL REFERENCES
            </span>
          </div>

          <div className="bg-[var(--color-gray-50)] p-3 border-l-4 border-[var(--color-gold)] mb-6 text-xs md:text-sm text-[var(--color-gray-700)] leading-relaxed">
            <span className="font-heading font-bold text-[var(--color-primary)]">
              Required for applicants with no prior work history.
            </span>{" "}
            This page must be completed if you do not have employment history.
            Please list the names and contact information of professional
            references who may be contacted.
          </div>

          <div className="border border-[var(--color-primary)] overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[var(--color-gray-100)] border-b border-[var(--color-primary)] divide-x divide-[var(--color-primary)] uppercase font-heading font-bold text-[var(--color-primary)] text-xs">
                  <th className="p-3">Name</th>
                  <th className="p-3">Professional Relationship</th>
                  <th className="p-3">Phone Number</th>
                  <th className="p-3">E-mail Address</th>
                  <th className="p-3">From - To (Mo/Yr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-primary)]">
                {formData.references.map((item, idx) => (
                  <tr
                    key={idx}
                    className="divide-x divide-[var(--color-primary)]"
                  >
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "references",
                            idx,
                            "name",
                            e.target.value,
                          )
                        }
                        className="w-full p-1 border-none focus:outline-none text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.relationship}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "references",
                            idx,
                            "relationship",
                            e.target.value,
                          )
                        }
                        className="w-full p-1 border-none focus:outline-none text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.phone}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "references",
                            idx,
                            "phone",
                            e.target.value,
                          )
                        }
                        className="w-full p-1 border-none focus:outline-none text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.email}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "references",
                            idx,
                            "email",
                            e.target.value,
                          )
                        }
                        className="w-full p-1 border-none focus:outline-none text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.fromToDates}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "references",
                            idx,
                            "fromToDates",
                            e.target.value,
                          )
                        }
                        className="w-full p-1 border-none focus:outline-none text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-[var(--color-primary)]">
            <div className="bg-[var(--color-primary)] text-white px-3 py-2 font-heading font-bold text-xs md:text-sm uppercase">
              ADDITIONAL INFORMATION
            </div>
            <div className="p-3">
              <label className="block text-xs font-medium text-[var(--color-gray-700)] mb-2">
                Please use the remainder of this page for any additional
                information:
              </label>
              <textarea
                rows={10}
                value={formData.additionalInformation}
                onChange={(e) =>
                  handleSimpleChange("additionalInformation", e.target.value)
                }
                className="w-full border border-[var(--color-gray-300)] p-3 text-sm focus:border-[var(--color-gold)]"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs text-[var(--color-gray-500)] font-mono">
            <span>ASPS/HRD FA3.01 (1) 4/19</span>
            <span>Page 4 of 5</span>
          </div>
        </div>

        {/* PAGE 5 */}
        <div className="bg-white border-2 border-[var(--color-primary)] p-6 md:p-10 shadow-md">
          <div className="flex justify-between items-center border-b border-[var(--color-primary)] pb-3 mb-6">
            <span className="font-heading font-bold text-sm md:text-base">
              Applicant Name:{" "}
              <span className="underline">
                {formData.applicantNameTop || "__________________________"}
              </span>
            </span>
            <span className="font-heading font-bold text-base md:text-lg uppercase text-[var(--color-primary)]">
              STATE OF ARIZONA DRIVER FORM
            </span>
          </div>

          <div className="space-y-3 text-xs md:text-sm text-[var(--color-gray-700)] bg-[var(--color-gray-50)] p-4 border-l-4 border-[var(--color-gold)] mb-6 leading-relaxed text-justify">
            <p className="font-heading font-bold text-[var(--color-primary)]">
              Please complete this page if the position you are applying will
              require you to drive a vehicle as part of your job
              responsibilities.
            </p>
            <p>
              I understand to operate a personally owned vehicle or fleet motor
              vehicle for the furtherance of State business purposes I must have
              an acceptable driving record and complete applicable driver
              training as required by Arizona Administrative Code R2-10-207(11).
            </p>
            <p>
              I understand the Driver Protection Privacy Act of 1994, amended
              September 1997, prohibits the release of my Motor Vehicle Record
              for reasons other than matters of motor vehicle or driver safety.
            </p>
            <p>
              I understand I may be asked and would be responsible for providing
              a copy of my thirty-nine (39) month motor vehicle record history
              if I do not have a current Arizona driver license.
            </p>
          </div>

          <div className="border border-[var(--color-primary)] divide-y divide-[var(--color-primary)] mb-6">
            <div className="p-3">
              <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                Name (print as it appears on your driver license)
              </label>
              <input
                type="text"
                value={formData.driverFullName}
                onChange={(e) =>
                  handleSimpleChange("driverFullName", e.target.value)
                }
                className="w-full border-b border-dotted border-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-gold)] py-1 text-base"
              />
            </div>

            <div className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-6">
                <span className="font-medium">
                  Do you have a current valid U.S. driver license?
                </span>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasDriverLicense"
                    value="Yes"
                    checked={formData.hasDriverLicense === "Yes"}
                    onChange={(e) =>
                      handleSimpleChange("hasDriverLicense", e.target.value)
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasDriverLicense"
                    value="No"
                    checked={formData.hasDriverLicense === "No"}
                    onChange={(e) =>
                      handleSimpleChange("hasDriverLicense", e.target.value)
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                    State of Issue
                  </label>
                  <input
                    type="text"
                    value={formData.driverLicenseState}
                    onChange={(e) =>
                      handleSimpleChange("driverLicenseState", e.target.value)
                    }
                    className="border-b border-[var(--color-gray-400)] w-24 text-sm py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                    Driver License Number
                  </label>
                  <input
                    type="text"
                    value={formData.driverLicenseNumber}
                    onChange={(e) =>
                      handleSimpleChange("driverLicenseNumber", e.target.value)
                    }
                    className="border-b border-[var(--color-gray-400)] w-44 text-sm py-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-6">
                <span className="font-medium">
                  Do you have a current valid U.S. commercial driver license?
                </span>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasCDL"
                    value="Yes"
                    checked={formData.hasCDL === "Yes"}
                    onChange={(e) =>
                      handleSimpleChange("hasCDL", e.target.value)
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasCDL"
                    value="No"
                    checked={formData.hasCDL === "No"}
                    onChange={(e) =>
                      handleSimpleChange("hasCDL", e.target.value)
                    }
                    className="w-4 h-4 accent-[var(--color-gold)]"
                  />
                  <span>No</span>
                </label>
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                    State of Issue
                  </label>
                  <input
                    type="text"
                    value={formData.cdlState}
                    onChange={(e) =>
                      handleSimpleChange("cdlState", e.target.value)
                    }
                    className="border-b border-[var(--color-gray-400)] w-24 text-sm py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray-500)] mb-1">
                    Driver License Number
                  </label>
                  <input
                    type="text"
                    value={formData.cdlNumber}
                    onChange={(e) =>
                      handleSimpleChange("cdlNumber", e.target.value)
                    }
                    className="border-b border-[var(--color-gray-400)] w-44 text-sm py-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[var(--color-primary)] mb-6">
            <div className="bg-[var(--color-primary)] text-white px-3 py-2 font-heading font-bold text-xs md:text-sm uppercase">
              CERTIFICATION AND AGREEMENT
            </div>
            <div className="p-4 text-xs md:text-sm leading-relaxed text-[var(--color-gray-700)] text-justify space-y-3">
              <p>
                I certify that all the information provided in this application
                and in support of this selection process herein is true and
                complete to the best of my knowledge. I agree and understand
                that omissions, misstatements and falsifications may cause
                forfeiture on my part of all eligibility to any employment with
                the State of Arizona and may be cause for rejection of this
                application, removal of my name from eligibility lists, or
                dismissal from State employment.
              </p>
              <p className="font-heading font-bold text-[var(--color-primary)]">
                My signature below certifies that I have read and understand
                this application and agree to the terms and conditions outlined
                in the document.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)] border-t border-[var(--color-primary)] p-3">
              <div>
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                  Printed Name
                </label>
                <input
                  type="text"
                  value={formData.printedName}
                  onChange={(e) =>
                    handleSimpleChange("printedName", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] py-1 text-base focus:border-[var(--color-gold)]"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                  Applicant Signature
                </label>
                <input
                  type="text"
                  placeholder="(Sign with full name)"
                  value={formData.applicantSignature}
                  onChange={(e) =>
                    handleSimpleChange("applicantSignature", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] py-1 italic font-serif text-base focus:border-[var(--color-gold)]"
                />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold text-[var(--color-gray-700)] uppercase mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.signDate}
                  onChange={(e) =>
                    handleSimpleChange("signDate", e.target.value)
                  }
                  className="w-full border-b border-dotted border-[var(--color-gray-400)] py-1 text-base focus:border-[var(--color-gold)]"
                />
              </div>
            </div>
          </div>

          <div className="text-center text-xs md:text-sm text-[var(--color-gray-500)] italic space-y-1 mb-6">
            <p>
              Arizona State Government is an AA/EOE/ADA Reasonable Accommodation
              Employer.
            </p>
            <p>
              Persons with a disability may request a reasonable accommodation
              by contacting the agency Human Resources Office.
            </p>
            <p>
              Requests should be made as early as possible to allow time to
              arrange the accommodation.
            </p>
          </div>

          <div className="flex justify-between items-center text-xs text-[var(--color-gray-500)] font-mono">
            <span>ASPS/HRD FA3.01 (1) 4/19</span>
            <span>Page 5 of 5</span>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pb-10">
          <button
            type="reset"
            className="site-btn !bg-white !text-[var(--color-primary)] border border-[var(--color-gray-300)] hover:!border-[var(--color-primary)]"
          >
            Reset Form
          </button>
          <button type="submit" className="site-btn btn-primary shadow-gold">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
