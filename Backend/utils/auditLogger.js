const AuditLog = require("../models/AuditLog");

/**
 * Creates an append-only audit log entry for administrative & security actions.
 */
const createAuditLog = async (req, action, resource, resourceId = null, metadata = null) => {
  try {
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || "";

    await AuditLog.create({
      user: req.user ? req.user._id : undefined,
      action,
      resource,
      resourceId: resourceId ? String(resourceId) : undefined,
      ipAddress,
      userAgent,
      metadata,
    });
  } catch (error) {
    console.error(`Audit logging failed for action ${action}:`, error.message);
  }
};

module.exports = { createAuditLog };
