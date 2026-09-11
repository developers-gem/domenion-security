// const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || "7d",
//   });
// };

// module.exports = generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "domenion_security_jwt_secret_key_fallback_2026";
  
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

module.exports = generateToken;