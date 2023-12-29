const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/forget-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)


module.exports = router;