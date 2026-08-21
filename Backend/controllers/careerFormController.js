const CareerForm = require("../models/CareerForm");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const { createAuditLog } = require("../utils/auditLogger");

const VALID_STATUSES = [
  "submitted",
  "reviewing",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
];

// @desc    Create a new career form submission (Public, optional resume)
// @route   POST /api/career-forms/careerform
// @access  Public
const createCareerForm = async (req, res) => {
  try {
    const { fullName, email, phone, message, careerId } = req.body;
    if (!fullName || !email || !phone) {
      // If a file was uploaded before validation failed, clean it up
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(400).json({ success: false, message: "Please fill all required fields (Full Name, Email, Phone Number)" });
    }

    let resumeUrl = null;
    if (req.file) {
      // Store relative path in database
      resumeUrl = `uploads/resumes/${req.file.filename}`;
    }

    const CareerFormSubmission = await CareerForm.create({
      fullName,
      email,
      phone,
      message,
      careerId: careerId || undefined,
      resumeUrl,
      status: "submitted",
    });

    if (resumeUrl) {
      await createAuditLog(req, "APPLICATION_RESUME_UPLOADED", "CareerForm", CareerFormSubmission._id);
    }

    res.status(201).json({ success: true, data: CareerFormSubmission });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
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

// @desc    Securely download/view application resume file
// @route   GET /api/career-forms/:id/resume
// @access  Private (Admin / HR / Recruiter)
const getCareerFormResume = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid application ID format" });
    }

    const careerForm = await CareerForm.findById(req.params.id);
    if (!careerForm) {
      return res.status(404).json({ success: false, message: "Career form submission not found" });
    }

    if (!careerForm.resumeUrl) {
      return res.status(404).json({ success: false, message: "No resume attached to this application" });
    }

    const uploadsBaseDir = path.resolve(process.cwd(), "uploads", "resumes");
    const fullPath = path.resolve(process.cwd(), careerForm.resumeUrl);

    // Path traversal safety check
    if (!fullPath.startsWith(uploadsBaseDir)) {
      return res.status(403).json({ success: false, message: "Access denied to requested file path" });
    }

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, message: "Resume file not found on server storage" });
    }

    await createAuditLog(req, "APPLICATION_RESUME_ACCESSED", "CareerForm", careerForm._id);

    const downloadFileName = `${careerForm.fullName.replace(/[^a-zA-Z0-9]/g, "_")}_Resume${path.extname(fullPath)}`;
    res.download(fullPath, downloadFileName);
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

    // Clean up resume file if it exists
    if (careerForm.resumeUrl) {
      const fullPath = path.resolve(process.cwd(), careerForm.resumeUrl);
      if (fs.existsSync(fullPath)) {
        try {
          await fs.promises.unlink(fullPath);
        } catch {
          // Continue deletion even if file removal fails
        }
      }
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
  getCareerFormResume,
  updateCareerFormStatus,
  deleteCareerForm,
};
