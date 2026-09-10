const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/assessmentController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Employee Assessment Routes (Authenticated Users)
router.get("/employee/available", protect, getAvailableAssessments);
router.get("/employee/my-attempts", protect, getMyAttempts);
router.get("/employee/:id", protect, getEmployeeAssessmentForTaking);
router.post("/employee/:id/submit", protect, submitAssessment);

// Admin Results Routes
router.get("/admin/results", protect, authorizeRoles("admin", "hr", "recruiter"), getAdminResults);
router.get("/admin/results/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getAdminResultById);

// Admin Assessment Management Routes
router.get("/", protect, authorizeRoles("admin", "hr", "recruiter"), getAssessments);
router.get("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getAssessmentById);
router.post("/", protect, authorizeRoles("admin"), createAssessment);
router.put("/:id", protect, authorizeRoles("admin"), updateAssessment);
router.delete("/:id", protect, authorizeRoles("admin"), deleteAssessment);
router.patch("/:id/toggle", protect, authorizeRoles("admin"), toggleAssessmentStatus);

module.exports = router;
