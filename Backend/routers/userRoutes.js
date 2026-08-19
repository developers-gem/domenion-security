const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../config/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private routes (logged-in user)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin routes
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;