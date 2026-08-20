const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      required: [true, "Action is required"],
      trim: true,
    },
    resource: {
      type: String,
      required: [true, "Resource name is required"],
      trim: true,
    },
    resourceId: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { timestamps: false }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ user: 1, action: 1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
