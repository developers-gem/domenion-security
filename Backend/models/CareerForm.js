// const mongoose = require("mongoose");

// const careerFormSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Full name is required"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       trim: true,
//       lowercase: true,
//     },
//     phone: {
//       type: String,
//       required: [true, "Phone number is required"],
//       trim: true,
//     },
//     careerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Career",
//       required: false,
//     },
//     message: {
//       type: String,
//       trim: true,
//     },
//     resumeUrl: {
//       type: String,
//       trim: true,
//       default: null,
//     },
//     screeningAnswers: [
//       {
//         questionId: {
//           type: mongoose.Schema.Types.ObjectId,
//         },
//         question: {
//           type: String,
//           required: true,
//           trim: true,
//         },
//         type: {
//           type: String,
//           enum: ["single_choice", "multiple_choice", "text"],
//           default: "single_choice",
//         },
//         scope: {
//           type: String,
//           enum: ["global", "job"],
//           default: "global",
//         },
//         answer: {
//           type: mongoose.Schema.Types.Mixed,
//           required: true,
//         },
//       },
//     ],
//     status: {
//       type: String,
//       enum: [
//         "submitted",
//         "reviewing",
//         "shortlisted",
//         "interview",
//         "rejected",
//         "hired",
//       ],
//       default: "submitted",
//     },
//   },
//   { timestamps: true }
// );

// const CareerForm = mongoose.model("CareerForm", careerFormSchema);

// module.exports = CareerForm;

const mongoose = require("mongoose");

// Sub-schema: Employment History
const EmploymentHistorySchema = new mongoose.Schema(
  {
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    hoursPerWeek: { type: String, default: "" },
    companyName: { type: String, default: "" },
    positionTitle: { type: String, default: "" },
    streetAddress: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    phone: { type: String, default: "" },
    startingSalary: { type: String, default: "" },
    endingSalary: { type: String, default: "" },
    duties: { type: String, default: "" },
    supervisorName: { type: String, default: "" },
    reasonForLeaving: { type: String, default: "" },
    mayContact: { type: String, default: "Yes" },
    contactExplanation: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema: Education
const EducationSchema = new mongoose.Schema(
  {
    institution: { type: String, default: "" },
    cityState: { type: String, default: "" },
    degree: { type: String, default: "" },
    yearAttained: { type: String, default: "" },
    hoursEarned: { type: String, default: "" },
    major: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema: Licenses
const LicenseSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    institution: { type: String, default: "" },
    stateReceived: { type: String, default: "" },
    yearAttained: { type: String, default: "" },
    expirationDate: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema: Other Training
const TrainingSchema = new mongoose.Schema(
  {
    topic: { type: String, default: "" },
    institution: { type: String, default: "" },
    stateReceived: { type: String, default: "" },
    level: { type: String, default: "" },
    yearAttained: { type: String, default: "" },
    cert: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema: References
const ReferenceSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    relationship: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    fromToDates: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema: Full Employment Form Record
const EmploymentRecordSchema = new mongoose.Schema(
  {
    positionApplied: { type: String, default: "" },
    jobId: { type: String, default: "" },
    stateAgency: { type: String, default: "" },
    dateOfApplication: { type: String, default: "" },
    applicantNameTop: { type: String, default: "" },

    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    middleInitial: { type: String, default: "" },
    streetAddress: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    cellPhone: { type: String, default: "" },
    otherPhone: { type: String, default: "" },
    personalEmail: { type: String, default: "" },

    isOver18: { type: String, default: "Yes" },
    canVerifyWorkEligibility: { type: String, default: "Yes" },
    requiresVisaSponsorship: { type: String, default: "No" },

    workedForStateAZ: { type: String, default: "No" },
    lastStateAgency: { type: String, default: "" },
    ein: { type: String, default: "" },
    lastEmploymentDate: { type: String, default: "" },
    reasonLeavingState: { type: String, default: "" },

    dismissedOrResigned: { type: String, default: "No" },
    dismissedExplanation: { type: String, default: "" },

    otherNamesUsed: { type: String, default: "" },
    history: [EmploymentHistorySchema],
    education: [EducationSchema],
    licenses: [LicenseSchema],
    otherTraining: [TrainingSchema],

    driverFullName: { type: String, default: "" },
    hasDriverLicense: { type: String, default: "Yes" },
    driverLicenseState: { type: String, default: "" },
    driverLicenseNumber: { type: String, default: "" },
    hasCDL: { type: String, default: "No" },
    cdlState: { type: String, default: "" },
    cdlNumber: { type: String, default: "" },

    references: [ReferenceSchema],
    additionalInformation: { type: String, default: "" },

    printedName: { type: String, default: "" },
    applicantSignature: { type: String, default: "" },
    signDate: { type: String, default: "" },
    agreeTerms: { type: Boolean, default: false },
  },
  { _id: false }
);

// Main Application Schema
const careerFormSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: false,
    },
    message: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: null,
    },

    // 1. QUIZ DATA: Candidate screening quiz answers
    screeningAnswers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        question: {
          type: String,
          required: true,
          trim: true,
        },
        type: {
          type: String,
          enum: ["single_choice", "multiple_choice", "text"],
          default: "single_choice",
        },
        scope: {
          type: String,
          enum: ["global", "job"],
          default: "global",
        },
        answer: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
      },
    ],

    // 2. EMPLOYMENT FORM DATA: Complete 5-page employment documentation
    employmentRecord: {
      type: EmploymentRecordSchema,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "reviewing",
        "shortlisted",
        "interview",
        "rejected",
        "hired",
      ],
      default: "submitted",
    },
  },
  { timestamps: true }
);

const CareerForm = mongoose.model("CareerForm", careerFormSchema);

module.exports = CareerForm;