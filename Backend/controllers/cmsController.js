const PageContent = require("../models/PageContent");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// @desc    Create or upsert PageContent section
// @route   POST /api/cms/pages
// @access  Private (Admin / Content Manager)
const createPageContent = async (req, res) => {
  try {
    const { page, section, title, content, images, videos, seoMetadata, status } = req.body;

    if (!page || !section) {
      return res.status(400).json({ success: false, message: "Please provide page and section identifiers" });
    }

    let pageContent = await PageContent.findOne({ page: page.toLowerCase(), section: section.toLowerCase() });

    if (pageContent) {
      if (title !== undefined) pageContent.title = title;
      if (content !== undefined) pageContent.content = content;
      if (images) pageContent.images = images;
      if (videos) pageContent.videos = videos;
      if (seoMetadata) pageContent.seoMetadata = seoMetadata;
      if (status) pageContent.status = status;
      pageContent.updatedBy = req.user._id;

      await pageContent.save();
      await createAuditLog(req, "UPDATE_CMS_PAGE", "PageContent", pageContent._id, { page, section });
      return res.status(200).json({ success: true, data: pageContent });
    }

    pageContent = await PageContent.create({
      page: page.toLowerCase(),
      section: section.toLowerCase(),
      title,
      content,
      images,
      videos,
      seoMetadata,
      status: status || "published",
      updatedBy: req.user._id,
    });

    await createAuditLog(req, "CREATE_CMS_PAGE", "PageContent", pageContent._id, { page, section });

    res.status(201).json({ success: true, data: pageContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all PageContent items (or filter by page)
// @route   GET /api/cms/pages
// @access  Public
const getPageContents = async (req, res) => {
  try {
    const { page } = req.query;
    const filter = { status: "published" };
    if (page) filter.page = page.toLowerCase();

    const contents = await PageContent.find(filter).sort({ page: 1, section: 1 });
    res.status(200).json({ success: true, count: contents.length, data: contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get PageContent by page slug
// @route   GET /api/cms/pages/:slug
// @access  Public
const getPageBySlug = async (req, res) => {
  try {
    const contents = await PageContent.find({
      page: req.params.slug.toLowerCase(),
      status: "published",
    });

    res.status(200).json({ success: true, count: contents.length, data: contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update PageContent by ID
// @route   PUT /api/cms/pages/:id
// @access  Private (Admin / Content Manager)
const updatePageContent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid page content ID format" });
    }

    const pageContent = await PageContent.findById(req.params.id);
    if (!pageContent) {
      return res.status(404).json({ success: false, message: "Page content section not found" });
    }

    req.body.updatedBy = req.user._id;

    const updatedContent = await PageContent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await createAuditLog(req, "UPDATE_CMS_PAGE", "PageContent", pageContent._id);

    res.status(200).json({ success: true, data: updatedContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete PageContent section
// @route   DELETE /api/cms/pages/:id
// @access  Private (Admin / Content Manager)
const deletePageContent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid page content ID format" });
    }

    const pageContent = await PageContent.findById(req.params.id);
    if (!pageContent) {
      return res.status(404).json({ success: false, message: "Page content section not found" });
    }

    await pageContent.deleteOne();
    await createAuditLog(req, "DELETE_CMS_PAGE", "PageContent", req.params.id);

    res.status(200).json({ success: true, message: "Page content section deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPageContent,
  getPageContents,
  getPageBySlug,
  updatePageContent,
  deletePageContent,
};
