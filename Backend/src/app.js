const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const userRoutes = require("../routers/userRoutes");
const careerRoutes = require("../routers/careerRoutes");
const careerFormRoutes = require("../routers/careerFormRoutes");
const contactRoutes = require("../routers/contactRoutes");
const quoteRoutes = require("../routers/quoteRoutes");
const leadRoutes = require("../routers/leadRoutes");
const blogRoutes = require("../routers/blogRoutes");
const faqRoutes = require("../routers/faqRoutes");
const cmsRoutes = require("../routers/cmsRoutes");
const mediaRoutes = require("../routers/mediaRoutes");
const documentRoutes = require("../routers/documentRoutes");
const employeeRoutes = require("../routers/employeeRoutes");
const auditLogRoutes = require("../routers/auditLogRoutes");
const { errorHandler } = require("../config/errorHandler");

const app = express();

// Security Headers with Helmet
app.use(helmet());

// Request Logging with Morgan
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// CORS Configuration supporting development & production environment
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: Origin not allowed"), false);
    },
    credentials: true,
  })
);

// Rate Limiting Middleware: Max 100 requests per 15 minutes per IP for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use("/api", apiLimiter);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Domenion Security API is running" });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/career-forms", careerFormRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/audit-logs", auditLogRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler — must be LAST
app.use(errorHandler);

module.exports = app;