const User = require("./userModel");
const UserProfile=require("./userProfileModel");
const Otp= require("./otpModel");
const Expense = require("./expenseModel");

const models={User,UserProfile,Otp, Expense};


Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});
module.exports=models