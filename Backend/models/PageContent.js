const mongoose = require("mongoose");

const pageContentSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: [true, "Page key is required"],
      trim: true,
      lowercase: true,
    },
    section: {
      type: String,
      required: [true, "Section key is required"],
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
    },
    images: {
      type: [String],
      default: [],
    },
    videos: {
      type: [String],
      default: [],
    },
    seoMetadata: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

pageContentSchema.index({ page: 1, section: 1 }, { unique: true });
pageContentSchema.index({ status: 1 });

module.exports = mongoose.model("PageContent", pageContentSchema);
