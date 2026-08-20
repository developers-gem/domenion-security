const express = require("express");
const router = express.Router();

const { getAuditLogs } = require("../controllers/auditLogController");
const { protect, adminOnly } = require("../config/authMiddleware");

// Protected AuditLog endpoint (Strictly Admin Only, Append-Only)
router.get("/", protect, adminOnly, getAuditLogs);

module.exports = router;
