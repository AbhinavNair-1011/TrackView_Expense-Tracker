const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");
const crypto =require("crypto")

class Helpers {

  static sendResponse(res, status, data = null, message = '') {
    return res.status(status).json({
      statusCode: status,
      data,
      message,
    });
  }

    static sendInternalServerError(res, message = 'Internal Server Error') {
    return res.status(500).json({
      statusCode: 500,
      message,
    });
  }

  static sendOk(res, data, message = 'Success') {
    return Helpers.sendResponse(res, 200, data, message);
  }

  static sendCreated(res, data, message = 'Created Successfully') {
    return Helpers.sendResponse(res, 201, data, message);
  }

  static sendUpdated(res, data, message = 'Updated Successfully') {
    return Helpers.sendResponse(res, 200, data, message);
  }

  static sendDeleted(res, message = 'Deleted Successfully') {
    return Helpers.sendResponse(res, 200, null, message);
  }

  static sendNotFound(res, message = 'Not Found') {
    return Helpers.sendResponse(res, 404, null, message);
  }

  static sendNotAcceptable(res, message = 'Not Acceptable') {
    return Helpers.sendResponse(res, 406, null, message);
  }

  static sendBadRequest(res, message = 'Bad Request') {
    return Helpers.sendResponse(res, 400, null, message);
  }

  static sendUnauthorized(res, message = 'Unauthorized') {
    return Helpers.sendResponse(res, 401, null, message);
  }

  static sendInvalidToken(res, message = 'Invalid Token') {
    return Helpers.sendResponse(res, 401, null, message);
  }

  static sendSessionExpired(res, message = 'Session Expired') {
    return Helpers.sendResponse(res, 401, null, message);
  }

  static sendForbidden(res, message = 'Forbidden') {
    return Helpers.sendResponse(res, 403, null, message);
  }

  static sendConflict(res, message = 'Already existing data, duplicate attempt') {
    return Helpers.sendResponse(res, 409, null, message);
  }
  static async encrypt(string) {
    return await bcrypt.hash(string, 10);
  }

  static async compare(TextPassword, hashedPassword) {
    return await bcrypt.compare(TextPassword, hashedPassword);
  }
  
  static generateOtp () {
   return Math.floor(100000 + Math.random() * 900000).toString();
 }
static generateRefreshToken() {
    return crypto.randomBytes(40).toString('hex');
  }

  static generateAccessToken(user) {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "10m"}
    );
  }

  static hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

}

module.exports = Helpers;
