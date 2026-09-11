const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assessment title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GlobalQuestion",
      },
    ],
    passingScore: {
      type: Number,
      required: [true, "Passing score is required"],
      min: [1, "Passing score must be at least 1"],
    },
    attemptsAllowed: {
      type: Number,
      default: 1,
      min: [1, "Attempts allowed must be at least 1"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
