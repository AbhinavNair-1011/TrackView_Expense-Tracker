const jwt = require('jsonwebtoken'); 4
const Helpers = require("../utils/helpers")

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        Helpers.sendInvalidToken(res);
    }

    try {
        const decoded = jwt.verify(token, "process.env.JWT_SECRET");
        req.user = decoded;
        next();
    } catch (err) {
        Helpers.sendInvalidToken(res);
    }
};

module.exports = { verifyToken }