const express = require('express');
const authController = require('../controller/auth.controller')

const router = express.Router();
 
router.post('/register', authController.register)
router.post('/login', authController.Login)
router.get('/find', authController.searchUser)
module.exports = router;