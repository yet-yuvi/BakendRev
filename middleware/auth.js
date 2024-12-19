const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Step1: Get the Headers Authorization Token
  const authHeader = req.headers.authorization;
    // Step2: If no value then error Unauthorized1
  if (!authHeader) {
    res.status(401).json({ message: "Token not provided" });
    return;
  }
  // Step3: If authHeader has "Bearer Token" then split and get token
  const token = authHeader && authHeader.split(" ")[1];
  // Step4: If no token
  if (!token) {
    res.status(401).json({ message: "Token not provided2" });
    return;
  } else {
    // Step5: If token then verify with JWT_SECRET and get payload
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        // Step6: If not verified then Unauthorized3
        res.status(401).json({ message: "Token is invalid or expired" });
        return;
      } else {
        // Step7: If verified token then send payload to req.user
        req.user = payload;
        next();
      }
    });
  }
};
