const Helpers=require("../utils/helpers");
const Session= require("../models/sessionModel")

const createSession = async (req, res, user,rememberMe, transaction) => {
  try {
    const refreshToken = Helpers.generateRefreshToken();
    const hashedRefreshToken = Helpers.hashToken(refreshToken);
    const accessToken = Helpers.generateAccessToken(user);

    const expiresAt = rememberMe
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 1 * 60 * 60 * 1000);

    await Session.create({
      userId: user.id,
      refreshToken: hashedRefreshToken,
      expiresAt,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      rememberMe
    }, { transaction });

    const refreshTokenMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined;
    const accessTokenMaxAge = rememberMe ? 10 * 60 * 1000 : undefined;

      res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // secure: true,
      // sameSite:"none",
      maxAge: accessTokenMaxAge,
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      path: '/',
       httpOnly: true,
      // secure: true,
      // sameSite:"none",
      maxAge: refreshTokenMaxAge,
    });

    return { err: null, created: true };
  } catch (err) {
    return { err, created: false };
  }
};

module.exports = { createSession };
