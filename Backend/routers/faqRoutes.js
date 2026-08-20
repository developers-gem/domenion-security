const express = require("express");
const router = express.Router();

const {
  createFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Public endpoint
router.get("/", getAllFAQs);

// Protected management endpoints
router.post("/", protect, authorizeRoles("admin", "content_manager"), createFAQ);
router.put("/:id", protect, authorizeRoles("admin", "content_manager"), updateFAQ);
router.delete("/:id", protect, authorizeRoles("admin", "content_manager"), deleteFAQ);

module.exports = router;
