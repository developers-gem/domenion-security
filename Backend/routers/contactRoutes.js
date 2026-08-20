const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Public endpoint
router.post("/", createContact);

// Protected staff/admin management endpoints
router.get("/", protect, authorizeRoles("admin", "hr", "recruiter"), getAllContacts);
router.get("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getContactById);
router.put("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), updateContact);
router.delete("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), deleteContact);

module.exports = router;
