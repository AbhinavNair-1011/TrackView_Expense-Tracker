const router=require("express").Router();
const authController= require("../controllers/authController");
const authenticateToken= require("../middlewares/jwt");

router.post("/auth/register",authController.register)
router.post('/auth/login', authController.login);
router.post('/auth/logout',authController.logout);
router.put('/auth/update-password', authenticateToken,authController.updatePassword);
router.post('/auth/reset-password', authController.resetPassword);
router.post('/auth/verify-login',authController.verify2FALogin);

router.get("/auth/verify-cookie",authenticateToken,authController.verifyCookie)
router.post('/auth/refresh-token',authController.refreshAccessToken);


router.post('/a',authController.test)
module.exports=router