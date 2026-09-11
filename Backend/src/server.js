// const dotenv = require("dotenv");
// dotenv.config();

// const app = require("./app");
// const connectDB = require("../config/db");

// const PORT = process.env.PORT || 4000;

// // Connect to MongoDB then start server
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

const path = require("path");
const dotenv = require("dotenv");

// Explicitly load .env from the parent directory (Backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = require("./app");
const connectDB = require("../config/db");

const PORT = process.env.PORT || 4000;

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`JWT_SECRET loaded:`, Boolean(process.env.JWT_SECRET)); // Quick diagnostic check
  });
});

