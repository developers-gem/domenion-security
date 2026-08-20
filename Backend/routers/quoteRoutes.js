const express = require("express");
const router = express.Router();

const {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} = require("../controllers/quoteController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Public endpoint
router.post("/", createQuote);

// Protected staff/admin management endpoints
router.get("/", protect, authorizeRoles("admin", "hr", "recruiter"), getAllQuotes);
router.get("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getQuoteById);
router.put("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), updateQuote);
router.delete("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), deleteQuote);

module.exports = router;
