const Helpers = require("../utils/helpers");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");


const register = async (req, res) => {

  try {
    const {
      full_name,
      phone,
      password,
      confirm_password,
      email
    } = req.body

    if (!full_name.trim()  || !phone.trim() || !password.trim() || !email.trim()) {
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
    const createdUser = await User.create({
      full_name,
      phone,
      password: hashedPassword,
      email
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
      path:"/"
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
      return Helpers.sendBadRequest(res, 'Email and password are required');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return Helpers.sendNotFound(res, 'User not found');
    }
    // const isMatch = await Helpers.compare(password, user.password);
      
    // if (!isMatch) {
    //   return Helpers.sendUnauthorized(res, 'Invalid password');
    // }

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
      path:"/"
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

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true, 
      sameSite: 'none', 
      path: '/',
    });


    return Helpers.sendOk(res,[], 'Logged out successfully' );
  } catch (error) {
    return Helpers.sendInternalServerError(res );
  } 
};

const verifyCookie = async(req,res)=>{

  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'full_name', 'email']
    });

    if (!user) {
      return Helpers.sendNotFound(res, 'User not found');
    }

    return Helpers.sendOk(res, user, 'User authenticated');
  } catch (err) {
    return  Helpers.sendInternalServerError(res, 'Something went wrong');
  }
}


const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    console.log(userId)

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


const test= (req,res)=>{
console.log(req.cookies)
}

module.exports = { register, login ,test,logout ,verifyCookie,updatePassword}