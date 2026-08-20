const ContactRequest = require("../models/ContactRequest");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Submit a new contact request (Public)
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, phone, and message",
      });
    }

    const contactRequest = await ContactRequest.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    res.status(201).json({ success: true, data: contactRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact requests
// @route   GET /api/contact
// @access  Private (Admin / HR / Recruiter)
const getAllContacts = async (req, res) => {
  try {
    const { status, email } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (email) filter.email = { $regex: email, $options: "i" };

    const contacts = await ContactRequest.find(filter)
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single contact request by ID
// @route   GET /api/contact/:id
// @access  Private (Admin / HR / Recruiter)
const getContactById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid contact ID format" });
    }

    const contact = await ContactRequest.findById(req.params.id).populate("assignedTo", "name email role");
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact request not found" });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update contact request (status, assignedTo, notes)
// @route   PUT /api/contact/:id
// @access  Private (Admin / HR / Recruiter)
const updateContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid contact ID format" });
    }

    const contact = await ContactRequest.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact request not found" });
    }

    const { status, assignedTo, note } = req.body;
    if (status) contact.status = status;
    if (assignedTo !== undefined) contact.assignedTo = assignedTo || null;
    if (note) contact.notes.push(note);

    const updatedContact = await contact.save();
    await createAuditLog(req, "UPDATE_CONTACT", "ContactRequest", contact._id, { status, assignedTo });

    res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact request
// @route   DELETE /api/contact/:id
// @access  Private (Admin / HR / Recruiter)
const deleteContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid contact ID format" });
    }

    const contact = await ContactRequest.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact request not found" });
    }

    await contact.deleteOne();
    await createAuditLog(req, "DELETE_CONTACT", "ContactRequest", req.params.id);

    res.status(200).json({ success: true, message: "Contact request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
