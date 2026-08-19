const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      trim: true, // e.g. "1-3 years"
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    applicationDeadline: {
      type: Date,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);