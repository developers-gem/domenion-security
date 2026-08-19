// Custom error class so controllers can throw errors with a status code
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Centralized error handling middleware
// Must be registered LAST in app.js, after all routes
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log for debugging (dev only ideally)
  console.error(err.stack);

  // Mongoose bad ObjectId (e.g. /api/careers/invalidid)
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found`, 404);
  }

  // Mongoose duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ErrorResponse(`${field} already exists`, 400);
  }

  // Mongoose validation error (e.g. missing required field)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message.join(", "), 400);
  }
  
  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new ErrorResponse("Invalid token, not authorized", 401);
  }
  if (err.name === "TokenExpiredError") {
    error = new ErrorResponse("Token expired, please login again", 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};

module.exports = { ErrorResponse, errorHandler };