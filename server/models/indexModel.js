const User = require("./userModel");
const UserProfile=require("./userProfileModel");
const Otp= require("./otpModel");

const models={User,UserProfile,Otp};


Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});
module.exports=models