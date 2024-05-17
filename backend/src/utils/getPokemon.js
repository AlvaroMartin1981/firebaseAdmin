const axios = require('axios');
const admin = require('firebase-admin');

admin.initializeApp();

const apiKey = process.env.API_KEY;
const headers = {
    'X-Api-Key': apiKey
};

const getPokemon = {
    async fetchAndSavePokemonCards() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/cards', { headers });
            const cards = response.data.data;

            const db = admin.firestore();

            for (const card of cards) {
                console.log('Guardando tarjeta:', card.name);
                const cardData = {};

                // Normalizar el nombre de la carta (convertir a minúsculas y quitar espacios en blanco)
                const normalizedCardName = card.name.toLowerCase().replace(/\s/g, '');

                // Recorrer todas las propiedades del objeto card
                for (const [key, value] of Object.entries(card)) {
                    // Verificar si el valor es undefined y asignar null si lo es
                    cardData[key] = value !== undefined ? value : null;
                }

                // Agregar el nombre normalizado a los datos de la carta
                cardData.normalized_name = normalizedCardName;

                // Agregar el ID de Firestore aleatorio
                const cardRef = db.collection('cards').doc();
                cardData.idFirestore = cardRef.id;

                // Establecer el documento con el ID de Firestore
                await cardRef.set(cardData);

                // Crear un documento con el nombre normalizado como ID
                const normalizedCardRef = db.collection('cardsByName').doc(normalizedCardName);
                await normalizedCardRef.set(cardData);
            }
            console.log('Tarjetas de Pokémon guardadas exitosamente en Firestore.');
        } catch (error) {
            console.error('Error al obtener las tarjetas de Pokémon:', error.message);
        }
    },

    async fetchAndSaveSetDetails() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/sets', { headers });
            const sets = response.data.data;

            const db = admin.firestore();

            for (const set of sets) {
                console.log('Guardando detalles del set:', set.name);
                const setData = {};

                // Normalizar el nombre del set (convertir a minúsculas y quitar espacios en blanco)
                const normalizedSetName = set.name.toLowerCase().replace(/\s/g, '');

                // Recorrer todas las propiedades del objeto set
                for (const [key, value] of Object.entries(set)) {
                    // Verificar si el valor es undefined y asignar null si lo es
                    setData[key] = value !== undefined ? value : null;
                }

                // Agregar el nombre normalizado a los datos del set
                setData.normalized_name = normalizedSetName;

                // Agregar el ID de Firestore aleatorio
                const setRef = db.collection('sets').doc();
                setData.idFirestore = setRef.id;

                // Establecer el documento con el ID de Firestore
                await setRef.set(setData);

                // Crear un documento con el nombre normalizado como ID
                const normalizedSetRef = db.collection('setsByName').doc(normalizedSetName);
                await normalizedSetRef.set(setData);
            }
            console.log('Detalles de los sets de Pokémon guardados exitosamente en Firestore.');
        } catch (error) {
            console.error('Error al obtener los detalles de los sets de Pokémon:', error.message);
        }
    },

    
    async getAllTypes() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/types');
            const types = response.data.data;
            return types;
        } catch (error) {
            console.error('Error al obtener los tipos de Pokémon:', error.message);
            res.status(500).send('Error al obtener los tipos de Pokémon.');
        } 
    },
    async getAllSubtypes() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/subtypes');
            const subtypes = response.data.data;
            res.status(200).json({ data: subtypes });
        } catch (error) {
            console.error('Error al obtener los subtipos de Pokémon:', error.message);
            res.status(500).send('Error al obtener los subtipos de Pokémon.');
        }
    },
    async getAllSuperTypes(){
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/supertypes');
            const supertypes = response.data.data;
            res.status(200).json({ data: supertypes });
        } catch (error) {
            console.error('Error al obtener los supertipos de Pokémon:', error.message);
            res.status(500).send('Error al obtener los supertipos de Pokémon.');
        }
    },
    async getAllRarities() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/rarities');
            const rarities = response.data.data;
            res.status(200).json({ data: rarities });
        } catch (error) {
            console.error('Error al obtener las rarezas de Pokémon:', error.message);
            res.status(500).send('Error al obtener las rarezas de Pokémon.');
        }
    }




};

module.exports = getPokemon;
