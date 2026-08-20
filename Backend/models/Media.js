const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, "Original name is required"],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, "MIME type is required"],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "File size in bytes is required"],
    },
    url: {
      type: String,
      required: [true, "Media URL/path is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["image", "video", "pdf", "document", "general"],
      default: "general",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

mediaSchema.index({ category: 1, createdAt: -1 });
mediaSchema.index({ uploadedBy: 1 });

module.exports = mongoose.model("Media", mediaSchema);
