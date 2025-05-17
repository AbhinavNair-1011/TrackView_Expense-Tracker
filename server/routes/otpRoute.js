const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

router.post('/auth/send-otp', otpController.sendOtp);
router.post('/auth/verify-otp', otpController.verifyOtp);

module.exports = router;
