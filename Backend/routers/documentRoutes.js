const express = require("express");
const router = express.Router();

const {
  createDocumentRecord,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Protected document endpoints (Restricted to logged-in users with role / ownership check)
router.get("/", protect, getAllDocuments);
router.get("/:id", protect, getDocumentById);
router.post("/", protect, authorizeRoles("admin", "hr", "employee"), createDocumentRecord);
router.put("/:id", protect, authorizeRoles("admin", "hr", "employee"), updateDocument);
router.delete("/:id", protect, authorizeRoles("admin", "hr", "employee"), deleteDocument);

module.exports = router;
