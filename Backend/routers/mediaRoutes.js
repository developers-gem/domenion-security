const express = require("express");
const router = express.Router();

const {
  createMediaRecord,
  getAllMedia,
  deleteMediaRecord,
} = require("../controllers/mediaController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Protected staff/admin media metadata endpoints
router.get("/", protect, authorizeRoles("admin", "content_manager", "hr"), getAllMedia);
router.post("/", protect, authorizeRoles("admin", "content_manager", "hr"), createMediaRecord);
router.delete("/:id", protect, authorizeRoles("admin", "content_manager", "hr"), deleteMediaRecord);

module.exports = router;
