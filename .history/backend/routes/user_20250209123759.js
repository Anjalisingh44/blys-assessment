const express = require('express');

const {
    createUser,loginUser,
    verifyEmail,sendOtp,
    resendOtp
     
} = require('../controller/userController')

const router = express.Router();

router.post('/signin', loginUser)
router.post('/signup', createUser); 
router.post('/verify-email', verifyEmail);





module.exports = router;