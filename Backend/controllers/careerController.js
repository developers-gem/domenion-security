const Career = require("../models/Career");
// @desc    Create a new career/job posting
// @route   POST /api/careers
// @access  Private/Admin
const createCareer = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      experience,
      salaryRange,
      applicationDeadline,
    } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const career = await Career.create({
      title,
      department,
      location,
      type,
      description,
      requirements,
      experience,
      salaryRange,
      applicationDeadline,
      postedBy: req.user ? req.user._id : undefined,
    });

    res.status(201).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all careers (with optional filters)
// @route   GET /api/careers
// @access  Public
const getAllCareers = async (req, res) => {
  try {
    const { status, type, location } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: "i" };

    const careers = await Career.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single career by ID
// @route   GET /api/careers/:id
// @access  Public
const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a career posting
// @route   PUT /api/careers/:id
// @access  Private/Admin
const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }

    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedCareer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a career posting
// @route   DELETE /api/careers/:id
// @access  Private/Admin
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }
    await career.deleteOne();
    res.status(200).json({ success: true, message: "Career posting removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
};