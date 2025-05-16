const router=require("express").Router();
const authController= require("../controllers/authController");
const authenticateToken= require("../middlewares/jwt");

router.post("/auth/register",authController.register)
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticateToken,authController.logout);
router.put('/auth/update-password', authenticateToken,authController.updatePassword);

router.get("/auth/verify-cookie",authenticateToken,authController.verifyCookie)


router.post('/a',authController.test)
module.exports=router