const Lead = require("../models/Lead");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Create a new lead (Direct or referenced)
// @route   POST /api/leads
// @access  Private (Admin / HR / Recruiter)
const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, sourceType, sourceId, sourceTypeModel, status, priority, assignedTo, value, note } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Please provide lead name and email" });
    }

    // Duplicate Lead check by sourceId if present
    if (sourceId) {
      const existingLead = await Lead.findOne({ sourceId });
      if (existingLead) {
        return res.status(400).json({ success: false, message: "A lead for this source request already exists", data: existingLead });
      }
    }

    const notes = note ? [{ text: note, addedBy: req.user._id }] : [];

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      sourceType,
      sourceId: sourceId || undefined,
      sourceTypeModel: sourceTypeModel || undefined,
      status,
      priority,
      assignedTo: assignedTo || undefined,
      value,
      notes,
    });

    await createAuditLog(req, "CREATE_LEAD", "Lead", lead._id, { email, status });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all leads (with filters)
// @route   GET /api/leads
// @access  Private (Admin / HR / Recruiter)
const getAllLeads = async (req, res) => {
  try {
    const { status, priority, assignedTo, sourceType } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (sourceType) filter.sourceType = sourceType;
    if (assignedTo) filter.assignedTo = assignedTo;

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email role")
      .populate("sourceId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Private (Admin / HR / Recruiter)
const getLeadById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid lead ID format" });
    }

    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("notes.addedBy", "name email");

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update lead status/fields
// @route   PUT /api/leads/:id
// @access  Private (Admin / HR / Recruiter)
const updateLead = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid lead ID format" });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    const { status, priority, assignedTo, value, note, name, phone, company } = req.body;

    if (status) lead.status = status;
    if (priority) lead.priority = priority;
    if (assignedTo !== undefined) lead.assignedTo = assignedTo || null;
    if (value !== undefined) lead.value = value;
    if (name) lead.name = name;
    if (phone) lead.phone = phone;
    if (company) lead.company = company;

    if (note) {
      lead.notes.push({ text: note, addedBy: req.user._id });
    }

    const updatedLead = await lead.save();
    await createAuditLog(req, "UPDATE_LEAD", "Lead", lead._id, { status, priority });

    res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin / HR / Recruiter)
const deleteLead = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid lead ID format" });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    await lead.deleteOne();
    await createAuditLog(req, "DELETE_LEAD", "Lead", req.params.id);

    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
