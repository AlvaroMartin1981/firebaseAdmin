const firebaseapp = require('../config/firebaseindex')

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { getFirestore, collection, doc, setDoc, getDoc, Timestamp } = require('firebase/firestore');

const auth = getAuth(firebaseapp);
const fireDb = getFirestore(firebaseapp);

const userController = {
  async register(req, res, next) {
    const { email, password, role, name, username } = req.body;
    try {
      console.log('Registrando usuario...');
      
      // Validar los datos proporcionados
      if (!email || !password || !role || !name || !username) {
        console.log('Falta algún campo.');
        return res.status(400).json({ error: 'Falta algún campo.' });
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userRef = doc(fireDb, 'usuarios', uid);
      
      await setDoc(userRef, {
        uid,
        name,
        username,
        registrationDate: Timestamp.now(),
        role,
        email,
        wishList: []
      });

      const loginCredential = await signInWithEmailAndPassword(auth, email, password);
      req.session.uid = uid;
      req.session.token = await loginCredential.user.getIdToken();
      req.session.role = role;

      console.log('Usuario registrado exitosamente.');
      res.status(201).json({ uid, token: req.session.token, role });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      let errorMessage = "Error al registrar usuario";
      if (error.code === 'auth/weak-password') {
        errorMessage = 'Contraseña insegura, genera una nueva contraseña';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email ya registrado';
      }
      res.status(400).json({ error: errorMessage });
    }
  },

  async login(req, res) {
    try {
      console.log('Iniciando sesión...');
      
      const { email, password } = req.body;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(fireDb, 'usuarios', uid));
      const userData = userDoc.data();

      req.session.uid = uid;
      req.session.role = userData.role;

      console.log('Inicio de sesión exitoso.');
      res.status(200).json({ message: "Inicio de sesión exitoso", user: userData });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  },

  async logout(req, res) {
    try {
      console.log('Cerrando sesión...');
      
      // Cerrar sesión de usuario en Firebase Authentication
      await signOut(auth);

      // Limpiar la sesión del usuario en el backend
      req.session = null;

      console.log('Cierre de sesión exitoso.');
      res.status(200).json({ message: "Cierre de sesión exitoso" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  }
};

module.exports = userController;
