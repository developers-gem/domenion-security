const mongoose = require("mongoose");

const answerSnapshotSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalQuestion",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    selectedAnswer: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    pointsPossible: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const assessmentAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: [true, "Assessment reference is required"],
    },
    assessmentTitle: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    passingScore: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      enum: ["PASS", "FAIL"],
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    answers: [answerSnapshotSchema],
  },
  { timestamps: true }
);

assessmentAttemptSchema.index({ user: 1, assessment: 1 });

module.exports = mongoose.model("AssessmentAttempt", assessmentAttemptSchema);
