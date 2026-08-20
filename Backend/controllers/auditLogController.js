const AuditLog = require("../models/AuditLog");

// @desc    Get audit logs (Restricted to Admin only, append-only)
// @route   GET /api/audit-logs
// @access  Private (Admin Only)
const getAuditLogs = async (req, res) => {
  try {
    const { action, resource, user, limit = 50 } = req.query;
    const filter = {};

    if (action) filter.action = action;
    if (resource) filter.resource = resource;
    if (user) filter.user = user;

    const maxLimit = Math.min(parseInt(limit, 10) || 50, 100);

    const logs = await AuditLog.find(filter)
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(maxLimit);

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAuditLogs };
