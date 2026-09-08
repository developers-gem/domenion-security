const mongoose = require("mongoose");

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