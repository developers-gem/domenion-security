const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Lead email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    sourceType: {
      type: String,
      enum: ["contact", "quote", "direct", "referral", "other"],
      default: "other",
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "sourceTypeModel",
    },
    sourceTypeModel: {
      type: String,
      enum: ["ContactRequest", "QuoteRequest", null],
      default: null,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "won", "lost"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: Number,
    },
    notes: [
      {
        text: { type: String, required: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1, assignedTo: 1 });
leadSchema.index({ sourceType: 1, sourceId: 1 });

module.exports = mongoose.model("Lead", leadSchema);
