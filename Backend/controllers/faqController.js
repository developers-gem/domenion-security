const FAQ = require("../models/FAQ");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Create a new FAQ
// @route   POST /api/faqs
// @access  Private (Admin / Content Manager)
const createFAQ = async (req, res) => {
  try {
    const { question, answer, category, order, active } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: "Please provide question and answer" });
    }

    const faq = await FAQ.create({
      question,
      answer,
      category: category || "General",
      order: order || 0,
      active: active !== undefined ? active : true,
      createdBy: req.user._id,
    });

    await createAuditLog(req, "CREATE_FAQ", "FAQ", faq._id);

    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all FAQs (Public filters active only)
// @route   GET /api/faqs
// @access  Public
const getAllFAQs = async (req, res) => {
  try {
    const { category, active } = req.query;
    const filter = {};

    if (active !== undefined) {
      filter.active = active === "true";
    } else {
      filter.active = true;
    }

    if (category) filter.category = category;

    const faqs = await FAQ.find(filter).sort({ category: 1, order: 1, createdAt: -1 });

    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an FAQ
// @route   PUT /api/faqs/:id
// @access  Private (Admin / Content Manager)
const updateFAQ = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid FAQ ID format" });
    }

    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await createAuditLog(req, "UPDATE_FAQ", "FAQ", faq._id);

    res.status(200).json({ success: true, data: updatedFAQ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an FAQ
// @route   DELETE /api/faqs/:id
// @access  Private (Admin / Content Manager)
const deleteFAQ = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid FAQ ID format" });
    }

    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    await faq.deleteOne();
    await createAuditLog(req, "DELETE_FAQ", "FAQ", req.params.id);

    res.status(200).json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
};
