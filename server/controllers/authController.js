const Helpers = require("../utils/helpers");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");


const register = async (req, res) => {

  try {
    const {
      first_name,
      last_name,
      phone,
      password,
      confirm_password,
      email
    } = req.body

    if (!first_name.trim() || !last_name.trim() || !phone.trim() || !password.trim() || !email.trim()) {
      return Helpers.sendBadRequest(res, "all field values required")
    }
    if (confirm_password !== password) {
     return Helpers.sendBadRequest(res, "password mismatch")
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { phone }
        ]
      }
    });

    if (user) {
      return Helpers.sendConflict(res, "User already exists");
    }


    const hashedPassword = await Helpers.encrypt(password);
    const createdUser = User.create({
      first_name,
      last_name,
      phone,
      password: hashedPassword,
      email
    })

    return Helpers.sendCreated(res, { first_name, last_name, phone, email })

  } catch (err) {
    console.error(err);
   return Helpers.sendInternalServerError(res, err.message || err)
  }

}



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return Helpers.sendBadRequest(res, 'Email and password are required');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return Helpers.sendNotFound(res, 'User not found');
    }
    const isMatch = await Helpers.compare(password, user.password);
      
    if (!isMatch) {
      return Helpers.sendUnauthorized(res, 'Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, },
      "process.env.JWT_SECRET",
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return Helpers.sendOk(res, {
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return Helpers.sendInternalServerError(res, 'Internal server error');
  }
};

const test= (req,res)=>{
console.log(req.cookies)
}

module.exports = { register, login ,test}