const EmployeeProfile = require("../models/EmployeeProfile");
const User = require("../models/User");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Create Employee Profile
// @route   POST /api/employees
// @access  Private (Admin / HR)
const createEmployeeProfile = async (req, res) => {
  try {
    const { userId, employeeId, department, position, hireDate, status, phone, emergencyContact, address } = req.body;

    if (!userId || !employeeId || !department || !position) {
      return res.status(400).json({
        success: false,
        message: "Please provide userId, employeeId, department, and position",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid User ID format" });
    }

    const userObj = await User.findById(userId);
    if (!userObj) {
      return res.status(404).json({ success: false, message: "Referenced User account not found" });
    }

    const existingProfile = await EmployeeProfile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ success: false, message: "Employee profile already exists for this user" });
    }

    const existingId = await EmployeeProfile.findOne({ employeeId });
    if (existingId) {
      return res.status(400).json({ success: false, message: "Employee ID already exists" });
    }

    const profile = await EmployeeProfile.create({
      user: userId,
      employeeId,
      department,
      position,
      hireDate: hireDate || new Date(),
      status: status || "active",
      phone,
      emergencyContact,
      address,
    });

    // Automatically update User role to employee if currently "user"
    if (userObj.role === "user") {
      userObj.role = "employee";
      await userObj.save();
    }

    await createAuditLog(req, "CREATE_EMPLOYEE_PROFILE", "EmployeeProfile", profile._id, { employeeId, department });

    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all employee profiles
// @route   GET /api/employees
// @access  Private (Admin / HR)
const getAllEmployees = async (req, res) => {
  try {
    const { department, status } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (status) filter.status = status;

    const employees = await EmployeeProfile.find(filter)
      .populate("user", "name email phone role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single employee profile by ID or User ID
// @route   GET /api/employees/:id
// @access  Private (Admin / HR / Employee for own profile)
const getEmployeeById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    let profile = await EmployeeProfile.findById(req.params.id).populate("user", "name email phone role");
    if (!profile) {
      profile = await EmployeeProfile.findOne({ user: req.params.id }).populate("user", "name email phone role");
    }

    if (!profile) {
      return res.status(404).json({ success: false, message: "Employee profile not found" });
    }

    // Ownership check for non-HR/non-Admin employees
    if (
      req.user &&
      !["admin", "hr"].includes(req.user.role) &&
      String(profile.user?._id) !== String(req.user._id)
    ) {
      return res.status(403).json({ success: false, message: "Access denied to this employee profile" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update employee profile
// @route   PUT /api/employees/:id
// @access  Private (Admin / HR / Employee for own profile)
const updateEmployeeProfile = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const profile = await EmployeeProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Employee profile not found" });
    }

    const isSelf = req.user && String(profile.user) === String(req.user._id);
    const isStaff = req.user && ["admin", "hr"].includes(req.user.role);

    if (!isStaff && !isSelf) {
      return res.status(403).json({ success: false, message: "Access denied to modify this employee profile" });
    }

    // Employees can only update phone, emergencyContact, address
    const { department, position, status, phone, emergencyContact, address } = req.body;

    if (isStaff) {
      if (department) profile.department = department;
      if (position) profile.position = position;
      if (status) profile.status = status;
    }

    if (phone) profile.phone = phone;
    if (emergencyContact) profile.emergencyContact = emergencyContact;
    if (address) profile.address = address;

    const updatedProfile = await profile.save();
    await createAuditLog(req, "UPDATE_EMPLOYEE_PROFILE", "EmployeeProfile", profile._id);

    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete employee profile
// @route   DELETE /api/employees/:id
// @access  Private (Admin / HR)
const deleteEmployeeProfile = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const profile = await EmployeeProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Employee profile not found" });
    }

    await profile.deleteOne();
    await createAuditLog(req, "DELETE_EMPLOYEE_PROFILE", "EmployeeProfile", req.params.id);

    res.status(200).json({ success: true, message: "Employee profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEmployeeProfile,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeProfile,
  deleteEmployeeProfile,
};
