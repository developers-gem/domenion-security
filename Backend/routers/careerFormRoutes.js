const express = require("express");
const router = express.Router();
const uploadResume = require("../config/uploadMiddleware");

const {
  createCareerForm,
  getAllCareerForms,
  getCareerFormById,
  getCareerFormResume,
  updateCareerFormStatus,
  deleteCareerForm,
} = require("../controllers/careerFormController");

const { protect, adminOnly, authorizeRoles } = require("../config/authMiddleware");

// Custom wrapper to handle Multer upload errors gracefully
const handleResumeUpload = (req, res, next) => {
  uploadResume.single("resume")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Uploaded file is too large. Maximum allowed file size is 5 MB.",
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed. Only PDF, DOC, and DOCX files are allowed.",
      });
    }
    next();
  });
};

// Public route: create career form submission (supports optional resume upload)
router.post("/careerform", handleResumeUpload, createCareerForm);

// Protected routes for Admin / HR / Recruiter
router.get("/", protect, authorizeRoles("admin", "hr", "recruiter"), getAllCareerForms);
router.get("/:id", protect, authorizeRoles("admin", "hr", "recruiter"), getCareerFormById);
router.get("/:id/resume", protect, authorizeRoles("admin", "hr", "recruiter"), getCareerFormResume);
router.put("/:id/status", protect, authorizeRoles("admin", "hr", "recruiter"), updateCareerFormStatus);

// Protected admin-only route: delete career form submission
router.delete("/deletecareerform/:id", protect, adminOnly, deleteCareerForm);

module.exports = router;