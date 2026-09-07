const express = require("express");
const router = express.Router();
const {
  getGlobalQuestions,
  createGlobalQuestion,
  updateGlobalQuestion,
  deleteGlobalQuestion,
  toggleGlobalQuestionStatus,
} = require("../controllers/globalQuestionController");
const { protect, adminOnly } = require("../config/authMiddleware");

// Public route (Active only by default unless authenticated admin)
router.get("/", getGlobalQuestions);

// Admin routes
router.post("/", protect, adminOnly, createGlobalQuestion);
router.put("/:id", protect, adminOnly, updateGlobalQuestion);
router.delete("/:id", protect, adminOnly, deleteGlobalQuestion);
router.patch("/:id/toggle", protect, adminOnly, toggleGlobalQuestionStatus);

module.exports = router;
