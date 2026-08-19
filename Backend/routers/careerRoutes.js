const express = require("express");
const router = express.Router();
const {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} = require("../controllers/careerController");
const { protect, adminOnly } = require("../config/authMiddleware");

// Public routes
router.get("/", getAllCareers);
router.get("/:id", getCareerById);

// Admin routes
router.post("/", protect, adminOnly, createCareer);
router.put("/:id", protect, adminOnly, updateCareer);
router.delete("/:id", protect, adminOnly, deleteCareer);

module.exports = router;