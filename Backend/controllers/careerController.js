const Career = require("../models/Career");
// @desc    Create a new career/job posting
// @route   POST /api/careers
// @access  Private/Admin
const createCareer = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      experience,
      salaryRange,
      applicationDeadline,
    } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const career = await Career.create({
      title,
      department,
      location,
      type,
      description,
      requirements,
      experience,
      salaryRange,
      applicationDeadline,
      postedBy: req.user ? req.user._id : undefined,
    });

    res.status(201).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all careers (with optional filters)
// @route   GET /api/careers
// @access  Public
const getAllCareers = async (req, res) => {
  try {
    const { status, type, location } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: "i" };

    const careers = await Career.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single career by ID
// @route   GET /api/careers/:id
// @access  Public
const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a career posting
// @route   PUT /api/careers/:id
// @access  Private/Admin
const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }

    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedCareer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a career posting
// @route   DELETE /api/careers/:id
// @access  Private/Admin
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }
    await career.deleteOne();
    res.status(200).json({ success: true, message: "Career posting removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const { createAuditLog } = require("../utils/auditLogger");

// @desc    Get screening questions for a job (Public: Active only | Admin: All)
// @route   GET /api/careers/:id/questions
// @access  Public / Admin
const getCareerQuestions = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career position not found" });
    }

    const isAdminCall = req.user && (req.user.role === "admin" || req.user.role === "hr" || req.user.role === "recruiter");
    const activeOnly = req.query.activeOnly === "true" || !isAdminCall;

    let questions = career.screeningQuestions || [];
    if (activeOnly) {
      questions = questions.filter((q) => q.isActive === true);
    }

    questions.sort((a, b) => (a.order || 0) - (b.order || 0));

    res.status(200).json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a screening question to a job posting
// @route   POST /api/careers/:id/questions
// @access  Private/Admin
const createCareerQuestion = async (req, res) => {
  try {
    const { question, options, required, order, isActive } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ success: false, message: "Question text is required" });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ success: false, message: "A multiple-choice question must contain at least 2 options" });
    }

    const cleanOptions = options.map((opt) => String(opt).trim()).filter(Boolean);
    if (cleanOptions.length < 2) {
      return res.status(400).json({ success: false, message: "Each option must contain non-empty text (at least 2 valid options required)" });
    }

    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career position not found" });
    }

    const newQuestion = {
      question: question.trim(),
      options: cleanOptions,
      required: required !== undefined ? Boolean(required) : true,
      order: Number.isInteger(Number(order)) ? Number(order) : (career.screeningQuestions.length || 0),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    };

    career.screeningQuestions.push(newQuestion);
    await career.save();

    const added = career.screeningQuestions[career.screeningQuestions.length - 1];

    await createAuditLog(req, "CAREER_QUESTION_CREATED", "Career", career._id, {
      questionId: added._id,
      questionText: added.question,
    });

    res.status(201).json({ success: true, data: added });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a screening question
// @route   PUT /api/careers/:id/questions/:questionId
// @access  Private/Admin
const updateCareerQuestion = async (req, res) => {
  try {
    const { question, options, required, order, isActive } = req.body;

    if (question !== undefined && (!question || typeof question !== "string" || !question.trim())) {
      return res.status(400).json({ success: false, message: "Question text cannot be empty" });
    }

    if (options !== undefined) {
      if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ success: false, message: "A multiple-choice question must contain at least 2 options" });
      }
      const cleanOpts = options.map((opt) => String(opt).trim()).filter(Boolean);
      if (cleanOpts.length < 2) {
        return res.status(400).json({ success: false, message: "Each option must contain non-empty text" });
      }
    }

    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career position not found" });
    }

    const targetQuestion = career.screeningQuestions.id(req.params.questionId);
    if (!targetQuestion) {
      return res.status(404).json({ success: false, message: "Screening question not found" });
    }

    if (question !== undefined) targetQuestion.question = question.trim();
    if (options !== undefined) targetQuestion.options = options.map((opt) => String(opt).trim()).filter(Boolean);
    if (required !== undefined) targetQuestion.required = Boolean(required);
    if (order !== undefined) targetQuestion.order = Number(order);
    if (isActive !== undefined) targetQuestion.isActive = Boolean(isActive);

    await career.save();

    await createAuditLog(req, "CAREER_QUESTION_UPDATED", "Career", career._id, {
      questionId: targetQuestion._id,
      questionText: targetQuestion.question,
    });

    res.status(200).json({ success: true, data: targetQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a screening question
// @route   DELETE /api/careers/:id/questions/:questionId
// @access  Private/Admin
const deleteCareerQuestion = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career position not found" });
    }

    const targetQuestion = career.screeningQuestions.id(req.params.questionId);
    if (!targetQuestion) {
      return res.status(404).json({ success: false, message: "Screening question not found" });
    }

    const questionText = targetQuestion.question;
    career.screeningQuestions.pull({ _id: req.params.questionId });
    await career.save();

    await createAuditLog(req, "CAREER_QUESTION_DELETED", "Career", career._id, {
      questionId: req.params.questionId,
      questionText,
    });

    res.status(200).json({ success: true, message: "Screening question deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle active status of a screening question
// @route   PATCH /api/careers/:id/questions/:questionId/toggle
// @access  Private/Admin
const toggleCareerQuestionStatus = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career position not found" });
    }

    const targetQuestion = career.screeningQuestions.id(req.params.questionId);
    if (!targetQuestion) {
      return res.status(404).json({ success: false, message: "Screening question not found" });
    }

    targetQuestion.isActive = !targetQuestion.isActive;
    await career.save();

    await createAuditLog(req, "CAREER_QUESTION_TOGGLED", "Career", career._id, {
      questionId: targetQuestion._id,
      isActive: targetQuestion.isActive,
    });

    res.status(200).json({ success: true, data: targetQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
  getCareerQuestions,
  createCareerQuestion,
  updateCareerQuestion,
  deleteCareerQuestion,
  toggleCareerQuestionStatus,
};