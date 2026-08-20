const BlogPost = require("../models/BlogPost");
const mongoose = require("mongoose");
const { createAuditLog } = require("../utils/auditLogger");

// Helper function to generate clean unique slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private (Admin / Content Manager)
const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, featuredImage, category, tags, status, publishedAt, seoTitle, seoDescription } = req.body;

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (title, excerpt, content, category)",
      });
    }

    const slug = req.body.slug ? slugify(req.body.slug) : slugify(title);

    const slugExists = await BlogPost.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ success: false, message: "A blog post with this slug already exists" });
    }

    const blog = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author: req.user._id,
      category,
      tags,
      status: status || "draft",
      publishedAt: status === "published" ? publishedAt || new Date() : undefined,
      seoTitle,
      seoDescription,
    });

    await createAuditLog(req, "CREATE_BLOG", "BlogPost", blog._id, { slug, status });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all blog posts (Public returns published; Admin/Content-Manager can filter)
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
  try {
    const { category, tag, status } = req.query;
    const filter = {};

    // Public only sees published posts unless staff requests specific status
    if (status && req.user && ["admin", "content_manager"].includes(req.user.role)) {
      filter.status = status;
    } else {
      filter.status = "published";
    }

    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const blogs = await BlogPost.find(filter)
      .populate("author", "name email")
      .sort({ publishedAt: -1, createdAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "name email");
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin / Content Manager)
const updateBlog = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID format" });
    }

    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    if (req.body.slug && req.body.slug !== blog.slug) {
      const newSlug = slugify(req.body.slug);
      const slugExists = await BlogPost.findOne({ slug: newSlug });
      if (slugExists) {
        return res.status(400).json({ success: false, message: "A blog post with this slug already exists" });
      }
      req.body.slug = newSlug;
    }

    if (req.body.status === "published" && !blog.publishedAt) {
      req.body.publishedAt = new Date();
    }

    const updatedBlog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await createAuditLog(req, "UPDATE_BLOG", "BlogPost", blog._id);

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin / Content Manager)
const deleteBlog = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID format" });
    }

    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    await blog.deleteOne();
    await createAuditLog(req, "DELETE_BLOG", "BlogPost", req.params.id);

    res.status(200).json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
