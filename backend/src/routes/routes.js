const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/products', productController.getAllProducts);

// Ruta para crear un nuevo producto
router.post('/products', productController.createProduct);

// Ruta para actualizar un producto existente
router.put('/products/:productId', productController.updateProduct);

// Ruta para eliminar un producto existente
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
