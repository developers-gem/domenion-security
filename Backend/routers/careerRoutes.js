const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/careerController");
const { protect, adminOnly } = require("../config/authMiddleware");

// Public routes
router.get("/", getAllCareers);
router.get("/:id", getCareerById);
router.get("/:id/questions", getCareerQuestions);

// Admin routes
router.post("/", protect, adminOnly, createCareer);
router.put("/:id", protect, adminOnly, updateCareer);
router.delete("/:id", protect, adminOnly, deleteCareer);

// Screening Questions Admin Routes
router.post("/:id/questions", protect, adminOnly, createCareerQuestion);
router.put("/:id/questions/:questionId", protect, adminOnly, updateCareerQuestion);
router.delete("/:id/questions/:questionId", protect, adminOnly, deleteCareerQuestion);
router.patch("/:id/questions/:questionId/toggle", protect, adminOnly, toggleCareerQuestionStatus);

module.exports = router;