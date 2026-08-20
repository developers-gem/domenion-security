const mongoose = require("mongoose");

const contactRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    source: {
      type: String,
      default: "contact_page",
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed", "archived"],
      default: "new",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

contactRequestSchema.index({ email: 1 });
contactRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("ContactRequest", contactRequestSchema);
