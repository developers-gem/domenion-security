const CareerForm = require("../models/CareerForm");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

const VALID_STATUSES = [
  "submitted",
  "reviewing",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
];

// @desc    Create a new career form submission (Public)
// @route   POST /api/career-forms/careerform
// @access  Public
const createCareerForm = async (req, res) => {
  try {
    const { fullName, email, phone, message, careerId } = req.body;
    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
    const CareerFormSubmission = await CareerForm.create({
      fullName,
      email,
      phone,
      message,
      careerId: careerId || undefined,
      status: "submitted",
    });
    res.status(201).json({ success: true, data: CareerFormSubmission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all career form submissions (Admin / HR / Recruiter)
// @route   GET /api/career-forms
// @access  Private (Admin / HR / Recruiter)
const getAllCareerForms = async (req, res) => {
  try {
    const { status, careerId } = req.query;
    const filter = {};

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ success: false, message: `Invalid status filter '${status}'` });
      }
      filter.status = status;
    }

    if (careerId) {
      if (!mongoose.Types.ObjectId.isValid(careerId)) {
        return res.status(400).json({ success: false, message: "Invalid career ID format" });
      }
      filter.careerId = careerId;
    }

    const careerForms = await CareerForm.find(filter)
      .populate("careerId", "title location department")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: careerForms.length, data: careerForms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single career form submission by ID (Admin / HR / Recruiter)
// @route   GET /api/career-forms/:id
// @access  Private (Admin / HR / Recruiter)
const getCareerFormById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid application ID format" });
    }

    const careerForm = await CareerForm.findById(req.params.id).populate("careerId", "title location department");
    if (!careerForm) {
      return res.status(404).json({ success: false, message: "Career form submission not found" });
    }

    res.status(200).json({ success: true, data: careerForm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status (Admin / HR / Recruiter)
// @route   PUT /api/career-forms/:id/status
// @access  Private (Admin / HR / Recruiter)
const updateCareerFormStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid application ID format" });
    }

    const { status } = req.body;
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const careerForm = await CareerForm.findById(req.params.id);
    if (!careerForm) {
      return res.status(404).json({ success: false, message: "Career form submission not found" });
    }

    const oldStatus = careerForm.status || "submitted";
    careerForm.status = status;
    const updatedForm = await careerForm.save();

    await createAuditLog(req, "APPLICATION_STATUS_CHANGED", "CareerForm", careerForm._id, {
      oldStatus,
      newStatus: status,
    });

    res.status(200).json({ success: true, data: updatedForm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a career form submission (Admin Only)
// @route   DELETE /api/career-forms/deletecareerform/:id
// @access  Private (Admin Only)
const deleteCareerForm = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid application ID format" });
    }

    const careerForm = await CareerForm.findById(req.params.id);
    if (!careerForm) {
      return res.status(404).json({ success: false, message: "Career form submission not found" });
    }

    await careerForm.deleteOne();
    await createAuditLog(req, "APPLICATION_DELETED", "CareerForm", req.params.id);

    return res.status(200).json({ success: true, message: "Career form submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCareerForm,
  getAllCareerForms,
  getCareerFormById,
  updateCareerFormStatus,
  deleteCareerForm,
};
