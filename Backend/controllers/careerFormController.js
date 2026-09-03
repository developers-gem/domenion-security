const CareerForm = require("../models/CareerForm");
const Career = require("../models/Career");
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
    const { fullName, email, phone, message, careerId, screeningAnswers } = req.body;
    if (!fullName || !email || !phone) {
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(400).json({ success: false, message: "Please fill all required fields (Full Name, Email, Phone Number)" });
    }

    // Parse screeningAnswers if string (from FormData) or object/array
    let parsedAnswers = [];
    if (screeningAnswers) {
      if (typeof screeningAnswers === "string") {
        try {
          parsedAnswers = JSON.parse(screeningAnswers);
        } catch {
          parsedAnswers = [];
        }
      } else if (Array.isArray(screeningAnswers)) {
        parsedAnswers = screeningAnswers;
      }
    }

    let validatedSnapshotAnswers = [];

    // Backend Screening Question Validation against Career record
    if (careerId) {
      if (!mongoose.Types.ObjectId.isValid(careerId)) {
        if (req.file) fs.unlink(req.file.path, () => {});
        return res.status(400).json({ success: false, message: "Invalid career ID format" });
      }

      const targetCareer = await Career.findById(careerId);
      if (!targetCareer) {
        if (req.file) fs.unlink(req.file.path, () => {});
        return res.status(404).json({ success: false, message: "Selected position does not exist or may have been removed" });
      }

      const activeQuestions = (targetCareer.screeningQuestions || []).filter((q) => q.isActive === true);

      // Create lookup map of applicant's submitted answers by questionId
      const submittedMap = new Map();
      if (Array.isArray(parsedAnswers)) {
        for (const item of parsedAnswers) {
          if (item && item.questionId) {
            submittedMap.set(String(item.questionId), String(item.answer || "").trim());
          }
        }
      }

      // Check each active question
      for (const question of activeQuestions) {
        const questionIdStr = String(question._id);
        const submittedAnswer = submittedMap.get(questionIdStr);

        // Required question validation
        if (question.required && (!submittedAnswer || submittedAnswer === "")) {
          if (req.file) fs.unlink(req.file.path, () => {});
          return res.status(400).json({
            success: false,
            message: `Screening question '${question.question}' is required. Please select an answer.`,
          });
        }

        // Option validity check
        if (submittedAnswer) {
          const isValidOption = question.options.includes(submittedAnswer);
          if (!isValidOption) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({
              success: false,
              message: `Invalid answer selected for '${question.question}'.`,
            });
          }

          validatedSnapshotAnswers.push({
            questionId: question._id,
            question: question.question,
            answer: submittedAnswer,
          });
        }
      }

      // Check for arbitrary question IDs not belonging to active questions of this career
      if (Array.isArray(parsedAnswers)) {
        const activeQuestionIds = new Set(activeQuestions.map((q) => String(q._id)));
        for (const item of parsedAnswers) {
          if (item && item.questionId && !activeQuestionIds.has(String(item.questionId))) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({
              success: false,
              message: "Submitted answer references a screening question that is invalid for this position.",
            });
          }
        }
      }
    }

    let resumeUrl = null;
    if (req.file) {
      resumeUrl = `uploads/resumes/${req.file.filename}`;
    }

    const CareerFormSubmission = await CareerForm.create({
      fullName,
      email,
      phone,
      message,
      careerId: careerId || undefined,
      resumeUrl,
      screeningAnswers: validatedSnapshotAnswers,
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
