const QuoteRequest = require("../models/QuoteRequest");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Submit a new quote request (Public)
// @route   POST /api/quotes
// @access  Public
const createQuote = async (req, res) => {
  try {
    const { name, email, phone, company, service, industry, location, estimatedBudget, message } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, phone, and service required",
      });
    }

    const quoteRequest = await QuoteRequest.create({
      name,
      email,
      phone,
      company,
      service,
      industry,
      location,
      estimatedBudget,
      message,
    });

    res.status(201).json({ success: true, data: quoteRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private (Admin / HR / Recruiter)
const getAllQuotes = async (req, res) => {
  try {
    const { status, service } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = { $regex: service, $options: "i" };

    const quotes = await QuoteRequest.find(filter)
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single quote request by ID
// @route   GET /api/quotes/:id
// @access  Private (Admin / HR / Recruiter)
const getQuoteById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid quote ID format" });
    }

    const quote = await QuoteRequest.findById(req.params.id).populate("assignedTo", "name email role");
    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote request not found" });
    }

    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update quote request
// @route   PUT /api/quotes/:id
// @access  Private (Admin / HR / Recruiter)
const updateQuote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid quote ID format" });
    }

    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote request not found" });
    }

    const { status, assignedTo, note } = req.body;
    if (status) quote.status = status;
    if (assignedTo !== undefined) quote.assignedTo = assignedTo || null;
    if (note) quote.notes.push(note);

    const updatedQuote = await quote.save();
    await createAuditLog(req, "UPDATE_QUOTE", "QuoteRequest", quote._id, { status, assignedTo });

    res.status(200).json({ success: true, data: updatedQuote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete quote request
// @route   DELETE /api/quotes/:id
// @access  Private (Admin / HR / Recruiter)
const deleteQuote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid quote ID format" });
    }

    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote request not found" });
    }

    await quote.deleteOne();
    await createAuditLog(req, "DELETE_QUOTE", "QuoteRequest", req.params.id);

    res.status(200).json({ success: true, message: "Quote request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
