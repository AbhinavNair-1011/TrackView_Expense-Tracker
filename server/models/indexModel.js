const User = require("./userModel");
const UserProfile=require("./userProfileModel")

const models={User,UserProfile};


Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});
module.exports=models