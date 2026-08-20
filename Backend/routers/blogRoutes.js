const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Public endpoints
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Protected management endpoints
router.post("/", protect, authorizeRoles("admin", "content_manager"), createBlog);
router.put("/:id", protect, authorizeRoles("admin", "content_manager"), updateBlog);
router.delete("/:id", protect, authorizeRoles("admin", "content_manager"), deleteBlog);

module.exports = router;
