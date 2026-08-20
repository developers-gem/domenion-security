const Media = require("../models/Media");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Register a new media record (Metadata registry only)
// @route   POST /api/media
// @access  Private (Admin / Content Manager / HR)
const createMediaRecord = async (req, res) => {
  try {
    const { filename, originalName, mimeType, size, url, category } = req.body;

    if (!filename || !originalName || !mimeType || !size || !url) {
      return res.status(400).json({
        success: false,
        message: "Please provide filename, originalName, mimeType, size, and url",
      });
    }

    const media = await Media.create({
      filename,
      originalName,
      mimeType,
      size,
      url,
      category: category || "general",
      uploadedBy: req.user._id,
    });

    await createAuditLog(req, "CREATE_MEDIA_RECORD", "Media", media._id, { filename, category });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all media metadata records
// @route   GET /api/media
// @access  Private (Admin / Content Manager / HR)
const getAllMedia = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const mediaItems = await Media.find(filter)
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: mediaItems.length, data: mediaItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a media metadata record
// @route   DELETE /api/media/:id
// @access  Private (Admin / Content Manager / HR)
const deleteMediaRecord = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid media ID format" });
    }

    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media record not found" });
    }

    await media.deleteOne();
    await createAuditLog(req, "DELETE_MEDIA_RECORD", "Media", req.params.id);

    res.status(200).json({ success: true, message: "Media record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMediaRecord,
  getAllMedia,
  deleteMediaRecord,
};
