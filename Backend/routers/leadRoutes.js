const express = require("express");
const router = express.Router();

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Protected staff/admin lead management endpoints
router.post("/", protect, authorizeRoles("admin", "hr", "recruiter"), createLead);
router.get("/", protect, authorizeRoles("admin", "hr", "recruiter"), getAllLeads);
router.get("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getLeadById);
router.put("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), updateLead);
router.delete("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), deleteLead);

module.exports = router;
