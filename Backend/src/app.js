const express = require("express");
const cors = require("cors");

const userRoutes = require("../routers/userRoutes");
const careerRoutes = require("../routers/careerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Domenion Security API is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

module.exports = app;