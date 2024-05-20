const express = require('express');
const routerUser = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

routerUser.post('/register', userController.register);
routerUser.post('/login', userController.login);
routerUser.post('/logout', authMiddleware, userController.logout);

module.exports = routerUser;