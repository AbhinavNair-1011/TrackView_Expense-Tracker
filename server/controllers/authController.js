const Helpers = require("../utils/helpers");
const User = require("../models/userModel");
const Otp = require("../models/otpModel")
const { Op } = require("sequelize");
const { sendEmail } = require("../services/emailService")
const crypto = require('crypto');
const Session = require("../models/sessionModel");
const { createSession } = require("../controllers/sessionController")
const { sequelize } = require('../database/dbConfig');



const register = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      full_name,
      phone,
      password,
      confirm_password,
      email,
      two_factor_enabled
    } = req.body;

    if (!full_name.trim() || !phone.trim() || !password.trim() || !email.trim()) {
      await t.rollback();
      return Helpers.sendBadRequest(res, "All field values required");
    }

    if (confirm_password !== password) {
      await t.rollback();
      return Helpers.sendBadRequest(res, "Password mismatch");
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
      transaction: t
    });

    if (existingUser) {
      await t.rollback();
      return Helpers.sendConflict(res, "User already exists");
    }

    const hashedPassword = await Helpers.encrypt(password);

    const createdUser = await User.create({
      full_name,
      phone,
      password: hashedPassword,
      email,
      two_factor_enabled
    }, { transaction: t });

    const sessionResult = await createSession(req, res, createdUser, false, t);

    if (!sessionResult.created) {
      await t.rollback();
      throw new Error(sessionResult.err);
    }

    await t.commit();
    return Helpers.sendCreated(res, { full_name, phone, email });

  } catch (err) {
    await t.rollback();
    console.error(err);
    return Helpers.sendInternalServerError(res, err.message || err);
  }
};


const login = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { email, password, rememberMe = false } = req.body;

    if (!email || !password) {
      await t.rollback();
      return Helpers.sendBadRequest(res, 'Email and password are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      await t.rollback();
      return Helpers.sendNotFound(res, 'User not found.');
    }

    const isMatch = await Helpers.compare(password, user.password);
    if (!isMatch) {
      await t.rollback();
      return Helpers.sendNotAcceptable(res, 'Invalid password.');
    }

    if (user.two_factor_enabled) {
      const rawOtp = Helpers.generateOtp();
      const hashedOtp = await Helpers.encrypt(rawOtp);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await Otp.destroy({
        where: {
          userId: user.id,
          type: "2fa_login",
        },
        transaction: t,
      });

      await Otp.create({
        userId: user.id,
        otpCode: hashedOtp,
        type: '2fa_login',
        expiresAt,
        verified: false,
      }, { transaction: t });

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

      await t.commit();

      return Helpers.sendOk(res, { twoFactor: true, message: 'OTP sent to your email.' });
    }

    const isSession = await createSession(req, res, user, rememberMe, t);

    if (isSession.created) {
      await t.commit();
      return Helpers.sendOk(res, {
        user: {
          email: user.email,
          name: user.full_name,
          phone: user.phone,
        },
      });
    } else {

      throw new Error(isSession.err);
    }
  } catch (err) {
    await t.rollback();
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};




const verify2FALogin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, otp, rememberMe } = req.body;

    if (!email || !otp) {
      await t.rollback();
      return Helpers.sendBadRequest(res, 'Email and OTP are required.');
    }

    const user = await User.findOne({ where: { email }, transaction: t });
    if (!user) {
      await t.rollback();
      return Helpers.sendNotFound(res, 'User not found.');
    }

    const otpEntry = await Otp.findOne({
      where: {
        userId: user.id,
        type: '2fa_login',
        verified: false,
        expiresAt: { [Op.gt]: new Date() },
      },
      order: [['createdAt', 'DESC']],
      transaction: t,
    });

    if (!otpEntry) {
      await t.rollback();
      return Helpers.sendBadRequest(res, 'OTP expired or not found.');
    }

    const isMatch = await Helpers.compare(otp, otpEntry.otpCode);
    if (!isMatch) {
      await t.rollback();
      return Helpers.sendBadRequest(res, 'Invalid OTP.');
    }

    otpEntry.verified = true;
    await otpEntry.save({ transaction: t });
    await otpEntry.destroy({ transaction: t });

    const isSession = await createSession(req, res, user, rememberMe, t);
    if (!isSession.created) {
      await t.rollback();
      throw new Error(isSession.err);
    }

    await t.commit();
    return Helpers.sendOk(res, {
      user: {
        email: user.email,
        name: user.full_name,
        phone: user.phone,
      },
      message: '2FA login successful.',
    });

  } catch (err) {
    console.error(err);
    await t.rollback();
    return Helpers.sendInternalServerError(res);
  }
};


const logout = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  
  const hashedRefreshToken=Helpers.hashToken(refreshToken || "")

  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/',
    });

    if (hashedRefreshToken) {
      await Session.destroy({
        where: {
          refreshToken: hashedRefreshToken,
        },
      });

    }


    return Helpers.sendOk(res, [], 'Logged out successfully');
  } catch (error) {
    return Helpers.sendInternalServerError(res);
  }
};


const verifyCookie = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ['full_name', 'email', 'phone']
    });
    if (!user) {
      return Helpers.sendNotFound(res, 'User not found');
    }

    return Helpers.sendOk(res, user, 'User authenticated');
  } catch (err) {
    return Helpers.sendInternalServerError(res, 'Something went wrong');
  }
}


const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return Helpers.sendBadRequest(res, "Current and new password are required");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return Helpers.sendNotFound(res, "User not found");
    }

    const isMatch = await Helpers.compare(currentPassword, user.password);
    if (!isMatch) {
      return Helpers.sendUnauthorized(res, "Current password is incorrect");
    }

    const hashedPassword = await Helpers.encrypt(newPassword);

    user.password = hashedPassword;
    await user.save();

    return Helpers.sendUpdated(res, {
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error("Password update error:", error);
    return Helpers.sendInternalServerError(res, "Failed to update password");
  }
};


const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return Helpers.sendBadRequest(res, 'Email and new password are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return Helpers.sendNotFound(res, 'User not found.');

    const verifiedOtp = await Otp.findOne({
      where: {
        userId: user.id,
        type: 'forgot_password',
        verified: true,
      },
      order: [['createdAt', 'DESC']],
    });
    if (!verifiedOtp) {
      return Helpers.sendUnauthorized(res, 'OTP verification required.');
    }

    const hashedPassword = await Helpers.encrypt(newPassword);
    user.password = hashedPassword;
    await user.save();

    await verifiedOtp.destroy();


    return Helpers.sendOk(res, null, 'Password reset successful.');
  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return Helpers.sendUnauthorized(res, 'Unauthorized: No refresh token');
    }

    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await Session.findOne({ where: { refreshToken: hashedRefreshToken } });
    if (!session) {
      res.clearCookie('refreshToken', { path: '/' });
      return Helpers.sendUnauthorized(res, 'Invalid or expired session');
    }

    if (session.expiresAt && new Date() > session.expiresAt) {
      await session.destroy();
      res.clearCookie('refreshToken', { path: '/' });
      return Helpers.sendUnauthorized(res, 'Session expired');
    }

    const user = await User.findByPk(session.userId);
    if (!user) {
      res.clearCookie('refreshToken', { path: '/' });
      return Helpers.sendUnauthorized(res, 'User not found');
    }

    const newAccessToken = Helpers.generateAccessToken(user);
    const accessTokenMaxAge = session.rememberMe ? 10 * 60 * 1000 : undefined

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: accessTokenMaxAge,
      path: '/',
    });

    return Helpers.sendOk(res, { message: 'Access token refreshed' });

  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};

const test = (req, res) => {
  console.log(req.cookies)
}

module.exports = { register, login, test, logout, verifyCookie, updatePassword, resetPassword, verify2FALogin, refreshAccessToken }