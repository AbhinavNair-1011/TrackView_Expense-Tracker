const jwt = require('jsonwebtoken');
const Helpers = require("../utils/helpers");

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token; 

  if (!token) {
    return Helpers.sendInvalidToken(res);
  }

  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    console.log(decoded)
    req.user = decoded; 
    next();
  } catch (err) {
    return Helpers.sendUnauthorized(res);
  }
};

module.exports = authenticateToken;
