const User = require("./userModel");
const UserProfile=require("./userProfileModel");
const Otp= require("./otpModel");
const Expense = require("./expenseModel");
const Session = require("./sessionModel");

const models={User,UserProfile,Otp, Expense,Session};


Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});
module.exports=models