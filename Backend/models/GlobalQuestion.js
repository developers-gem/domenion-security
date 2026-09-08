const mongoose = require("mongoose");

const globalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["single_choice", "multiple_choice", "text"],
      default: "single_choice",
    },
    options: {
      type: [String],
      default: [],
    },
    required: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    scope: {
      type: String,
      enum: ["global", "job"],
      default: "global",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GlobalQuestion", globalQuestionSchema);
