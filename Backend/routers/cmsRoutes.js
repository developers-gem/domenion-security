const express = require("express");
const router = express.Router();

const {
  createPageContent,
  getPageContents,
  getPageBySlug,
  updatePageContent,
  deletePageContent,
} = require("../controllers/cmsController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Public endpoints
router.get("/pages", getPageContents);
router.get("/pages/:slug", getPageBySlug);

// Protected management endpoints
router.post("/pages", protect, authorizeRoles("admin", "content_manager"), createPageContent);
router.put("/pages/:id", protect, authorizeRoles("admin", "content_manager"), updatePageContent);
router.delete("/pages/:id", protect, authorizeRoles("admin", "content_manager"), deletePageContent);

module.exports = router;
