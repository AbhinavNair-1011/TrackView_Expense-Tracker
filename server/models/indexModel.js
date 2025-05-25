const User = require("./userModel");
const UserProfile=require("./userProfileModel");
const Otp= require("./otpModel");
const Expense = require("./expenseModel");
const Session = require("./sessionModel");
const ExpenseDue= require("./expenseDueModel");

const models={User,UserProfile,Otp, Expense,Session, ExpenseDue };


Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});
module.exports=models