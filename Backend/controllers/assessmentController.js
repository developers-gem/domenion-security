const Assessment = require("../models/Assessment");
const AssessmentAttempt = require("../models/AssessmentAttempt");
const GlobalQuestion = require("../models/GlobalQuestion");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// Helper function to normalize answer string for robust comparison
const isAnswerMatch = (submitted, correct) => {
  if (!submitted || !correct) return false;
  const s = String(submitted).trim().toLowerCase();
  const c = String(correct).trim().toLowerCase();
  
  // Direct match (e.g. "B" === "b" or "Report the incident" === "report the incident")
  if (s === c) return true;

  // Handles cases where option is formatted like "B. Report the incident" vs "B" or vice versa
  if (c.length === 1 && s.startsWith(c + ".")) return true;
  if (s.length === 1 && c.startsWith(s + ".")) return true;

  return false;
};

// @desc    Get all assessments (Admin)
// @route   GET /api/assessments
// @access  Private (Admin / HR / Recruiter)
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .populate("questions")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: assessments.length, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single assessment by ID (Admin)
// @route   GET /api/assessments/:id
// @access  Private (Admin / HR / Recruiter)
const getAssessmentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Assessment ID" });
    }

    const assessment = await Assessment.findById(req.params.id)
      .populate("questions")
      .populate("createdBy", "name email");

    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    res.status(200).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new assessment
// @route   POST /api/assessments
// @access  Private (Admin)
const createAssessment = async (req, res) => {
  try {
    const { title, description, questions, passingScore, attemptsAllowed, isActive } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Assessment title is required" });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Assessment must contain at least one question" });
    }

    const parsedPassingScore = Number(passingScore);
    if (!parsedPassingScore || parsedPassingScore <= 0) {
      return res.status(400).json({ success: false, message: "Passing score must be a positive number" });
    }

    if (parsedPassingScore > questions.length) {
      return res.status(400).json({
        success: false,
        message: `Passing score (${parsedPassingScore}) cannot exceed total questions (${questions.length})`,
      });
    }

    // Verify all question IDs exist and are quiz questions
    const validQuestions = await GlobalQuestion.find({
      _id: { $in: questions },
      isActive: true,
      isQuizQuestion: true,
    });

    if (validQuestions.length !== questions.length) {
      return res.status(400).json({
        success: false,
        message: "One or more selected questions are invalid, inactive, or not marked as Quiz Questions",
      });
    }

    // Ensure all questions have a correct answer defined
    const missingAnswer = validQuestions.find((q) => !q.correctAnswer || !q.correctAnswer.trim());
    if (missingAnswer) {
      return res.status(400).json({
        success: false,
        message: `Question '${missingAnswer.question}' does not have a correct answer defined in the Question Bank`,
      });
    }

    const assessment = await Assessment.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      questions,
      passingScore: parsedPassingScore,
      attemptsAllowed: Number(attemptsAllowed) > 0 ? Number(attemptsAllowed) : 1,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdBy: req.user._id,
    });

    await createAuditLog(req, "ASSESSMENT_CREATED", "Assessment", assessment._id, {
      title: assessment.title,
      questionsCount: questions.length,
    });

    const populated = await Assessment.findById(assessment._id).populate("questions");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update assessment
// @route   PUT /api/assessments/:id
// @access  Private (Admin)
const updateAssessment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Assessment ID" });
    }

    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    const { title, description, questions, passingScore, attemptsAllowed, isActive } = req.body;

    if (title !== undefined) {
      if (!title || !title.trim()) {
        return res.status(400).json({ success: false, message: "Assessment title cannot be empty" });
      }
      assessment.title = title.trim();
    }

    if (description !== undefined) {
      assessment.description = description ? description.trim() : "";
    }

    if (questions !== undefined) {
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ success: false, message: "Assessment must contain at least one question" });
      }

      const validQuestions = await GlobalQuestion.find({
        _id: { $in: questions },
        isActive: true,
        isQuizQuestion: true,
      });

      if (validQuestions.length !== questions.length) {
        return res.status(400).json({
          success: false,
          message: "One or more selected questions are invalid, inactive, or not marked as Quiz Questions",
        });
      }

      const missingAnswer = validQuestions.find((q) => !q.correctAnswer || !q.correctAnswer.trim());
      if (missingAnswer) {
        return res.status(400).json({
          success: false,
          message: `Question '${missingAnswer.question}' does not have a correct answer defined`,
        });
      }

      assessment.questions = questions;
    }

    if (passingScore !== undefined) {
      const parsed = Number(passingScore);
      if (!parsed || parsed <= 0) {
        return res.status(400).json({ success: false, message: "Passing score must be a positive number" });
      }
      if (parsed > assessment.questions.length) {
        return res.status(400).json({
          success: false,
          message: `Passing score (${parsed}) cannot exceed total questions (${assessment.questions.length})`,
        });
      }
      assessment.passingScore = parsed;
    }

    if (attemptsAllowed !== undefined) {
      assessment.attemptsAllowed = Number(attemptsAllowed) > 0 ? Number(attemptsAllowed) : 1;
    }

    if (isActive !== undefined) {
      assessment.isActive = Boolean(isActive);
    }

    await assessment.save();

    await createAuditLog(req, "ASSESSMENT_UPDATED", "Assessment", assessment._id, {
      title: assessment.title,
    });

    const updated = await Assessment.findById(assessment._id).populate("questions");

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete assessment
// @route   DELETE /api/assessments/:id
// @access  Private (Admin)
const deleteAssessment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Assessment ID" });
    }

    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    const title = assessment.title;
    await assessment.deleteOne();

    await createAuditLog(req, "ASSESSMENT_DELETED", "Assessment", req.params.id, { title });

    res.status(200).json({ success: true, message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle assessment active status
// @route   PATCH /api/assessments/:id/toggle
// @access  Private (Admin)
const toggleAssessmentStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Assessment ID" });
    }

    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    assessment.isActive = !assessment.isActive;
    await assessment.save();

    await createAuditLog(req, "ASSESSMENT_TOGGLED", "Assessment", assessment._id, {
      isActive: assessment.isActive,
    });

    res.status(200).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// EMPLOYEE ENDPOINTS
// ==========================================

// @desc    Get active available assessments for employee
// @route   GET /api/assessments/employee/available
// @access  Private (Authenticated User / Employee)
const getAvailableAssessments = async (req, res) => {
  try {
    const activeAssessments = await Assessment.find({ isActive: true })
      .select("-questions")
      .sort({ createdAt: -1 });

    const userAttempts = await AssessmentAttempt.find({ user: req.user._id }).select("assessment score result submittedAt");

    const data = activeAssessments.map((a) => {
      const attempts = userAttempts.filter((att) => String(att.assessment) === String(a._id));
      const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
      return {
        _id: a._id,
        title: a.title,
        description: a.description,
        totalQuestions: a.questions ? a.questions.length : 0,
        passingScore: a.passingScore,
        attemptsAllowed: a.attemptsAllowed,
        attemptsUsed: attempts.length,
        isCompleted: attempts.length >= a.attemptsAllowed,
        latestAttempt,
      };
    });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get assessment for taking quiz (Excludes correct answers!)
// @route   GET /api/assessments/employee/:id
// @access  Private (Authenticated User / Employee)
const getEmployeeAssessmentForTaking = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Assessment ID" });
    }

    const assessment = await Assessment.findById(req.params.id).populate({
      path: "questions",
      select: "question options type order points required",
    });

    if (!assessment || !assessment.isActive) {
      return res.status(404).json({ success: false, message: "Assessment not available or inactive" });
    }

    // Check existing attempt count
    const attemptCount = await AssessmentAttempt.countDocuments({
      user: req.user._id,
      assessment: assessment._id,
    });

    if (attemptCount >= assessment.attemptsAllowed) {
      return res.status(403).json({
        success: false,
        message: `Maximum attempts (${assessment.attemptsAllowed}) reached for this assessment.`,
        attemptsUsed: attemptCount,
        attemptsAllowed: assessment.attemptsAllowed,
      });
    }

    // Sanitize question list for employee quiz UI (no correct answers!)
    const sanitizedQuestions = assessment.questions.map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      type: q.type,
      order: q.order,
      points: q.points || 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        _id: assessment._id,
        title: assessment.title,
        description: assessment.description,
        passingScore: assessment.passingScore,
        totalQuestions: sanitizedQuestions.length,
        attemptsAllowed: assessment.attemptsAllowed,
        attemptsUsed: attemptCount,
        questions: sanitizedQuestions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit employee assessment answers & calculate score on backend
// @route   POST /api/assessments/employee/:id/submit
// @access  Private (Authenticated User / Employee)
const submitAssessment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Assessment ID" });
    }

    const assessment = await Assessment.findById(req.params.id).populate("questions");
    if (!assessment || !assessment.isActive) {
      return res.status(404).json({ success: false, message: "Assessment not found or inactive" });
    }

    // Enforce Attempt Limits
    const previousAttempts = await AssessmentAttempt.countDocuments({
      user: req.user._id,
      assessment: assessment._id,
    });

    if (previousAttempts >= assessment.attemptsAllowed) {
      return res.status(403).json({
        success: false,
        message: `Maximum submission attempts (${assessment.attemptsAllowed}) already reached`,
      });
    }

    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: "Answers payload must be an array" });
    }

    // Map of submitted answers by questionId
    const submittedMap = new Map();
    answers.forEach((item) => {
      if (item && item.questionId) {
        submittedMap.set(String(item.questionId), String(item.answer || "").trim());
      }
    });

    const assessmentQuestionIds = assessment.questions.map((q) => String(q._id));

    // Reject submission if any submitted question ID does NOT belong to the assessment
    for (const qId of submittedMap.keys()) {
      if (!assessmentQuestionIds.includes(qId)) {
        return res.status(400).json({
          success: false,
          message: `Question ID '${qId}' does not belong to this assessment`,
        });
      }
    }

    // Enforce completeness: All selected assessment questions are required
    for (const qId of assessmentQuestionIds) {
      const ans = submittedMap.get(qId);
      if (!ans || !ans.trim()) {
        const missingQ = assessment.questions.find((q) => String(q._id) === qId);
        return res.status(400).json({
          success: false,
          message: `Please answer all required questions before submitting. Missing answer for: '${missingQ ? missingQ.question : "Question"}'`,
        });
      }
    }

    // Server-Side Scoring Calculation & Snapshot Generation
    let correctCount = 0;
    const totalQuestions = assessment.questions.length;
    const answerSnapshots = [];

    for (const dbQ of assessment.questions) {
      const selectedAnswer = submittedMap.get(String(dbQ._id));
      const isCorrect = isAnswerMatch(selectedAnswer, dbQ.correctAnswer);

      if (isCorrect) {
        correctCount += 1;
      }

      answerSnapshots.push({
        questionId: dbQ._id,
        question: dbQ.question,
        selectedAnswer,
        correctAnswer: dbQ.correctAnswer,
        isCorrect,
        pointsEarned: isCorrect ? 1 : 0,
        pointsPossible: 1,
      });
    }

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const result = correctCount >= assessment.passingScore ? "PASS" : "FAIL";

    // Store historical attempt result in MongoDB
    const attempt = await AssessmentAttempt.create({
      user: req.user._id,
      assessment: assessment._id,
      assessmentTitle: assessment.title,
      score: correctCount,
      totalQuestions,
      percentage,
      passingScore: assessment.passingScore,
      result,
      submittedAt: new Date(),
      answers: answerSnapshots,
    });

    await createAuditLog(req, "ASSESSMENT_SUBMITTED", "AssessmentAttempt", attempt._id, {
      assessmentTitle: assessment.title,
      score: correctCount,
      totalQuestions,
      result,
    });

    res.status(200).json({
      success: true,
      data: {
        attemptId: attempt._id,
        assessmentTitle: assessment.title,
        score: correctCount,
        totalQuestions,
        percentage,
        passingScore: assessment.passingScore,
        result,
        submittedAt: attempt.submittedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get employee's own assessment attempts history
// @route   GET /api/assessments/employee/my-attempts
// @access  Private (Authenticated User / Employee)
const getMyAttempts = async (req, res) => {
  try {
    const attempts = await AssessmentAttempt.find({ user: req.user._id })
      .select("-answers")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: attempts.length, data: attempts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ADMIN RESULTS ENDPOINTS
// ==========================================

// @desc    Get all employee assessment results (Admin)
// @route   GET /api/assessments/admin/results
// @access  Private (Admin / HR / Recruiter)
const getAdminResults = async (req, res) => {
  try {
    const attempts = await AssessmentAttempt.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: attempts.length, data: attempts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single attempt result details (Admin)
// @route   GET /api/assessments/admin/results/:id
// @access  Private (Admin / HR / Recruiter)
const getAdminResultById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Attempt ID" });
    }

    const attempt = await AssessmentAttempt.findById(req.params.id).populate("user", "name email role");
    if (!attempt) {
      return res.status(404).json({ success: false, message: "Assessment attempt result not found" });
    }

    res.status(200).json({ success: true, data: attempt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  toggleAssessmentStatus,
  getAvailableAssessments,
  getEmployeeAssessmentForTaking,
  submitAssessment,
  getMyAttempts,
  getAdminResults,
  getAdminResultById,
};
