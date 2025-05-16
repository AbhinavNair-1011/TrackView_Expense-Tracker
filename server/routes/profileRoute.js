const router=require("express").Router();
const profileController= require("../controllers/profileController");
const authenticateToken= require("../middlewares/jwt");

router.get("/profile",authenticateToken,profileController.getProfile)
router.put('/profile', authenticateToken,profileController.updateProfile);


module.exports=router