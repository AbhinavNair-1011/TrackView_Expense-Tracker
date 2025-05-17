const { User, Otp } = require('../models/indexModel');
const { Op } = require('sequelize');
const Helpers = require('../utils/helpers');
const { sendEmail } = require('../services/emailService');


const EXPIRATION_MINUTES = 10;




const sendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return Helpers.sendBadRequest(res, 'Email and type are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return Helpers.sendNotFound(res, 'User not found.');

    await Otp.destroy({
      where: {
        userId: user.id,
        type,
        verified: false, 
      },
    });

    const rawOtp = Helpers.generateOtp();
    console.log(rawOtp);
    const hashed = await Helpers.encrypt(rawOtp);
    const expiresAt = new Date(Date.now() + EXPIRATION_MINUTES * 60 * 1000);

    const result = await sendEmail(
      email,
      'Your OTP Code',
      `<p>Your OTP is: <strong>${rawOtp}</strong></p>`
    );

    if (result) {
      await Otp.create({
        userId: user.id,
        otpCode: hashed,
        type,
        expiresAt,
      });
    } else {
      throw new Error("Failed to send OTP mail, please try again.");
    }

    return Helpers.sendOk(res, null, 'OTP sent successfully.');
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { email, type, otp } = req.body;
    console.log(otp);

    if (!email || !type || !otp) {
      return Helpers.sendBadRequest(res, 'Email, type, and OTP are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return Helpers.sendNotFound(res, 'User not found.');

    const otpEntry = await Otp.findOne({
      where: {
        userId: user.id,
        type,
        verified: false,
        expiresAt: { [Op.gt]: new Date() },
      },
      order: [['createdAt', 'DESC']],
    });

    if (!otpEntry) {
      return Helpers.sendBadRequest(res, 'OTP expired or not found.');
    }

    const isMatch = await Helpers.compare(otp, otpEntry.otpCode);
    if (!isMatch) return Helpers.sendBadRequest(res, 'Invalid OTP.');

    otpEntry.verified = true;
    await otpEntry.save();

    if (type === '2fa_login') {
      user.two_factor_enabled = true; 
      await user.save();
    }

    return Helpers.sendOk(res, null, 'OTP verified successfully.');
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};


module.exports = {
  sendOtp,
  verifyOtp,

};
