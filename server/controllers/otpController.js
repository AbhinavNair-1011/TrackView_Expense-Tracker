const { User, Otp } = require('../models/indexModel');
const { Op } = require('sequelize');
const Helpers = require('../utils/helpers');
const { sendEmail } = require('../services/emailService');


const EXPIRATION_MINUTES = 10;




const sendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return Helpers.sendBadRequest(res, 'Email is required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return Helpers.sendNotFound(res, 'User not found.');

    await Otp.destroy({
      where: {
        userId: user.id,
        type,
      },
    });

    const rawOtp = Helpers.generateOtp();
    const hashed = await Helpers.encrypt(rawOtp);
    const expiresAt = new Date(Date.now() + EXPIRATION_MINUTES * 60 * 1000);

    const result = await sendEmail(
      email,
      'Your OTP Code',
      `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #333333; text-align: center;">Your One-Time Password (OTP)</h2>
      <p style="font-size: 16px; color: #555555;">Hello,</p>
      <p style="font-size: 16px; color: #555555;">
        Use the following OTP to complete your action. This OTP is valid for a limited time:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; font-size: 24px; font-weight: bold; border-radius: 6px; letter-spacing: 3px;">
          ${rawOtp}
        </span>
      </div>
      <p style="font-size: 14px; color: #999999;">If you did not request this, you can ignore this email.</p>
      <p style="font-size: 14px; color: #999999;">Thanks,<br/>Expense Tracker Team</p>
    </div>
  </div>
  `
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
