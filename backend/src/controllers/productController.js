const  { db } = require('../config/Firebase');


const productController = {
  // Obtener todos los productos
  getAllProducts: async (req, res) => {
    try {
      const productsRef = db.ref('products');
      const snapshot = await productsRef.once('value');
      const products = snapshot.val();
      res.json(products);
    } catch (error) {
      res.status(500).send('Error al obtener los productos');
    }
  },

  // Crear un nuevo producto
  createProduct: async (req, res) => {
    try {
      const newProduct = req.body;
      const productsRef = db.ref('products');
      const newProductRef = productsRef.push();
      await newProductRef.set(newProduct);
      res.status(201).send('Producto creado exitosamente');
    } catch (error) {
      res.status(500).send('Error al crear el producto');
    }
  },

  // Actualizar un producto existente
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = req.body;
      const productRef = db.ref(`products/${productId}`);
      await productRef.update(updatedProduct);
      res.send('Producto actualizado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar el producto');
    }
  },

  // Eliminar un producto existente
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const productRef = db.ref(`products/${productId}`);
      await productRef.remove();
      res.send('Producto eliminado exitosamente');
    } catch (error) {
      res.status(500).send('Error al eliminar el producto');
    }
  }
};

module.exports = productController;
