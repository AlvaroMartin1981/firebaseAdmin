const admin = require('firebase-admin');
const fs = require('fs');

// Configuración de las credenciales de Firebase Admin
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath));

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Obtener una instancia de Firestore
const db = admin.firestore();

// Exportar el objeto admin y la instancia de Firestore para su uso en otros archivos
module.exports = { admin, db };




/*const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
const admin = require('firebase-admin');
const fs = require('fs');

const firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_DOMAIN,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_SENDERID,
    appId: process.env.FB_APPID
};

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath));


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = { auth, db, admin };*/
