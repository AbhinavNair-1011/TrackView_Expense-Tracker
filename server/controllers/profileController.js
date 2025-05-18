const User = require('../models/userModel');
const UserProfile = require("../models/userProfileModel")
const { Op } = require("sequelize");
const Helpers = require('../utils/helpers');
const { sequelize } = require("../database/dbConfig");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['full_name', 'email', 'phone','two_factor_enabled'],
      include: [{
        model: UserProfile,
        attributes: ['dob', 'address', 'gender'],
      }]
    });

    if (!user) {
      return Helpers.sendNotFound(res, 'User not found');
    }

    const responseData = {
      full_name: user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
      dob: user.UserProfile?.dob || '',
      gender: user.UserProfile?.gender || '',
      address: user.UserProfile?.address || '',
      two_fa_enabled:user.two_factor_enabled || '',
    };
    return Helpers.sendOk(res, responseData);
  } catch (error) {
    console.error(error);
    return Helpers.sendInternalServerError(res);
  }
};

const updateProfile = async (req, res) => {
  let transaction;
  try {
    const userId = req.user.id;

    const { full_name, phone, email, dob, address, gender } = req.body;


    transaction = await sequelize.transaction();

    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }],
        id: { [Op.ne]: userId }
      },
      transaction
    });

    if (userExists) {
      await transaction.rollback();
      return Helpers.sendConflict(res, "Email or phone already exists");
    }

    const user = await User.findByPk(userId, { transaction });
    if (!user) {
      await transaction.rollback();
      return Helpers.sendNotFound(res, "User not found");
    }

    if (full_name) user.full_name = full_name;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    await user.save({ transaction });

    let profile = await UserProfile.findOne({
      where: { userId },
      transaction
    });

    if (!profile) {

      const profileData = { userId };
      if (dob) profileData.dob = dob;
      if (address) profileData.address = address;
      if (gender) profileData.gender = gender;

      profile = await UserProfile.create(profileData, { transaction });
    } else {
      if (dob) profile.dob = dob;
      if (address) profile.address = address;
      if (gender) profile.gender = gender;
      await profile.save({ transaction });
    }

    await transaction.commit();

     const responseData = {
      full_name: user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
      dob: profile.dob || '',
      gender: profile.gender || '',
      address: profile.address || ''
    };
    return Helpers.sendUpdated(res, responseData);

  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error(error);
    return Helpers.sendInternalServerError(res);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
