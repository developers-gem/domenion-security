const express = require("express");
const router = express.Router();

const {
  createEmployeeProfile,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeProfile,
  deleteEmployeeProfile,
} = require("../controllers/employeeController");

const { protect, authorizeRoles } = require("../config/authMiddleware");

// Protected employee endpoints
router.get("/", protect, authorizeRoles("admin", "hr"), getAllEmployees);
router.get("/:id", protect, getEmployeeById);
router.post("/", protect, authorizeRoles("admin", "hr"), createEmployeeProfile);
router.put("/:id", protect, updateEmployeeProfile);
router.delete("/:id", protect, authorizeRoles("admin", "hr"), deleteEmployeeProfile);

module.exports = router;
