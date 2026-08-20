const express = require("express");
const router = express.Router();

const {
  createCareerForm,
  getAllCareerForms,
  getCareerFormById,
  updateCareerFormStatus,
  deleteCareerForm,
} = require("../controllers/careerFormController");

const { protect, adminOnly, authorizeRoles } = require("../config/authMiddleware");

// Public route: create career form submission
router.post("/careerform", createCareerForm);

// Protected routes for Admin / HR / Recruiter
router.get("/", protect, authorizeRoles("admin", "hr", "recruiter"), getAllCareerForms);
router.get("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getCareerFormById);
router.put("/:id/status", protect, authorizeRoles("admin", "hr", "recruiter"), updateCareerFormStatus);

// Protected admin-only route: delete career form submission
router.delete("/deletecareerform/:id", protect, adminOnly, deleteCareerForm);

module.exports = router;