const express = require('express');
const routerProducts = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');




// Rutas abiertas a todos los navegantes y usuarios
routerProducts.get('/cards', productController.getAllCards);
routerProducts.get('/sets', productController.getAllSets);
routerProducts.get('/cards/:cardId', productController.getCardId);
routerProducts.get('/sets/:setId', productController.getSetId);
routerProducts.get('/cards/name/:name', productController.getCardName);
routerProducts.get('/sets/name/:setName', productController.getSetName);

// Rutas solo para admin y superadmin
routerProducts.put('/editProduct/:productId', authMiddleware, productController.editProduct);

// Rutas solo para superadmin
routerProducts.post('/createProduct', authMiddleware, productController.createProduct);
routerProducts.delete('/deleteProduct/:productId', authMiddleware, productController.deleteProduct);

module.exports = routerProducts;
