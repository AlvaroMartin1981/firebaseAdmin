const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>{
    res.redirect('/home')
})
// Crear un nuevo producto
router.post('/products', (req, res) => {
  // Aquí iría la lógica para crear un nuevo item
});
// Leer todos los productos
router.get('/products', (req, res) => {
  // Aquí iría la lógica para obtener todos los productos
});

// Leer un producto específico por su id
router.get('/products/:id', (req, res) => {
  // Aquí iría la lógica para obtener un producto específico
});

// Actualizar un producto específico por su id
router.put('/products/:id', (req, res) => {
  // Aquí iría la lógica para actualizar un producto específico
});

// Eliminar un producto específico por su id
router.delete('/products/:id', (req, res) => {
  // Aquí iría la lógica para eliminar un producto específico
});


module.exports = router;