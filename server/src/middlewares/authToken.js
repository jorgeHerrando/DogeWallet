const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    // we get the token from the header
    const token = authHeader.split(" ")[1];
    // we verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).json({ message: "No authenticatetion provided" });
  }
}

module.exports = authToken;
