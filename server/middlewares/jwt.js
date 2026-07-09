const jwt = require('jsonwebtoken');
const Helpers = require("../utils/helpers");

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return Helpers.sendInvalidToken(res);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return Helpers.sendUnauthorized(res, 'Invalid or expired token');
  }
};

module.exports = authenticateToken;
