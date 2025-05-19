const Helpers = require("../utils/helpers");
const User = require("../models/userModel");
const Otp = require("../models/otpModel")
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { sendEmail } = require("../services/emailService")


const register = async (req, res) => {

  try {
    const {
      full_name,
      phone,
      password,
      confirm_password,
      email,
      two_factor_enabled
    } = req.body

    if (!full_name.trim() || !phone.trim() || !password.trim() || !email.trim()) {
      return Helpers.sendBadRequest(res, "all field values required")
    }
    if (confirm_password !== password) {
      return Helpers.sendBadRequest(res, "password mismatch")
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
        ]
      }
    });

    if (user) {
      return Helpers.sendConflict(res, "User already exists");
    }


    const hashedPassword = await Helpers.encrypt(password);
    const createdUser = await User.create({
      full_name,
      phone,
      password: hashedPassword,
      email,
      two_factor_enabled
    })

    const token = jwt.sign(
      { id: createdUser.id, },
      "process.env.JWT_SECRET",
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    });

    return Helpers.sendCreated(res, { full_name, phone, email })

  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res, err.message || err)
  }

}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return Helpers.sendBadRequest(res, 'Email and password are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return Helpers.sendNotFound(res, 'User not found.');

    const isMatch = await Helpers.compare(password, user.password);
    if (!isMatch) return Helpers.sendUnauthorized(res, 'Invalid password.');

    if (user.two_factor_enabled) {
      const rawOtp = Helpers.generateOtp();
      const hashedOtp = await Helpers.encrypt(rawOtp);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await Otp.destroy({
        where: {
          userId: user.id,
          type: "2fa_login",
        },
      });

      await Otp.create({
        userId: user.id,
        otpCode: hashedOtp,
        type: '2fa_login',
        expiresAt,
        verified: false,
      });

      await sendEmail(email, 'Your OTP Code', `<p>Your OTP is: <strong>${rawOtp}</strong></p>`);

      return Helpers.sendOk(res, { twoFactor: true, message: 'OTP sent to your email.' });
    }

    const token = jwt.sign({ id: user.id }, "process.env.JWT_SECRET", { expiresIn: '1d' });
    res.cookie('token', token, {
    // httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return Helpers.sendOk(res, {
      user: {
        email: user.email,
        name: user.full_name,
        phone: user.phone
      },
    });

  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};


const verify2FALogin = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return Helpers.sendBadRequest(res, 'Email and OTP are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return Helpers.sendNotFound(res, 'User not found.');

    const otpEntry = await Otp.findOne({
      where: {
        userId: user.id,
        type: '2fa_login',
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

    await otpEntry.destroy();

    const token = jwt.sign({ id: user.id }, "process.env.JWT_SECRET", { expiresIn: '1d' });
    res.cookie('token', token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return Helpers.sendOk(res, {
      user: {
        email: user.email,
        name: user.full_name,
        phone: user.phone
      },
      message: '2FA login successful.',
    });

  } catch (err) {
    console.error(err);
    return Helpers.sendInternalServerError(res);
  }
};



const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
     // httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      path: '/',
    });


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


const test = (req, res) => {
  console.log(req.cookies)
}

module.exports = { register, login, test, logout, verifyCookie, updatePassword, resetPassword, verify2FALogin }