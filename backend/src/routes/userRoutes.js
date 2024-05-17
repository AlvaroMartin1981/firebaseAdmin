const express = require('express');
const routerUser = express.Router();
const userController = require('../controllers/userController');

routerUser.post('/register', userController.register);
routerUser.post('/login', userController.login);
routerUser.post('/logout', userController.logout);

module.exports = routerUser;