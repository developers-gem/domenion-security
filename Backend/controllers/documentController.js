const Document = require("../models/Document");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Register a document metadata record
// @route   POST /api/documents
// @access  Private (Admin / HR / Employee)
const createDocumentRecord = async (req, res) => {
  try {
    const { name, description, category, filePath, mimeType, size, owner, visibility, accessLevel } = req.body;

    if (!name || !filePath || !mimeType || !size) {
      return res.status(400).json({
        success: false,
        message: "Please provide document name, filePath, mimeType, and size",
      });
    }

    const document = await Document.create({
      name,
      description,
      category: category || "other",
      filePath,
      mimeType,
      size,
      owner: owner || req.user._id,
      visibility: visibility || "internal",
      accessLevel: accessLevel || "staff_only",
      uploadedBy: req.user._id,
    });

    await createAuditLog(req, "CREATE_DOCUMENT_RECORD", "Document", document._id, { name, category });

    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all document metadata records (with visibility & owner filtering)
// @route   GET /api/documents
// @access  Private (Admin / HR / Employee for own docs)
const getAllDocuments = async (req, res) => {
  try {
    const filter = {};

    // Non-admin / Non-HR can only see internal docs or their own docs
    if (req.user && !["admin", "hr"].includes(req.user.role)) {
      filter.$or = [{ owner: req.user._id }, { visibility: "internal" }];
    }

    const documents = await Document.find(filter)
      .populate("owner", "name email role")
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: documents.length, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single document record by ID
// @route   GET /api/documents/:id
// @access  Private (Admin / HR / Owner)
const getDocumentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid document ID format" });
    }

    const document = await Document.findById(req.params.id)
      .populate("owner", "name email role")
      .populate("uploadedBy", "name email role");

    if (!document) {
      return res.status(404).json({ success: false, message: "Document record not found" });
    }

    // Ownership / Staff Authorization check
    if (
      req.user &&
      !["admin", "hr"].includes(req.user.role) &&
      String(document.owner?._id) !== String(req.user._id)
    ) {
      return res.status(403).json({ success: false, message: "Access denied to this document" });
    }

    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update document metadata / status
// @route   PUT /api/documents/:id
// @access  Private (Admin / HR / Owner)
const updateDocument = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid document ID format" });
    }

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, message: "Document record not found" });
    }

    if (
      req.user &&
      !["admin", "hr"].includes(req.user.role) &&
      String(document.owner) !== String(req.user._id)
    ) {
      return res.status(403).json({ success: false, message: "Access denied to modify this document" });
    }

    const { name, description, category, visibility, accessLevel, status } = req.body;
    if (name) document.name = name;
    if (description !== undefined) document.description = description;
    if (category) document.category = category;
    if (visibility) document.visibility = visibility;
    if (accessLevel) document.accessLevel = accessLevel;
    if (status) document.status = status;

    const updatedDocument = await document.save();
    await createAuditLog(req, "UPDATE_DOCUMENT_RECORD", "Document", document._id);

    res.status(200).json({ success: true, data: updatedDocument });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete document record
// @route   DELETE /api/documents/:id
// @access  Private (Admin / HR / Owner)
const deleteDocument = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid document ID format" });
    }

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, message: "Document record not found" });
    }

    if (
      req.user &&
      !["admin", "hr"].includes(req.user.role) &&
      String(document.owner) !== String(req.user._id)
    ) {
      return res.status(403).json({ success: false, message: "Access denied to delete this document" });
    }

    await document.deleteOne();
    await createAuditLog(req, "DELETE_DOCUMENT_RECORD", "Document", req.params.id);

    res.status(200).json({ success: true, message: "Document record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDocumentRecord,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
