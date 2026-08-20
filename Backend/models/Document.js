const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Document name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["resume", "license", "policy", "compliance", "identification", "other"],
      default: "other",
    },
    filePath: {
      type: String,
      required: [true, "File path is required"],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, "MIME type is required"],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "File size is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    visibility: {
      type: String,
      enum: ["private", "internal", "restricted"],
      default: "internal",
    },
    accessLevel: {
      type: String,
      enum: ["owner_only", "hr_only", "staff_only", "admin_only"],
      default: "staff_only",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

documentSchema.index({ owner: 1, visibility: 1 });
documentSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model("Document", documentSchema);
