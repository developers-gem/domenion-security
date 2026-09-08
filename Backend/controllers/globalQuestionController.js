const GlobalQuestion = require("../models/GlobalQuestion");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Get global screening questions (Public: Active only | Admin: All)
// @route   GET /api/global-questions
// @access  Public / Admin
const getGlobalQuestions = async (req, res) => {
  try {
    const isAdminCall = req.user && (req.user.role === "admin" || req.user.role === "hr" || req.user.role === "recruiter");
    const activeOnly = req.query.activeOnly === "true" || !isAdminCall;

    const filter = {};
    if (activeOnly) {
      filter.isActive = true;
    }

    const questions = await GlobalQuestion.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new global screening question
// @route   POST /api/global-questions
// @access  Private/Admin
const createGlobalQuestion = async (req, res) => {
  try {
    const { question, type, options, required, order, isActive, active } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ success: false, message: "Question text is required" });
    }

    const validTypes = ["single_choice", "multiple_choice", "text"];
    const qType = validTypes.includes(type) ? type : "single_choice";

    let cleanOptions = [];
    if (qType === "text") {
      cleanOptions = [];
    } else {
      if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ success: false, message: "A choice question must contain at least 2 options" });
      }
      cleanOptions = options.map((opt) => String(opt).trim()).filter(Boolean);
      if (cleanOptions.length < 2) {
        return res.status(400).json({ success: false, message: "Each option must contain non-empty text (at least 2 valid options required)" });
      }
    }

    const count = await GlobalQuestion.countDocuments();
    const activeState = active !== undefined ? Boolean(active) : (isActive !== undefined ? Boolean(isActive) : true);

    const newQuestion = await GlobalQuestion.create({
      question: question.trim(),
      type: qType,
      options: cleanOptions,
      required: required !== undefined ? Boolean(required) : true,
      order: Number.isInteger(Number(order)) ? Number(order) : count,
      isActive: activeState,
      scope: "global",
    });

    await createAuditLog(req, "GLOBAL_QUESTION_CREATED", "GlobalQuestion", newQuestion._id, {
      questionText: newQuestion.question,
    });

    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a global screening question
// @route   PUT /api/global-questions/:id
// @access  Private/Admin
const updateGlobalQuestion = async (req, res) => {
  try {
    const { question, type, options, required, order, isActive, active } = req.body;

    const targetQuestion = await GlobalQuestion.findById(req.params.id);
    if (!targetQuestion) {
      return res.status(404).json({ success: false, message: "Global screening question not found" });
    }

    if (question !== undefined && (!question || typeof question !== "string" || !question.trim())) {
      return res.status(400).json({ success: false, message: "Question text cannot be empty" });
    }

    const validTypes = ["single_choice", "multiple_choice", "text"];
    const newType = type !== undefined ? (validTypes.includes(type) ? type : targetQuestion.type) : targetQuestion.type;

    if (newType === "text") {
      targetQuestion.options = [];
    } else {
      const optsToValidate = options !== undefined ? options : targetQuestion.options;
      if (!Array.isArray(optsToValidate) || optsToValidate.length < 2) {
        return res.status(400).json({ success: false, message: "A choice question must contain at least 2 options" });
      }
      const cleanOpts = optsToValidate.map((opt) => String(opt).trim()).filter(Boolean);
      if (cleanOpts.length < 2) {
        return res.status(400).json({ success: false, message: "Each option must contain non-empty text" });
      }
      targetQuestion.options = cleanOpts;
    }

    targetQuestion.type = newType;
    if (question !== undefined) targetQuestion.question = question.trim();
    if (required !== undefined) targetQuestion.required = Boolean(required);
    if (order !== undefined) targetQuestion.order = Number(order);

    if (active !== undefined) {
      targetQuestion.isActive = Boolean(active);
    } else if (isActive !== undefined) {
      targetQuestion.isActive = Boolean(isActive);
    }

    const updated = await targetQuestion.save();

    await createAuditLog(req, "GLOBAL_QUESTION_UPDATED", "GlobalQuestion", updated._id, {
      questionText: updated.question,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a global screening question
// @route   DELETE /api/global-questions/:id
// @access  Private/Admin
const deleteGlobalQuestion = async (req, res) => {
  try {
    const targetQuestion = await GlobalQuestion.findById(req.params.id);
    if (!targetQuestion) {
      return res.status(404).json({ success: false, message: "Global screening question not found" });
    }

    const questionText = targetQuestion.question;
    await targetQuestion.deleteOne();

    await createAuditLog(req, "GLOBAL_QUESTION_DELETED", "GlobalQuestion", req.params.id, {
      questionText,
    });

    res.status(200).json({ success: true, message: "Global screening question deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle active status of a global screening question
// @route   PATCH /api/global-questions/:id/toggle
// @access  Private/Admin
const toggleGlobalQuestionStatus = async (req, res) => {
  try {
    const targetQuestion = await GlobalQuestion.findById(req.params.id);
    if (!targetQuestion) {
      return res.status(404).json({ success: false, message: "Global screening question not found" });
    }

    targetQuestion.isActive = !targetQuestion.isActive;
    await targetQuestion.save();

    await createAuditLog(req, "GLOBAL_QUESTION_TOGGLED", "GlobalQuestion", targetQuestion._id, {
      isActive: targetQuestion.isActive,
    });

    res.status(200).json({ success: true, data: targetQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGlobalQuestions,
  createGlobalQuestion,
  updateGlobalQuestion,
  deleteGlobalQuestion,
  toggleGlobalQuestionStatus,
};
