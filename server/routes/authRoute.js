const route=require("express").Router();
const authController= require("../controllers/authController");

route.post("/auth/register",authController.register)

module.exports=route