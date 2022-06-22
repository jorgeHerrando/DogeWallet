const jwt = require("jsonwebtoken");
// create token that lasts for 1h
module.exports = function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
};
