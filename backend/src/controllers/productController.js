const { getFirestore, collection, getDocs, getDoc, doc, query, where } = require('firebase/firestore');
const firebaseapp = require('../config/firebaseindex');

const fireDb = getFirestore(firebaseapp);
const cardsRef = collection(fireDb, 'cards');
const setsRef = collection(fireDb, 'sets');



const productController = {
  async getAllCards(req, res) {
    try {
      console.log('Obteniendo todas las cartas...');
      
      const q = query(cardsRef);
      const querySnapshot = await getDocs(q);
      
      const cards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log(`Número de cartas encontradas: ${cards.length}`);
      res.status(200).json(cards);
    } catch (error) {
      console.error("Error al obtener todas las cartas:", error);
      res.status(500).json({ error: "Error al obtener todas las cartas" });
    }
  },

  async getAllSets(req, res) {
    try {
      console.log('Obteniendo todos los sets...');
      
      const q = query(setsRef);
      const querySnapshot = await getDocs(q);
      
      const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log(`Número de sets encontrados: ${sets.length}`);
      res.status(200).json(sets);
    } catch (error) {
      console.error("Error al obtener todos los sets:", error);
      res.status(500).json({ error: "Error al obtener todos los sets" });
    }
  },

  async getCardId(req, res) {
    try {
        console.log('Obteniendo carta por ID...');
        
        const { cardId } = req.params;
        const cardRef = doc(cardsRef, cardId);
        const cardDoc = await getDoc(cardRef);
        
        if (!cardDoc.exists()) {
            console.log('La carta no existe.');
            return res.status(404).json({ error: 'La carta no existe' });
        }

        console.log('Carta obtenida exitosamente.');
        res.status(200).json({ id: cardDoc.id, ...cardDoc.data() });
    } catch (error) {
        console.error("Error al obtener carta por ID:", error);
        res.status(500).json({ error: "Error al obtener carta por ID" });
    }
},


  async getSetId(req, res) {
    try {
      console.log('Obteniendo set por ID...');
      
      const { setId } = req.params;
      const setDoc = await getDocs(doc(productsRef, setId));
      
      if (!setDoc.exists()) {
        console.log('El set no existe.');
        return res.status(404).json({ error: 'El set no existe' });
      }

      console.log('Set obtenido exitosamente.');
      res.status(200).json({ id: setDoc.id, ...setDoc.data() });
    } catch (error) {
      console.error("Error al obtener set por ID:", error);
      res.status(500).json({ error: "Error al obtener set por ID" });
    }
  },

  async getCardName(req, res) {
    try {
        console.log('Obteniendo carta por nombre...');

        const { name } = req.params;

        // Normaliza el nombre de la carta (convertir a minúsculas y quitar espacios en blanco)
        const normalizedCardName = name.toLowerCase().replace(/\s/g, '');

        // Realiza la consulta en Firestore
        const q = query(cardsRef, where('normalized_name', '==', normalizedCardName));
        const querySnapshot = await getDocs(q);

        // Verifica si se encontraron cartas
        if (querySnapshot.empty) {
            console.log(`No se encontraron cartas con el nombre: ${name}`);
            return res.status(404).json({ error: `No se encontraron cartas con el nombre: ${name}` });
        }

        // Transforma los documentos en objetos JSON
        const cards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log(`Número de cartas encontradas: ${cards.length}`);
        res.status(200).json(cards);
    } catch (error) {
        console.error("Error al obtener carta por nombre:", error);
        res.status(500).json({ error: "Error al obtener carta por nombre" });
    }
},

async getSetName(req, res) {
  try {
      console.log('Obteniendo set por nombre...');
      
      const { setName } = req.params;
      const normalizedName = setName.toLowerCase().replace(/\s/g, '');

      const q = query(setsRef, where('normalized_name', '==', normalizedName));
      const querySnapshot = await getDocs(q);
      
      const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log(`Número de sets encontrados: ${sets.length}`);
      res.status(200).json(sets);
  } catch (error) {
      console.error("Error al obtener set por nombre:", error);
      res.status(500).json({ error: "Error al obtener set por nombre" });
  }
},

  async editProduct(req, res) {
    try {
      console.log('Editando producto...');
      
      const { productId } = req.params;
      const newData = req.body;

      // Verificar el rol del usuario
      const { role } = req.session;
      if (role !== 'admin' && role !== 'superadmin') {
        console.log('No tienes permiso para editar productos.');
        return res.status(403).json({ error: 'No tienes permiso para editar productos.' });
      }

      // Actualizar los datos del producto en Firestore
      const productRef = doc(productsRef, productId);
      await updateDoc(productRef, newData);

      console.log('Producto editado exitosamente.');
      res.status(200).json({ message: "Producto editado exitosamente" });
    } catch (error) {
      console.error("Error al editar producto:", error);
      res.status(500).json({ error: "Error al editar producto" });
    }
  },

  async createProduct(req, res) {
    try {
      console.log('Creando producto...');
      
      const { role } = req.session;
      if (role !== 'superadmin') {
        console.log('No tienes permiso para crear productos.');
        return res.status(403).json({ error: 'No tienes permiso para crear productos.' });
      }

      const newProductData = req.body;
      const newProductRef = await addDoc(productsRef, newProductData);

      console.log('Producto creado exitosamente.');
      res.status(201).json({ message: 'Producto creado exitosamente', productId: newProductRef.id });
    } catch (error) {
      console.error("Error al crear producto:", error);
      res.status(500).json({ error: "Error al crear producto" });
    }
  },

  async deleteProduct(req, res) {
    try {
      console.log('Eliminando producto...');
      
      const { productId } = req.params;
      const { role } = req.session;
      if (role !== 'superadmin') {
        console.log('No tienes permiso para eliminar productos.');
        return res.status(403).json({ error: 'No tienes permiso para eliminar productos.' });
      }

      await deleteDoc(doc(productsRef, productId));

      console.log('Producto eliminado exitosamente.');
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  }
  

};  

module.exports = productController;
